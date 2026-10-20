"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * zig "Trusted Logo Loop" (IX2 a-32): each list translates -100% on a linear loop.
 * CSS-driven; pauses on hover and while off-screen; static under reduced motion.
 */
export function Marquee({
  children,
  copies = 3,
  duration = 30,
  reverse = false,
  className,
}: {
  children: ReactNode;
  copies?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("marquee-row flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {Array.from({ length: copies }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className="marquee-list flex shrink-0 animate-marquee items-center"
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
