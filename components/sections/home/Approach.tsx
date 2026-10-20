"use client";

import { Maximize2 } from "lucide-react";
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
 * brand colour, the section pins, and the row of steps slides from +10% to
 * −100% along a hairline while you scroll. Below desktop it becomes a timeline.
 */
export function Approach() {
  const track = useRef<HTMLDivElement>(null);
  const choreo = useScrollChoreography();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => `${12 - 96 * progressBetween(v, 0.05, 0.9)}%`);

  return (
    <div
      id="approach"
      ref={track}
      data-bg-zone="gold"
      className={cn("relative z-10 scroll-mt-16", choreo && "h-[250vh]")}
    >
      <section
        className={cn(
          "flex flex-col justify-around gap-16 overflow-hidden bg-gold-500 py-24 text-ink lg:gap-20",
          choreo && "sticky top-0 h-screen py-[clamp(4rem,9vh,7.5rem)]",
        )}
      >
        <div className="shell">
          <Reveal className="flex flex-col gap-[2.625rem]">
            <div className="flex max-w-[34rem] flex-col gap-6">
              <Chip icon={Maximize2} tone="gold">
                {approach.chip}
              </Chip>
              <h2 className="title-l">{approach.title}</h2>
              <p className="text-l max-w-[32rem]">{approach.sub}</p>
            </div>
            <ButtonLink href={approach.cta.href} className="w-fit">
              {approach.cta.label}
            </ButtonLink>
          </Reveal>
        </div>

        {choreo ? (
          <div className="relative">
            <span aria-hidden className="absolute top-7 left-0 h-px w-screen bg-ink/25" />
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
            <ol className="relative grid gap-10 border-l border-ink/25 pl-8 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
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
      <span className="relative flex size-14 items-center justify-center rounded-full bg-white font-mono text-sm text-ink shadow-[0_22px_22px_rgba(94,68,11,0.09),0_5px_12px_rgba(94,68,11,0.1)] max-sm:-ml-[3.75rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="text-step">{title}</h3>
        <p className="text-l w-full max-w-[16rem]">{body}</p>
      </div>
    </li>
  );
}
