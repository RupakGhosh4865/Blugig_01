import { mulberry32 } from "@/lib/prng";
import { getShape, getShapeTint, type ShapeName } from "@/lib/three/shapes";
import { cn } from "@/lib/utils";

/** x, y, radius, opacity in the -100..100 viewBox, and an optional fill (else the poster colour). */
type Dot = [number, number, number, number, string?];

/** Shapes whose poster is their own dotted silhouette; the rest keep the generic dotted globe. */
const OWN_POSTER: ReadonlySet<ShapeName> = new Set(["mitti", "gear", "orbit", "hub"]);

/**
 * Static fallback for every 3D surface (reduced motion, save-data, no WebGL,
 * low-end phones) and the placeholder underneath the canvas while it loads.
 * Deterministic dots — renders server-side, zero JS.
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
  const dots =
    shape === "wave" ? waveDots() : OWN_POSTER.has(shape) ? shapeDots(shape) : sphereDots(shape === "scatter" ? 0.95 : 0.62);
  return (
    <svg
      viewBox="-100 -100 200 200"
      preserveAspectRatio={shape === "wave" ? "none" : "xMidYMid meet"}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden
    >
      {dots.map(([x, y, r, o, fill], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={fill ?? color} opacity={o} />
      ))}
    </svg>
  );
}

/** The shape itself seen head-on, at roughly the canvas's framing; tinted points take the brand gradient. */
function shapeDots(shape: ShapeName) {
  const n = 640;
  const pos = getShape(shape, n);
  const tint = getShapeTint(shape, n);
  const out: Dot[] = [];
  for (let i = 0; i < n; i++) {
    const depth = (pos[i * 3 + 2] + 1) / 2;
    out.push([
      +(pos[i * 3] * 78).toFixed(2),
      +(-pos[i * 3 + 1] * 78).toFixed(2),
      +(0.55 + depth * 0.6).toFixed(2),
      +(0.25 + depth * 0.55).toFixed(2),
      tint && tint[i] >= 0 ? tintColor(tint[i]) : undefined,
    ]);
  }
  return out;
}

/** The Mitti swoosh gradient — keep in step with tintGradient in components/three/shaders.ts. */
function tintColor(t: number) {
  const stops = [
    [110, 102, 232],
    [1, 209, 255],
    [245, 217, 138],
    [255, 203, 15],
  ];
  const smooth = (a: number, b: number) => {
    const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
    return x * x * (3 - 2 * x);
  };
  const mix = (c: number[], d: number[], k: number) => c.map((v, i) => v + (d[i] - v) * k);
  let c = mix(stops[0], stops[1], smooth(0.12, 0.42));
  c = mix(c, stops[2], smooth(0.42, 0.69));
  c = mix(c, stops[3], smooth(0.69, 1));
  return `rgb(${c.map(Math.round).join(",")})`;
}

function sphereDots(scale: number) {
  const out: Dot[] = [];
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
  const out: Dot[] = [];
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
