/** Mix a hex colour toward black (amount 0–1). Used to make accents legible on light backgrounds. */
export function shade(hex: string, amount: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const ch = (shift: number) => Math.round(((n >> shift) & 255) * (1 - amount));
  return `#${[ch(16), ch(8), ch(0)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Hex → rgba() string. */
export function alpha(hex: string, a: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
