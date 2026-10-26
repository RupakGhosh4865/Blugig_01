import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { IntegrateIcon } from "@/components/icons/IntegrateIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrations } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import workatoBadge from "@/public/brand/workato-silver-partner.png";

/** Card surfaces left → right (white, logo blue, sky, navy) with the text tones that read on each. */
const TONES = [
  { card: "bg-white text-ink", body: "text-gray-600", meta: "text-gray-400", flow: "text-gray-700", tag: "bg-canvas text-ink" },
  { card: "bg-blue-600 text-white", body: "text-blue-100", meta: "text-blue-200", flow: "text-white/85", tag: "bg-white/15 text-white" },
  { card: "bg-sky-500 text-ink", body: "text-gray-800", meta: "text-ink/60", flow: "text-ink/80", tag: "bg-white/45 text-ink" },
  { card: "bg-navy text-white", body: "text-gray-300", meta: "text-gray-400", flow: "text-white/80", tag: "bg-white/10 text-white" },
] as const;

/**
 * Home `#integrations` (the nav's Integrations links land here): heading with the
 * Workato partner card, one card per Mitti → system flow, the four-step Workato
 * project, then a single assessment CTA.
 */
export function Integrations() {
  // The assessment books straight into Calendly once NEXT_PUBLIC_CALENDLY_URL is set; the contact form until then.
  const booking = site.calendlyUrl
    ? { href: site.calendlyUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: integrations.cta.href };
  return (
    <section id="integrations" className="section-y scroll-mt-20">
      <div className="shell flex flex-col gap-5">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            chip={integrations.chip}
            icon={IntegrateIcon}
            lead={integrations.titleLead}
            accent={integrations.titleAccent}
            sub={integrations.sub}
            className="max-w-[46rem]"
          />
          <div className="flex shrink-0 items-center gap-4 self-start rounded-[1.5rem] bg-white py-5 pr-7 pl-5 shadow-[0_14px_30px_-18px_rgba(6,69,148,0.28)] lg:self-auto">
            <Image src={workatoBadge} alt="" width={64} height={64} className="size-16" />
            <p className="flex flex-col gap-1">
              <span className="text-base leading-tight font-semibold text-ink">{integrations.partner.title}</span>
              <span className="text-s text-gray-600">{integrations.partner.line}</span>
            </p>
          </div>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {integrations.flows.map((f, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <RevealItem as="li" key={f.title}>
                <article className={cn("flex h-full min-h-[18.75rem] flex-col rounded-[1.5rem] p-7", tone.card)}>
                  <span className={cn("text-mono text-sm", tone.meta)}>/ {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-[clamp(1.25rem,1.7vw,1.5rem)] leading-[1.15] font-medium tracking-[-0.035em]">{f.title}</h3>
                  <p className={cn("mt-3 font-mono text-[0.8125rem] leading-snug", tone.flow)}>{f.flow}</p>
                  <p className={cn("text-m mt-4", tone.body)}>{f.body}</p>
                  <div className="mt-auto pt-6">
                    <ul className="flex flex-wrap gap-2" aria-label={`${f.title}: example systems`}>
                      {f.systems.map((s) => (
                        <li key={s} className={cn("rounded-full px-3 py-1.5 text-sm leading-none font-medium", tone.tag)}>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className={cn("mt-3 text-xs", tone.meta)}>{integrations.systemsNote}</p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="rounded-[1.5rem] bg-white p-7 sm:p-8">
          <p className="text-s text-gray-600">{integrations.process.label}</p>
          <ol className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {integrations.process.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-blue-600 font-mono text-sm text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="title-xs mt-1">{s.title}</h3>
                <p className="text-s max-w-[18rem] text-gray-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-m text-gray-700">{integrations.cta.text}</p>
          <ButtonLink {...booking} className="w-fit">
            {integrations.cta.label}
            <ArrowRight aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
