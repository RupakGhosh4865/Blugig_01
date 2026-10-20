import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FaqSection } from "@/components/sections/FaqSection";
import { Capabilities } from "@/components/sections/service/Capabilities";
import { CaseHighlight } from "@/components/sections/service/CaseHighlight";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { Delivery } from "@/components/sections/service/Delivery";
import { NextService } from "@/components/sections/service/NextService";
import { Outcomes } from "@/components/sections/service/Outcomes";
import { Related } from "@/components/sections/service/Related";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { Tools } from "@/components/sections/service/Tools";
import { UseCases } from "@/components/sections/service/UseCases";
import { caseStudies } from "@/content/caseStudies";
import { defaultProcess, getNextService, getService, services } from "@/content/services";
import { breadcrumbJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";

/** All six service pages are fully prerendered; unknown slugs fall through to notFound(). */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.seo.title, description: service.seo.description, url: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const next = getNextService(service.slug);
  const caseStudy = caseStudies.find((c) => c.service === service.slug);

  return (
    <>
      <ScrollProgress />
      <ServiceHero service={service} />
      <Outcomes service={service} />
      <Capabilities service={service} />
      <Delivery steps={service.process ?? defaultProcess} />
      <UseCases service={service} />
      <Tools tools={service.tools} />
      {caseStudy ? <CaseHighlight caseStudy={caseStudy} /> : null}
      <FaqSection items={service.faqs} title={`${service.shortName} FAQ`} />
      <Related service={service} />
      <CtaBand title={`Ready to talk ${service.shortName}?`} href={`/contact?service=${service.slug}`} />
      <NextService current={service} next={next} />
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
