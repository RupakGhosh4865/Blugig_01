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
import { approach, expertise, gap, homeFaqs } from "@/content/home";
import { services } from "@/content/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Section order follows zig.ai: hero → before/after → scrubbed statement →
 * logo loop → bento → impact circles → wins venn (ink) → steps (brand blue) →
 * wheel → navy band → FAQ → footer CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Gap
        chip={gap.chip}
        lead={gap.titleLead}
        accent={gap.titleAccent}
        sub={gap.sub}
        lists={[
          { label: "Before", items: gap.before, kind: "before", withLogo: true },
          { label: "After", items: gap.after, kind: "after", withLogo: true },
        ]}
      />
      <Statement />
      <Platforms />
      <Expertise
        chip={expertise.chip}
        lead={expertise.titleLead}
        accent={expertise.titleAccent}
        sub={expertise.sub}
        items={services.map((s) => ({
          key: s.slug,
          href: `/services#${s.slug}`,
          number: s.number,
          title: s.focus,
          body: s.cardLine,
          illustration: s.illustration,
        }))}
      />
      <Impact />
      <Wins />
      <Approach data={approach} />
      <Momentum />
      <AgentSpotlight />
      <Testimonials />
      <FaqSection items={homeFaqs} />
    </>
  );
}
