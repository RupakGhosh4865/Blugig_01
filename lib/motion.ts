/**
 * Motion tokens. Values follow BUILD_SPEC §5; the scroll/appear behaviours
 * mirror zig.ai's GSAP setup (block appear: y 40 → 0 over 1.2s power4.out,
 * triggered at "top 65%"; word opacity scrub from "top 60%" to "bottom 40%").
 */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
/** GSAP power4.out */
export const power4Out = [0.165, 0.84, 0.44, 1] as const;

export const duration = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
  hero: 1.2,
} as const;

export const stagger = {
  children: 0.06,
  words: 0.04,
} as const;

export const spring = { stiffness: 150, damping: 15, mass: 0.1 } as const;
