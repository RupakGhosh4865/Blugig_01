import { ArrowRight, Clock, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { Chip } from "@/components/ui/Chip";
import { site } from "@/content/site";
import { blogPostingJsonLd, hasPersonAuthor } from "@/lib/blog/jsonld";
import { analyzeMarkdown, renderMarkdown } from "@/lib/blog/markdown";
import { formatDate, postExcerpt, postImagePath, postPath, postTitleTag, readingMinutes } from "@/lib/blog/post";
import { findLivePost, relatedPosts } from "@/lib/blog/queries";
import { breadcrumbJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";

/**
 * A post renders per request with no static fallback. Crawlers (htmlLimitedBots in
 * next.config.ts) get it in full before the response starts: the article, a real 404
 * for unknown slugs and a 308 from old slugs, with the metadata in <head>.
 */
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await findLivePost((await params).slug);
  if (!found || "movedTo" in found) return {};
  const { post } = found;
  const path = postPath(post.slug);
  return {
    title: { absolute: postTitleTag(post) },
    description: post.description,
    alternates: { canonical: post.canonicalUrl || path },
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    authors: [{ name: post.author.name, ...(post.author.url ? { url: post.author.url } : {}) }],
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: postImagePath(post.slug), width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const found = await findLivePost(slug);
  if (!found) notFound();
  if ("movedTo" in found) permanentRedirect(postPath(found.movedTo));

  const { post, others } = found;
  const { html, toc } = renderMarkdown(post.content);
  const minutes = readingMinutes(analyzeMarkdown(post.content).words);
  const related = relatedPosts(post, others);
  const updated = post.publishedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10);
  const person = hasPersonAuthor(post);

  return (
    <>
      <article className="pt-32">
        <header className="shell pb-10">
          <div className="flex max-w-[60rem] flex-col gap-6">
            <nav aria-label="Breadcrumb" className="text-s text-gray-600">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-blue-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-blue-700">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="line-clamp-1 text-gray-500">
                  {post.title}
                </li>
              </ol>
            </nav>
            {post.tags[0] ? <Chip icon={Newspaper}>{post.tags[0]}</Chip> : null}
            <h1 className="title-l text-balance">{post.title}</h1>
            <p className="text-l max-w-[46rem] text-gray-700">{postExcerpt(post)}</p>
            <p className="text-s flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600">
              <span>
                By{" "}
                {person && post.author.url ? (
                  <a href={post.author.url} rel="author noopener" target="_blank" className="font-medium text-ink hover:text-blue-700">
                    {post.author.name}
                  </a>
                ) : (
                  <span className="font-medium text-ink">{post.author.name}</span>
                )}
                {post.author.role ? `, ${post.author.role}` : ""}
              </span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt!)}</time>
              {updated ? (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1">
                <Clock aria-hidden className="size-4" /> {minutes} min read
              </span>
            </p>
          </div>
        </header>

        <div className="shell grid gap-10 pb-[clamp(4rem,7vw,6rem)] lg:grid-cols-[minmax(0,46rem)_16rem] lg:justify-between">
          <div className="flex min-w-0 flex-col gap-12">
            {toc.length >= 3 ? (
              <details className="rounded-2xl bg-white p-5 lg:hidden">
                <summary className="cursor-pointer font-medium">On this page</summary>
                <TocList items={toc} className="mt-3" />
              </details>
            ) : null}

            <div className="prose-blog rounded-[1.5rem] bg-white p-6 sm:p-10" dangerouslySetInnerHTML={{ __html: html }} />

            {post.faqs.length ? (
              <section aria-labelledby="faqs" className="flex flex-col gap-6">
                <h2 id="faqs" className="title-m">
                  Frequently asked questions
                </h2>
                <dl className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
                  {post.faqs.map((f) => (
                    <div key={f.q} className="flex flex-col gap-2 py-6">
                      <dt className="title-xs">{f.q}</dt>
                      <dd className="text-m text-gray-700">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <aside aria-label="About the author" className="flex flex-col gap-2 rounded-2xl bg-white p-6">
              <p className="eyebrow text-gray-500">Written by</p>
              <p className="title-xs">
                {post.author.name}
                {post.author.role ? <span className="font-normal text-gray-600"> · {post.author.role}</span> : null}
              </p>
              <p className="text-s text-gray-700">
                {post.author.bio ||
                  (person
                    ? `${post.author.name} works on Mitti rollouts at ${site.name}.`
                    : `${site.name} is a Mitti implementation partner in Bengaluru, helping operations teams plan, configure and roll out Mitti, and connect it to the systems they already run.`)}
              </p>
              {person && post.author.url ? (
                <a href={post.author.url} target="_blank" rel="author noopener" className="text-s w-fit text-blue-700 hover:underline">
                  Profile
                </a>
              ) : (
                <Link href="/about" className="text-s w-fit text-blue-700 hover:underline">
                  About {site.shortName}
                </Link>
              )}
            </aside>
          </div>

          {toc.length >= 3 ? (
            <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <p className="eyebrow mb-3 text-gray-500">On this page</p>
              <TocList items={toc} />
            </nav>
          ) : null}
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related" className="pb-[clamp(4rem,7vw,6rem)]">
          <div className="shell flex flex-col gap-6">
            <h2 id="related" className="title-m">
              Keep reading
            </h2>
            <ul className="grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <Link href={postPath(p.slug)} className="group flex h-full flex-col gap-3 rounded-2xl bg-white p-6">
                    <span className="title-xs group-hover:text-blue-700">{p.title}</span>
                    <span className="text-s line-clamp-3 text-gray-600">{postExcerpt(p)}</span>
                    <span className="text-s mt-auto flex items-center gap-1 text-blue-700">
                      Read <ArrowRight aria-hidden className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand title="Planning or tightening a Mitti rollout?" secondary={{ label: "Our services", href: "/services" }} />

      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: postPath(post.slug) },
        ])}
      />
      {post.faqs.length ? <JsonLd data={faqJsonLd(post.faqs)} /> : null}
    </>
  );
}

function TocList({ items, className }: { items: { id: string; text: string; depth: 2 | 3 }[]; className?: string }) {
  return (
    <ol className={`flex flex-col gap-2 border-l border-gray-200 text-sm ${className ?? ""}`}>
      {items.map((t) => (
        <li key={t.id} className={t.depth === 3 ? "pl-7" : "pl-4"}>
          <a href={`#${t.id}`} className="text-gray-600 transition-colors hover:text-blue-700">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
