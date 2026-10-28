import { Landmark } from "lucide-react";
import type { Metadata } from "next";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CardRow } from "@/components/sections/CardRow";
import { Approach } from "@/components/sections/home/Approach";
import { Gap } from "@/components/sections/home/Gap";
import { Capabilities } from "@/components/sections/service/Capabilities";
import { CtaBand } from "@/components/sections/service/CtaBand";
import { NextService } from "@/components/sections/service/NextService";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { governance, howCta, howHero, ownership, phases, readiness } from "@/content/howWeWork";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Implement Mitti: A 4-Phase Rollout Plan | Avantra",
  description:
    "Our Mitti implementation approach: discover, configure and validate, train and launch, then support and improve, with clear deliverables.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <>
      <ScrollProgress />
      <ServiceHero
        crumb="How we work"
        path="/how-we-work"
        eyebrow={howHero.eyebrow}
        lead={howHero.titleLead}
        accentText={howHero.titleAccent}
        summary={howHero.sub}
        primary={howHero.primary}
        secondary={howHero.secondary}
        shape="stream"
      />
      <Approach data={phases} />
      <Gap
        id="ownership"
        chip={ownership.chip}
        lead={ownership.titleLead}
        accent={ownership.titleAccent}
        sub={ownership.sub}
        lists={[
          { label: ownership.left.label, items: ownership.left.items, kind: "after" },
          { label: ownership.right.label, items: ownership.right.items, kind: "plain" },
        ]}
      />
      <Capabilities
        id="readiness"
        chip={readiness.chip}
        lead={readiness.title}
        sub={readiness.pilotTiming ? `${readiness.sub} Typical pilot: ${readiness.pilotTiming}.` : readiness.sub}
        items={readiness.items}
        feature={false}
      />
      <CardRow
        id="governance"
        chip={governance.chip}
        icon={Landmark}
        lead={governance.lead}
        accent={governance.accent}
        sub={governance.sub}
        items={governance.items}
        surface="white"
      />
      <CtaBand title={howCta.title} sub={howCta.sub} label={howCta.label} href={howCta.href} />
      <NextService
        href="/about"
        eyebrow="About"
        title="About Avantra"
        line="Technology works best when people can use it well."
        shape="stream"
        nextShape="orbit"
      />
    </>
  );
}
