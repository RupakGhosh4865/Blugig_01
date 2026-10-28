import { site } from "@/content/site";
import { postExcerpt, postPath } from "@/lib/blog/post";
import { getLivePosts, indexable } from "@/lib/blog/queries";
import { absoluteUrl } from "@/lib/seo";

const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of the 20 newest indexable posts (feed readers, aggregators and some AI crawlers pick posts up from it). */
export async function GET() {
  const posts = indexable(await getLivePosts()).slice(0, 20);
  const items = posts
    .map((p) => {
      const url = absoluteUrl(postPath(p.slug));
      return `    <item>
      <title>${xml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${xml(postExcerpt(p))}</description>
      <pubDate>${new Date(p.publishedAt!).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${xml(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(`${site.name} blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Practical writing on Mitti rollouts, digital inspections and Workato integrations.</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].updatedAt).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
