import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Avantra Technologies collects, uses and protects personal information.",
  alternates: { canonical: "/privacy" },
};

const placeholder = "[PLACEHOLDER legal text — to be supplied by the owner's counsel.]";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="[PLACEHOLDER date]"
      sections={[
        { h: "Who we are", p: [placeholder] },
        { h: "Information we collect", p: [placeholder] },
        { h: "How we use information", p: [placeholder] },
        { h: "Analytics", p: ["This site uses privacy-friendly Vercel Analytics and Speed Insights. " + placeholder] },
        { h: "Your rights", p: [placeholder] },
        { h: "Contact", p: [placeholder] },
      ]}
    />
  );
}
