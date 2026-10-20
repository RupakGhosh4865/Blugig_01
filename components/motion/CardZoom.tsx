"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** zig "Built Card Zoom" (IX2 a-22): scale 0.95 → 1, 300ms easeInOut, when 10% in view. Origin bottom-centre. */
export function CardZoom({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "50% 100%" }}
      initial={{ scale: 0.95 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
    >
      {children}
    </motion.div>
  );
}
