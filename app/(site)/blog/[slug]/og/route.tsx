import { findLivePost } from "@/lib/blog/queries";
import { renderOg } from "@/lib/og";

/**
 * A post's share card with its own title, at a stable URL (/blog/<slug>/og) that the
 * page's og:image and its BlogPosting structured data both point at. Cached for an hour,
 * so a retitled post gets a fresh card soon after.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const found = await findLivePost((await params).slug);
  if (!found || "movedTo" in found) return new Response("Not found", { status: 404 });
  return renderOg({ eyebrow: "Avantra blog", title: found.post.title }, { "Cache-Control": "public, max-age=3600" });
}
