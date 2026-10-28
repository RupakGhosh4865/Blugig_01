/** A blog post as stored (Postgres JSONB or a JSON file) and edited in /admin. Pure helpers only: safe on client and server. */
export type PostFaq = { q: string; a: string };

export type PostAuthor = {
  name: string;
  role: string;
  /** Profile URL (LinkedIn or a team bio) — becomes the author's `url` in structured data. */
  url: string;
  bio: string;
};

export type Post = {
  id: string;
  slug: string;
  /** Slugs this post was published under before; /blog/<old> 308s to the current slug. */
  previousSlugs: string[];
  status: "draft" | "published";
  /** The on-page H1. */
  title: string;
  /** The <title> tag; empty → `${title} | Avantra`. */
  seoTitle: string;
  /** Meta description (also the Open Graph / RSS description). */
  description: string;
  /** Card and intro text; empty → the description. */
  excerpt: string;
  /** The search phrase the post is written to rank for (drives the SEO checks). */
  focusKeyword: string;
  tags: string[];
  /** Markdown body. No H1 (the title is the H1); start sections at ##. */
  content: string;
  faqs: PostFaq[];
  author: PostAuthor;
  noindex: boolean;
  /** Only when the post first appeared elsewhere; empty → the post's own URL. */
  canonicalUrl: string;
  /** ISO time it goes (or went) live; a future time schedules it. Null until first published. */
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** What the admin editor works on: everything but the bookkeeping fields, with no id until first saved. */
export type EditablePost = Omit<Post, "id" | "previousSlugs" | "createdAt" | "updatedAt"> & { id: string | null };

export function toEditable(p: Post): EditablePost {
  return {
    id: p.id,
    status: p.status,
    title: p.title,
    slug: p.slug,
    seoTitle: p.seoTitle,
    description: p.description,
    excerpt: p.excerpt,
    focusKeyword: p.focusKeyword,
    tags: p.tags,
    content: p.content,
    faqs: p.faqs,
    author: p.author,
    noindex: p.noindex,
    canonicalUrl: p.canonicalUrl,
    publishedAt: p.publishedAt,
  };
}

/** The blog index stays out of search until it has this many live posts (a one-post index is thin). */
export const MIN_POSTS_TO_INDEX = 3;

/** Default byline: the company, until a named person writes the post (named authors are better for E-E-A-T). */
export const DEFAULT_AUTHOR: PostAuthor = { name: "Avantra Technologies", role: "", url: "", bio: "" };

export const NEW_POST: EditablePost = {
  id: null,
  status: "draft",
  title: "",
  slug: "",
  seoTitle: "",
  description: "",
  excerpt: "",
  focusKeyword: "",
  tags: [],
  content: "",
  faqs: [],
  author: DEFAULT_AUTHOR,
  noindex: false,
  canonicalUrl: "",
  publishedAt: null,
};

export function postPath(slug: string) {
  return `/blog/${slug}`;
}

/** The post's generated share image (app/(site)/blog/[slug]/og). */
export function postImagePath(slug: string) {
  return `/blog/${slug}/og`;
}

/** The <title> the post ships with. */
export function postTitleTag(post: Pick<Post, "title" | "seoTitle">) {
  return post.seoTitle.trim() || `${post.title.trim()} | Avantra`;
}

export function postExcerpt(post: Pick<Post, "excerpt" | "description">) {
  return post.excerpt.trim() || post.description.trim();
}

/** Published and its publish time has come (scheduled posts stay hidden until then). */
export function isLive(post: Pick<Post, "status" | "publishedAt">, now: number) {
  return post.status === "published" && post.publishedAt !== null && Date.parse(post.publishedAt) <= now;
}

export function postState(post: Pick<Post, "status" | "publishedAt">, now: number): "draft" | "scheduled" | "live" {
  if (post.status !== "published") return "draft";
  return isLive(post, now) ? "live" : "scheduled";
}

/** URL-safe slug: lowercase ASCII words joined by hyphens. */
export function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** About 220 words a minute for practical, skimmable writing. */
export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}
