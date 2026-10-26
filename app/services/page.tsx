import { Handshake, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { IntegrateIcon } from "@/components/icons/IntegrateIcon";
import { SplitWords } from "@/components/motion/SplitWords";
import { CardRow } from "@/components/sections/CardRow";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { Expertise } from "@/components/sections/home/Expertise";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { Delivery } from "@/components/sections/service/Delivery";
import { NextService } from "@/components/sections/service/NextService";
import { Related } from "@/components/sections/service/Related";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { phases } from "@/content/howWeWork";
import {
  engagementModels,
  integrationService,
  services,
  servicesCta,
  servicesHero,
  servicesIntro,
  supportOptions,
} from "@/content/services";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mitti implementation services — discovery and planning, platform configuration, inspections and workflows, reporting setup, training and launch, ongoing optimization, and Workato integration and automation.",
  alternates: { canonical: "/services" },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function ServicesPage() {
  const leadCount = servicesHero.titleLead.split(/\s+/).length;
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div className="shell flex min-h-[38rem] flex-col justify-center gap-[2.625rem] pt-32 pb-16">
          <div className="flex max-w-[50rem] flex-col gap-6">
            <Chip icon={Lightbulb} className="enter-fade">
              {servicesHero.chip}
            </Chip>
            <h1 className="title-xl">
              <SplitWords text={servicesHero.titleLead} />{" "}
              <SplitWords text={servicesHero.titleAccent} offset={leadCount} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[36rem]" style={d(0.5)}>
              {servicesHero.sub}
            </p>
          </div>
          <div className="enter-fade flex flex-wrap gap-3" style={d(0.65)}>
            <ButtonLink href={servicesHero.primary.href}>{servicesHero.primary.label}</ButtonLink>
            <ButtonLink href={servicesHero.secondary.href} variant="outline">
              {servicesHero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <Expertise
        chip={servicesIntro.chip}
        lead={servicesIntro.titleLead}
        accent={servicesIntro.titleAccent}
        sub={servicesIntro.sub}
        items={services.map((s) => ({
          key: s.slug,
          anchor: s.slug,
          href: `/contact?topic=${s.slug}`,
          number: s.number,
          title: s.title,
          body: s.cardLine,
          bullets: s.deliverables,
          illustration: s.illustration,
        }))}
      />
      <CardRow
        id={integrationService.id}
        chip={integrationService.chip}
        icon={IntegrateIcon}
        lead={integrationService.lead}
        sub={integrationService.sub}
        cta={integrationService.cta}
        items={integrationService.steps}
      />
      <CardRow
        id={engagementModels.id}
        chip={engagementModels.chip}
        icon={Handshake}
        lead={engagementModels.lead}
        accent={engagementModels.accent}
        sub={engagementModels.sub}
        items={engagementModels.items}
        surface="white"
      />
      <Delivery
        steps={phases.steps.map(({ title, body }) => ({ title, body }))}
        title="How we work"
        chip="Approach"
        sub="Four phases from discovery to everyday use — each with a clear deliverable."
      />

      <Related
        id="support"
        chip={supportOptions.chip}
        lead={supportOptions.titleLead}
        accent={supportOptions.titleAccent}
        cards={supportOptions.items.map((o) => ({
          key: o.slug,
          icon: o.icon,
          eyebrow: o.entry,
          title: o.title,
          line: o.body,
          href: `/contact?topic=${o.slug}`,
        }))}
      />

      <CtaBand
        title={servicesCta.title}
        sub={servicesCta.sub}
        label={servicesCta.label}
        href={servicesCta.href}
        secondary={{ label: "How we work", href: "/how-we-work" }}
      />
      <NextService
        href="/how-we-work"
        eyebrow="Approach"
        title="How we work"
        line="A clear plan. A confident rollout."
        shape="grid"
        nextShape="stream"
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
