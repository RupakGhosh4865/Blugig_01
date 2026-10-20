"use client";

import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * zig testimonials (Splide loop): navy band, large quote, person row, 2px
 * pagination bars bottom-left, circular arrows bottom-right. Hidden while empty.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;
  const t = testimonials[index];
  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="bg-navy pt-20 pb-40 text-white" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="shell">
        <div className="flex flex-col gap-6">
          <Chip icon={Star} tone="light">
            Testimonials
          </Chip>
          <h2 className="title-l">What our clients say</h2>
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="max-lg:hidden" />
          <div className="relative flex flex-col gap-20">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8"
                aria-live="polite"
              >
                <blockquote className="title-m">“{t.quote}”</blockquote>
                <figcaption className="flex flex-col gap-1.5">
                  <span className="title-s">{t.name}</span>
                  <span className="text-m opacity-60">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="flex items-end justify-between">
              <div className="flex h-11 items-center gap-3">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={cn("h-0.5 w-[2.625rem] rounded-full", i === index ? "bg-white" : "bg-white/20")}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="flex size-11 items-center justify-center rounded-full border border-white transition-colors hover:border-blue-200 hover:text-blue-200">
                  <ArrowLeft className="size-5" strokeWidth={1.5} />
                </button>
                <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="flex size-11 items-center justify-center rounded-full border border-white transition-colors hover:border-blue-200 hover:text-blue-200">
                  <ArrowRight className="size-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
