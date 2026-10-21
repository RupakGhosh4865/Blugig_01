"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/icons/Icon";
import type { Phase } from "@/content/howWeWork";
import { easeInOut, easeOut } from "@/lib/motion";

const W = 420;
const H = 460;

/** Node centres in viewBox units; icons alternate sides like the mockup. */
const layout = [
  { x: 262, y: 58, icon: { x: 104, y: 58 } },
  { x: 140, y: 174, icon: { x: 372, y: 174 } },
  { x: 262, y: 290, icon: { x: 104, y: 290 } },
  { x: 140, y: 406, icon: { x: 372, y: 406 } },
];

const PATH = "M262 58 C262 120 140 112 140 174 C140 236 262 228 262 290 C262 352 140 344 140 406";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * How-we-work hero diagram: a winding path through the four phases. The path
 * draws on load, then each numbered node, its label and its icon arrive in turn.
 */
export function RolloutPath({ phases }: { phases: Phase[] }) {
  return (
    <div aria-hidden className="relative mx-auto aspect-[420/460] w-full max-w-[30rem] select-none">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
        <motion.path
          d={PATH}
          stroke="#003fa9"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: easeInOut, delay: 0.3 }}
        />
        {layout.map((n, i) => {
          const left = n.icon.x < n.x;
          const [x1, x2] = left ? [n.icon.x + 30, n.x - 28] : [n.x + 128, n.icon.x - 30];
          return (
            <motion.line
              key={i}
              x1={x1}
              x2={x2}
              y1={n.y}
              y2={n.y}
              stroke="#85a6e6"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.42 }}
            />
          );
        })}
      </svg>

      {phases.slice(0, layout.length).map((p, i) => {
        const n = layout[i];
        const delay = 0.45 + i * 0.42;
        return (
          <div key={p.number}>
            <motion.span
              className="absolute flex size-[12%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-blue-600 bg-white font-mono text-[clamp(0.75rem,1.4vw,0.95rem)] font-medium text-blue-700 shadow-[0_10px_24px_-10px_rgba(0,63,169,0.5)]"
              style={{ left: pct(n.x, W), top: pct(n.y, H) }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeOut, delay }}
            >
              {p.number}
            </motion.span>
            <motion.span
              className="absolute -translate-y-1/2 text-[clamp(0.8125rem,1.5vw,1rem)] leading-tight font-medium text-ink"
              style={{ left: pct(n.x + 36, W), top: pct(n.y, H) }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: delay + 0.1 }}
            >
              {p.short[0]}
              {p.short[1] ? (
                <>
                  <br />
                  {p.short[1]}
                </>
              ) : null}
            </motion.span>
            <motion.span
              className="absolute flex size-[14%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600"
              style={{ left: pct(n.icon.x, W), top: pct(n.icon.y, H) }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeOut, delay: delay + 0.2 }}
            >
              <Icon name={p.icon} className="size-[45%]" strokeWidth={1.5} />
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
