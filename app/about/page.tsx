import { Award, Compass, Globe2, Users } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { ParticleField } from "@/components/three/ParticleField";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Blugig Global is a consulting partner for workflow, data and AI — Smartsheet, SafetyCulture, Power BI and the modern data stack.",
  alternates: { canonical: "/about" },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const values = [
  { title: "Platform depth", body: "Specialists in the tools you already use — not generalists learning on your time." },
  { title: "Outcome-first", body: "We start from the result you need, not the feature list." },
  { title: "Connected thinking", body: "Workflow, data and AI from one partner, designed as one system." },
  { title: "Built to last", body: "Training, documentation and governance so your team owns it." },
];
const valueTones = ["bg-white", "bg-gold-500 text-ink", "bg-blue-600 text-white", "bg-navy text-white"];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div className="shell flex min-h-[40rem] flex-col justify-center gap-6 pt-32 pb-16">
          <Chip icon={Compass} className="enter-fade">
            About Blugig
          </Chip>
          <h1 className="title-xl max-w-[56rem]">
            <SplitWords text="Consultants for the systems" />{" "}
            <SplitWords text="behind the work." offset={4} wordClassName="text-grad" />
          </h1>
          <p className="enter-fade text-l max-w-[36rem]" style={d(0.5)}>
            [PLACEHOLDER: company story — founding, who we serve, why connected workflow, data and AI matters.]
          </p>
        </div>
      </section>

      <section className="section-y bg-white text-ink">
        <div className="shell flex justify-center">
          <ScrollWords
            className="title-l max-w-[52rem] text-center"
            segments={[
              { text: "Our mission is to make", className: "text-gold-800" },
              { text: "complex operations simple to run, measure and improve." },
            ]}
          />
        </div>
      </section>

      <section className="section-y">
        <div className="shell">
          <Reveal>
            <SectionHeading chip="Values" icon={Award} lead="How we" accent="work with you" />
          </Reveal>
          <div className="mt-[3.75rem] grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <CardZoom key={v.title}>
                <article className={cn("flex h-full min-h-[18rem] flex-col justify-between gap-10 rounded-[1.5rem] p-8", valueTones[i])}>
                  <span className={cn("text-mono", valueTones[i].includes("text-white") ? "opacity-60" : "text-gray-500")}>
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="title-s">{v.title}</h3>
                    <p className="text-m">{v.body}</p>
                  </div>
                </article>
              </CardZoom>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white text-ink">
        <div className="shell">
          <Reveal>
            <SectionHeading chip="Team" icon={Users} lead="The people" accent="behind the work" sub="[PLACEHOLDER: team bios and photos]" />
          </Reveal>
          <ul className="mt-[3.75rem] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex flex-col gap-4">
                <div className="aspect-[4/5] rounded-[1.5rem] border border-dashed border-gray-300 bg-base" />
                <div>
                  <p className="title-xs">[PLACEHOLDER: Name]</p>
                  <p className="text-s text-gray-500">[PLACEHOLDER: Role]</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-20 flex flex-col gap-6 border-t border-gray-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="title-s">Partners & certifications</p>
            <p className="text-m text-gray-500">[PLACEHOLDER: partner tiers, certifications and badge files]</p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex max-w-[32rem] flex-col gap-6">
            <Chip icon={Globe2} tone="light">
              Global
            </Chip>
            <h2 className="title-l">Remote-first, global by default.</h2>
            <p className="text-l text-blue-100">
              We work with teams across time zones. [PLACEHOLDER: office and client regions]
            </p>
          </Reveal>
          <ParticleField
            shape="globe"
            blending="additive"
            colorA="#2f7bff"
            colorB="#5ce1ff"
            sparkle="#f5c030"
            pointSize={3.6}
            opacity={0.9}
            density={0.7}
            className="mx-auto aspect-square w-full max-w-[34rem]"
          />
        </div>
      </section>

      <div className="pt-[clamp(4.5rem,8vw,6.25rem)]">
        <CtaBand title="Let's build something that lasts." />
      </div>
    </>
  );
}
