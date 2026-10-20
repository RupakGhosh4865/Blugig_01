"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import type { ServiceIcon as IconId } from "@/content/services";
import { cn } from "@/lib/utils";

const paths: Record<IconId, string[]> = {
  sheet: ["M3.5 4.5h17v15h-17z", "M3.5 9h17", "M3.5 14h17", "M9 4.5v15", "M12.5 11.5l1.4 1.4 2.6-2.8"],
  shield: ["M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z", "M8.6 12.2l2.4 2.4 4.6-4.8"],
  chart: ["M4 20.5h16", "M6.5 20.5v-6", "M10.5 20.5v-10", "M14.5 20.5v-7.5", "M18.5 20.5V5.5"],
  pipeline: ["M3.5 6.5h4.5c3 0 3.5 5.5 6.5 5.5h6", "M3.5 17.5h4.5c3 0 3.5-5.5 6.5-5.5", "M3.5 12h11", "M18 9l2.5 3-2.5 3"],
  migrate: ["M3.5 5.5h7v7h-7z", "M16.5 18.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0", "M8 16.5c0 2 1.2 3 3 3", "M16 7.5c0-1.5-1-2.5-2.5-2.5h-1", "M14 3.5L12.5 5 14 6.5"],
  agent: ["M5 8.5h14v10H5z", "M12 4.5v4", "M12 4.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0", "M9 13h.01", "M15 13h.01", "M9.5 16h5", "M3 12.5v2.5", "M21 12.5v2.5"],
};

/** Custom animated line icon per service (BUILD_SPEC `<DrawIcon>`): draws on enter, redraws on hover. */
export function ServiceIcon({ id, className }: { id: IconId; className?: string }) {
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
      {paths[id].map((d, i) => (
        <motion.path
          key={`${d}-${cycle}`}
          d={d}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}
