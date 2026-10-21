import { Check, Maximize2, Tag, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type GapList = {
  label: string;
  items: string[];
  /** before = dark pill + crosses · after = brand pill + checks · plain = dark pill + checks */
  kind: "before" | "after" | "plain";
  withLogo?: boolean;
};

/**
 * zig "The execution gap": white section, heading top-left, two lists in the
 * right two columns of a 3-column grid — dark "Before" pill vs brand "After" pill.
 */
export function Gap({
  chip,
  lead,
  accent,
  sub,
  lists,
  id,
}: {
  chip: string;
  lead: string;
  accent: string;
  sub: string;
  lists: [GapList, GapList];
  id?: string;
}) {
  return (
    <section id={id} className="section-y scroll-mt-16 bg-white text-ink">
      <div className="shell">
        <Reveal>
          <SectionHeading chip={chip} icon={Maximize2} lead={lead} accent={accent} sub={sub} className="max-w-[40rem]" />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-14 md:grid-cols-2 xl:grid-cols-3">
          <List list={lists[0]} className="xl:col-start-2" />
          <List list={lists[1]} />
        </div>
      </div>
    </section>
  );
}

function List({ list, className }: { list: GapList; className?: string }) {
  const brand = list.kind === "after";
  const check = list.kind !== "before";
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <p
        className={cn(
          "flex h-12 w-fit items-center gap-2.5 rounded-full pr-4 pl-4 text-[1.125rem] leading-[1.3] font-medium",
          brand ? "bg-sky-500 text-ink" : "bg-gray-800 text-white",
        )}
      >
        {list.label}
        {list.withLogo ? <Logo variant={brand ? "onLight" : "onDark"} height={20} className="h-[1.1rem] w-auto" /> : null}
        <Tag aria-hidden className="size-4 opacity-60" strokeWidth={1.6} />
      </p>
      <RevealGroup as="ul" className="flex flex-col">
        {list.items.map((text, i) => (
          <RevealItem
            key={text}
            as="li"
            className={cn(
              "flex items-center gap-4 border-gray-200 py-5",
              i < list.items.length - 1 && "border-b",
              i === 0 && "pt-0",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border",
                brand ? "border-sky-700 text-sky-800" : "border-gray-800 text-gray-800",
              )}
            >
              {check ? <Check className="size-3.5" strokeWidth={2} /> : <X className="size-3.5" strokeWidth={2} />}
            </span>
            <span className={cn("title-xs", brand && "text-sky-800")}>
              <span className="sr-only">{list.label}: </span>
              {text}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
