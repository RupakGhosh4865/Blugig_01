import { AlertTriangle, ExternalLink, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminBar } from "@/components/admin/AdminBar";
import { ScorePill } from "@/components/admin/ScorePill";
import { buttonClasses } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate, isLive, MIN_POSTS_TO_INDEX, postPath, postState } from "@/lib/blog/post";
import { analyzePost } from "@/lib/blog/seo-check";
import { readAllPosts, storageInfo } from "@/lib/blog/store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Posts" };

const STATE_STYLE = {
  live: "bg-emerald-50 text-emerald-800",
  scheduled: "bg-blue-50 text-blue-800",
  draft: "bg-gray-100 text-gray-700",
} as const;

/** Every post with its state (live / scheduled / draft) and SEO report, most recently edited first. */
async function loadRows() {
  const now = Date.now();
  const posts = (await readAllPosts()).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  return {
    rows: posts.map((post) => ({ post, state: postState(post, now), report: analyzePost(post) })),
    liveIndexable: posts.filter((p) => isLive(p, now) && !p.noindex && !p.canonicalUrl).length,
  };
}

export default async function AdminPostsPage() {
  await requireAdmin();
  const storage = storageInfo();
  const { rows, liveIndexable } = await loadRows();
  const posts = rows.map((r) => r.post);

  return (
    <>
      <AdminBar />
      <main className="mx-auto flex max-w-[90rem] flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-[-0.03em]">Blog posts</h1>
            <p className="text-s mt-1 text-gray-600">
              {posts.length} post{posts.length === 1 ? "" : "s"} · stored in {storage.label}
            </p>
          </div>
          <Link href="/admin/posts/new" className={buttonClasses("primary", "sm")}>
            <Plus aria-hidden className="size-4" /> New post
          </Link>
        </div>

        {!storage.durable ? (
          <p className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            <AlertTriangle aria-hidden className="size-5 shrink-0" />
            <span>
              Saving is off on this server: posts would live on a disk that&apos;s wiped on every deploy. In Railway, add a{" "}
              <strong>Postgres</strong> database to this project (it sets <code className="font-mono">DATABASE_URL</code>) and redeploy.
              The example post shows on the site meanwhile.
            </span>
          </p>
        ) : null}
        {liveIndexable < MIN_POSTS_TO_INDEX ? (
          <p className="rounded-2xl bg-white p-4 text-sm text-gray-700">
            Each live post is in the sitemap and can rank. The <strong>/blog</strong> index page joins search once {MIN_POSTS_TO_INDEX} posts are
            live ({liveIndexable} so far), so Google doesn&apos;t see a thin list page.
          </p>
        ) : null}

        <div className="overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="border-b border-gray-100 text-xs tracking-wide text-gray-500 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">SEO</th>
                <th className="px-5 py-3 font-medium">Words</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map(({ post, state, report }) => {
                return (
                  <tr key={post.id} className="border-b border-gray-100 last:border-b-0 hover:bg-canvas/60">
                    <td className="px-5 py-4">
                      <Link href={`/admin/posts/${post.id}`} className="font-medium text-ink hover:text-blue-700">
                        {post.title || "Untitled"}
                      </Link>
                      <div className="mt-0.5 font-mono text-xs text-gray-500">/blog/{post.slug}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium capitalize", STATE_STYLE[state])}>{state}</span>
                      {post.noindex ? <span className="ml-1.5 text-xs text-gray-500">noindex</span> : null}
                    </td>
                    <td className="px-5 py-4">
                      <ScorePill score={report.score} />
                    </td>
                    <td className="px-5 py-4 text-gray-700">{report.words.toLocaleString("en-GB")}</td>
                    <td className="px-5 py-4 text-gray-700">{formatDate(post.updatedAt)}</td>
                    <td className="px-5 py-4 text-right">
                      {state === "live" ? (
                        <a
                          href={postPath(post.slug)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                        >
                          View <ExternalLink aria-hidden className="size-3.5" />
                        </a>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-600">
                    No posts yet. <Link href="/admin/posts/new" className="text-blue-700 underline">Write the first one.</Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
