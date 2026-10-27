import type { Metadata } from "next";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Reveal } from "@/components/motion/Reveal";
import { assessmentLink, IntegrationFlows, WorkatoPartnerCard } from "@/components/sections/home/Integrations";
import { NextService } from "@/components/sections/service/NextService";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrations } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mitti + Workato Integrations for ERP, ITSM & HRIS | Avantra",
  description:
    "Connect Mitti to ServiceNow, SAP, Workday, Power BI and more with Workato. Built by a Workato Silver Partner, from assessment to hand-over.",
  path: "/integrations",
});

/** Integrations: the home section's flows under a service-template hero (particle hub linked to six systems). */
export default function IntegrationsPage() {
  return (
    <>
      <ScrollProgress />
      <ServiceHero
        crumb="Integrations"
        path="/integrations"
        eyebrow={integrations.chip}
        lead={integrations.titleLead}
        accentText={integrations.titleAccent}
        summary={integrations.sub}
        primary={{ label: integrations.cta.label, ...assessmentLink() }}
        secondary={integrations.page.secondary}
        shape="hub"
      >
        <WorkatoPartnerCard />
      </ServiceHero>
      <section id="flows" className="scroll-mt-20 pb-[clamp(4.5rem,8vw,6.25rem)]">
        <div className="shell">
          <Reveal>
            <SectionHeading
              lead={integrations.page.flows.lead}
              accent={integrations.page.flows.accent}
              sub={integrations.page.flows.sub}
              className="max-w-[46rem]"
            />
          </Reveal>
          <IntegrationFlows className="mt-10" />
        </div>
      </section>
      <NextService
        href="/how-we-work"
        eyebrow="Approach"
        title="How we work"
        line="A clear plan. A confident rollout."
        shape="hub"
        nextShape="stream"
      />
    </>
  );
}
