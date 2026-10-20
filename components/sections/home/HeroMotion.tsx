"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRange, useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Scroll behaviour for heroes (BUILD_SPEC §9 S1): copy parallaxes up ~15% and
 * fades out by 60% of the hero scroll; the visual scales to 0.9 and tilts.
 */
export function HeroMotion({
  copy,
  visual,
  background,
  className,
  gridClassName,
}: {
  copy: ReactNode;
  visual: ReactNode;
  background?: ReactNode;
  className?: string;
  gridClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, (v) => `${-15 * v}%`);
  const opacity = useRange(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useRange(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useRange(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section ref={ref} className={cn("relative isolate overflow-hidden", className)}>
      {background}
      <div className="shell relative">
        <div className={cn("grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-5", gridClassName)}>
          <motion.div style={reduce ? undefined : { y, opacity }} className="relative z-10">
            {copy}
          </motion.div>
          <motion.div style={reduce ? undefined : { scale, rotate }} className="relative">
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
