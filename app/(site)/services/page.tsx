import { Handshake, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { IntegrateIcon } from "@/components/icons/IntegrateIcon";
import { SplitWords } from "@/components/motion/SplitWords";
import { CardRow } from "@/components/sections/CardRow";
import { Expertise } from "@/components/sections/home/Expertise";
import { HeroMotion } from "@/components/sections/home/HeroMotion";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { Delivery } from "@/components/sections/service/Delivery";
import { NextService } from "@/components/sections/service/NextService";
import { Related } from "@/components/sections/service/Related";
import { HeroBackdrop, HeroParticles } from "@/components/sections/service/ServiceHero";
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
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mitti Implementation Services & Rollout Support | Avantra",
  description:
    "Mitti implementation services: discovery, configuration, inspections and workflows, reporting, training and launch, and ongoing optimization.",
  path: "/services",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function ServicesPage() {
  const leadCount = servicesHero.titleLead.split(/\s+/).length;
  return (
    <>
      <HeroMotion
        gridClassName="pt-28 pb-16 lg:min-h-[50rem] lg:pt-24 lg:pb-10"
        background={<HeroBackdrop />}
        copy={
          <div className="flex max-w-[46.5rem] flex-col gap-[2.625rem]">
            <div className="flex flex-col gap-6">
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
        }
        visual={<HeroParticles shape="gear" />}
      />

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
        href="/integrations"
        eyebrow="Integrations"
        title="Integrations"
        line="Mitti findings that act on their own."
        shape="gear"
        nextShape="hub"
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
