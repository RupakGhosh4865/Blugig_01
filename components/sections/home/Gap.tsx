import { Check, Maximize2, Tag, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gap } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * zig "The execution gap": white section, heading top-left, two lists in the
 * right two columns of a 3-column grid — dark "Before" pill vs brand "After" pill.
 */
export function Gap() {
  return (
    <section className="section-y bg-white text-ink">
      <div className="shell">
        <Reveal>
          <SectionHeading
            chip={gap.chip}
            icon={Maximize2}
            lead={gap.titleLead}
            accent={gap.titleAccent}
            sub={gap.sub}
            className="max-w-[40rem]"
          />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-14 md:grid-cols-2 xl:grid-cols-3">
          <List kind="before" items={gap.before} className="xl:col-start-2" />
          <List kind="after" items={gap.after} />
        </div>
      </div>
    </section>
  );
}

function List({ kind, items, className }: { kind: "before" | "after"; items: string[]; className?: string }) {
  const after = kind === "after";
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <p
        className={cn(
          "flex h-12 w-fit items-center gap-2.5 rounded-full pr-4 pl-4 text-[1.125rem] leading-[1.3] font-medium",
          after ? "bg-gold-500 text-ink" : "bg-gray-800 text-white",
        )}
      >
        {after ? "After" : "Before"}
        <Logo className="text-[1rem]" />
        <Tag aria-hidden className="size-4 opacity-60" strokeWidth={1.6} />
      </p>
      <RevealGroup as="ul" className="flex flex-col">
          {items.map((text, i) => (
            <RevealItem
              key={text}
              as="li"
              className={cn(
                "flex items-center gap-4 border-gray-200 py-5",
                i < items.length - 1 && "border-b",
                i === 0 && "pt-0",
              )}
            >
                <span
                  aria-hidden
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border",
                    after ? "border-gold-700 text-gold-800" : "border-gray-800 text-gray-800",
                  )}
                >
                  {after ? <Check className="size-3.5" strokeWidth={2} /> : <X className="size-3.5" strokeWidth={2} />}
                </span>
                <span className={cn("title-xs", after && "text-gold-800")}>
                  <span className="sr-only">{after ? "After: " : "Before: "}</span>
                  {text}
                </span>
            </RevealItem>
          ))}
      </RevealGroup>
    </div>
  );
}
