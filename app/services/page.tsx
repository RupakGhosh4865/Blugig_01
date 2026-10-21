import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { IconBadge } from "@/components/icons/Icon";
import { ServicesVisual } from "@/components/illustrations/PageVisuals";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { entryPoints, services, servicesCta, servicesHero, servicesIntro, supportOptions } from "@/content/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mitti implementation services — discovery and planning, platform configuration, inspections and workflows, reporting setup, training and launch, and ongoing optimization.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        path="/services"
        chip={servicesHero.chip}
        titleLead={servicesHero.titleLead}
        titleAccent={servicesHero.titleAccent}
        sub={servicesHero.sub}
        cta={servicesHero.cta}
        visual={<ServicesVisual />}
      />

      {/* Where you are today */}
      <section aria-label="Where to start" className="bg-navy text-white">
        <ul className="shell grid sm:grid-cols-3">
          {entryPoints.map((e, i) => (
            <li key={e.title} className={cn("border-white/15", i > 0 && "max-sm:border-t sm:border-l")}>
              <Link
                href={`/contact?topic=${e.topic}`}
                className="group flex items-center gap-4 py-7 transition-colors duration-300 sm:justify-center sm:px-6 lg:py-9"
              >
                <IconBadge name={e.icon} tone="dark" className="group-hover:bg-sky-300 group-hover:text-navy" />
                <span className="title-xs">{e.title}</span>
                <ArrowRight
                  aria-hidden
                  className="ml-auto size-4 text-sky-300 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:ml-0"
                  strokeWidth={1.8}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Numbered services with deliverables */}
      <section className="section-y bg-white">
        <div className="shell flex flex-col gap-12">
          <Reveal>
            <h2 className="title-l max-w-[44rem]">{servicesIntro.title}</h2>
          </Reveal>
          <RevealGroup as="ol" className="flex flex-col border-t border-gray-200">
            {services.map((s) => (
              <RevealItem
                key={s.slug}
                as="li"
                className="group relative grid scroll-mt-28 gap-4 border-b border-gray-200 py-7 transition-colors duration-300 hover:bg-canvas sm:grid-cols-[4.5rem_1fr] lg:grid-cols-[5.5rem_minmax(0,22rem)_1fr] lg:items-center lg:gap-0 lg:py-8"
              >
                <span id={s.slug} className="absolute -top-28" />
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-blue-600 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                />
                <span className="text-[2.25rem] leading-none font-semibold tracking-[-0.04em] text-blue-600 sm:pl-4 lg:text-[2.5rem]">
                  {s.number}
                </span>
                <h3 className="title-s lg:pr-8">{s.title}</h3>
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-gray-600 sm:col-start-2 lg:col-start-auto lg:border-l lg:border-gray-200 lg:pl-10">
                  {s.deliverables.map((d, i) => (
                    <Fragment key={d}>
                      {i > 0 ? (
                        <li aria-hidden className="size-1 rounded-full bg-gray-400" />
                      ) : null}
                      <li>{d}</li>
                    </Fragment>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="text-s text-gray-500">{servicesIntro.note}</p>
        </div>
      </section>

      {/* Support options */}
      <section id="support" className="section-y scroll-mt-20">
        <div className="shell flex flex-col gap-12">
          <Reveal>
            <h2 className="title-l">{supportOptions.title}</h2>
          </Reveal>
          <RevealGroup as="ul" className="grid gap-5 md:grid-cols-3">
            {supportOptions.items.map((o) => (
              <RevealItem key={o.slug} as="li">
                <Link
                  href={`/contact?topic=${o.slug}`}
                  className="group flex h-full flex-col gap-8 rounded-[1.25rem] border border-gray-200 bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_60px_-36px_rgba(0,63,169,0.45)] sm:p-8"
                >
                  <IconBadge name={o.icon} className="group-hover:bg-blue-600 group-hover:text-white" />
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="title-s">{o.title}</h3>
                    <p className="text-m text-gray-600">{o.body}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    Talk to our team
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand title={servicesCta.title} label={servicesCta.label} href={servicesCta.href} />
    </>
  );
}
