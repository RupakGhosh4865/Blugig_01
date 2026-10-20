import { Plug } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Tools & integrations — zig white pill chips. Placeholder entries render dashed. */
export function Tools({ tools }: { tools: string[] }) {
  return (
    <section className="section-y bg-white text-ink">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-10">
        <Reveal>
          <SectionHeading chip="Tools & integrations" icon={Plug} lead="Built on the stack" accent="you already use" />
        </Reveal>
        <RevealGroup as="ul" className="flex flex-wrap content-start gap-3">
          {tools.map((t) => {
            const placeholder = t.startsWith("[PLACEHOLDER");
            return (
              <RevealItem
                key={t}
                as="li"
                className={cn(
                  "rounded-full px-6 py-3 text-base font-medium",
                  placeholder ? "border border-dashed border-gray-300 text-gray-500" : "bg-base text-ink",
                )}
              >
                {t}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
