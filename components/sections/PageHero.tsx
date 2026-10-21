import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { HeroMotion } from "@/components/sections/home/HeroMotion";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Inner-page hero: breadcrumb → eyebrow → split-word title with a gradient tail →
 * sub → CTA, with an illustrative visual on the right. Emits BreadcrumbList JSON-LD.
 */
export function PageHero({
  crumb,
  path,
  chip,
  titleLead,
  titleAccent,
  sub,
  cta,
  visual,
}: {
  crumb: string;
  path: string;
  chip: string;
  titleLead: string;
  titleAccent: string;
  sub: string;
  cta?: { label: string; href: string };
  visual: ReactNode;
}) {
  const leadCount = titleLead.split(/\s+/).length;
  return (
    <>
      <HeroMotion
        gridClassName="pt-28 pb-16 lg:min-h-[44rem] lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pt-28 lg:pb-12"
        background={
          <>
            <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[46rem] rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(29,88,196,0.18), transparent 65%)" }}
            />
          </>
        }
        copy={
          <div className="flex max-w-[44rem] flex-col gap-[2.375rem]">
            <div className="flex flex-col gap-6">
              <nav aria-label="Breadcrumb" className="enter-fade">
                <ol className="text-s flex flex-wrap items-center gap-2 text-gray-500">
                  <li>
                    <Link href="/" className="transition-colors hover:text-blue-600">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page" className="text-ink">
                    {crumb}
                  </li>
                </ol>
              </nav>
              <Chip className="enter-fade">{chip}</Chip>
              <h1 className="title-xl">
                <SplitWords text={titleLead} />{" "}
                <SplitWords text={titleAccent} offset={leadCount} wordClassName="text-grad" />
              </h1>
              <p className="enter-fade text-l max-w-[34rem] text-gray-700" style={d(0.5)}>
                {sub}
              </p>
            </div>
            {cta ? (
              <div className="enter-fade" style={d(0.65)}>
                <ButtonLink href={cta.href} className="group">
                  {cta.label}
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
                </ButtonLink>
              </div>
            ) : null}
          </div>
        }
        visual={
          <div className="enter-fade" style={d(0.3)}>
            {visual}
          </div>
        }
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
