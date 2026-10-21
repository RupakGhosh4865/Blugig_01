import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Avantra Technologies website.",
  alternates: { canonical: "/terms" },
};

const placeholder = "[PLACEHOLDER legal text — to be supplied by the owner's counsel.]";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="[PLACEHOLDER date]"
      sections={[
        { h: "Acceptance of terms", p: [placeholder] },
        { h: "Use of this website", p: [placeholder] },
        { h: "Intellectual property", p: [placeholder] },
        { h: "Disclaimers", p: [placeholder] },
        { h: "Limitation of liability", p: [placeholder] },
        { h: "Governing law", p: [placeholder] },
      ]}
    />
  );
}
