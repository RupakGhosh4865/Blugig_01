"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";

/**
 * Giant outlined "AVANTRA". The outline fills left → right with the logo blue,
 * scroll-linked (0 → 1) as the wordmark travels through the viewport.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const clipId = useId();
  const gradId = useId();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const text = {
    x: 500,
    y: 160,
    textAnchor: "middle",
    textLength: 980,
    lengthAdjust: "spacingAndGlyphs",
    className: "font-sans",
    fontSize: 200,
    fontWeight: 700,
  } as const;

  return (
    <div ref={ref}>
      <svg viewBox="0 0 1000 190" className="block w-full" aria-hidden>
        <defs>
          <clipPath id={clipId}>
            <motion.rect x="0" y="0" width="1000" height="190" style={{ scaleX, originX: 0, originY: 0 }} />
          </clipPath>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2c3a52" />
            <stop offset="100%" stopColor="#003fa9" />
          </linearGradient>
        </defs>
        <text {...text} fill="none" stroke="rgba(44,58,82,0.3)" strokeWidth="1.5">
          AVANTRA
        </text>
        <text {...text} fill={`url(#${gradId})`} clipPath={`url(#${clipId})`}>
          AVANTRA
        </text>
      </svg>
    </div>
  );
}
