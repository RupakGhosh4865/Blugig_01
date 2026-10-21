import { ArrowUpRight, Award, Compass, Handshake, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { DrawIcon } from "@/components/icons/DrawIcon";
import { CardZoom } from "@/components/motion/CardZoom";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { ParticleField } from "@/components/three/ParticleField";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCta, aboutHero, focus, partnerBand, story, values } from "@/content/about";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Avantra Technologies is a Mitti implementation partner — thoughtful implementation, practical training and ongoing improvement for operations teams.",
  alternates: { canonical: "/about" },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const valueTones = ["bg-white", "bg-sky-500 text-ink", "bg-blue-600 text-white", "bg-navy text-white"];

export default function AboutPage() {
  const leadCount = aboutHero.titleLead.split(/\s+/).length;
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div className="shell flex min-h-[40rem] flex-col justify-center gap-6 pt-32 pb-16">
          <Chip icon={Compass} className="enter-fade">
            {aboutHero.chip}
          </Chip>
          <h1 className="title-xl max-w-[56rem]">
            <SplitWords text={aboutHero.titleLead} />{" "}
            <SplitWords text={aboutHero.titleAccent} offset={leadCount} wordClassName="text-grad" />
          </h1>
          <p className="enter-fade text-l max-w-[36rem]" style={d(0.5)}>
            {aboutHero.sub}
          </p>
        </div>
      </section>

      <section className="section-y bg-white text-ink">
        <div className="shell flex flex-col items-center gap-12">
          <ScrollWords
            className="title-l max-w-[52rem] text-center"
            segments={[{ text: story.accent, className: "text-sky-800" }, { text: story.rest }]}
          />
          <Reveal className="grid max-w-[60rem] gap-6 md:grid-cols-2 md:gap-10">
            {story.paragraphs.map((p) => (
              <p key={p} className="text-l text-gray-700">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="values" className="section-y scroll-mt-16">
        <div className="shell">
          <Reveal>
            <SectionHeading chip={values.chip} icon={Award} lead={values.lead} accent={values.accent} />
          </Reveal>
          <div className="mt-[3.75rem] grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.items.map((v, i) => (
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
            <SectionHeading chip={focus.chip} icon={Users} lead={focus.lead} accent={focus.accent} />
          </Reveal>
          <ul className="mt-[3.75rem] grid gap-5 md:grid-cols-3">
            {focus.items.map((f) => (
              <li key={f.title}>
                <CardZoom className="h-full">
                  <Link
                    href={f.href}
                    className="group flex h-full min-h-[18rem] flex-col justify-between gap-10 rounded-[1.5rem] bg-canvas p-8 transition-colors duration-300 hover:bg-sky-50"
                  >
                    <div className="flex items-start justify-between">
                      <DrawIcon id={f.icon} className="size-10 text-blue-600" />
                      <span className="flex size-11 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:rotate-45 group-hover:border-sky-500 group-hover:bg-sky-500">
                        <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="title-s">{f.title}</h3>
                      <p className="text-m text-gray-600">{f.body}</p>
                    </div>
                  </Link>
                </CardZoom>
              </li>
            ))}
          </ul>
          <div className="mt-20 flex flex-col gap-6 border-t border-gray-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="title-s flex items-center gap-3">
              <Handshake aria-hidden className="size-7 text-blue-600" strokeWidth={1.4} />
              Partner ecosystem
            </p>
            <a
              href={site.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-m text-gray-600 transition-colors hover:text-ink"
            >
              We work alongside
              <span className="font-medium text-ink">
                {site.partner.name} — {site.partner.descriptor}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.6}
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex max-w-[32rem] flex-col gap-6">
            <Chip icon={Compass} tone="light">
              {partnerBand.chip}
            </Chip>
            <h2 className="title-l">
              {partnerBand.lead} <span className="text-sky-300">{partnerBand.highlight}</span> {partnerBand.rest}
            </h2>
            <p className="text-l text-blue-100">{partnerBand.sub}</p>
          </Reveal>
          <ParticleField
            shape="globe"
            blending="additive"
            colorA="#1d58c4"
            colorB="#9cc3ff"
            sparkle="#72a6fa"
            pointSize={3.6}
            opacity={0.9}
            density={0.7}
            className="mx-auto aspect-square w-full max-w-[34rem]"
          />
        </div>
      </section>

      <div className="pt-[clamp(4.5rem,8vw,6.25rem)]">
        <CtaBand title={aboutCta.title} sub={aboutCta.sub} label={aboutCta.label} href={aboutCta.href} />
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
