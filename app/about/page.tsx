import { ArrowUpRight, Handshake } from "lucide-react";
import type { Metadata } from "next";
import { IconBadge } from "@/components/icons/Icon";
import { AboutVisual } from "@/components/illustrations/PageVisuals";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Chip } from "@/components/ui/Chip";
import { aboutCta, aboutHero, focus, partnerBand, story, values } from "@/content/about";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Avantra Technologies is a Mitti implementation partner — thoughtful implementation, practical training and ongoing improvement for operations teams.",
  alternates: { canonical: "/about" },
};

function Rule() {
  return <span aria-hidden className="block h-0.5 w-10 rounded-full bg-blue-600" />;
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        path="/about"
        chip={aboutHero.chip}
        titleLead={aboutHero.titleLead}
        titleAccent={aboutHero.titleAccent}
        sub={aboutHero.sub}
        visual={<AboutVisual />}
      />

      {/* Partner band */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <svg
          aria-hidden
          className="absolute inset-y-0 right-0 -z-10 h-full w-[min(36rem,70%)]"
          viewBox="0 0 360 200"
          preserveAspectRatio="xMaxYMid slice"
          fill="none"
        >
          <path d="M150 150 200 60h70l-50 90Z" fill="#003fa9" />
          <path d="M215 110 260 30h60l-45 80Z" fill="#1d58c4" opacity="0.55" />
          <path d="M250 210 320 85h80l-70 125Z" stroke="#8cc8ff" strokeOpacity="0.35" />
        </svg>
        <div className="shell flex flex-col gap-4 py-[clamp(3.5rem,6vw,5rem)]">
          <Reveal className="flex flex-col gap-4">
            <h2 className="title-l max-w-[44rem]">
              {partnerBand.lead} <span className="text-sky-300">{partnerBand.highlight}</span> {partnerBand.rest}
            </h2>
            <p className="text-l max-w-[36rem] text-gray-300">{partnerBand.sub}</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-y bg-white">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal className="flex flex-col gap-7">
            <h2 className="title-l max-w-[30rem]">{story.title}</h2>
            <Rule />
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-6">
            {story.paragraphs.map((p) => (
              <p key={p} className="text-l text-gray-700">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="section-y scroll-mt-20">
        <div className="shell flex flex-col gap-12">
          <Reveal className="flex flex-col gap-7">
            <h2 className="title-l">{values.title}</h2>
            <Rule />
          </Reveal>
          <RevealGroup as="ul" className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {values.items.map((v) => (
              <RevealItem key={v.title} as="li" className="group flex items-start gap-6">
                <IconBadge name={v.icon} size="lg" tone="white" className="group-hover:bg-blue-600 group-hover:text-white" />
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="title-xs font-semibold">{v.title}</h3>
                  <p className="text-m text-gray-600">{v.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Focus */}
      <section className="section-y bg-white">
        <div className="shell flex flex-col gap-12">
          <Reveal className="flex flex-col gap-7">
            <h2 className="title-l">{focus.title}</h2>
            <Rule />
          </Reveal>
          <RevealGroup as="ul" className="grid gap-y-10 md:grid-cols-3">
            {focus.items.map((f, i) => (
              <RevealItem
                key={f.title}
                as="li"
                className={cn("flex gap-5 md:pr-8", i > 0 && "md:border-l md:border-gray-200 md:pl-8")}
              >
                <IconBadge name={f.icon} />
                <div className="flex flex-col gap-2">
                  <h3 className="title-xs font-semibold">{f.title}</h3>
                  <p className="text-m text-gray-600">{f.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Partner ecosystem */}
      <section className="section-y">
        <div className="shell">
          <Reveal>
            <div className="grid gap-8 rounded-[1.5rem] border border-gray-200 bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
              <div className="flex flex-col gap-5">
                <Chip icon={Handshake}>Partner ecosystem</Chip>
                <h2 className="title-m max-w-[38rem]">
                  We work alongside{" "}
                  <span className="text-grad">
                    {site.partner.name} — {site.partner.descriptor}
                  </span>
                  .
                </h2>
                <p className="text-l max-w-[38rem] text-gray-600">
                  Together we help operations teams plan, configure and adopt Mitti — so every rollout is practical,
                  supported and built to last.
                </p>
              </div>
              <a
                href={site.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-blue-600 px-7 py-3.5 text-base font-medium text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
              >
                Visit {site.partner.name}
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title={aboutCta.title} sub={aboutCta.sub} label={aboutCta.label} href={aboutCta.href} />
    </>
  );
}
