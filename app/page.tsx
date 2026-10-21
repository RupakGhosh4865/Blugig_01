import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Industries } from "@/components/sections/Industries";
import { Approach } from "@/components/sections/home/Approach";
import { Hero } from "@/components/sections/home/Hero";
import { MittiStrip } from "@/components/sections/home/MittiStrip";
import { Statement } from "@/components/sections/home/Statement";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhatWeDo } from "@/components/sections/home/WhatWeDo";
import { homeCta, homeFaqs, homeIndustries } from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home: hero → Mitti strip → scrubbed statement → what we do → pinned approach
 * (brand-blue zone) → industries → testimonials (hidden while empty) → FAQ → CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MittiStrip />
      <Statement />
      <WhatWeDo />
      <Approach />
      <Industries chip={homeIndustries.chip} title={homeIndustries.title} sub={homeIndustries.sub} />
      <Testimonials />
      <FaqSection items={homeFaqs} className="bg-white py-[clamp(5rem,8vw,6.25rem)] text-ink" />
      <CtaBand title={homeCta.title} label={homeCta.label} href={homeCta.href} />
    </>
  );
}
