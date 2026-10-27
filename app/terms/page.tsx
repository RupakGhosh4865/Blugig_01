import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms and conditions that apply when you use the Avantra Technologies website.",
  alternates: { canonical: "/terms" },
};

const entity = `${site.legalName}, a business of ${site.parentCompany}`;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      updated="23 October 2026"
      intro={[
        `These terms and conditions ("Terms") govern your use of this website, which is operated by ${entity}, ${site.address} ("Avantra", "we", "our" or "us").`,
        "By accessing or using the website you agree to these Terms. If you do not agree, please do not use the website. If you use the website on behalf of an organisation, you confirm that you are authorised to accept these Terms for it.",
      ]}
      sections={[
        {
          h: "About this website",
          body: [
            "This website gives general information about Avantra and the implementation, configuration, training, integration and support services we offer for Mitti (formerly SafetyCulture) and related Workato automations.",
            "Nothing on the website is an offer to provide services on particular terms. We provide services only under a separate written agreement — such as a proposal, statement of work or master services agreement. If that agreement conflicts with these Terms, the agreement prevails for those services.",
          ],
        },
        {
          h: "Using the website",
          body: [
            "You may use the website for lawful purposes, to learn about Avantra and to contact us. You must not:",
            [
              "Use the website in a way that breaks any applicable law or regulation, or infringes anyone's rights.",
              "Attempt to gain unauthorised access to the website, its servers or any connected system, or probe, scan or test their vulnerabilities.",
              "Interfere with or disrupt the website — for example by introducing malware or overloading it with requests.",
              "Use automated tools to scrape, copy or harvest content or data from the website in bulk, or use its content to build a competing service or train machine-learning models, without our written permission.",
              "Send spam, unsolicited promotions or misleading information through the contact form, or impersonate any person or organisation.",
              "Frame, mirror or present the website or its content as part of another site.",
            ],
            "We may restrict or block access to the website for anyone who breaches these Terms.",
          ],
        },
        {
          h: "Enquiries and communications",
          body: [
            "Please make sure the information you send through the contact form or by email is accurate and that you are entitled to share it. Submitting an enquiry does not create a client relationship or oblige either side to enter into an agreement.",
            "Please do not send confidential or commercially sensitive information until we have agreed appropriate terms, such as a non-disclosure agreement. We handle the personal data in your enquiry as described in our Privacy policy.",
          ],
        },
        {
          h: "Intellectual property",
          body: [
            `The website and its content — including text, graphics, illustrations, animations, page design, logos and the "Avantra" name — are owned by or licensed to ${site.parentCompany} and are protected by copyright, trademark and other laws.`,
            "You may view the website and print or download extracts for your own reference or to evaluate our services within your organisation. You must not otherwise copy, modify, republish, distribute or commercially exploit any part of it without our prior written consent.",
          ],
        },
        {
          h: "Third-party names and partner status",
          body: [
            "Mitti, SafetyCulture, Workato and the names of other products and systems shown on the website — for example SAP, Oracle NetSuite, Microsoft Dynamics 365, Salesforce, ServiceNow, Jira, Workday, BambooHR, Slack and Microsoft Teams — are trademarks of their respective owners. We use them only to identify those products and the systems our work can connect to.",
            "References to our Mitti and Workato partner credentials reflect our status in those programmes at the time of publication. Avantra is an independent company: we are not an agent of Mitti, SafetyCulture or Workato, and those platforms are provided under their own terms and conditions.",
          ],
        },
        {
          h: "Illustrative content",
          body: [
            "Dashboards, figures, activity feeds, workflows, timelines and examples on the website are illustrative. They show the kind of results and workflows a well-run implementation can support; they are not real customer data and are not a promise of specific outcomes. Actual scope, timing and results depend on each project and are agreed in writing.",
          ],
        },
        {
          h: "Links to other websites",
          body: [
            "The website may link to third-party websites and tools, such as LinkedIn, platform providers or a scheduling service. We do not control them and are not responsible for their content, availability or privacy practices. Your use of them is governed by their own terms.",
          ],
        },
        {
          h: "Disclaimer",
          body: [
            "We work to keep the website accurate and up to date, but its content is general information, not professional advice for your situation. The website is provided \"as is\" and \"as available\". To the fullest extent permitted by law, we make no warranties or representations — express or implied — about the website, including that it will be accurate, complete, uninterrupted, secure or free of errors or harmful components.",
          ],
        },
        {
          h: "Limitation of liability",
          body: [
            "To the fullest extent permitted by law, Avantra and its parent company, directors, employees and partners will not be liable for any indirect, incidental, special or consequential loss, or for any loss of profit, revenue, business, goodwill or data, arising from or in connection with your use of — or inability to use — the website or any content on it.",
            "To the fullest extent permitted by law, our total liability to you for any claim arising from your use of the website is limited to ₹10,000 (ten thousand Indian rupees). This section applies only to use of the website; liability for services is governed by the relevant services agreement.",
            "Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law.",
          ],
        },
        {
          h: "Indemnity",
          body: [
            "You agree to indemnify Avantra against claims, losses and reasonable costs (including legal fees) arising from your breach of these Terms or your misuse of the website.",
          ],
        },
        {
          h: "Privacy",
          body: [
            "Our Privacy policy explains how we collect and use personal data through the website. By using the website you acknowledge that policy.",
          ],
        },
        {
          h: "Changes to the website and these Terms",
          body: [
            "We may change, suspend or withdraw any part of the website at any time without notice. We may also update these Terms; the \"Last updated\" date shows the current version, and continuing to use the website after a change means you accept the updated Terms.",
          ],
        },
        {
          h: "Governing law and jurisdiction",
          body: [
            "These Terms are governed by the laws of India. The courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute arising from or in connection with these Terms or your use of the website.",
          ],
        },
        {
          h: "General",
          body: [
            "If any part of these Terms is found invalid or unenforceable, the rest remains in effect. Our failure to enforce any provision is not a waiver of our right to do so later. You may not transfer your rights under these Terms; we may transfer ours as part of a reorganisation, merger or sale of our business.",
          ],
        },
        {
          h: "Contact us",
          body: [
            `Questions about these Terms? Contact ${entity}:`,
            [`Email ${site.email} · Phone ${site.phones.join(" / ")} · ${site.address}`],
          ],
        },
      ]}
    />
  );
}
