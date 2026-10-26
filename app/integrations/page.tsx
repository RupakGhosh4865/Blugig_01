import type { Metadata } from "next";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { assessmentLink, IntegrationFlows, WorkatoPartnerCard } from "@/components/sections/home/Integrations";
import { NextService } from "@/components/sections/service/NextService";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { integrations } from "@/content/home";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Workato integrations for Mitti (by SafetyCulture): issues to ITSM, actions to CMMS and ERP, people from your HRIS, and insights to BI and chat — built by a Workato Silver Partner.",
  alternates: { canonical: "/integrations" },
};

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
          <IntegrationFlows />
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
