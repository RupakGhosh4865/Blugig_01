import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Map v from [a,b] to [0,1], clamped. */
export function progressBetween(v: number, a: number, b: number) {
  if (b === a) return v >= b ? 1 : 0;
  return clamp((v - a) / (b - a), 0, 1);
}
