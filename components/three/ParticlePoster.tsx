import { mulberry32 } from "@/lib/prng";
import type { ShapeName } from "@/lib/three/shapes";
import { cn } from "@/lib/utils";

/**
 * Static fallback for every 3D surface (reduced motion, save-data, no WebGL,
 * low-end phones) and the placeholder underneath the canvas while it loads.
 * A deterministic dotted sphere — renders server-side, zero JS.
 */
export function ParticlePoster({
  shape,
  color,
  className,
}: {
  shape: ShapeName;
  color: string;
  className?: string;
}) {
  const dots = shape === "wave" ? waveDots() : sphereDots(shape === "scatter" ? 0.95 : 0.62);
  return (
    <svg
      viewBox="-100 -100 200 200"
      preserveAspectRatio={shape === "wave" ? "none" : "xMidYMid meet"}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden
    >
      {dots.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o} />
      ))}
    </svg>
  );
}

function sphereDots(scale: number) {
  const out: [number, number, number, number][] = [];
  const n = 520;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = golden * i;
    const x = Math.cos(t) * rad;
    const z = Math.sin(t) * rad;
    // simple tilt so the poster reads as a globe
    const ty = y * 0.94 - z * 0.34;
    const tz = y * 0.34 + z * 0.94;
    const depth = (tz + 1) / 2;
    out.push([
      +(x * 100 * scale).toFixed(2),
      +(-ty * 100 * scale).toFixed(2),
      +(0.5 + depth * 0.7).toFixed(2),
      +(0.15 + depth * 0.6).toFixed(2),
    ]);
  }
  return out;
}

function waveDots() {
  const out: [number, number, number, number][] = [];
  const rand = mulberry32(5);
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 48; c++) {
      const x = -100 + (c / 47) * 200;
      const y = -30 + r * 5 + Math.sin(c * 0.35 + r * 0.6) * 8;
      out.push([+x.toFixed(2), +y.toFixed(2), 0.7, +(0.12 + rand() * 0.25).toFixed(2)]);
    }
  }
  return out;
}
