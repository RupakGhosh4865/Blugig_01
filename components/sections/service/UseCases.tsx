"use client";

import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { Tabs } from "radix-ui";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

/** Use cases: vertical tabs + fading detail panel on desktop, accordion on mobile. */
export function UseCases({ service }: { service: Service }) {
  return (
    <section className="section-y">
      <div className="shell flex flex-col gap-[3.75rem]">
        <Reveal>
          <SectionHeading chip="Use cases" icon={Briefcase} lead="Where teams" accent="use it" />
        </Reveal>

        <Tabs.Root defaultValue="0" orientation="vertical" className="hidden gap-10 lg:grid lg:grid-cols-[1fr_1.5fr]">
          <Tabs.List aria-label="Use cases" className="flex flex-col">
            {service.useCases.map((u, i) => (
              <Tabs.Trigger
                key={u.title}
                value={String(i)}
                className={cn(
                  "group flex items-center gap-5 border-b border-gray-200 py-6 text-left transition-colors duration-300",
                  "text-gray-500 hover:text-ink data-[state=active]:text-ink",
                )}
              >
                <span className="text-mono text-sm text-gold-800">{String(i + 1).padStart(2, "0")}</span>
                <span className="title-s">{u.title}</span>
                <span
                  aria-hidden
                  className="ml-auto size-2 shrink-0 rounded-full bg-gold-500 opacity-0 transition-opacity group-data-[state=active]:opacity-100"
                />
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div className="relative min-h-[26rem] overflow-hidden rounded-[1.5rem] bg-white p-10">
            {service.useCases.map((u, i) => (
              <Tabs.Content key={u.title} value={String(i)} className="h-full outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col gap-10"
                >
                  <div className="flex max-w-[30rem] flex-col gap-4">
                    <span className="text-mono text-gray-400">/ {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="title-m">{u.title}</h3>
                    <p className="text-l text-gray-700">{u.body}</p>
                  </div>
                  <ServiceIllustration id={service.icon} className="mt-auto flex justify-end" />
                </motion.div>
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>

        <div className="lg:hidden">
          <FaqAccordion items={service.useCases.map((u) => ({ q: u.title, a: u.body }))} />
        </div>
      </div>
    </section>
  );
}
