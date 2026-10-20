import { ArrowUpRight, Network } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getService, type Service } from "@/content/services";

/** Three related services as zig-style cards. */
export function Related({ service }: { service: Service }) {
  const related = service.related.map(getService).filter((s): s is Service => Boolean(s)).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading chip="Related services" icon={Network} lead="Works even better" accent="together" />
        </Reveal>
        <div className="mt-[3.75rem] grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <CardZoom key={r.slug}>
              <Link
                href={`/services/${r.slug}`}
                className="group flex h-full min-h-[18rem] flex-col justify-between gap-10 rounded-[1.5rem] bg-white p-8 transition-colors duration-300 hover:bg-gold-50"
              >
                <div className="flex items-start justify-between">
                  <ServiceIcon id={r.icon} className="size-10 text-blue-600" />
                  <span className="flex size-11 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:rotate-45 group-hover:border-gold-500 group-hover:bg-gold-500">
                    <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-mono text-sm text-gray-400">/ {r.number}</span>
                  <ViewTransition name={`service-title-${r.slug}`}>
                    <h3 className="title-s">{r.title}</h3>
                  </ViewTransition>
                  <p className="text-m text-gray-600">{r.cardLine}</p>
                </div>
              </Link>
            </CardZoom>
          ))}
        </div>
      </div>
    </section>
  );
}
