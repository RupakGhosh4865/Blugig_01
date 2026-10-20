"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { power4Out } from "@/lib/motion";

/**
 * zig `.animate-block_appear`: from opacity 0 / y 40, 1.2s power4.out,
 * fires once when the block's top crosses 65% of the viewport.
 * Under reduced motion the app-level <MotionConfig reducedMotion="user"> drops
 * the transform so this becomes a plain fade.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(8px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
      transition={{ duration: 1.2, ease: power4Out, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: power4Out } },
};

/** Staggered children reveal (BUILD_SPEC stagger 0.06s). */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const props = {
    className,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.15 },
    variants: groupVariants,
  } as const;
  if (as === "ul") return <motion.ul {...props}>{children}</motion.ul>;
  if (as === "ol") return <motion.ol {...props}>{children}</motion.ol>;
  return <motion.div {...props}>{children}</motion.div>;
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  if (as === "li")
    return (
      <motion.li className={className} variants={itemVariants}>
        {children}
      </motion.li>
    );
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
