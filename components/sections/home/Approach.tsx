"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { approach } from "@/content/home";
import { useScrollChoreography } from "@/lib/hooks";
import { cn, progressBetween } from "@/lib/utils";

/**
 * zig "Every part of the sale. Handled." (IX2 a-18, 250vh track): the page turns
 * logo blue, the section pins, and the row of steps slides from +10% to −100%
 * along a hairline while you scroll. Below desktop it becomes a timeline.
 */
export function Approach() {
  const track = useRef<HTMLDivElement>(null);
  const choreo = useScrollChoreography();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => `${12 - 80 * progressBetween(v, 0.05, 0.9)}%`);

  return (
    <div
      id="approach"
      ref={track}
      data-bg-zone="brand"
      className={cn("relative z-10 scroll-mt-16", choreo && "h-[250vh]")}
    >
      <section
        className={cn(
          "flex flex-col justify-around gap-16 overflow-hidden bg-blue-600 py-24 text-white lg:gap-20",
          choreo && "sticky top-0 h-screen py-[clamp(4rem,9vh,7.5rem)]",
        )}
      >
        <div className="shell">
          <Reveal className="flex flex-col gap-[2.625rem]">
            <div className="flex max-w-[36rem] flex-col gap-6">
              <Chip tone="light">{approach.chip}</Chip>
              <h2 className="title-l">{approach.title}</h2>
              <p className="text-l max-w-[32rem] text-blue-100">{approach.sub}</p>
            </div>
            <ButtonLink href={approach.cta.href} variant="white" className="group w-fit">
              {approach.cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
            </ButtonLink>
          </Reveal>
        </div>

        {choreo ? (
          <div className="relative">
            <span aria-hidden className="absolute top-7 left-0 h-px w-screen bg-white/30" />
            <div className="shell">
              <motion.ol className="relative flex w-max gap-[clamp(8rem,16vw,17.5rem)]" style={{ x }}>
                {approach.steps.map((s, i) => (
                  <Step key={s.title} index={i} title={s.title} body={s.body} />
                ))}
              </motion.ol>
            </div>
          </div>
        ) : (
          <div className="shell">
            <ol className="relative ml-7 grid gap-10 border-l border-white/30 pl-8 sm:ml-0 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
              {approach.steps.map((s, i) => (
                <Step key={s.title} index={i} title={s.title} body={s.body} />
              ))}
            </ol>
          </div>
        )}
      </section>
    </div>
  );
}

function Step({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <li className="flex flex-col gap-8 lg:gap-12">
      <span className="relative flex size-14 items-center justify-center rounded-full bg-white font-mono text-sm text-blue-700 shadow-[0_22px_22px_rgba(0,33,90,0.18),0_5px_12px_rgba(0,33,90,0.2)] max-sm:-ml-[3.75rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="text-step font-semibold">{title}</h3>
        <p className="text-l w-full max-w-[17rem] text-blue-100">{body}</p>
      </div>
    </li>
  );
}
