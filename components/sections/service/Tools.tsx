import { Plug } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** zig white pill chips under a split heading (used for the industries list). */
export function Tools({
  chip,
  lead,
  accent,
  sub,
  tools,
}: {
  chip: string;
  lead: string;
  accent: string;
  sub?: string;
  tools: string[];
}) {
  return (
    <section className="section-y bg-white text-ink">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-10">
        <Reveal>
          <SectionHeading chip={chip} icon={Plug} lead={lead} accent={accent} sub={sub} />
        </Reveal>
        <RevealGroup as="ul" className="flex flex-wrap content-start gap-3 lg:pt-12">
          {tools.map((t) => (
            <RevealItem key={t} as="li" className="rounded-full bg-canvas px-6 py-3 text-base font-medium text-ink">
              {t}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
