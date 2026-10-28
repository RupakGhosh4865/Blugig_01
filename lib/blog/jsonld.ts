import { site } from "@/content/site";
import { analyzeMarkdown } from "@/lib/blog/markdown";
import { type Post, postImagePath, postPath } from "@/lib/blog/post";
import { absoluteUrl } from "@/lib/seo";

/** True when the byline is a person rather than the company (company bylines point at the Organization node). */
export function hasPersonAuthor(post: Post) {
  const name = post.author.name.trim();
  return name !== "" && name.toLowerCase() !== site.name.toLowerCase() && name.toLowerCase() !== site.shortName.toLowerCase();
}

/** BlogPosting structured data: headline, dates, author, publisher (the site's Organization), image, keywords. */
export function blogPostingJsonLd(post: Post) {
  const url = absoluteUrl(postPath(post.slug));
  const author = hasPersonAuthor(post)
    ? {
        "@type": "Person",
        name: post.author.name,
        ...(post.author.role ? { jobTitle: post.author.role } : {}),
        ...(post.author.url ? { url: post.author.url, sameAs: [post.author.url] } : {}),
        worksFor: { "@id": absoluteUrl("/#organization") },
      }
    : { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: site.name, url: absoluteUrl("/") };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title.slice(0, 110),
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl(postImagePath(post.slug))],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author,
    publisher: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
    inLanguage: "en",
    wordCount: analyzeMarkdown(post.content).words,
    ...(post.tags.length ? { keywords: post.tags.join(", "), articleSection: post.tags[0] } : {}),
  };
}
