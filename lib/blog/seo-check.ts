import { analyzeMarkdown, isInternalHref } from "@/lib/blog/markdown";
import { type Post, postTitleTag, slugify } from "@/lib/blog/post";

/**
 * On-page SEO checks for a post, run live in the editor and on the dashboard.
 * They follow the site's audit: a specific title and description that fit in
 * results, the focus phrase where search engines and readers look first, enough
 * depth, clear H2/H3 structure, internal links into the service pages, a named
 * author, and both product names while buyers search "Mitti" and "SafetyCulture".
 * The score is a writing aid, not a ranking prediction.
 */

export type CheckStatus = "good" | "ok" | "bad";
export type SeoCheck = { id: string; label: string; status: CheckStatus; detail: string; weight: number };
export type SeoReport = { score: number; checks: SeoCheck[]; words: number; titleTag: string };

/** Lowercase words only, so "Mitti's rollout," matches "mitti s rollout". */
const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()} `;

const contains = (haystack: string, phrase: string) => phrase.trim() !== "" && norm(haystack).includes(norm(phrase));

const count = (haystack: string, phrase: string) => {
  const h = norm(haystack);
  const p = norm(phrase);
  if (p.trim() === "") return 0;
  let n = 0;
  for (let i = h.indexOf(p); i !== -1; i = h.indexOf(p, i + p.length - 1)) n++;
  return n;
};

export function analyzePost(
  post: Pick<Post, "title" | "seoTitle" | "description" | "slug" | "focusKeyword" | "content" | "author" | "faqs" | "tags">,
): SeoReport {
  const md = analyzeMarkdown(post.content);
  const kw = post.focusKeyword.trim();
  const titleTag = postTitleTag(post);
  const desc = post.description.trim();
  const checks: SeoCheck[] = [];
  const add = (id: string, weight: number, label: string, status: CheckStatus, detail: string) =>
    checks.push({ id, weight, label, status, detail });

  add(
    "keyword",
    5,
    "Focus keyword",
    kw ? "good" : "bad",
    kw ? `Optimising for “${kw}”.` : "Pick the one search phrase this post should rank for (e.g. “mitti rollout plan”).",
  );

  const tl = titleTag.length;
  add(
    "title-length",
    10,
    "Title tag length",
    tl >= 30 && tl <= 60 ? "good" : tl > 60 && tl <= 70 ? "ok" : "bad",
    `${tl} characters. Aim for 30–60 so Google shows it in full.`,
  );

  if (kw) {
    const at = norm(titleTag).indexOf(norm(kw));
    add(
      "title-keyword",
      10,
      "Keyword in the title tag",
      at === -1 ? "bad" : at <= norm(titleTag).length / 2 ? "good" : "ok",
      at === -1 ? "Put the focus keyword in the title tag." : at <= norm(titleTag).length / 2 ? "Near the start — good." : "Move it closer to the start.",
    );
  }

  const dl = desc.length;
  add(
    "description-length",
    10,
    "Meta description length",
    dl >= 120 && dl <= 160 ? "good" : (dl >= 70 && dl < 120) || (dl > 160 && dl <= 180) ? "ok" : "bad",
    dl ? `${dl} characters. Aim for 120–160: who it's for, what they'll learn.` : "Write a meta description (120–160 characters).",
  );
  if (kw) {
    add(
      "description-keyword",
      5,
      "Keyword in the meta description",
      contains(desc, kw) ? "good" : "bad",
      contains(desc, kw) ? "Google bolds matching words in results." : "Use the focus keyword once in the description.",
    );
  }

  const slugWords = post.slug.split("-").filter(Boolean);
  const kwSlug = slugify(kw).split("-").filter(Boolean);
  const slugHasKw = kwSlug.length > 0 && kwSlug.every((w) => slugWords.includes(w));
  const slugShort = post.slug.length > 0 && post.slug.length <= 75 && slugWords.length <= 7;
  add(
    "slug",
    5,
    "URL slug",
    slugShort && (slugHasKw || !kw) ? "good" : slugShort || slugHasKw ? "ok" : "bad",
    !post.slug
      ? "Set a short slug."
      : `/blog/${post.slug} — ${slugShort ? "short" : "too long (keep it under ~7 words)"}${kw ? (slugHasKw ? ", contains the keyword" : ", missing the keyword") : ""}.`,
  );

  if (kw) {
    const introWords = md.intro.split(/\s+/).slice(0, 120).join(" ");
    add(
      "intro-keyword",
      8,
      "Keyword in the introduction",
      contains(introWords, kw) ? "good" : "bad",
      contains(introWords, kw) ? "The first paragraph says what the post is about." : "Use the focus keyword in the first paragraph.",
    );
    const inHeading = md.headings.some((h) => h.depth >= 2 && h.depth <= 3 && contains(h.text, kw));
    add(
      "heading-keyword",
      5,
      "Keyword in a subheading",
      inHeading ? "good" : "ok",
      inHeading ? "An H2/H3 uses the focus keyword." : "Use the keyword (or a close variant) in one H2 or H3.",
    );
    const density = md.words ? (count(md.text, kw) * kw.split(/\s+/).length * 100) / md.words : 0;
    add(
      "density",
      4,
      "Keyword use",
      density >= 0.4 && density <= 2.5 ? "good" : density > 3 ? "bad" : "ok",
      `${density.toFixed(1)}% of words. ${density > 3 ? "Reads as keyword stuffing — use variants." : density < 0.4 ? "Mention it a few more times, naturally." : "Natural."}`,
    );
  }

  add(
    "length",
    10,
    "Content depth",
    md.words >= 800 ? "good" : md.words >= 500 ? "ok" : "bad",
    `${md.words} words. Useful guides on this topic usually need 800+.`,
  );

  const h2 = md.headings.filter((h) => h.depth === 2).length;
  const hasH1 = md.headings.some((h) => h.depth === 1);
  const skips = md.headings.some((h, i) => i > 0 && h.depth > md.headings[i - 1].depth + 1) || (md.headings[0]?.depth ?? 2) > 2;
  add(
    "structure",
    7,
    "Heading structure",
    h2 >= 2 && !hasH1 && !skips ? "good" : h2 >= 1 && !hasH1 ? "ok" : "bad",
    hasH1
      ? "Don't use # (H1) in the body — the title is the H1. Start sections with ##."
      : h2 < 2
        ? `${h2} H2 section${h2 === 1 ? "" : "s"}. Break the post into at least two ## sections.`
        : skips
          ? "A heading skips a level (e.g. ## then ####)."
          : `${h2} H2 sections, levels in order.`,
  );

  const internal = md.links.filter((l) => isInternalHref(l.href)).length;
  add(
    "internal-links",
    8,
    "Internal links",
    internal >= 2 ? "good" : internal === 1 ? "ok" : "bad",
    `${internal} link${internal === 1 ? "" : "s"} to this site. Link 2+ relevant pages (services, integrations, other posts).`,
  );
  const external = md.links.filter((l) => /^https?:\/\//i.test(l.href) && !isInternalHref(l.href)).length;
  add(
    "external-links",
    3,
    "Sources cited",
    external >= 1 ? "good" : "ok",
    external ? `${external} external link${external === 1 ? "" : "s"}.` : "Link at least one authoritative source for facts you cite.",
  );

  const missingAlt = md.images.filter((i) => !i.alt).length;
  add(
    "images",
    3,
    "Image alt text",
    missingAlt ? "bad" : "good",
    md.images.length === 0 ? "No images (optional)." : missingAlt ? `${missingAlt} image${missingAlt === 1 ? "" : "s"} without alt text.` : "Every image has alt text.",
  );

  const perSentence = md.words / md.sentences;
  add(
    "readability",
    4,
    "Sentence length",
    perSentence <= 20 ? "good" : perSentence <= 26 ? "ok" : "bad",
    `${Math.round(perSentence)} words per sentence on average. Under 20 reads easily.`,
  );

  const named = post.author.name.trim() !== "" && !/^avantra/i.test(post.author.name.trim());
  add(
    "author",
    3,
    "Named author",
    named ? "good" : "ok",
    named ? `By ${post.author.name.trim()}.` : "A named expert with a role and profile link builds trust (E-E-A-T).",
  );

  const both = contains(`${post.title} ${post.content}`, "mitti") && contains(`${post.title} ${post.content}`, "safetyculture");
  add(
    "both-names",
    2,
    "Mitti and SafetyCulture",
    both ? "good" : "ok",
    both ? "Mentions both names — buyers still search for either." : "Mention “Mitti (formerly SafetyCulture)” once: buyers search both names.",
  );

  add(
    "faqs",
    2,
    "FAQs",
    post.faqs.filter((f) => f.q.trim() && f.a.trim()).length >= 2 ? "good" : "ok",
    "Two or more short Q&As give AI answers and “People also ask” something to quote.",
  );

  const total = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce((s, c) => s + c.weight * (c.status === "good" ? 1 : c.status === "ok" ? 0.5 : 0), 0);
  return { score: Math.round((earned / total) * 100), checks, words: md.words, titleTag };
}

export function scoreTone(score: number): "good" | "ok" | "bad" {
  return score >= 80 ? "good" : score >= 55 ? "ok" : "bad";
}
