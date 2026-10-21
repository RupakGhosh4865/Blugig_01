"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { iconData, type IconName } from "@/components/icons/iconData";
import { cn } from "@/lib/utils";

export type { IconName };

const tags = {
  path: motion.path,
  circle: motion.circle,
  rect: motion.rect,
  line: motion.line,
  polyline: motion.polyline,
  polygon: motion.polygon,
  ellipse: motion.ellipse,
} as const;

/** Animated line icon (BUILD_SPEC `<DrawIcon>`): draws on enter, redraws on hover. */
export function DrawIcon({ id, className }: { id: IconName; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [cycle, setCycle] = useState(0);

  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
      onMouseEnter={() => setCycle((c) => c + 1)}
    >
      {iconData[id].map(([tag, attrs], i) => {
        const El = tags[tag];
        return (
          <El
            key={`${i}-${cycle}`}
            {...attrs}
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
          />
        );
      })}
    </svg>
  );
}
