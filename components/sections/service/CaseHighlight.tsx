import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudy } from "@/content/caseStudies";

/** Single wide case-study card; only rendered when a matching case study exists. */
export function CaseHighlight({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="section-y">
      <div className="shell">
        <Reveal>
          <article className="grid gap-10 rounded-[1.5rem] bg-navy p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-blue-200">Case study · {caseStudy.industry}</span>
              <h2 className="title-m">{caseStudy.challenge}</h2>
            </div>
            <p className="title-s text-gold-300">{caseStudy.result}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
