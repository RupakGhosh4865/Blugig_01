import { ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const tones = ["bg-blue-600 text-white", "bg-white", "bg-white", "bg-sky-500 text-ink", "bg-white", "bg-navy text-white"];

type Item = { title: string; body: string; href?: string; anchor?: string };

/**
 * Capabilities bento — zig built-card styling. With `feature` (default) the
 * first card spans two columns; items with an `href` become links.
 */
export function Capabilities({
  chip,
  lead,
  accent,
  sub,
  items,
  id,
  feature = true,
  toneOffset = 0,
}: {
  chip: string;
  lead: string;
  accent?: string;
  sub?: string;
  items: Item[];
  id?: string;
  feature?: boolean;
  toneOffset?: number;
}) {
  return (
    <section id={id} className="section-y scroll-mt-20">
      <div className="shell">
        <Reveal>
          <SectionHeading chip={chip} icon={Layers} lead={lead} accent={accent} sub={sub} />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => {
            const tone = tones[(i + toneOffset) % tones.length];
            const dark = tone.includes("text-white");
            const wide = feature && i === 0;
            const body = (
              <article
                className={cn(
                  "relative flex h-full min-h-[17rem] flex-col justify-between gap-10 rounded-[1.5rem] p-6 sm:p-8",
                  tone,
                )}
              >
                <span className={cn("text-mono", dark ? "opacity-60" : "text-gray-400")}>/ {String(i + 1).padStart(2, "0")}</span>
                <div className="flex max-w-[30rem] flex-col gap-3">
                  <h3 className={wide ? "title-m" : "title-s"}>{c.title}</h3>
                  <p className={cn("text-m", !dark && "text-gray-700")}>{c.body}</p>
                </div>
                {c.href ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-6 right-6 flex size-11 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 sm:top-8 sm:right-8",
                      dark ? "border-white/40" : "border-current/20",
                      tone.includes("bg-sky")
                        ? "group-hover:bg-ink group-hover:text-white"
                        : "group-hover:border-sky-500 group-hover:bg-sky-500 group-hover:text-ink",
                    )}
                  >
                    <ArrowUpRight className="size-5" strokeWidth={1.5} />
                  </span>
                ) : null}
              </article>
            );
            return (
              <div key={c.title} id={c.anchor} className={cn("scroll-mt-24", wide && "md:col-span-2")}>
                <CardZoom className="h-full">
                  {c.href ? (
                    <Link href={c.href} className="group block h-full">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </CardZoom>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
