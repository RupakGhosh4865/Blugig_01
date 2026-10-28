"use client";

import {
  ArrowLeft,
  Bold,
  Code,
  ExternalLink,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Plus,
  Quote,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react";
import { deletePost, savePost } from "@/app/admin/actions";
import { ScorePill } from "@/components/admin/ScorePill";
import { Button } from "@/components/ui/Button";
import { renderMarkdown } from "@/lib/blog/markdown";
import { type EditablePost, formatDate, postPath, postState, postTitleTag, readingMinutes, slugify, toEditable } from "@/lib/blog/post";
import { analyzePost, type CheckStatus } from "@/lib/blog/seo-check";
import { cn } from "@/lib/utils";

type Editable = EditablePost;
type LinkTarget = { title: string; slug: string };

/**
 * The browser clock to the minute (0 during server rendering): enough to tell
 * scheduled from live, and identical on server and first client render.
 */
function useMinuteClock() {
  return useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, 15_000);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => 0,
  );
}

/** Pages worth linking from a post (internal links pass authority to the pages that sell). */
const SITE_PAGES = [
  { label: "Services", href: "/services" },
  { label: "Integrations", href: "/integrations" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const input =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-[0.9375rem] outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";

const DOT: Record<CheckStatus, string> = { good: "bg-emerald-500", ok: "bg-amber-400", bad: "bg-red-500" };
const ORDER: Record<CheckStatus, number> = { bad: 0, ok: 1, good: 2 };

/** ISO → the value a datetime-local input wants (the browser's local time). */
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/**
 * Blog post editor: markdown body with a toolbar and live preview, every SEO
 * field with length guidance, a Google result preview, and the SEO checklist
 * (lib/blog/seo-check.ts) re-scored as you type. Ctrl/Cmd+S saves.
 */
export function PostEditor({
  initial,
  meta: initialMeta,
  linkTargets,
  canSave,
}: {
  initial: Editable;
  meta: { previousSlugs: string[]; updatedAt: string | null };
  linkTargets: LinkTarget[];
  canSave: boolean;
}) {
  const router = useRouter();
  const [post, setPost] = useState<Editable>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [meta, setMeta] = useState(initialMeta);
  const [tagsText, setTagsText] = useState(initial.tags.join(", "));
  const [slugTouched, setSlugTouched] = useState(initial.id !== null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [notice, setNotice] = useState<{ tone: "good" | "bad"; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const now = useMinuteClock();
  const textarea = useRef<HTMLTextAreaElement>(null);

  const dirty = JSON.stringify(post) !== saved;
  const deferred = useDeferredValue(post);
  const report = useMemo(() => analyzePost(deferred), [deferred]);
  const preview = useMemo(() => (tab === "preview" ? renderMarkdown(deferred.content).html : ""), [tab, deferred.content]);
  const state = now ? postState(post, now) : post.status === "draft" ? "draft" : "live";
  const live = post.id !== null && state === "live" && !dirty;

  const set = <K extends keyof Editable>(key: K, value: Editable[K]) => setPost((p) => ({ ...p, [key]: value }));

  const onTitle = (title: string) =>
    setPost((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }));

  const save = (status: Editable["status"]) => {
    if (!canSave) return;
    const payload = { ...post, status };
    startTransition(async () => {
      const res = await savePost(payload);
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setNotice({ tone: "bad", text: res.message });
        return;
      }
      const editable = toEditable(res.post);
      setPost(editable);
      setSaved(JSON.stringify(editable));
      setTagsText(editable.tags.join(", "));
      setMeta({ previousSlugs: res.post.previousSlugs, updatedAt: res.post.updatedAt });
      setSlugTouched(true);
      setErrors({});
      setNotice({ tone: "good", text: res.message });
      if (post.id === null) router.replace(`/admin/posts/${editable.id}`);
    });
  };

  const remove = () => {
    if (!post.id || !window.confirm(`Delete “${post.title || "this post"}”? Its URL will stop working.`)) return;
    startTransition(async () => {
      const res = await deletePost(post.id!);
      if (!res.ok) return setNotice({ tone: "bad", text: res.message });
      setSaved(JSON.stringify(post));
      router.push("/admin");
    });
  };

  // Ctrl/Cmd+S saves with the current status; leaving with unsaved changes asks first.
  const onSaveShortcut = useEffectEvent(() => save(post.status));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSaveShortcut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  /** Wrap the selection (or a placeholder) in markdown, or prefix the current line. */
  const format = (kind: "h2" | "h3" | "bold" | "italic" | "link" | "ul" | "ol" | "quote" | "image" | "code", href?: string, label?: string) => {
    const ta = textarea.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const sel = value.slice(s, e);
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const prefixes = { h2: "## ", h3: "### ", ul: "- ", ol: "1. ", quote: "> " } as const;
    let next: string;
    let caret: [number, number];
    if (kind in prefixes) {
      const prefix = prefixes[kind as keyof typeof prefixes];
      next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
      caret = [s + prefix.length, e + prefix.length];
    } else {
      const text = sel || label || { bold: "bold text", italic: "italic text", link: "link text", image: "Describe the image", code: "code" }[kind as "bold"];
      const snippet = {
        bold: `**${text}**`,
        italic: `_${text}_`,
        link: `[${text}](${href ?? "https://"})`,
        image: `![${text}](https://)`,
        code: sel.includes("\n") ? `\n\`\`\`\n${text}\n\`\`\`\n` : `\`${text}\``,
      }[kind as "bold"];
      next = value.slice(0, s) + snippet + value.slice(e);
      const at = s + snippet.indexOf(text);
      caret = [at, at + text.length];
    }
    set("content", next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(...caret);
    });
  };

  const titleTag = postTitleTag(post);
  const checks = [...report.checks].sort((a, b) => ORDER[a.status] - ORDER[b.status]);
  const err = (key: string) => (errors[key] ? <p className="mt-1.5 text-xs text-red-700">{errors[key]}</p> : null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(post.status);
      }}
      className="mx-auto grid max-w-[90rem] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem]"
    >
      {/* ---------- Main column ---------- */}
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link href="/admin" className="flex items-center gap-1.5 text-gray-600 hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" /> All posts
          </Link>
          <span className="text-gray-500">
            {dirty ? "Unsaved changes" : meta.updatedAt ? `Saved ${formatDate(meta.updatedAt)}` : "Not saved yet"}
          </span>
        </div>

        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            value={post.title}
            onChange={(e) => onTitle(e.target.value)}
            placeholder="Post title (the H1 readers see)"
            className="w-full rounded-2xl bg-white px-5 py-4 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-medium tracking-[-0.03em] outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-blue-600/15"
          />
          {err("title")}
        </div>

        <div>
          <div className="flex items-center rounded-xl border border-gray-200 bg-white pl-3.5 text-[0.9375rem] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/15">
            <span className="shrink-0 text-gray-500">avantratechnologies.com/blog/</span>
            <input
              aria-label="URL slug"
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              onBlur={() => set("slug", slugify(post.slug))}
              placeholder="short-keyword-slug"
              className="min-w-0 flex-1 bg-transparent py-2.5 pr-3.5 font-mono text-sm outline-none"
            />
          </div>
          {err("slug")}
          {meta.previousSlugs.length ? (
            <p className="mt-1.5 text-xs text-gray-500">
              Old URL{meta.previousSlugs.length > 1 ? "s" : ""} redirect here: {meta.previousSlugs.map((s) => `/blog/${s}`).join(", ")}
            </p>
          ) : null}
        </div>

        <section className="overflow-hidden rounded-2xl bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2">
            <div className="flex gap-1" role="tablist">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn("rounded-full px-3.5 py-1.5 text-sm capitalize", tab === t ? "bg-ink text-white" : "text-gray-600 hover:bg-gray-100")}
                >
                  {t}
                </button>
              ))}
            </div>
            {tab === "write" ? (
              <div className="flex flex-wrap items-center gap-0.5">
                <Tool label="Section heading (H2)" onClick={() => format("h2")} icon={<Heading2 className="size-4" />} />
                <Tool label="Subheading (H3)" onClick={() => format("h3")} icon={<Heading3 className="size-4" />} />
                <Tool label="Bold" onClick={() => format("bold")} icon={<Bold className="size-4" />} />
                <Tool label="Italic" onClick={() => format("italic")} icon={<Italic className="size-4" />} />
                <Tool label="Link" onClick={() => format("link")} icon={<Link2 className="size-4" />} />
                <Tool label="Bulleted list" onClick={() => format("ul")} icon={<List className="size-4" />} />
                <Tool label="Numbered list" onClick={() => format("ol")} icon={<ListOrdered className="size-4" />} />
                <Tool label="Quote" onClick={() => format("quote")} icon={<Quote className="size-4" />} />
                <Tool label="Image (with alt text)" onClick={() => format("image")} icon={<ImageIcon className="size-4" />} />
                <Tool label="Code" onClick={() => format("code")} icon={<Code className="size-4" />} />
                <select
                  aria-label="Insert an internal link"
                  value=""
                  onChange={(e) => {
                    const [href, label] = e.target.value.split("|");
                    if (href) format("link", href, label);
                  }}
                  className="ml-1 rounded-lg border border-gray-200 bg-white py-1 pr-2 pl-2 text-sm text-gray-700"
                >
                  <option value="">Link to a page…</option>
                  <optgroup label="Site pages">
                    {SITE_PAGES.map((p) => (
                      <option key={p.href} value={`${p.href}|${p.label}`}>
                        {p.label}
                      </option>
                    ))}
                  </optgroup>
                  {linkTargets.length ? (
                    <optgroup label="Blog posts">
                      {linkTargets.map((p) => (
                        <option key={p.slug} value={`${postPath(p.slug)}|${p.title}`}>
                          {cut(p.title, 48)}
                        </option>
                      ))}
                    </optgroup>
                  ) : null}
                </select>
              </div>
            ) : null}
          </div>
          {tab === "write" ? (
            <textarea
              ref={textarea}
              aria-label="Post content (Markdown)"
              value={post.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder={"Open with a paragraph that uses your focus keyword and says who the post is for.\n\n## First section\n\nWrite in short paragraphs. Link to [our services](/services) where it helps the reader."}
              className="block min-h-[60vh] w-full resize-y px-5 py-4 font-mono text-[0.875rem] leading-7 outline-none"
            />
          ) : (
            <div className="prose-blog min-h-[60vh] px-6 py-5" dangerouslySetInnerHTML={{ __html: preview || "<p>Nothing to preview yet.</p>" }} />
          )}
          <div className="flex flex-wrap justify-between gap-2 border-t border-gray-100 px-5 py-2.5 text-xs text-gray-500">
            <span>
              {report.words.toLocaleString("en-GB")} words · {readingMinutes(report.words)} min read
            </span>
            <span>Markdown: ## section · **bold** · [text](/services) · ![alt](url)</span>
          </div>
        </section>
        {err("content")}

        <section className="flex flex-col gap-4 rounded-2xl bg-white p-5">
          <div>
            <h2 className="font-medium">FAQs</h2>
            <p className="text-s text-gray-600">Short questions buyers actually ask. They show under the post and in FAQ structured data.</p>
          </div>
          {post.faqs.map((f, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-gray-100 p-3">
              <div className="flex gap-2">
                <input
                  aria-label={`Question ${i + 1}`}
                  value={f.q}
                  onChange={(e) => set("faqs", post.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))}
                  placeholder="Question"
                  className={input}
                />
                <button
                  type="button"
                  aria-label={`Remove question ${i + 1}`}
                  onClick={() => set("faqs", post.faqs.filter((_, j) => j !== i))}
                  className="rounded-xl px-3 text-gray-500 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 aria-hidden className="size-4" />
                </button>
              </div>
              <textarea
                aria-label={`Answer ${i + 1}`}
                value={f.a}
                onChange={(e) => set("faqs", post.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))}
                placeholder="A direct answer in one to three sentences."
                rows={2}
                className={input}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("faqs", [...post.faqs, { q: "", a: "" }])}
            className="flex w-fit items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-1.5 text-sm hover:border-blue-600 hover:text-blue-700"
          >
            <Plus aria-hidden className="size-4" /> Add a question
          </button>
        </section>
      </div>

      {/* ---------- Sidebar ---------- */}
      <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:self-start lg:overflow-y-auto lg:pb-4">
        <Card title="Publish">
          <p className="text-sm text-gray-600">
            Status:{" "}
            <strong className="text-ink">{state === "draft" ? "Draft" : state === "scheduled" ? "Scheduled" : "Published"}</strong>
          </p>
          <Field label="Publish date" hint="Empty publishes now. A future date schedules the post." error={errors.publishedAt}>
            {/* The input shows browser-local time, so it waits for the client clock (now > 0) to avoid a hydration mismatch. */}
            {now ? (
              <input
                type="datetime-local"
                value={post.publishedAt ? toLocalInput(post.publishedAt) : ""}
                onChange={(e) => set("publishedAt", e.target.value ? new Date(e.target.value).toISOString() : null)}
                className={input}
              />
            ) : (
              <div className={cn(input, "h-[2.875rem]")} />
            )}
          </Field>
          {notice ? (
            <p role="status" className={cn("rounded-xl px-3 py-2 text-sm", notice.tone === "good" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-800")}>
              {notice.text}
            </p>
          ) : null}
          {!canSave ? (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">Saving is off until a Postgres database is connected (see the posts page).</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" disabled={pending || !canSave} onClick={() => save("published")} className="flex-1 disabled:opacity-60">
              {pending ? "Saving…" : post.status === "published" ? "Update" : "Publish"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={pending || !canSave}
              onClick={() => save("draft")}
              className="flex-1 disabled:opacity-60"
            >
              {post.status === "published" ? "Unpublish" : "Save draft"}
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            {live ? (
              <a href={postPath(post.slug)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-700 hover:underline">
                View live post <ExternalLink aria-hidden className="size-3.5" />
              </a>
            ) : (
              <span />
            )}
            {post.id ? (
              <button type="button" onClick={remove} disabled={pending} className="flex items-center gap-1 text-red-700 hover:underline">
                <Trash2 aria-hidden className="size-3.5" /> Delete
              </button>
            ) : null}
          </div>
        </Card>

        <Card
          title="SEO"
          action={<ScorePill score={report.score} className="text-sm" />}
        >
          <ul className="flex flex-col gap-2.5">
            {checks.map((c) => (
              <li key={c.id} className="flex gap-2.5 text-sm">
                <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", DOT[c.status])} />
                <span>
                  <span className="font-medium">{c.label}</span>
                  <span className="sr-only"> ({c.status === "good" ? "passed" : c.status === "ok" ? "could improve" : "needs fixing"})</span>
                  <span className="block text-gray-600">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Search result preview">
          <div className="rounded-xl border border-gray-100 p-3.5">
            <p className="truncate text-xs text-gray-600">avantratechnologies.com › blog › {post.slug || "…"}</p>
            <p className="mt-1 text-lg leading-snug text-[#1a0dab]">{cut(titleTag, 62)}</p>
            <p className="mt-1 text-sm leading-snug text-gray-700">{cut(post.description || "Write a meta description — Google may show it here.", 160)}</p>
          </div>
          <Field label="Focus keyword" hint="The one phrase this post should rank for." error={errors.focusKeyword}>
            <input value={post.focusKeyword} onChange={(e) => set("focusKeyword", e.target.value)} placeholder="e.g. mitti rollout plan" className={input} />
          </Field>
          <Field label="Title tag" count={[titleTag.length, 30, 60]} hint={`Empty uses “${cut(post.title || "Title", 30)} | Avantra”.`} error={errors.seoTitle}>
            <input value={post.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} placeholder={postTitleTag({ title: post.title, seoTitle: "" })} className={input} />
          </Field>
          <Field label="Meta description" count={[post.description.length, 120, 160]} error={errors.description}>
            <textarea
              value={post.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Who it's for and what they'll learn, with the focus keyword."
              className={input}
            />
          </Field>
          <Field label="Excerpt" hint="Shown on blog cards and under the title. Empty uses the meta description." error={errors.excerpt}>
            <textarea value={post.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={input} />
          </Field>
          <Field label="Tags" hint="Comma-separated, e.g. Mitti, Workato, Rollout. Used for related posts." error={errors.tags}>
            <input
              value={tagsText}
              onChange={(e) => {
                setTagsText(e.target.value);
                set(
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                );
              }}
              className={input}
            />
          </Field>
        </Card>

        <Card title="Author">
          <p className="text-s -mt-1 text-gray-600">A named expert with a profile link builds trust with readers and search engines.</p>
          <Field label="Name" error={errors["author.name"]}>
            <input value={post.author.name} onChange={(e) => set("author", { ...post.author, name: e.target.value })} className={input} />
          </Field>
          <Field label="Role" error={errors["author.role"]}>
            <input
              value={post.author.role}
              onChange={(e) => set("author", { ...post.author, role: e.target.value })}
              placeholder="e.g. Mitti implementation lead"
              className={input}
            />
          </Field>
          <Field label="Profile URL" hint="LinkedIn or a team bio." error={errors["author.url"]}>
            <input
              value={post.author.url}
              onChange={(e) => set("author", { ...post.author, url: e.target.value })}
              placeholder="https://www.linkedin.com/in/…"
              className={input}
            />
          </Field>
          <Field label="Short bio" error={errors["author.bio"]}>
            <textarea value={post.author.bio} onChange={(e) => set("author", { ...post.author, bio: e.target.value })} rows={2} className={input} />
          </Field>
        </Card>

        <details className="rounded-2xl bg-white p-5">
          <summary className="cursor-pointer font-medium">Advanced</summary>
          <div className="mt-4 flex flex-col gap-4">
            <Field label="Canonical URL" hint="Only if this post first appeared on another site. Leave empty otherwise." error={errors.canonicalUrl}>
              <input value={post.canonicalUrl} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder="https://…" className={input} />
            </Field>
            <label className="flex items-start gap-2.5 text-sm">
              <input type="checkbox" checked={post.noindex} onChange={(e) => set("noindex", e.target.checked)} className="mt-0.5 size-4 accent-blue-600" />
              <span>
                Hide from search engines (noindex)
                <span className="block text-gray-600">The post stays reachable by link but leaves the sitemap.</span>
              </span>
            </label>
          </div>
        </details>
      </aside>
    </form>
  );
}

function Tool({ label, icon, onClick }: { label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <button type="button" title={label} aria-label={label} onClick={onClick} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-ink">
      {icon}
    </button>
  );
}

function Card({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Label, control, then a length counter (green inside [min, max]) or a hint, and the field's error. */
function Field({
  label,
  hint,
  count,
  error,
  children,
}: {
  label: string;
  hint?: string;
  count?: [number, number, number];
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      <span className="font-normal">{children}</span>
      {count ? (
        <span className={cn("text-xs font-normal", count[0] >= count[1] && count[0] <= count[2] ? "text-emerald-700" : "text-amber-700")}>
          {count[0]} / {count[2]} characters{hint ? ` · ${hint}` : ""}
        </span>
      ) : hint ? (
        <span className="text-xs font-normal text-gray-500">{hint}</span>
      ) : null}
      {error ? <span className="text-xs font-normal text-red-700">{error}</span> : null}
    </label>
  );
}
