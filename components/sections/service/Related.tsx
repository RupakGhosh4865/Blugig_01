import { ArrowUpRight, Network } from "lucide-react";
import Link from "next/link";
import { DrawIcon, type IconName } from "@/components/icons/DrawIcon";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Card = { key: string; icon: IconName; eyebrow: string; title: string; line: string; href: string };

/** Three linked cards (zig style): animated line icon, eyebrow, title, line. */
export function Related({
  chip,
  lead,
  accent,
  sub,
  cards,
  id,
}: {
  chip: string;
  lead: string;
  accent: string;
  sub?: string;
  cards: Card[];
  id?: string;
}) {
  return (
    <section id={id} className="section-y scroll-mt-20">
      <div className="shell">
        <Reveal>
          <SectionHeading chip={chip} icon={Network} lead={lead} accent={accent} sub={sub} />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-5 md:grid-cols-3">
          {cards.map((r) => (
            <CardZoom key={r.key}>
              <Link
                href={r.href}
                className="group flex h-full min-h-[18rem] flex-col justify-between gap-10 rounded-[1.5rem] bg-white p-8 transition-colors duration-300 hover:bg-sky-50"
              >
                <div className="flex items-start justify-between">
                  <DrawIcon id={r.icon} className="size-10 text-blue-600" />
                  <span className="flex size-11 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:rotate-45 group-hover:border-sky-500 group-hover:bg-sky-500">
                    <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-mono text-sm text-gray-400">/ {r.eyebrow}</span>
                  <h3 className="title-s">{r.title}</h3>
                  <p className="text-m text-gray-600">{r.line}</p>
                </div>
              </Link>
            </CardZoom>
          ))}
        </div>
      </div>
    </section>
  );
}
