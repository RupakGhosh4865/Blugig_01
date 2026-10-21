import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { IconBadge } from "@/components/icons/Icon";
import { SolutionsVisual } from "@/components/illustrations/PageVisuals";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Industries } from "@/components/sections/Industries";
import { PageHero } from "@/components/sections/PageHero";
import { WorkflowSteps } from "@/components/sections/solutions/WorkflowSteps";
import { solutions, solutionsCta, solutionsHero, solutionsIndustries, solutionsIntro } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Practical Mitti solutions for inspections and audits, issue reporting, corrective actions, site standards, asset inspections and operational visibility.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumb="Solutions"
        path="/solutions"
        chip={solutionsHero.chip}
        titleLead={solutionsHero.titleLead}
        titleAccent={solutionsHero.titleAccent}
        sub={solutionsHero.sub}
        cta={solutionsHero.cta}
        visual={<SolutionsVisual />}
      />

      <section id="use-cases" className="section-y scroll-mt-20 bg-white">
        <div className="shell flex flex-col gap-[3.25rem]">
          <Reveal className="flex max-w-[44rem] flex-col gap-5">
            <h2 className="title-l">{solutionsIntro.title}</h2>
            <p className="text-l text-gray-600">{solutionsIntro.sub}</p>
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-2">
            {solutions.map((s) => (
              <li key={s.slug} id={s.slug} className="scroll-mt-28">
                <CardZoom className="h-full">
                  <Link
                    href={`/contact?topic=${s.slug}`}
                    className="group flex h-full flex-col gap-6 rounded-[1.25rem] border border-gray-200 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-blue-200 hover:shadow-[0_30px_60px_-36px_rgba(0,63,169,0.45)] sm:flex-row sm:items-center sm:gap-7 sm:p-8"
                  >
                    <IconBadge name={s.icon} size="lg" className="group-hover:bg-blue-600 group-hover:text-white" />
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="title-xs font-semibold">{s.title}</h3>
                      <p className="text-m text-gray-600">{s.body}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600">
                      Discuss this solution
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                    </span>
                  </Link>
                </CardZoom>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WorkflowSteps />

      <Industries title={solutionsIndustries.title} sub={solutionsIndustries.sub} />

      <CtaBand title={solutionsCta.title} sub={solutionsCta.sub} label={solutionsCta.label} href={solutionsCta.href} />
    </>
  );
}
