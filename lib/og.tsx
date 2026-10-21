import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card: cool off-white, hairline rays, logo-blue glow, the Avantra mark + name. */
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
            background: "radial-gradient(circle at 88% 20%, rgba(29,88,196,0.3) 0%, rgba(29,88,196,0) 48%)",
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
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#2c3a52" }}>
          <svg width="56" height="56" viewBox="0 0 240 240">
            <rect width="240" height="240" fill="#003FA9" />
            <path d="M120 22 234 224 134.5 178.5V151H157.5L120 101 82.5 151H105.5V178.5L6 224Z" fill="#fff" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>Avantra</span>
            <span style={{ fontSize: 30 }}>Technologies</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#003fa9", display: "flex" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: -2, color: "#172033", display: "flex" }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
