import { ArrowUpRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { ServiceIllustration, type IllustrationId } from "@/components/illustrations/ServiceIllustrations";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** zig built-card colour rhythm: white · coral · green · white · white · navy → white · logo blue · light brand blue · white · white · navy. */
const tones = [
  "bg-white text-ink",
  "bg-blue-600 text-white",
  "bg-sky-500 text-ink",
  "bg-white text-ink",
  "bg-white text-ink",
  "bg-navy text-white",
] as const;

export type ExpertiseItem = {
  key: string;
  /** Anchor id on the card wrapper (e.g. /services#slug). */
  anchor?: string;
  href: string;
  number: string;
  title: string;
  body: string;
  bullets?: string[];
  illustration: IllustrationId;
};

/** zig "Built different": 2-column bento of tall rounded cards with a figure at the bottom. */
export function Expertise({
  chip,
  lead,
  accent,
  sub,
  items,
  id = "services",
}: {
  chip: string;
  lead: string;
  accent: string;
  sub: string;
  items: ExpertiseItem[];
  id?: string;
}) {
  return (
    <section id={id} className="section-y scroll-mt-16">
      <div className="shell">
        <Reveal>
          <SectionHeading chip={chip} icon={Lightbulb} lead={lead} accent={accent} sub={sub} />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-5 lg:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.key} id={item.anchor} className="scroll-mt-24">
              <CardZoom className="h-full">
                <ExpertiseCard item={item} tone={tones[i % tones.length]} />
              </CardZoom>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ item, tone }: { item: ExpertiseItem; tone: string }) {
  const dark = tone.includes("text-white");
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex h-full min-h-[30.625rem] flex-col gap-10 overflow-hidden rounded-[1.5rem] p-6 sm:p-8",
        tone,
      )}
    >
      <div className="relative z-10 flex max-w-[30rem] flex-col gap-4">
        <span className={cn("text-mono", dark ? "opacity-60" : "text-gray-400")}>/ {item.number}</span>
        <h3 className="title-m">{item.title}</h3>
        <p className="text-m">{item.body}</p>
        {item.bullets ? (
          <ul className="mt-1 flex flex-col gap-1.5">
            {item.bullets.map((b) => (
              <li key={b} className="text-s flex items-start gap-2">
                <span aria-hidden className={cn("mt-[0.45em] size-1.5 shrink-0 rounded-full", dark ? "bg-sky-400" : "bg-sky-700")} />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <ServiceIllustration
        id={item.illustration}
        className="mt-auto flex justify-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5"
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-6 right-6 flex size-11 items-center justify-center rounded-full border transition-all duration-300 sm:top-8 sm:right-8",
          dark ? "border-white/40" : "border-current/20",
          "group-hover:rotate-45",
          tone.includes("bg-sky") ? "group-hover:bg-ink group-hover:text-white" : "group-hover:bg-sky-500 group-hover:text-ink group-hover:border-sky-500",
        )}
      >
        <ArrowUpRight className="size-5" strokeWidth={1.5} />
      </span>
    </Link>
  );
}
