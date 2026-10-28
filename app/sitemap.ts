import type { MetadataRoute } from "next";
import { postPath } from "@/lib/blog/post";
import { blogIndexIndexable, getLivePosts, indexable } from "@/lib/blog/queries";
import { absoluteUrl } from "@/lib/seo";

/** Site pages, plus every indexable blog post (with its real last-edited date) and /blog once it's indexable. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/solutions", "/services", "/integrations", "/how-we-work", "/about", "/contact", "/privacy", "/terms"];
  const posts = await getLivePosts();
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p),
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : 0.8,
    })),
    ...(blogIndexIndexable(posts)
      ? [{ url: absoluteUrl("/blog"), lastModified: posts[0].updatedAt, changeFrequency: "weekly" as const, priority: 0.6 }]
      : []),
    ...indexable(posts).map((p) => ({ url: absoluteUrl(postPath(p.slug)), lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
