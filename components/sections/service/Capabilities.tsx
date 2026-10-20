import { Layers } from "lucide-react";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

const tones = ["bg-blue-600 text-white", "bg-white", "bg-white", "bg-gold-500 text-ink", "bg-white", "bg-navy text-white"];

/** Capabilities bento — zig built-card styling, 6 cards, the first spans two columns. */
export function Capabilities({ service }: { service: Service }) {
  return (
    <section id="capabilities" className="section-y scroll-mt-20">
      <div className="shell">
        <Reveal>
          <SectionHeading
            chip="Capabilities"
            icon={Layers}
            lead={`What we do in ${service.shortName}`}
            sub="Everything you need from first design to a governed, adopted system."
          />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((c, i) => {
            const dark = tones[i].includes("text-white");
            return (
              <CardZoom key={c.title} className={cn(i === 0 && "md:col-span-2")}>
                <article
                  className={cn(
                    "flex h-full min-h-[17rem] flex-col justify-between gap-10 rounded-[1.5rem] p-6 sm:p-8",
                    tones[i],
                  )}
                >
                  <span className={cn("text-mono", dark ? "opacity-60" : "text-gray-400")}>/ {String(i + 1).padStart(2, "0")}</span>
                  <div className="flex max-w-[30rem] flex-col gap-3">
                    <h3 className={i === 0 ? "title-m" : "title-s"}>{c.title}</h3>
                    <p className={cn("text-m", !dark && "text-gray-700")}>{c.body}</p>
                  </div>
                </article>
              </CardZoom>
            );
          })}
        </div>
      </div>
    </section>
  );
}
