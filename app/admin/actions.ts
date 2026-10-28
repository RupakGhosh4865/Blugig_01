"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { allowSignInAttempt, endSession, isAdmin, passwordMatches, startSession } from "@/lib/admin/auth";
import { isLive, type Post, postPath, SLUG_RE } from "@/lib/blog/post";
import { readAllPosts, removePost, storageInfo, writePost } from "@/lib/blog/store";
import { pingIndexNow } from "@/lib/indexnow";

// ---- Sign in / out ----------------------------------------------------------

export type SignInState = { error?: string };

export async function signIn(_prev: SignInState, form: FormData): Promise<SignInState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!allowSignInAttempt(ip)) return { error: "Too many attempts. Wait 15 minutes and try again." };
  if (!passwordMatches(String(form.get("password") ?? ""))) return { error: "That password isn't right." };
  await startSession();
  redirect("/admin");
}

export async function signOut() {
  await endSession();
  redirect("/admin/login");
}

// ---- Posts ------------------------------------------------------------------

const optionalUrl = z.union([z.literal(""), z.url({ protocol: /^https?$/, error: "Use a full https:// address." })]);

const postInput = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,80}$/).nullable(),
  status: z.enum(["draft", "published"]),
  title: z.string().trim().min(5, "Give the post a title (at least 5 characters).").max(140),
  slug: z.string().trim().min(3, "Set a URL slug.").max(80).regex(SLUG_RE, "Lowercase letters, numbers and single hyphens only."),
  seoTitle: z.string().trim().max(90, "Keep the title tag under 90 characters (60 shows in full)."),
  description: z.string().trim().max(300),
  excerpt: z.string().trim().max(400),
  focusKeyword: z.string().trim().max(100),
  tags: z.array(z.string().trim().min(1).max(40)).max(10, "Use up to 10 tags."),
  content: z.string().max(100_000),
  faqs: z.array(z.object({ q: z.string().trim().max(300), a: z.string().trim().max(2000) })).max(12),
  author: z.object({
    name: z.string().trim().max(100),
    role: z.string().trim().max(100),
    url: optionalUrl,
    bio: z.string().trim().max(600),
  }),
  noindex: z.boolean(),
  canonicalUrl: optionalUrl,
  publishedAt: z.iso.datetime({ offset: true, error: "Pick a valid publish date." }).nullable(),
});

export type PostInput = z.input<typeof postInput>;
export type SaveResult = { ok: true; message: string; post: Post } | { ok: false; message: string; fieldErrors?: Record<string, string> };

const NOT_DURABLE =
  "Saving is switched off: this server stores posts on a disk that's wiped on every deploy. Add a Postgres database on Railway (it sets DATABASE_URL) and redeploy.";

export async function savePost(raw: PostInput): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, message: "Your session has ended. Sign in again in a new tab, then save." };
  if (!storageInfo().durable) return { ok: false, message: NOT_DURABLE };

  const parsed = postInput.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // Publishing ships a page to search: it needs a description and a body.
  if (data.status === "published") {
    const missing: Record<string, string> = {};
    if (!data.description) missing.description = "Add a meta description before publishing.";
    if (data.content.trim().length < 200) missing.content = "Write the post before publishing (at least a few paragraphs).";
    if (Object.keys(missing).length) return { ok: false, message: "Not ready to publish yet.", fieldErrors: missing };
  }

  const all = await readAllPosts();
  const existing = data.id ? all.find((p) => p.id === data.id) : undefined;
  if (data.id && !existing) return { ok: false, message: "This post no longer exists — it may have been deleted." };
  const clash = all.find((p) => p.id !== existing?.id && (p.slug === data.slug || p.previousSlugs.includes(data.slug)));
  if (clash) return { ok: false, message: "That URL is taken.", fieldErrors: { slug: `“${clash.title}” already uses /blog/${data.slug}.` } };

  const now = new Date().toISOString();
  const publishedAt = data.publishedAt ? new Date(data.publishedAt).toISOString() : data.status === "published" ? now : null;

  // A published post that changes URL keeps its old one as a permanent redirect.
  const previousSlugs = (existing?.previousSlugs ?? []).filter((s) => s !== data.slug);
  if (existing && existing.status === "published" && existing.slug !== data.slug && !previousSlugs.includes(existing.slug)) {
    previousSlugs.push(existing.slug);
  }

  const post: Post = {
    ...data,
    id: existing?.id ?? randomUUID(),
    tags: [...new Map(data.tags.map((t) => [t.toLowerCase(), t])).values()],
    faqs: data.faqs.filter((f) => f.q && f.a),
    previousSlugs,
    publishedAt,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  await writePost(post);

  const live = isLive(post, Date.now());
  if (live && !post.noindex) after(() => pingIndexNow([postPath(post.slug), "/blog"]));
  const message =
    post.status === "draft" ? "Draft saved." : live ? "Published — the post is live." : `Scheduled for ${new Date(post.publishedAt!).toLocaleString("en-GB")}.`;
  return { ok: true, message, post };
}

export async function deletePost(id: string): Promise<{ ok: boolean; message: string }> {
  if (!(await isAdmin())) return { ok: false, message: "Your session has ended. Sign in again." };
  if (!storageInfo().durable) return { ok: false, message: NOT_DURABLE };
  await removePost(id);
  return { ok: true, message: "Post deleted." };
}
