"use client";

import { Maximize2 } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { useScrollChoreography } from "@/lib/hooks";
import { cn, progressBetween } from "@/lib/utils";

type Step = { title: string; body: string; deliverable?: string };

/**
 * zig "Every part of the sale. Handled." (IX2 a-18, 250vh track): the page turns
 * brand colour, the section pins, and the row of steps slides from +10% to
 * −100% along a hairline while you scroll. Below desktop it becomes a timeline.
 */
export function Approach({
  data,
}: {
  data: { chip: string; title: string; sub: string; cta: { label: string; href: string }; steps: Step[] };
}) {
  const track = useRef<HTMLDivElement>(null);
  const choreo = useScrollChoreography();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => `${12 - 96 * progressBetween(v, 0.05, 0.9)}%`);

  return (
    <div
      id="approach"
      ref={track}
      data-bg-zone="sky"
      className={cn("relative z-10 scroll-mt-16", choreo && "h-[250vh]")}
    >
      <section
        className={cn(
          "flex flex-col justify-around gap-16 overflow-hidden bg-sky-500 py-24 text-ink lg:gap-20",
          // Pinned: clear the fixed navbar and let spacing/type follow the viewport height.
          choreo && "sticky top-0 h-screen justify-between gap-[clamp(1.5rem,5vh,5rem)] pt-[max(5.5rem,13vh)] pb-[max(2rem,8vh)] lg:gap-[clamp(1.5rem,5vh,5rem)]",
        )}
      >
        <div className="shell">
          <Reveal className={cn("flex flex-col gap-[2.625rem]", choreo && "gap-[clamp(1.25rem,3.5vh,2.625rem)]")}>
            <div className={cn("flex max-w-[34rem] flex-col gap-6", choreo && "gap-[clamp(0.75rem,2.4vh,1.5rem)]")}>
              <Chip icon={Maximize2} tone="sky">
                {data.chip}
              </Chip>
              <h2 className={cn("title-l", choreo && "text-[clamp(2rem,min(4.2vw,6.2vh),3.625rem)]")}>{data.title}</h2>
              <p className={cn("text-l max-w-[32rem]", choreo && "[@media(max-height:780px)]:hidden")}>{data.sub}</p>
            </div>
            <ButtonLink href={data.cta.href} className="w-fit">
              {data.cta.label}
            </ButtonLink>
          </Reveal>
        </div>

        {choreo ? (
          <div className="relative">
            <span aria-hidden className="absolute top-7 left-0 h-px w-screen bg-ink/25" />
            <div className="shell">
              <motion.ol className="relative flex w-max gap-[clamp(8rem,16vw,17.5rem)]" style={{ x }}>
                {data.steps.map((s, i) => (
                  <StepItem key={s.title} index={i} step={s} pinned />
                ))}
              </motion.ol>
            </div>
          </div>
        ) : (
          <div className="shell">
            <ol className="relative ml-7 grid gap-10 border-l border-ink/25 pl-8 sm:ml-0 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
              {data.steps.map((s, i) => (
                <StepItem key={s.title} index={i} step={s} />
              ))}
            </ol>
          </div>
        )}
      </section>
    </div>
  );
}

function StepItem({ index, step, pinned = false }: { index: number; step: Step; pinned?: boolean }) {
  return (
    <li className={cn("flex flex-col gap-8 lg:gap-12", pinned && "gap-[clamp(1rem,4vh,3rem)] lg:gap-[clamp(1rem,4vh,3rem)]")}>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-white font-mono text-sm text-ink shadow-[0_22px_22px_rgba(13,71,168,0.09),0_5px_12px_rgba(13,71,168,0.1)] max-sm:-ml-[3.75rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className={cn("flex flex-col gap-4", pinned && "gap-[clamp(0.5rem,1.8vh,1rem)]")}>
        <h3 className={cn("text-step", pinned && "text-[clamp(1.75rem,min(3.5vw,5.4vh),3.125rem)]")}>{step.title}</h3>
        <p className="text-l w-full max-w-[16rem]">{step.body}</p>
        {step.deliverable ? (
          <p className={cn("mt-2 flex w-full max-w-[17rem] flex-col gap-1 border-t border-ink/20 pt-4", pinned && "mt-0 pt-[clamp(0.5rem,1.6vh,1rem)]")}>
            <span className="eyebrow text-gray-800">Deliverable</span>
            <span className="text-m font-medium">{step.deliverable}</span>
          </p>
        ) : null}
      </div>
    </li>
  );
}
