import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Full Avantra lockup (with tagline), embedded so the card renders without network access. */
const LOGO = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/avantra-logo.png")).toString("base64")}`;

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card: cool off-white, hairline ring, logo-blue glow, the Avantra lockup. */
export function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f4f6fa",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            background: "radial-gradient(circle at 88% 20%, rgba(10,128,251,0.3) 0%, rgba(10,128,251,0) 48%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 115,
            width: 400,
            height: 400,
            borderRadius: 9999,
            border: "1.5px solid #b4bdcc",
            display: "flex",
          }}
        />
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={LOGO} width={406} height={100} alt="Avantra — Smarter operations. Safer teams." />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#0a80fb", display: "flex" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: -2, color: "#0b1a36", display: "flex" }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
