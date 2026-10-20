import { Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { Expertise } from "@/components/sections/home/Expertise";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { Delivery } from "@/components/sections/service/Delivery";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { defaultProcess } from "@/content/services";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six connected practices — Smartsheet, SafetyCulture, Power BI, data engineering, data migration and agentic AI — from one partner.",
  alternates: { canonical: "/services" },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div className="shell flex min-h-[38rem] flex-col justify-center gap-[2.625rem] pt-32 pb-16">
          <div className="flex max-w-[50rem] flex-col gap-6">
            <Chip icon={Lightbulb} className="enter-fade">
              Expertise
            </Chip>
            <h1 className="title-xl">
              <SplitWords text="Six capabilities." /> <SplitWords text="One connected partner." offset={2} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[36rem]" style={d(0.5)}>
              Workflow, data and AI practices designed to work together — so the system you build this quarter still
              fits the one you need next year.
            </p>
          </div>
          <div className="enter-fade flex flex-wrap gap-3" style={d(0.65)}>
            <ButtonLink href="/contact">Book a consultation</ButtonLink>
            <ButtonLink href="#services" variant="outline">
              Browse services
            </ButtonLink>
          </div>
        </div>
      </section>
      <Expertise withBullets />
      <Delivery steps={defaultProcess} title="How we work" chip="Approach" />
      <div className="pt-[clamp(4.5rem,8vw,6.25rem)]">
        <CtaBand title="Not sure where to start?" sub="Book a free assessment and we'll map the first, highest-value step." />
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
