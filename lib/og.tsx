import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card: warm off-white, zig-style hairline rays, yellow glow, wordmark. */
export function renderOg({ eyebrow, title, accent = "#f5c030" }: { eyebrow: string; title: string; accent?: string }) {
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
          background: "#f5f4ee",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -220,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent}55, transparent 65%)`,
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
            border: "1.5px solid #b5b2a8",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 700, color: "#15171a" }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, background: "#f5c030", display: "flex" }} />
          BLUGIG
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#57554d", display: "flex" }}>{eyebrow}</div>
          <div style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: -2, color: "#15171a", display: "flex" }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
