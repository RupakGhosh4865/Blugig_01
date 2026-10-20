import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/FaqSection";
import { AgentSpotlight } from "@/components/sections/home/AgentSpotlight";
import { Approach } from "@/components/sections/home/Approach";
import { Expertise } from "@/components/sections/home/Expertise";
import { Gap } from "@/components/sections/home/Gap";
import { Hero } from "@/components/sections/home/Hero";
import { Impact } from "@/components/sections/home/Impact";
import { Momentum } from "@/components/sections/home/Momentum";
import { Platforms } from "@/components/sections/home/Platforms";
import { Statement } from "@/components/sections/home/Statement";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Wins } from "@/components/sections/home/Wins";
import { homeFaqs } from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Section order follows zig.ai: hero → before/after → scrubbed statement →
 * logo loop → bento → impact circles → wins venn (black) → steps (yellow) →
 * wheel → navy band → FAQ → footer CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Gap />
      <Statement />
      <Platforms />
      <Expertise />
      <Impact />
      <Wins />
      <Approach />
      <Momentum />
      <AgentSpotlight />
      <Testimonials />
      <FaqSection items={homeFaqs} />
    </>
  );
}
