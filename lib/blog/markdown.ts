import { Marked, type Token, type Tokens } from "marked";
import { PRODUCTION_URL, site } from "@/content/site";
import { slugify } from "@/lib/blog/post";

/**
 * Markdown for blog posts — the same code renders the public page and the
 * admin preview, so what the editor shows is what ships. Raw HTML is escaped,
 * links and images are limited to web / mail / phone URLs, and headings get
 * stable ids for the table of contents. The post title is the page's only H1,
 * so `#` in the body renders as an H2.
 */

export type TocItem = { id: string; text: string; depth: 2 | 3 };

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Links may go to the web, email, phone or this site; images to the web or this site. Anything else (javascript:, data:) is dropped. */
function safeUrl(href: string, image = false) {
  const url = href.trim();
  if (/^(\/(?!\/)|#)/.test(url) || /^https?:\/\//i.test(url)) return url;
  if (!image && /^(mailto|tel):/i.test(url)) return url;
  return null;
}

const OWN_ORIGINS = [PRODUCTION_URL, site.url, PRODUCTION_URL.replace("://www.", "://")];

/** A link to this site (relative, or absolute on our own domain). */
export function isInternalHref(href: string) {
  const url = href.trim();
  return /^\/(?!\/)/.test(url) || url.startsWith("#") || OWN_ORIGINS.some((o) => url === o || url.startsWith(`${o}/`));
}

export function renderMarkdown(md: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const level = Math.min(Math.max(depth, 2), 4);
        const text = this.parser.parseInline(tokens, this.parser.textRenderer).replace(/&amp;/g, "&");
        const base = slugify(text) || "section";
        const n = (seen.get(base) ?? 0) + 1;
        seen.set(base, n);
        const id = n > 1 ? `${base}-${n}` : base;
        if (level <= 3) toc.push({ id, text, depth: level as 2 | 3 });
        return `<h${level} id="${id}">${this.parser.parseInline(tokens)}</h${level}>\n`;
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return escapeHtml(text);
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const url = safeUrl(href);
        if (!url) return inner;
        const external = /^https?:\/\//i.test(url) && !isInternalHref(url);
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
        return `<a href="${escapeHtml(url)}"${titleAttr}${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const url = safeUrl(href, true);
        if (!url) return escapeHtml(text);
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
        return `<img src="${escapeHtml(url)}" alt="${escapeHtml(text)}"${titleAttr} loading="lazy" decoding="async">`;
      },
    },
  });
  return { html: marked.parse(md, { async: false }), toc };
}

/** What the SEO checks need to know about a body: its prose, headings, links and images. */
export type MarkdownStats = {
  text: string;
  words: number;
  /** The first paragraph's text (the intro the focus keyword should appear in). */
  intro: string;
  headings: { depth: number; text: string }[];
  links: { href: string; text: string }[];
  images: { src: string; alt: string }[];
  sentences: number;
};

export function analyzeMarkdown(md: string): MarkdownStats {
  const tokens = new Marked({ gfm: true }).lexer(md);
  const headings: MarkdownStats["headings"] = [];
  const links: MarkdownStats["links"] = [];
  const images: MarkdownStats["images"] = [];
  const blocks: string[] = [];
  let intro = "";

  /** Plain text of inline tokens, recording links and images on the way. */
  const inline = (list: Token[] | undefined): string =>
    (list ?? [])
      .map((t) => {
        if (t.type === "link") {
          const text = inline((t as Tokens.Link).tokens);
          links.push({ href: (t as Tokens.Link).href, text });
          return text;
        }
        if (t.type === "image") {
          images.push({ src: (t as Tokens.Image).href, alt: (t as Tokens.Image).text.trim() });
          return "";
        }
        if (t.type === "html") return "";
        if (t.type === "br") return " ";
        if ("tokens" in t && Array.isArray(t.tokens)) return inline(t.tokens);
        return "text" in t && typeof t.text === "string" ? t.text : "";
      })
      .join("");

  const block = (t: Token) => {
    switch (t.type) {
      case "heading": {
        const text = inline((t as Tokens.Heading).tokens);
        headings.push({ depth: (t as Tokens.Heading).depth, text });
        blocks.push(text);
        break;
      }
      case "paragraph": {
        const text = inline((t as Tokens.Paragraph).tokens);
        if (!intro && text.trim()) intro = text;
        blocks.push(text);
        break;
      }
      case "list":
        for (const item of (t as Tokens.List).items) item.tokens.forEach(block);
        break;
      case "blockquote":
        (t as Tokens.Blockquote).tokens.forEach(block);
        break;
      case "table": {
        const table = t as Tokens.Table;
        for (const cell of [...table.header, ...table.rows.flat()]) blocks.push(inline(cell.tokens));
        break;
      }
      case "text":
        blocks.push("tokens" in t && t.tokens ? inline(t.tokens) : (t as Tokens.Text).text);
        break;
      default:
        // Code blocks, rules and raw HTML aren't prose.
        break;
    }
  };
  tokens.forEach(block);

  const text = blocks.join("\n").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
  const sentences = Math.max(1, (text.match(/[.!?](\s|$)/g) ?? []).length);
  return { text, words, intro, headings, links, images, sentences };
}
