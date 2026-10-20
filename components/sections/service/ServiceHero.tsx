import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { HeroMotion } from "@/components/sections/home/HeroMotion";
import { ParticleField } from "@/components/three/ParticleField";
import { ButtonLink } from "@/components/ui/Button";
import type { Service } from "@/content/services";
import { alpha, shade } from "@/lib/color";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Service hero: zig hero layout, breadcrumb + mono eyebrow, accent-tinted particle shape on the right. */
export function ServiceHero({ service }: { service: Service }) {
  const accentText = service.headlineAccent ?? "";
  const lead = accentText && service.headline.endsWith(accentText)
    ? service.headline.slice(0, -accentText.length).trim()
    : service.headline;
  const leadCount = lead.split(/\s+/).length;

  return (
    <HeroMotion
      gridClassName="pt-28 pb-16 lg:min-h-[50rem] lg:pt-24 lg:pb-10"
      background={
        <>
          <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 -z-10 size-[48rem] translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${alpha(service.accent, 0.22)}, transparent 65%)` }}
          />
        </>
      }
      copy={
        <div className="flex max-w-[46.5rem] flex-col gap-[2.625rem]">
          <div className="flex flex-col gap-6">
            <nav aria-label="Breadcrumb" className="enter-fade">
              <ol className="text-s flex flex-wrap items-center gap-2 text-gray-500">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="hover:text-ink">
                    Services
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {service.title}
                </li>
              </ol>
            </nav>
            <p className="eyebrow enter-fade flex items-center gap-3 text-gray-600" style={d(0.05)}>
              <span aria-hidden className="size-2 rounded-full" style={{ background: service.accent }} />
              {service.number} / Service
            </p>
            <ViewTransition name={`service-title-${service.slug}`}>
              <h1 className="title-xl">
                <SplitWords text={lead} />
                {accentText ? (
                  <>
                    {" "}
                    <SplitWords text={accentText} offset={leadCount} wordClassName="text-grad" />
                  </>
                ) : null}
              </h1>
            </ViewTransition>
            <p className="enter-fade text-l max-w-[33.75rem]" style={d(0.5)}>
              {service.summary}
            </p>
          </div>
          <div className="enter-fade flex flex-wrap items-center gap-3" style={d(0.65)}>
            <ButtonLink href={`/contact?service=${service.slug}`}>Talk to a {service.shortName} specialist</ButtonLink>
            <ButtonLink href="#capabilities" variant="outline">
              See capabilities
            </ButtonLink>
          </div>
        </div>
      }
      visual={
        <div className="enter-fade relative mx-auto aspect-square w-full max-w-[38rem]" style={d(0.3)}>
          <ParticleField
            shape={service.visual}
            colorA={shade(service.accent, 0.22)}
            colorB="#13213d"
            sparkle="#f5c030"
            pointSize={3.3}
            density={0.85}
            className="absolute inset-0"
          />
        </div>
      }
    />
  );
}
