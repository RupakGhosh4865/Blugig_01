import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Avantra Technologies collects, uses, shares and protects personal data, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
};

const entity = `${site.legalName}, a business of ${site.parentCompany}`;
const contactLine = `Email ${site.email} · Phone ${site.phones.join(" / ")} · ${site.address}`;

/**
 * Written to match how this site actually handles data: the contact form, Railway hosting
 * logs, no analytics, self-hosted fonts and the optional booking tool. Update it if analytics
 * or other third-party scripts are added.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="23 October 2026"
      intro={[
        `This privacy policy explains how ${entity} ("Avantra", "we", "our" or "us") collects, uses, shares and protects personal data when you visit this website or contact us through it, and the choices and rights you have.`,
        "We process personal data in line with India's Digital Personal Data Protection Act, 2023 (the \"DPDP Act\"), the Information Technology Act, 2000 and the rules made under it. Where other data protection laws apply to you — for example the EU or UK GDPR — we also respect the rights those laws give you.",
      ]}
      sections={[
        {
          h: "Who we are",
          body: [
            `${site.legalName} is a business of ${site.parentCompany}, based in ${site.address}. We help organisations plan, configure, integrate, roll out and improve Mitti (formerly SafetyCulture), including Workato-based integrations.`,
            "For the personal data described in this policy, we decide why and how it is processed, so we act as the data fiduciary (or \"controller\") for it.",
            "This policy covers this website and enquiries made through it. It does not cover the Mitti or Workato platforms themselves, which are governed by their providers' own privacy notices, or client data we handle while delivering a project, which is governed by the agreement with that client.",
          ],
        },
        {
          h: "Information we collect",
          body: [
            "Information you give us:",
            [
              "Contact form details — your name, work email address, company, the topic you choose, your message and, if you tell us, how you heard about us.",
              "Anything you share when you email, call or message us, or when you book or attend a call with our team.",
            ],
            "Information collected automatically when you use the site:",
            [
              "Technical and security data — your IP address, browser user agent, the pages requested and request times, recorded in server logs by our hosting provider to deliver and protect the site. When you submit the contact form, your IP address is also used briefly to limit repeated submissions and block spam.",
              "We do not currently use analytics, advertising or tracking tools on this website. If we introduce them, we will update this policy first.",
            ],
            "Please don't send us sensitive personal data — such as financial details, passwords, health or biometric information — through the contact form or by email. We don't need it to respond to an enquiry.",
          ],
        },
        {
          h: "How we use your information",
          body: [
            "We use personal data only for these purposes:",
            [
              "To reply to your enquiry and continue the conversation you started.",
              "To arrange and hold discovery calls and meetings, and to prepare proposals or estimates you ask for.",
              "To deliver services and manage the relationship if you or your organisation become a client.",
              "To operate and maintain the website, and to diagnose technical problems.",
              "To keep the site and our systems secure, and to prevent spam, fraud and abuse.",
              "To meet our legal, tax, accounting and regulatory obligations, and to establish or defend legal claims.",
            ],
            "We don't sell personal data, we don't use it for third-party advertising, and we don't make decisions about you based solely on automated processing.",
          ],
        },
        {
          h: "Our grounds for processing",
          body: [
            "When you submit the contact form, email or call us, you give us your consent to use the details you share to respond to you and follow up on your request. You can withdraw that consent at any time by writing to us (see \"Contact us\"); this does not affect processing that took place before you withdrew it.",
            "We also process personal data for legitimate uses the law allows — for example to respond to information you have voluntarily provided for a specific purpose, to comply with a legal obligation, or in connection with a contract with you.",
            "If the GDPR applies to you, our legal bases are your consent, steps taken at your request before entering into a contract, our legitimate interests in running and securing our business and website, and compliance with legal obligations.",
          ],
        },
        {
          h: "Cookies and similar technologies",
          body: [
            "We do not use analytics, advertising or cross-site tracking cookies. The fonts on this site are served from our own domain rather than loaded from a third-party font service.",
            "Your browser may store a small amount of strictly necessary data so the site works properly. If you choose to book a call through an embedded scheduling tool, that provider may set its own cookies, as described in its privacy notice.",
          ],
        },
        {
          h: "Who we share information with",
          body: [
            "We share personal data only where needed for the purposes above, and only with:",
            [
              "Our hosting provider, which runs this website and its servers (Railway Corporation).",
              "Providers we use to deliver enquiries to our team and manage our communications — such as email delivery, workflow automation, scheduling and business productivity tools.",
              "Our professional advisers, such as lawyers, auditors and accountants, under duties of confidentiality.",
              "Courts, regulators, law enforcement or other public authorities, where we are required by law or need to protect our rights, our clients or the public.",
              "A buyer or successor, if our business or assets are reorganised, merged or sold — in which case we will tell you before your data becomes subject to a different privacy policy.",
            ],
            "Our service providers may use personal data only on our instructions and must keep it secure and confidential. We don't share your enquiry with Mitti, SafetyCulture or Workato unless you ask us to, or it is needed to deliver a service you have agreed to (for example, arranging platform licences).",
          ],
        },
        {
          h: "International transfers",
          body: [
            "Some of our service providers store or process data outside India, including in the United States. Where personal data is transferred abroad, we do so only as permitted by applicable law — including any restrictions notified by the Government of India under the DPDP Act — and with contractual and security safeguards appropriate to the data.",
          ],
        },
        {
          h: "How long we keep information",
          body: [
            [
              "Enquiries and related correspondence: for as long as we need them to respond and follow up, and no longer than 24 months after our last contact with you — unless you become a client.",
              "Client records: for the duration of the relationship and afterwards for the periods required by law, for example for tax and accounting records.",
              "Rate-limiting data (IP addresses checked when the form is submitted): held only in server memory for a few minutes.",
              "Hosting and security logs: for the short periods our hosting provider keeps them to operate and secure the service.",
            ],
            "When we no longer need personal data, we delete it or anonymise it.",
          ],
        },
        {
          h: "How we protect information",
          body: [
            "We follow reasonable security practices and procedures, as required by section 43A of the Information Technology Act, 2000 and the related rules. These include encrypting traffic to and from the site (HTTPS), limiting access to personal data to the people who need it, using reputable providers with strong security commitments, and protecting the contact form against automated abuse.",
            "No method of transmission or storage is completely secure. If a personal data breach occurs, we will notify the Data Protection Board of India and the people affected where the law requires it.",
          ],
        },
        {
          h: "Your rights",
          body: [
            "Under the DPDP Act you can:",
            [
              "Ask for a summary of the personal data we hold about you and how we process it, and the identities of those we have shared it with.",
              "Ask us to correct, complete or update inaccurate or incomplete data.",
              "Ask us to erase your personal data, where we no longer need to keep it for the purpose it was collected or for a legal reason.",
              "Withdraw your consent at any time.",
              "Have your grievances addressed by us, and nominate another person to exercise your rights if you die or become incapacitated.",
            ],
            "If the GDPR applies to you, you can also ask us to restrict or stop certain processing, object to processing based on our legitimate interests, receive your data in a portable format, and complain to your local supervisory authority.",
            `To exercise any of these rights, email ${site.email}. We may need to verify your identity before acting on a request, and we aim to respond within 30 days.`,
          ],
        },
        {
          h: "Children",
          body: [
            "This website and our services are intended for businesses and professionals. They are not directed at children (people under 18), and we do not knowingly collect children's personal data. If you believe a child has sent us personal data, contact us and we will delete it.",
          ],
        },
        {
          h: "Links to other websites",
          body: [
            "This site links to other websites and services, such as LinkedIn, Mitti and Workato. Their privacy practices are governed by their own policies, and we encourage you to read them.",
          ],
        },
        {
          h: "Contact us and grievances",
          body: [
            `For any question, request or complaint about this policy or your personal data, contact our Grievance Officer at ${entity}:`,
            [contactLine],
            "We will acknowledge your message promptly and aim to resolve grievances within one month. If you are not satisfied with our response, you may approach the Data Protection Board of India once it is available to you, or the authority that applies where you live.",
          ],
        },
        {
          h: "Changes to this policy",
          body: [
            "We may update this policy as our services, the law or our practices change. The \"Last updated\" date at the top shows when it was last revised. If we make significant changes, we will highlight them on this website.",
          ],
        },
      ]}
    />
  );
}
