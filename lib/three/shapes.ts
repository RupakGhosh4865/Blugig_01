import { mulberry32 } from "@/lib/prng";

/**
 * Particle target shapes (BUILD_SPEC §6.3). Each returns Float32Array(count * 3)
 * normalised to fit a unit sphere (except `wave` and `scatter`, which are
 * intentionally wider). Deterministic: same name + count → same layout.
 */
export type ShapeName =
  | "globe"
  | "grid"
  | "shield"
  | "mitti"
  | "gear"
  | "orbit"
  | "hub"
  | "bars"
  | "stream"
  | "migrate"
  | "wave"
  | "sphere"
  | "cube"
  | "scatter";

/**
 * Motion beyond the default slow spin. `sway` (radians): a mark that must read
 * the right way round sways within ±sway instead of spinning. `roll` (rad/s):
 * turns about the view axis, like a gear.
 */
export const SHAPE_MOTION: Partial<Record<ShapeName, { sway?: number; roll?: number }>> = {
  mitti: { sway: 0.38 },
  gear: { sway: 0.42, roll: 0.16 },
};

const cache = new Map<string, Float32Array>();
const tints = new Map<string, Float32Array>();

export function getShape(name: ShapeName, count: number): Float32Array {
  const key = `${name}:${count}`;
  let arr = cache.get(key);
  if (!arr) {
    arr = build(name, count, key);
    cache.set(key, arr);
  }
  return arr;
}

/**
 * Per-particle position (0–1) along a shape's brand gradient, −1 for plain
 * particles; null when the shape has no tinted part. Index-aligned with getShape.
 */
export function getShapeTint(name: ShapeName, count: number): Float32Array | null {
  getShape(name, count);
  return tints.get(`${name}:${count}`) ?? null;
}

function build(name: ShapeName, count: number, key: string): Float32Array {
  switch (name) {
    case "globe":
      return normalise(globe(count));
    case "grid":
      return normalise(grid(count));
    case "shield":
      return normalise(shield(count));
    case "mitti": {
      const { pos, tint } = mitti(count);
      tints.set(key, tint);
      return normalise(pos);
    }
    case "gear":
      return normalise(gear(count));
    case "orbit":
      return normalise(orbit(count));
    case "hub":
      return normalise(hub(count));
    case "bars":
      return normalise(bars(count));
    case "stream":
      return normalise(stream(count));
    case "migrate":
    case "cube":
      return normalise(cube(count));
    case "sphere":
      return fibSphere(count, 0.95, 0, count);
    case "wave":
      return wave(count);
    case "scatter":
      return scatter(count);
  }
}

function normalise(a: Float32Array, target = 1) {
  let max = 0;
  for (let i = 0; i < a.length; i += 3) {
    const l = Math.hypot(a[i], a[i + 1], a[i + 2]);
    if (l > max) max = l;
  }
  const k = max > 0 ? target / max : 1;
  for (let i = 0; i < a.length; i++) a[i] *= k;
  return a;
}

function fibSphere(count: number, r: number, offset: number, n: number, out = new Float32Array(count * 3)) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = golden * i;
    const j = (offset + i) * 3;
    out[j] = Math.cos(t) * rad * r;
    out[j + 1] = y * r;
    out[j + 2] = Math.sin(t) * rad * r;
  }
  return out;
}

/** Fibonacci sphere + great-circle arcs between random points ("global network"). */
function globe(count: number) {
  const rand = mulberry32(11);
  const nSphere = Math.floor(count * 0.74);
  const out = fibSphere(count, 1, 0, nSphere);
  const arcs = 9;
  const perArc = Math.floor((count - nSphere) / arcs);
  let idx = nSphere;
  const randUnit = () => {
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(th), u, s * Math.sin(th)] as const;
  };
  for (let a = 0; a < arcs; a++) {
    let p = randUnit();
    let q = randUnit();
    let guard = 0;
    while (p[0] * q[0] + p[1] * q[1] + p[2] * q[2] > 0.6 && guard++ < 20) q = randUnit();
    if (guard >= 20) p = [-q[0], -q[1], -q[2]] as const;
    const omega = Math.acos(Math.min(1, Math.max(-1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2])));
    const so = Math.sin(omega) || 1;
    const n = a === arcs - 1 ? count - idx : perArc;
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(1, n - 1);
      const k0 = Math.sin((1 - t) * omega) / so;
      const k1 = Math.sin(t * omega) / so;
      const lift = 1 + 0.32 * Math.sin(Math.PI * t);
      const j = idx * 3;
      out[j] = (p[0] * k0 + q[0] * k1) * lift + (rand() - 0.5) * 0.01;
      out[j + 1] = (p[1] * k0 + q[1] * k1) * lift + (rand() - 0.5) * 0.01;
      out[j + 2] = (p[2] * k0 + q[2] * k1) * lift + (rand() - 0.5) * 0.01;
      idx++;
    }
  }
  return out;
}

/** Three offset "sheets" whose points resolve into dashboard tiles (Smartsheet). */
function grid(count: number) {
  const rand = mulberry32(21);
  const out = new Float32Array(count * 3);
  const cols = 6;
  const rows = 5;
  const w = 1.7;
  const h = 1.08;
  for (let i = 0; i < count; i++) {
    const sheet = i % 3;
    const cx = Math.floor(rand() * cols);
    const cy = Math.floor(rand() * rows);
    const cw = w / cols;
    const ch = h / rows;
    // header row spans the full width; other rows are tiles with gutters
    const header = cy === rows - 1;
    const x = header ? -w / 2 + rand() * w : -w / 2 + cx * cw + 0.012 + rand() * (cw - 0.024);
    const y = -h / 2 + cy * ch + 0.015 + rand() * (ch - (header ? 0.07 : 0.03));
    const j = i * 3;
    out[j] = x + (sheet - 1) * 0.16;
    out[j + 1] = y + (sheet - 1) * 0.12;
    out[j + 2] = (sheet - 1) * 0.45 + (rand() - 0.5) * 0.015;
  }
  return out;
}

/** Filled shield with a check-mark cut-out and slight depth (SafetyCulture). */
function shield(count: number) {
  const rand = mulberry32(31);
  const out = new Float32Array(count * 3);
  const halfWidth = (y: number) => {
    if (y > 0.9) return -1;
    if (y >= 0.1) return 0.78 - 0.04 * (y - 0.1);
    const t = (0.1 - y) / 1.1; // 0 → 1 towards the tip
    return 0.78 * Math.max(0, 1 - Math.pow(t, 1.7));
  };
  const check: [number, number][] = [
    [-0.36, 0.02],
    [-0.09, -0.27],
    [0.42, 0.33],
  ];
  const distToSeg = (px: number, py: number, a: [number, number], b: [number, number]) => {
    const vx = b[0] - a[0];
    const vy = b[1] - a[1];
    const t = Math.max(0, Math.min(1, ((px - a[0]) * vx + (py - a[1]) * vy) / (vx * vx + vy * vy)));
    return Math.hypot(px - (a[0] + vx * t), py - (a[1] + vy * t));
  };
  let i = 0;
  let guard = 0;
  while (i < count && guard++ < count * 40) {
    const x = (rand() * 2 - 1) * 0.8;
    const y = rand() * 1.9 - 1;
    const hw = halfWidth(y);
    if (hw < 0 || Math.abs(x) > hw) continue;
    const top = 0.9 - 0.06 * x * x;
    if (y > top) continue;
    const d = Math.min(distToSeg(x, y, check[0], check[1]), distToSeg(x, y, check[1], check[2]));
    if (d < 0.075) continue;
    const edge = Math.abs(x) > hw - 0.04 || y > top - 0.04;
    const j = i * 3;
    out[j] = x;
    out[j + 1] = y;
    out[j + 2] = (rand() - 0.5) * (edge ? 0.06 : 0.22);
    i++;
  }
  return out;
}

/** Mitti mark outlines, traced from the 512px favicon (px, y down; the mark is centred on 256). */
const MITTI_M: [number, number][] = [
  [183, 112], [238, 112], [244, 116], [274, 252], [278, 248], [353, 113], [413, 112], [420, 117], [422, 121],
  [422, 128], [389, 311], [385, 324], [379, 330], [372, 333], [327, 333], [324, 330], [341, 239], [348, 212],
  [347, 210], [289, 321], [281, 329], [271, 333], [231, 332], [227, 326], [215, 209], [213, 211], [192, 305],
  [186, 324], [180, 330], [172, 333], [135, 333], [132, 330], [169, 125], [176, 115],
];
const MITTI_SWOOSH: [number, number][] = [
  [125, 358], [384, 358], [385, 362], [381, 371], [374, 377], [368, 379], [89, 399], [91, 387], [99, 373], [109, 364],
];

/** Even-odd point-in-polygon test. */
function inPolygon(poly: [number, number][], x: number, y: number) {
  let hit = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    const [xa, ya] = poly[a];
    const [xb, yb] = poly[b];
    if (ya > y !== yb > y && x < ((xb - xa) * (y - ya)) / (yb - ya) + xa) hit = !hit;
  }
  return hit;
}

function distToOutline(poly: [number, number][], x: number, y: number) {
  let min = Infinity;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    const [sx, sy] = poly[b];
    const vx = poly[a][0] - sx;
    const vy = poly[a][1] - sy;
    const t = Math.max(0, Math.min(1, ((x - sx) * vx + (y - sy) * vy) / (vx * vx + vy * vy)));
    min = Math.min(min, Math.hypot(x - (sx + vx * t), y - (sy + vy * t)));
  }
  return min;
}

/**
 * The Mitti mark: a filled italic M over its swoosh, with slight depth. Swoosh
 * particles carry their left → right position as a tint, so the shader can
 * paint the brand gradient across it.
 */
function mitti(count: number) {
  const rand = mulberry32(91);
  const pos = new Float32Array(count * 3);
  const tint = new Float32Array(count).fill(-1);
  const local = ([x, y]: [number, number]): [number, number] => [(x - 256) / 170, (256 - y) / 170];
  const m = MITTI_M.map(local);
  const swoosh = MITTI_SWOOSH.map(local);
  const sx = swoosh.map(([x]) => x);
  const [x0, x1] = [Math.min(...sx), Math.max(...sx)];
  let i = 0;
  let guard = 0;
  while (i < count && guard++ < count * 40) {
    const x = rand() * 2 - 1;
    const y = rand() * 1.72 - 0.86;
    const inM = inPolygon(m, x, y);
    if (!inM && !inPolygon(swoosh, x, y)) continue;
    const edge = distToOutline(inM ? m : swoosh, x, y) < 0.035;
    const j = i * 3;
    pos[j] = x;
    pos[j + 1] = y;
    pos[j + 2] = (rand() - 0.5) * (edge ? 0.06 : inM ? 0.22 : 0.1);
    if (!inM) tint[i] = (x - x0) / (x1 - x0);
    i++;
  }
  return { pos, tint };
}

/** A ten-tooth gear with a bore and six lightening holes, as a thin solid (Services). */
function gear(count: number) {
  const rand = mulberry32(101);
  const out = new Float32Array(count * 3);
  const teeth = 10;
  const [root, tip, bore, depth] = [0.8, 1, 0.3, 0.13];
  const holes = Array.from({ length: 6 }, (_, k) => [Math.cos((k / 6) * Math.PI * 2) * 0.56, Math.sin((k / 6) * Math.PI * 2) * 0.56]);
  const holeR = 0.11;
  /** Outer radius at angle a: trapezoid teeth, a flat tip over ~30% of the pitch with sloped flanks. */
  const outer = (a: number) => {
    const p = ((((a / (Math.PI * 2)) * teeth) % 1) + 1) % 1;
    const f = p < 0.2 ? 0 : p < 0.32 ? (p - 0.2) / 0.12 : p < 0.62 ? 1 : p < 0.74 ? (0.74 - p) / 0.12 : 0;
    return root + (tip - root) * f;
  };
  const holeDist = (x: number, y: number) => Math.min(...holes.map(([hx, hy]) => Math.hypot(x - hx, y - hy)));
  let i = 0;
  let guard = 0;
  while (i < count && guard++ < count * 40) {
    const x = rand() * 2 - 1;
    const y = rand() * 2 - 1;
    const r = Math.hypot(x, y);
    const R = outer(Math.atan2(y, x));
    const hd = holeDist(x, y);
    if (r > R || r < bore || hd < holeR) continue;
    // Faces carry the interior; points near any edge fill the thickness so the rim reads in profile.
    const edge = R - r < 0.04 || r - bore < 0.04 || hd < holeR + 0.03;
    const j = i * 3;
    out[j] = x;
    out[j + 1] = y;
    out[j + 2] = edge ? (rand() * 2 - 1) * depth : (rand() < 0.5 ? -depth : depth) + (rand() - 0.5) * 0.02;
    i++;
  }
  return out;
}

/** Point in a ball of radius r around c, packed towards the surface so it reads as a sphere. */
function ballPoint(rand: () => number, c: readonly number[], r: number) {
  const u = rand() * 2 - 1;
  const th = rand() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  const k = r * Math.pow(rand(), 0.25);
  return [c[0] + k * s * Math.cos(th), c[1] + k * u, c[2] + k * s * Math.sin(th)];
}

/** A core with three tilted orbits and two bodies riding each: people around the technology (About). */
function orbit(count: number) {
  const rand = mulberry32(111);
  const out = new Float32Array(count * 3);
  const R = 0.95;
  const tilt = (22 * Math.PI) / 180; // lift off the horizontal: each ring reads as a thin ellipse, atom-style
  /** Point on ring k (rotated 0°/60°/120° about the view axis) at angle t, plus a thin tube offset. */
  const ring = (k: number, t: number, tube: number) => {
    const phi = (k * Math.PI) / 3;
    const x = R * Math.cos(t);
    const y = -R * Math.sin(t) * Math.sin(tilt);
    const z = R * Math.sin(t) * Math.cos(tilt);
    return [
      x * Math.cos(phi) - y * Math.sin(phi) + (rand() - 0.5) * tube,
      x * Math.sin(phi) + y * Math.cos(phi) + (rand() - 0.5) * tube,
      z + (rand() - 0.5) * tube,
    ];
  };
  const nCore = Math.floor(count * 0.3);
  const nBodies = Math.floor(count * 0.12);
  for (let i = 0; i < count; i++) {
    let p: number[];
    if (i < nCore) p = ballPoint(rand, [0, 0, 0], 0.3);
    else if (i < nCore + nBodies) {
      const b = i % 6;
      const k = b % 3;
      const t = (b < 3 ? 0.6 : 3.9) + k * 0.7;
      p = ballPoint(rand, ring(k, t, 0), 0.075);
    } else p = ring(i % 3, rand() * Math.PI * 2, 0.03);
    out.set(p, i * 3);
  }
  return out;
}

/** A central hub linked to six systems, with a loop joining neighbours: the integration network (Integrations). */
function hub(count: number) {
  const rand = mulberry32(121);
  const out = new Float32Array(count * 3);
  const nodes = [
    [0.92, 0.18, 0.1],
    [0.3, 0.75, 0.45],
    [-0.55, 0.55, -0.5],
    [-0.9, -0.15, 0.2],
    [-0.2, -0.8, -0.4],
    [0.55, -0.6, -0.45],
  ].map((n) => {
    const l = Math.hypot(n[0], n[1], n[2]);
    return n.map((v) => (v / l) * 0.92);
  });
  const [coreR, nodeR] = [0.26, 0.09];
  /** Point on the segment a → b, jittered into a thin tube. */
  const link = (a: number[], b: number[]) => {
    const t = rand();
    return a.map((v, d) => v + (b[d] - v) * t + (rand() - 0.5) * 0.028);
  };
  const nCore = Math.floor(count * 0.22);
  const nNodes = Math.floor(count * 0.21);
  const nSpokes = Math.floor(count * 0.36);
  for (let i = 0; i < count; i++) {
    let p: number[];
    if (i < nCore) p = ballPoint(rand, [0, 0, 0], coreR);
    else if (i < nCore + nNodes) p = ballPoint(rand, nodes[i % 6], nodeR);
    else if (i < nCore + nNodes + nSpokes) {
      const n = nodes[i % 6];
      const l = Math.hypot(n[0], n[1], n[2]);
      p = link(
        n.map((v) => (v / l) * coreR),
        n.map((v) => (v / l) * (l - nodeR)),
      );
    } else p = link(nodes[i % 6], nodes[(i + 1) % 6]);
    out.set(p, i * 3);
  }
  return out;
}

/** Columns of rising height on a base plane (Power BI). */
function bars(count: number) {
  const rand = mulberry32(41);
  const out = new Float32Array(count * 3);
  const heights = [0.45, 0.72, 0.6, 0.98, 1.22, 1.58];
  const base = -0.8;
  const colW = 0.2;
  const total = heights.reduce((s, v) => s + v, 0);
  const nBase = Math.floor(count * 0.22);
  let i = 0;
  for (; i < nBase; i++) {
    const j = i * 3;
    out[j] = -1.15 + rand() * 2.3;
    out[j + 1] = base - 0.02;
    out[j + 2] = -0.5 + rand() * 1.0;
  }
  for (let c = 0; c < heights.length; c++) {
    const n = c === heights.length - 1 ? count - i : Math.floor(((count - nBase) * heights[c]) / total);
    const cx = -0.9 + (c * 1.8) / (heights.length - 1);
    for (let k = 0; k < n; k++, i++) {
      const j = i * 3;
      const h = heights[c];
      const face = rand();
      let x = cx + (rand() - 0.5) * colW;
      let z = (rand() - 0.5) * colW;
      const y = base + rand() * h;
      if (face < 0.25) x = cx - colW / 2;
      else if (face < 0.5) x = cx + colW / 2;
      else if (face < 0.75) z = -colW / 2;
      else if (face < 0.95) z = colW / 2;
      out[j] = x;
      out[j + 1] = face >= 0.95 ? base + h : y;
      out[j + 2] = z;
    }
  }
  return out;
}

/** Three curved tubes converging into a dense core (Data Engineering). */
function stream(count: number) {
  const rand = mulberry32(51);
  const out = new Float32Array(count * 3);
  const core = [0.62, 0, 0] as const;
  const curves = [
    [[-1.5, 0.95, -0.35], [-0.6, 1.0, 0.2], [0.1, 0.2, -0.1]],
    [[-1.6, 0.0, 0.45], [-0.7, -0.35, 0.5], [0.0, 0.0, 0.1]],
    [[-1.45, -0.95, -0.2], [-0.5, -1.0, -0.45], [0.15, -0.25, 0.0]],
  ] as const;
  const nCore = Math.floor(count * 0.3);
  for (let i = 0; i < count; i++) {
    const j = i * 3;
    if (i < nCore) {
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const r = 0.34 * Math.cbrt(rand()) ** 1.4;
      const s = Math.sqrt(1 - u * u);
      out[j] = core[0] + r * s * Math.cos(th);
      out[j + 1] = core[1] + r * u;
      out[j + 2] = core[2] + r * s * Math.sin(th);
      continue;
    }
    const c = curves[i % 3];
    const t = rand();
    const mt = 1 - t;
    // cubic bezier p0 → c1 → c2 → core
    const bx = mt ** 3 * c[0][0] + 3 * mt * mt * t * c[1][0] + 3 * mt * t * t * c[2][0] + t ** 3 * core[0];
    const by = mt ** 3 * c[0][1] + 3 * mt * mt * t * c[1][1] + 3 * mt * t * t * c[2][1] + t ** 3 * core[1];
    const bz = mt ** 3 * c[0][2] + 3 * mt * mt * t * c[1][2] + 3 * mt * t * t * c[2][2] + t ** 3 * core[2];
    const rad = 0.075 * (1 - t * 0.6) * Math.sqrt(rand());
    const a = rand() * Math.PI * 2;
    out[j] = bx;
    out[j + 1] = by + Math.cos(a) * rad;
    out[j + 2] = bz + Math.sin(a) * rad;
  }
  return out;
}

/** Cube surface (Data Migration morphs cube ↔ sphere on a loop). */
function cube(count: number) {
  const rand = mulberry32(61);
  const out = new Float32Array(count * 3);
  const s = 0.65;
  for (let i = 0; i < count; i++) {
    const j = i * 3;
    const face = Math.floor(rand() * 6);
    const u = (rand() * 2 - 1) * s;
    const v = (rand() * 2 - 1) * s;
    const axis = face >> 1;
    const sign = face & 1 ? 1 : -1;
    const p = [0, 0, 0];
    p[axis] = sign * s;
    p[(axis + 1) % 3] = u;
    p[(axis + 2) % 3] = v;
    out[j] = p[0];
    out[j + 1] = p[1];
    out[j + 2] = p[2];
  }
  return out;
}

/** Plane lattice; the vertex shader undulates it (Agentic AI "thought wave"). */
function wave(count: number) {
  const rand = mulberry32(71);
  const out = new Float32Array(count * 3);
  const cols = Math.round(Math.sqrt(count * 1.9));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const j = i * 3;
    out[j] = -1.7 + (c / (cols - 1)) * 3.4 + (rand() - 0.5) * 0.004;
    out[j + 1] = (rand() - 0.5) * 0.01;
    out[j + 2] = -0.9 + (r / Math.max(1, rows - 1)) * 1.8;
  }
  return out;
}

/** Loose cloud for the 404 page. */
function scatter(count: number) {
  const rand = mulberry32(81);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const j = i * 3;
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const r = 1.9 * Math.cbrt(rand());
    const s = Math.sqrt(1 - u * u);
    out[j] = r * s * Math.cos(th);
    out[j + 1] = r * u * 0.7;
    out[j + 2] = r * s * Math.sin(th);
  }
  return out;
}
