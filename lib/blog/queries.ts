import { connection } from "next/server";
import { cache } from "react";
import { isLive, MIN_POSTS_TO_INDEX, type Post } from "@/lib/blog/post";
import { readAllPosts } from "@/lib/blog/store";

/**
 * What the public site reads. Every query runs at request time (`connection()`):
 * posts change without a deploy, and the build can't reach Railway's private
 * database. Reads are one small query or a few file reads, shared by a page and
 * its metadata within a request (`cache`).
 */

const newestFirst = (a: Post, b: Post) => Date.parse(b.publishedAt ?? b.updatedAt) - Date.parse(a.publishedAt ?? a.updatedAt);

/** Live posts (published, publish time reached), newest first. */
export const getLivePosts = cache(async (): Promise<Post[]> => {
  await connection();
  const now = Date.now();
  return (await readAllPosts()).filter((p) => isLive(p, now)).sort(newestFirst);
});

/** The live post at a slug, or where it moved to (a slug it used to have), or nothing. */
export async function findLivePost(slug: string): Promise<{ post: Post; others: Post[] } | { movedTo: string } | null> {
  const posts = await getLivePosts();
  const post = posts.find((p) => p.slug === slug);
  if (post) return { post, others: posts.filter((p) => p !== post) };
  const moved = posts.find((p) => p.previousSlugs.includes(slug));
  return moved ? { movedTo: moved.slug } : null;
}

/** Live posts search engines may index (sitemap, RSS, index-page count). */
export function indexable(posts: Post[]) {
  return posts.filter((p) => !p.noindex && !p.canonicalUrl);
}

/** The blog index joins search once it has enough posts to be useful on its own. */
export function blogIndexIndexable(posts: Post[]) {
  return indexable(posts).length >= MIN_POSTS_TO_INDEX;
}

/** Up to `limit` other posts, sharing the most tags first, then newest. */
export function relatedPosts(post: Post, others: Post[], limit = 3) {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return others
    .map((p) => ({ p, shared: p.tags.filter((t) => tags.has(t.toLowerCase())).length }))
    .sort((a, b) => b.shared - a.shared || newestFirst(a.p, b.p))
    .slice(0, limit)
    .map((x) => x.p);
}
