"use client";

import { Check, CircleCheck, Flag, LayoutGrid } from "lucide-react";
import { useAnimate, type AnimationSequence } from "motion/react";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/lib/hooks";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const checks = [
  { text: "PPE worn by all crew", ok: true },
  { text: "Walkways and exits clear", ok: true },
  { text: "Extinguishers tagged", ok: true },
  { text: "Guard rail secure", ok: false },
];

const RING = 2 * Math.PI * 22;

/**
 * Hero visual: an illustrative inspection on a tablet. Checks tick off one by
 * one, the failed item becomes an assigned action, the score ring fills, then
 * the rollout card and the adoption badge float in (≈9s loop, static under
 * reduced motion). Decorative — the page copy carries the message.
 */
export function HeroVisual({ badge }: { badge: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (reduce) return;
    const rows: AnimationSequence = checks.flatMap((_, i): AnimationSequence => [
      [`.hv-row-${i}`, { opacity: [0, 1], x: [-10, 0] }, { duration: 0.5, ease: easeOut, at: i === 0 ? 0.2 : "+0.15" }],
      [`.hv-row-${i} .hv-mark`, { scale: [0, 1] }, { duration: 0.35, at: "-0.15" }],
    ]);
    const controls = animate(
      [
        ...rows,
        [".hv-ring", { strokeDashoffset: [RING, RING * 0.08] }, { duration: 1.1, ease: easeOut, at: 0.3 }],
        [".hv-action", { opacity: [0, 1], scale: [0.85, 1] }, { duration: 0.45, ease: easeOut, at: "+0.1" }],
        [".hv-rollout", { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, ease: easeOut, at: "+0.2" }],
        [".hv-badge", { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, ease: easeOut, at: "-0.4" }],
        [".hv-row, .hv-action", { opacity: 0 }, { duration: 0.5, at: "+4.2" }],
        [".hv-rollout, .hv-badge", { opacity: 0, y: -10 }, { duration: 0.5, at: "<" }],
        [".hv-ring", { strokeDashoffset: RING }, { duration: 0.5, at: "<" }],
      ],
      { repeat: Infinity, repeatDelay: 0.4 },
    );
    return () => controls.stop();
  }, [animate, reduce]);

  const hidden = reduce ? "opacity-100" : "opacity-0";

  return (
    <div ref={scope} aria-hidden className="relative mx-auto aspect-[100/118] w-full max-w-[36rem] select-none sm:aspect-[100/94]">
      {/* Brand tile + dots behind the device */}
      <div className="absolute top-[4%] right-[2%] size-[62%] rounded-[2.25rem] bg-gradient-to-br from-blue-500 to-blue-800 shadow-[0_40px_80px_-30px_rgba(0,43,117,0.55)]" />
      <div className="dot-pattern absolute bottom-[2%] left-0 size-[42%] text-blue-200 [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      {/* Tablet */}
      <div className="absolute inset-x-[6%] top-[11%] bottom-[11%] rounded-[2rem] bg-navy p-2.5 shadow-[0_50px_90px_-40px_rgba(17,29,51,0.7)] sm:p-3">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white text-ink">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-[11px] text-gray-500 sm:px-5">
            <span className="flex items-center gap-1.5 font-medium">
              <LayoutGrid className="size-3.5 text-blue-600" strokeWidth={2} />
              Inspections
            </span>
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-50 text-[9px] font-semibold text-blue-700">JL</span>
          </div>

          <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-5">
            <div className="flex flex-col gap-1">
              <p className="text-[15px] leading-tight font-semibold tracking-[-0.02em] sm:text-[17px]">Daily site inspection</p>
              <p className="text-[11px] text-gray-500">North site · Shift A</p>
            </div>
            <div className="relative size-14 shrink-0">
              <svg viewBox="0 0 56 56" className="size-full -rotate-90">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#e7ebf2" strokeWidth="5" />
                <circle
                  className="hv-ring"
                  cx="28"
                  cy="28"
                  r="22"
                  fill="none"
                  stroke="#003fa9"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={RING}
                  strokeDashoffset={reduce ? RING * 0.08 : RING}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold">92%</span>
            </div>
          </div>

          <ul className="mt-4 flex flex-1 flex-col gap-2 px-4 sm:px-5">
            {checks.map((c, i) => (
              <li
                key={c.text}
                className={cn(
                  `hv-row hv-row-${i} flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[12px] sm:text-[13px]`,
                  c.ok ? "bg-canvas" : "bg-[#fdf0eb]",
                  hidden,
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "hv-mark flex size-5 shrink-0 items-center justify-center rounded-full",
                      c.ok ? "bg-blue-600 text-white" : "bg-[#fbd9cc] text-[#b4321f]",
                    )}
                  >
                    {c.ok ? <Check className="size-3" strokeWidth={3} /> : <Flag className="size-2.5" strokeWidth={2.6} />}
                  </span>
                  {c.text}
                </span>
                {c.ok ? (
                  <span className="text-[10px] font-medium text-gray-500">Pass</span>
                ) : (
                  <span className={cn("hv-action rounded-full bg-navy px-2.5 py-1 text-[10px] font-medium whitespace-nowrap text-white", hidden)}>
                    Action assigned
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="m-4 mt-3 flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2.5 text-[11px] sm:mx-5">
            <span className="text-gray-500">Follow-up</span>
            <span className="font-medium text-ink">Maintenance · Due Fri</span>
          </div>
        </div>
      </div>

      {/* Rollout card */}
      <div
        className={cn(
          "hv-rollout absolute top-[2%] right-0 w-[min(14rem,46%)] rounded-2xl bg-white p-4 text-ink shadow-[0_24px_50px_-20px_rgba(17,29,51,0.4)]",
          hidden,
        )}
      >
        <p className="text-[10px] font-semibold tracking-[0.12em] text-gray-500 uppercase">Rollout</p>
        <p className="mt-1 text-[15px] font-semibold tracking-[-0.02em]">3 of 4 sites live</p>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("h-1.5 rounded-full", i < 3 ? "bg-blue-600" : "bg-gray-200")} />
          ))}
        </div>
      </div>

      {/* Adoption badge (mockup: "From setup to site-wide adoption") */}
      <div
        className={cn(
          "hv-badge absolute bottom-[3%] left-[2%] flex items-center gap-2.5 rounded-xl bg-white py-3 pr-5 pl-3 text-[13px] font-medium text-ink shadow-[0_24px_50px_-20px_rgba(17,29,51,0.45)] sm:text-sm",
          hidden,
        )}
      >
        <CircleCheck className="size-6 shrink-0 fill-blue-600 text-white" strokeWidth={2} />
        {badge}
      </div>
    </div>
  );
}
