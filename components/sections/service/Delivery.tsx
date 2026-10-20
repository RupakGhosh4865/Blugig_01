"use client";

import { Route } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { easeInOut, power4Out } from "@/lib/motion";

/**
 * Compact stepper on the brand-yellow band (zig steps styling, not pinned):
 * the connector line draws left → right, then the steps rise in.
 */
export function Delivery({
  steps,
  title = "How we deliver",
  chip = "Delivery",
}: {
  steps: { title: string; body: string }[];
  title?: string;
  chip?: string;
}) {
  return (
    <section className="section-y bg-gold-500 text-ink">
      <div className="shell flex flex-col gap-16">
        <Reveal className="flex max-w-[34rem] flex-col gap-6">
          <Chip icon={Route} tone="gold">
            {chip}
          </Chip>
          <h2 className="title-l">{title}</h2>
        </Reveal>
        <motion.ol
          className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            aria-hidden
            className="absolute top-7 left-0 hidden h-px w-full origin-left bg-ink/25 lg:block"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: easeInOut } } }}
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative flex flex-col gap-8"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: power4Out, delay: 0.25 + i * 0.12 } },
              }}
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-white font-mono text-sm shadow-[0_22px_22px_rgba(94,68,11,0.09),0_5px_12px_rgba(94,68,11,0.1)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="title-m">{s.title}</h3>
                <p className="text-l max-w-[16rem]">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
