import { Icon } from "@/components/icons/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";

/**
 * Industries row (Home + Solutions). Each tile is a navy card with a large
 * outlined industry glyph; the tile lifts and the glyph turns brand blue on hover.
 */
export function Industries({
  chip,
  title,
  sub,
  className,
}: {
  chip?: string;
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <section className={cn("section-y", className)}>
      <div className="shell flex flex-col gap-[3.25rem]">
        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-5">
            {chip ? <Chip>{chip}</Chip> : null}
            <h2 className="title-l">{title}</h2>
          </div>
          <p className="text-l max-w-[30rem] text-gray-600 lg:pb-2">{sub}</p>
        </Reveal>
        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <RevealItem key={ind.name} as="li">
              <div
                className={cn(
                  "group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[1.25rem] p-6 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5",
                  i % 2 === 0 ? "bg-navy" : "bg-navy-2",
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 100% 0%, rgba(29,88,196,0.55), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(140,200,255,0.12), transparent 70%)",
                  }}
                />
                <Icon
                  name={ind.icon}
                  strokeWidth={0.75}
                  className="absolute -top-4 -right-4 -z-10 size-40 text-white/10 transition-[color,transform] duration-500 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:text-sky-300/25"
                />
                <span className="mb-auto flex size-12 items-center justify-center rounded-xl bg-white/10 text-sky-300 backdrop-blur">
                  <Icon name={ind.icon} className="size-6" />
                </span>
                <h3 className="title-xs">{ind.name}</h3>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
