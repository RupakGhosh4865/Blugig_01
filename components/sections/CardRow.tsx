import type { LucideIcon } from "lucide-react";
import { Layers } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type CardRowItem = {
  title: string;
  body?: string;
  /** Small tags under the body (e.g. example systems). */
  tags?: readonly string[];
  /** Mono label above the title; defaults to the card number. */
  eyebrow?: string;
};

/**
 * Heading + a row of plain cards (zig built-card styling, no links). Used for
 * the integration strip, engagement models, governance and the team.
 */
export function CardRow({
  id,
  chip,
  icon = Layers,
  lead,
  accent,
  sub,
  items,
  cta,
  surface = "canvas",
  className,
}: {
  id?: string;
  chip: string;
  icon?: LucideIcon;
  lead: string;
  accent?: string;
  sub?: string;
  items: readonly CardRowItem[];
  cta?: { label: string; href: string };
  /** Section background; cards take the other surface so they always read. */
  surface?: "canvas" | "white";
  className?: string;
}) {
  const card = surface === "white" ? "bg-canvas" : "bg-white";
  const tag = surface === "white" ? "bg-white" : "bg-canvas";
  return (
    <section id={id} className={cn("section-y scroll-mt-20", surface === "white" && "bg-white", className)}>
      <div className="shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading chip={chip} icon={icon} lead={lead} accent={accent} sub={sub} className="max-w-[36rem]" />
          {cta ? (
            <ButtonLink href={cta.href} variant="outline" className="self-start lg:self-auto">
              {cta.label}
            </ButtonLink>
          ) : null}
        </Reveal>
        <RevealGroup as="ul" className={cn("mt-[3.75rem] grid gap-5 md:grid-cols-2", items.length % 3 === 0 && "lg:grid-cols-3")}>
          {items.map((item, i) => (
            <RevealItem as="li" key={item.title}>
              {/* Content sits at the top so titles line up across cards; tags anchor to the bottom. */}
              <article className={cn("flex h-full flex-col rounded-[1.5rem] p-6 sm:p-8", item.tags?.length && "min-h-[14rem]", card)}>
                <span className="text-mono text-gray-400">/ {item.eyebrow ?? String(i + 1).padStart(2, "0")}</span>
                <div className="mt-10 flex flex-col gap-3">
                  <h3 className="title-s">{item.title}</h3>
                  {item.body ? <p className="text-m text-gray-600">{item.body}</p> : null}
                </div>
                {item.tags?.length ? (
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${item.title} examples`}>
                    {item.tags.map((t) => (
                      <li key={t} className={cn("rounded-full px-3 py-1.5 text-sm leading-none font-medium text-ink", tag)}>
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
