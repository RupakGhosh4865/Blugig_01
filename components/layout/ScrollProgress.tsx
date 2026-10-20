"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** 2px reading-progress line for long pages (BUILD_SPEC §7.3). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-blue-500"
      style={{ scaleX }}
    />
  );
}
