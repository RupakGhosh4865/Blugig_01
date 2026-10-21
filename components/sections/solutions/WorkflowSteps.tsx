"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { IconBadge } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { workflow } from "@/content/solutions";
import { easeInOut, power4Out } from "@/lib/motion";

/**
 * "See the workflow, not just the form": Inspect → Identify → Assign → Review.
 * A connector line draws left → right, then each step rises in; on desktop a
 * pulse travels along the line to show work moving through the loop.
 */
export function WorkflowSteps() {
  return (
    <section className="section-y">
      <div className="shell flex flex-col gap-16">
        <Reveal className="flex max-w-[40rem] flex-col gap-5">
          <h2 className="title-l">{workflow.title}</h2>
          <p className="text-l text-gray-600">{workflow.sub}</p>
        </Reveal>
        <motion.ol
          className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            aria-hidden
            className="absolute top-[2.75rem] right-[12.5%] left-[12.5%] hidden h-px origin-left bg-blue-200 lg:block"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: easeInOut } } }}
          >
            <span className="workflow-pulse absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full bg-blue-600 opacity-0" />
          </motion.span>
          {[25, 50, 75].map((left, i) => (
            <motion.span
              key={left}
              aria-hidden
              className="absolute top-[2.75rem] z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--page-bg)] p-1.5 text-blue-500 lg:block"
              style={{ left: `${left}%` }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5 + i * 0.14 } } }}
            >
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </motion.span>
          ))}
          {workflow.steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative flex flex-col items-center gap-5 text-center"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: power4Out, delay: 0.25 + i * 0.14 } },
              }}
            >
              <span className="relative rounded-full bg-[var(--page-bg)] p-2">
                <IconBadge name={s.icon} size="lg" tone="white" className="border border-blue-100 shadow-[0_16px_32px_-18px_rgba(0,63,169,0.5)]" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="title-s">{s.title}</h3>
                <p className="text-m mx-auto max-w-[15rem] text-gray-600">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
