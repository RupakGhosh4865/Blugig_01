import Link from "next/link";
import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { HeroMotion } from "@/components/sections/home/HeroMotion";
import { ParticleField } from "@/components/three/ParticleField";
import { ButtonLink } from "@/components/ui/Button";
import { alpha, shade } from "@/lib/color";
import type { ShapeName } from "@/lib/three/shapes";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** A hero button link; an external one (e.g. Calendly) opens in a new tab. */
type HeroLink = { label: string; href: string; external?: boolean };

const linkProps = ({ href, external }: HeroLink) =>
  external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

/**
 * Service-template hero: zig hero layout, breadcrumb + mono eyebrow, accent-tinted
 * particle shape on the right. Used by the Solutions, Integrations and How-we-work pages.
 */
export function ServiceHero({
  crumb,
  path,
  eyebrow,
  lead,
  accentText,
  summary,
  primary,
  secondary,
  shape,
  accent = "#0a80fb",
  children,
}: {
  crumb: string;
  path: string;
  eyebrow: string;
  lead: string;
  accentText: string;
  summary: string;
  primary: HeroLink;
  secondary: HeroLink;
  shape: ShapeName;
  accent?: string;
  /** Extra content under the buttons (e.g. a partner card). */
  children?: React.ReactNode;
}) {
  const leadCount = lead.split(/\s+/).length;

  return (
    <>
      <HeroMotion
        gridClassName="pt-28 pb-16 lg:min-h-[50rem] lg:pt-24 lg:pb-10"
        background={<HeroBackdrop accent={accent} />}
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
                  <li aria-current="page" className="text-ink">
                    {crumb}
                  </li>
                </ol>
              </nav>
              <p className="eyebrow enter-fade flex items-center gap-3 text-gray-600" style={d(0.05)}>
                <span aria-hidden className="size-2 rounded-full" style={{ background: accent }} />
                {eyebrow}
              </p>
              <h1 className="title-xl">
                <SplitWords text={lead} /> <SplitWords text={accentText} offset={leadCount} wordClassName="text-grad" />
              </h1>
              <p className="enter-fade text-l max-w-[33.75rem]" style={d(0.5)}>
                {summary}
              </p>
            </div>
            <div className="enter-fade flex flex-wrap items-center gap-3" style={d(0.65)}>
              <ButtonLink {...linkProps(primary)}>{primary.label}</ButtonLink>
              <ButtonLink {...linkProps(secondary)} variant="outline">
                {secondary.label}
              </ButtonLink>
            </div>
            {children ? (
              <div className="enter-fade" style={d(0.8)}>
                {children}
              </div>
            ) : null}
          </div>
        }
        visual={<HeroParticles shape={shape} accent={accent} />}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: crumb, path },
        ])}
      />
    </>
  );
}

/** Hero background: hairline rays plus an accent glow behind the particle shape (top right). */
export function HeroBackdrop({ accent = "#0a80fb" }: { accent?: string }) {
  return (
    <>
      <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 -z-10 size-[48rem] translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${alpha(accent, 0.22)}, transparent 65%)` }}
      />
    </>
  );
}

/** The hero's particle shape: accent-tinted near points fading to navy, in a square that fills the visual column. */
export function HeroParticles({ shape, accent = "#0a80fb" }: { shape: ShapeName; accent?: string }) {
  return (
    <div className="enter-fade relative mx-auto aspect-square w-full max-w-[38rem]" style={d(0.3)}>
      <ParticleField
        shape={shape}
        colorA={shade(accent, 0.22)}
        colorB="#041c42"
        sparkle="#29b9fa"
        pointSize={3.3}
        density={0.85}
        className="absolute inset-0"
      />
    </div>
  );
}
