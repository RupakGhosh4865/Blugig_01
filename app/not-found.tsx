import type { Metadata } from "next";
import { ParticleField } from "@/components/three/ParticleField";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** 404 — scattered particles drifting slowly behind the message. */
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <ParticleField
        shape="scatter"
        pointSize={3}
        density={0.6}
        spin={0.03}
        interactive={false}
        className="absolute inset-0 -z-10 opacity-70"
      />
      <div className="shell flex flex-col items-center gap-10 pt-24 text-center">
        <p className="eyebrow text-gray-500">Error 404</p>
        <h1 className="title-xl max-w-[44rem]">
          This page drifted <span className="text-grad">off the grid.</span>
        </h1>
        <p className="text-l max-w-[30rem] text-gray-600">The link may be old, or the page may have moved.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/services" variant="outline">
            Explore services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
