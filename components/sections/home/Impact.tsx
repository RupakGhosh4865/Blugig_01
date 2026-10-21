"use client";

import { Waves } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impact } from "@/content/home";
import { useRange, useScrollChoreography } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Where each circle travels to meet in the middle (IX2 a-17 @60%). */
const OFFSETS: [number, number][] = [
  [50, 50],
  [-50, 50],
  [50, -50],
  [-50, -50],
];

/**
 * zig "The impact" (IX2 a-17, 250vh pinned track):
 * 2×2 outlined circles hold → converge to centre while their content fades →
 * a solid brand circle scales 0 → 1 and its statement fades in once fully grown.
 */
export function Impact() {
  const track = useRef<HTMLDivElement>(null);
  const choreo = useScrollChoreography();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const converge = useRange(scrollYProgress, [0.2, 0.55], [0, 1]);
  const contentOpacity = useRange(scrollYProgress, [0.18, 0.4], [1, 0]);
  const accentScale = useRange(scrollYProgress, [0.58, 0.8], [0, 1]);
  const accentText = useRange(scrollYProgress, [0.78, 0.84], [0, 1]);

  return (
    <div ref={track} className="relative lg:h-[250vh]">
      <section className="flex items-center overflow-hidden py-20 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="shell flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
          <Reveal className="lg:max-w-[25rem] lg:self-start lg:pt-[18vh]">
            <SectionHeading
              chip={impact.chip}
              icon={Waves}
              accentFirst
              accent={impact.titleAccent}
              lead={impact.titleRest}
              sub={impact.sub}
            />
          </Reveal>

          <div className="relative mx-auto flex aspect-square w-full max-w-[min(43.75rem,calc(100vh-7rem))] flex-wrap items-center justify-center max-lg:max-w-[38rem] lg:flex-1">
            {impact.items.map((item, i) => (
              <ImpactItem
                key={item.label}
                item={item}
                offset={OFFSETS[i]}
                converge={converge}
                contentOpacity={contentOpacity}
                choreo={choreo}
              />
            ))}
            {choreo ? (
              <motion.div
                className="absolute top-1/2 left-1/2 z-10 flex aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-500 px-[9%] text-center text-ink"
                style={{ scale: accentScale }}
              >
                <motion.p className="title-m" style={{ opacity: accentText }}>
                  {impact.accent}
                </motion.p>
              </motion.div>
            ) : null}
          </div>

          {choreo ? null : (
            <div className="mx-auto flex aspect-square w-full max-w-[28rem] items-center justify-center rounded-full bg-sky-500 px-12 text-center text-ink">
              <p className="title-s">{impact.accent}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ImpactItem({
  item,
  offset,
  converge,
  contentOpacity,
  choreo,
}: {
  item: { value: number; suffix: string; label: string };
  offset: [number, number];
  converge: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  choreo: boolean;
}) {
  const x = useTransform(converge, (v) => `${offset[0] * v}%`);
  const y = useTransform(converge, (v) => `${offset[1] * v}%`);
  return (
    <motion.div
      className="group relative flex aspect-square w-1/2 items-center justify-center overflow-hidden rounded-full border border-gray-200"
      style={choreo ? { x, y } : undefined}
    >
      <span
        aria-hidden
        className="absolute inset-0 scale-0 rounded-full bg-sky-500 transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] lg:group-hover:scale-100"
      />
      <motion.div
        className="relative z-10 flex w-[11rem] flex-col items-center gap-3 px-2 text-center"
        style={choreo ? { opacity: contentOpacity } : undefined}
      >
        <Counter value={item.value} suffix={item.suffix} className="text-number text-sky-800 transition-colors duration-300 lg:group-hover:text-ink" />
        <span className={cn("text-l text-gray-600 transition-colors duration-300 lg:group-hover:text-gray-800 max-sm:text-sm")}>
          {item.label}
        </span>
      </motion.div>
    </motion.div>
  );
}
