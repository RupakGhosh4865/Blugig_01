import type { Metadata } from "next";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Capabilities } from "@/components/sections/service/Capabilities";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { Delivery } from "@/components/sections/service/Delivery";
import { NextService } from "@/components/sections/service/NextService";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { Tools } from "@/components/sections/service/Tools";
import { industries } from "@/content/industries";
import { solutions, solutionsCta, solutionsHero, solutionsIndustries, solutionsIntro, workflow } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Practical Mitti solutions for inspections and audits, issue reporting, corrective actions, site standards, asset inspections, operational visibility and Workato-connected workflows.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <ScrollProgress />
      <ServiceHero
        crumb="Solutions"
        path="/solutions"
        eyebrow={solutionsHero.eyebrow}
        lead={solutionsHero.titleLead}
        accentText={solutionsHero.titleAccent}
        summary={solutionsHero.sub}
        primary={solutionsHero.primary}
        secondary={solutionsHero.secondary}
        shape="shield"
      />
      <Capabilities
        id="use-cases"
        chip={solutionsIntro.chip}
        lead={solutionsIntro.title}
        sub={solutionsIntro.sub}
        items={solutions.map((s) => ({
          title: s.title,
          body: s.body,
          anchor: s.slug,
          href: `/contact?topic=${s.slug}`,
          span: s.integration,
        }))}
      />
      <Delivery steps={workflow.steps} title={workflow.title} chip={workflow.chip} sub={workflow.sub} />
      <Tools
        chip={solutionsIndustries.chip}
        lead={solutionsIndustries.lead}
        accent={solutionsIndustries.accent}
        sub={solutionsIndustries.sub}
        tools={industries}
      />
      <div className="pt-[clamp(4.5rem,8vw,6.25rem)]">
        <CtaBand
          title={solutionsCta.title}
          sub={solutionsCta.sub}
          label={solutionsCta.label}
          href={solutionsCta.href}
        />
      </div>
      <NextService
        href="/services"
        eyebrow="Services"
        title="Services"
        line="Expert support. Every step of your Mitti journey."
        shape="shield"
        nextShape="grid"
      />
    </>
  );
}
