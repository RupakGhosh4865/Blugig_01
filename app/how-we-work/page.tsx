import type { Metadata } from "next";
import { Icon, IconBadge } from "@/components/icons/Icon";
import { RolloutPath } from "@/components/illustrations/RolloutPath";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { howCta, howHero, ownership, phases, phasesIntro, readiness } from "@/content/howWeWork";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Our Mitti implementation approach: discover, configure and validate, train and launch, then support and improve — with clear deliverables and shared ownership.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        crumb="How we work"
        path="/how-we-work"
        chip={howHero.chip}
        titleLead={howHero.titleLead}
        titleAccent={howHero.titleAccent}
        sub={howHero.sub}
        cta={howHero.cta}
        visual={<RolloutPath phases={phases} />}
      />

      {/* Phases + deliverables */}
      <section className="section-y bg-white">
        <div className="shell flex flex-col gap-12">
          <Reveal>
            <h2 className="title-l max-w-[44rem]">{phasesIntro.title}</h2>
          </Reveal>
          <RevealGroup as="ol" className="relative flex flex-col">
            <span aria-hidden className="absolute top-10 bottom-10 left-[1.75rem] w-px bg-blue-100 sm:left-[2rem]" />
            {phases.map((p, i) => (
              <RevealItem
                key={p.number}
                as="li"
                className={cn(
                  "relative grid gap-6 py-7 pl-[4.75rem] sm:pl-[5.5rem] lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center lg:gap-12",
                  i > 0 && "lg:border-t lg:border-gray-200",
                )}
              >
                <span className="absolute top-7 left-0 flex size-14 items-center justify-center rounded-full bg-blue-50 text-[1.375rem] font-semibold tracking-[-0.03em] text-blue-600 ring-8 ring-white sm:size-16 sm:text-[1.625rem] lg:top-1/2 lg:-translate-y-1/2">
                  {p.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="title-s">{p.title}</h3>
                  <p className="text-l max-w-[30rem] text-gray-600">{p.body}</p>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-canvas p-4 sm:p-5">
                  <IconBadge name={p.icon} tone="white" size="sm" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-gray-500 uppercase">Deliverable</span>
                    <span className="text-base font-medium text-ink">{p.deliverable}</span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Shared ownership */}
      <section id="ownership" className="section-y scroll-mt-20">
        <div className="shell flex flex-col gap-12">
          <Reveal>
            <h2 className="title-l">{ownership.title}</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {[ownership.avantra, ownership.client].map((side, i) => (
              <Reveal key={side.title} delay={i * 0.08}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-7 rounded-[1.25rem] p-7 sm:flex-row sm:p-9",
                    i === 0 ? "bg-blue-600 text-white" : "border border-gray-200 bg-white",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-16 shrink-0 items-center justify-center rounded-full",
                      i === 0 ? "bg-white/15 text-white" : "bg-blue-50 text-blue-600",
                    )}
                  >
                    <Icon name={side.icon} className="size-7" />
                  </span>
                  <div className="flex flex-col gap-5">
                    <h3 className="title-s">{side.title}</h3>
                    <ul className="flex flex-col gap-3">
                      {side.items.map((it) => (
                        <li key={it} className="text-l flex items-center gap-3">
                          <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", i === 0 ? "bg-sky-300" : "bg-blue-600")} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness */}
      <section id="readiness" className="section-y scroll-mt-20 bg-white">
        <div className="shell flex flex-col gap-12">
          <Reveal>
            <h2 className="title-l">{readiness.title}</h2>
          </Reveal>
          <RevealGroup as="ul" className="grid gap-y-10 md:grid-cols-3">
            {readiness.items.map((r, i) => (
              <RevealItem
                key={r.title}
                as="li"
                className={cn("flex gap-5 md:pr-8", i > 0 && "md:border-l md:border-gray-200 md:pl-8")}
              >
                <IconBadge name={r.icon} />
                <div className="flex flex-col gap-2">
                  <h3 className="title-xs font-semibold">{r.title}</h3>
                  <p className="text-m text-gray-600">{r.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="text-s text-gray-500">{readiness.note}</p>
        </div>
      </section>

      <CtaBand title={howCta.title} sub={howCta.sub} label={howCta.label} href={howCta.href} />
    </>
  );
}
