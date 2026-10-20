import { ogSize, renderOg } from "@/lib/og";

export const alt = "Blugig Global — Workflow, data & AI consulting";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Workflow, data & AI consulting", title: "Turn complexity into a competitive advantage." });
}
