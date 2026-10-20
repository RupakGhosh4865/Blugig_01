"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

/**
 * zig `.animate-text_opacity`: SplitText words start at opacity 0.2 and
 * scrub to 1 (stagger) between "top 60%" and "bottom 40%".
 */
export function ScrollWords({
  segments,
  className,
  as: Tag = "h2",
}: {
  segments: Segment[];
  className?: string;
  as?: "h2" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.4"] });

  const words = segments.flatMap((seg) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, className: seg.className })),
  );
  const total = words.length;

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map(({ w, className: wc }, i) => (
        <Word key={`${w}-${i}`} progress={scrollYProgress} index={i} total={total} reduce={reduce} className={wc}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  index,
  total,
  reduce,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
  className?: string;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.5 / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <>
      <motion.span className={className} style={{ opacity: reduce ? 1 : opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
