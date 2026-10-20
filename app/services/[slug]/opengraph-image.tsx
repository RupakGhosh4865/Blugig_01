import { getService, services } from "@/content/services";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Blugig Global service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOg({
    eyebrow: service ? `${service.number} / Service` : "Service",
    title: service?.title ?? "Blugig Global",
    accent: service?.accent,
  });
}
