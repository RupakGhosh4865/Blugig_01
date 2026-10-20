import { ArrowUpRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustrations";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise } from "@/content/home";
import { services, type Service } from "@/content/services";
import { cn } from "@/lib/utils";

/** zig built-card colour rhythm: white · coral · green · white · white · navy → white · blue · gold · white · white · navy. */
const tones = [
  "bg-white text-ink",
  "bg-blue-600 text-white",
  "bg-gold-500 text-ink",
  "bg-white text-ink",
  "bg-white text-ink",
  "bg-navy text-white",
] as const;

/** zig "Built different": 2-column bento of tall rounded cards with a figure at the bottom. */
export function Expertise({ withBullets = false }: { withBullets?: boolean }) {
  return (
    <section id="services" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading
            chip={expertise.chip}
            icon={Lightbulb}
            lead={expertise.titleLead}
            accent={expertise.titleAccent}
            sub={expertise.sub}
          />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-5 lg:grid-cols-2">
          {services.map((s, i) => (
            <CardZoom key={s.slug}>
              <ExpertiseCard service={s} tone={tones[i % tones.length]} withBullets={withBullets} />
            </CardZoom>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ service, tone, withBullets }: { service: Service; tone: string; withBullets: boolean }) {
  const dark = tone.includes("text-white");
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex h-full min-h-[30.625rem] flex-col gap-10 overflow-hidden rounded-[1.5rem] p-6 sm:p-8",
        tone,
      )}
    >
      <div className="relative z-10 flex max-w-[30rem] flex-col gap-4">
        <span className={cn("text-mono", dark ? "opacity-60" : "text-gray-400")}>/ {service.number}</span>
        <ViewTransition name={`service-title-${service.slug}`}>
          <h3 className="title-m">{service.title}</h3>
        </ViewTransition>
        <p className="text-m">{service.summary}</p>
        {withBullets ? (
          <ul className="mt-1 flex flex-col gap-1.5">
            {service.capabilities.slice(0, 3).map((c) => (
              <li key={c.title} className="text-s flex items-start gap-2">
                <span aria-hidden className={cn("mt-[0.45em] size-1.5 shrink-0 rounded-full", dark ? "bg-gold-400" : "bg-gold-600")} />
                {c.title}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <ServiceIllustration
        id={service.icon}
        className="mt-auto flex justify-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5"
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-6 right-6 flex size-11 items-center justify-center rounded-full border transition-all duration-300 sm:top-8 sm:right-8",
          dark ? "border-white/40" : "border-current/20",
          "group-hover:rotate-45",
          tone.includes("bg-gold") ? "group-hover:bg-ink group-hover:text-white" : "group-hover:bg-gold-500 group-hover:text-ink group-hover:border-gold-500",
        )}
      >
        <ArrowUpRight className="size-5" strokeWidth={1.5} />
      </span>
    </Link>
  );
}
