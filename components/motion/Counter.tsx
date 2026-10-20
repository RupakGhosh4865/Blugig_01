"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useReducedMotionSafe } from "@/lib/hooks";
import { easeOut } from "@/lib/motion";

/** Counts up on enter (1.6s easeOut), tabular numbers. Renders the final value in SSR HTML. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: easeOut,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
