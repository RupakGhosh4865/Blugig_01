import { IconBadge } from "@/components/icons/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { whatWeDo } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * "What we do" (mockup): heading, then a 3×2 grid of icon + title + line items
 * separated by hairlines. Each cell gets a blue top rule and icon fill on hover.
 */
export function WhatWeDo() {
  return (
    <section className="section-y bg-white text-ink [--grad-a:var(--color-blue-700)] [--grad-b:var(--color-blue-500)]">
      <div className="shell flex flex-col gap-[3.75rem]">
        <Reveal className="flex max-w-[40rem] flex-col gap-6">
          <Chip>{whatWeDo.chip}</Chip>
          <h2 className="title-l">
            {whatWeDo.titleLead} <span className="text-grad">{whatWeDo.titleAccent}</span>
          </h2>
        </Reveal>
        <RevealGroup as="ul" className="grid border-gray-200 sm:grid-cols-2 lg:grid-cols-3 lg:border-t">
          {whatWeDo.items.map((item, i) => (
            <RevealItem
              key={item.title}
              as="li"
              className={cn(
                "group relative flex flex-col gap-5 border-gray-200 py-9 max-lg:border-t",
                // 2 columns (sm → lg): divider before the right-hand column
                i % 2 === 0 ? "sm:max-lg:pr-8" : "sm:max-lg:border-l sm:max-lg:pl-8",
                // 3 columns (lg+): dividers between columns, rule between rows
                i % 3 === 0 ? "lg:pr-10" : "lg:border-l lg:px-10",
                i >= 3 && "lg:border-t",
              )}
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-0.5 w-0 bg-blue-600 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
              <IconBadge name={item.icon} className="group-hover:bg-blue-600 group-hover:text-white" />
              <div className="flex flex-col gap-2">
                <h3 className="title-xs font-semibold">{item.title}</h3>
                <p className="text-m max-w-[20rem] text-gray-600">{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
