import { ogSize, renderOg } from "@/lib/og";

export const alt = "Avantra Technologies — Mitti implementation partner";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Mitti implementation partner", title: "Turn everyday checks into better operations." });
}
