import { ArrowRight, Clock, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { blog } from "@/content/blog";
import { analyzeMarkdown } from "@/lib/blog/markdown";
import { formatDate, postExcerpt, postPath, readingMinutes } from "@/lib/blog/post";
import { blogIndexIndexable, getLivePosts } from "@/lib/blog/queries";
import { pageMetadata } from "@/lib/seo";

/** The list changes whenever a post is published, so it renders per request, in full. */
export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getLivePosts();
  const base = pageMetadata({
    title: "Blog | Avantra Technologies",
    description: "Practical writing on Mitti rollouts, digital inspections and Workato integrations from Avantra Technologies.",
    path: "/blog",
  });
  return {
    ...base,
    alternates: { canonical: "/blog", types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Avantra Technologies blog" }] } },
    // Until there are a few posts the list is thin, so it stays out of search (each post is indexed on its own).
    ...(blogIndexIndexable(posts) ? {} : { robots: { index: false, follow: true } }),
  };
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default async function BlogPage() {
  const posts = await getLivePosts();
  const leadCount = blog.titleLead.split(/\s+/).length;
  return (
    <section className="relative isolate overflow-hidden">
      <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="shell flex flex-col gap-14 pt-32 pb-[clamp(4.5rem,8vw,6.25rem)]">
        <div className="flex flex-col gap-6">
          <Chip icon={Newspaper} className="enter-fade">
            {blog.chip}
          </Chip>
          <h1 className="title-xl max-w-[56rem]">
            <SplitWords text={blog.titleLead} />{" "}
            <SplitWords text={blog.titleAccent} offset={leadCount} wordClassName="text-grad" />
          </h1>
          <p className="enter-fade text-l max-w-[36rem]" style={d(0.5)}>
            {blog.sub}
          </p>
        </div>

        {posts.length ? (
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <li key={post.id} className="enter-fade" style={d(0.6 + Math.min(i, 5) * 0.06)}>
                <Link href={postPath(post.slug)} className="group flex h-full flex-col gap-4 rounded-[1.5rem] bg-white p-7 transition-shadow hover:shadow-[0_24px_48px_-28px_rgba(4,28,66,0.35)]">
                  {post.tags[0] ? <span className="eyebrow text-blue-700">{post.tags[0]}</span> : null}
                  <h2 className="title-s group-hover:text-blue-700">{post.title}</h2>
                  <p className="text-m line-clamp-3 text-gray-600">{postExcerpt(post)}</p>
                  <p className="text-s mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-gray-500">
                    <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt!)}</time>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1">
                      <Clock aria-hidden className="size-4" /> {readingMinutes(analyzeMarkdown(post.content).words)} min read
                    </span>
                    <ArrowRight aria-hidden className="ml-auto size-5 text-blue-700 transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="enter-fade flex flex-col gap-6 rounded-[1.5rem] bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            style={d(0.7)}
          >
            <div className="flex flex-col gap-2">
              <h2 className="title-s">{blog.empty.title}</h2>
              <p className="text-m text-gray-600">{blog.empty.body}</p>
            </div>
            <ButtonLink href={blog.empty.cta.href} className="w-fit shrink-0">
              {blog.empty.cta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
