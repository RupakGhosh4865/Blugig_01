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
  | "bars"
  | "stream"
  | "migrate"
  | "wave"
  | "sphere"
  | "cube"
  | "scatter";

const cache = new Map<string, Float32Array>();

export function getShape(name: ShapeName, count: number): Float32Array {
  const key = `${name}:${count}`;
  let arr = cache.get(key);
  if (!arr) {
    arr = build(name, count);
    cache.set(key, arr);
  }
  return arr;
}

function build(name: ShapeName, count: number): Float32Array {
  switch (name) {
    case "globe":
      return normalise(globe(count));
    case "grid":
      return normalise(grid(count));
    case "shield":
      return normalise(shield(count));
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
