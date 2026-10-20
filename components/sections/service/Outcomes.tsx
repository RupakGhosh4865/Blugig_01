import { Check, Target } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/content/services";

/** Outcomes strip — zig "After" list styling (brand check markers, hairline dividers). */
export function Outcomes({ service }: { service: Service }) {
  return (
    <section className="section-y bg-white text-ink">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-10">
        <Reveal>
          <SectionHeading chip="Outcomes" icon={Target} lead="What changes" accent="for your team" />
        </Reveal>
        <RevealGroup as="ul" className="grid gap-x-10 sm:grid-cols-2">
          {service.outcomes.map((o) => (
            <RevealItem key={o} as="li" className="flex items-center gap-4 border-b border-gray-200 py-6">
              <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold-700 text-gold-800">
                <Check className="size-3.5" strokeWidth={2} />
              </span>
              <span className="title-xs">{o}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
