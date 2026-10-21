import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/solutions", "/services", "/how-we-work", "/about", "/contact", "/privacy", "/terms"];
  return pages.map((p) => ({
    url: absoluteUrl(p),
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : 0.8,
  }));
}
