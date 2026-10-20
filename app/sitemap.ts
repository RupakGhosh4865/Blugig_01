import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p),
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
