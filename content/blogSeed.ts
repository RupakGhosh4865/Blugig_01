import { DEFAULT_AUTHOR, type Post } from "@/lib/blog/post";

/**
 * Posts a brand-new blog store starts with (see lib/blog/store.ts). Edited and
 * deleted in /admin like any other post; changing this file only affects stores
 * created later.
 */
const content = `SafetyCulture is now Mitti. In August 2026 the company renamed its platform Mitti, and while the new name settles in you'll see it listed as "Mitti (by SafetyCulture)" or "Mitti (formerly SafetyCulture)". For teams that already run inspections, audits and corrective actions on it, the key point is simple: it's the same platform under a new name.

That doesn't mean there's nothing to do. A name touches every place your people meet the tool: training decks, SOPs, the app on their phones, the tile in your sign-in portal, integration runbooks and supplier records. If those still say SafetyCulture while announcements say Mitti, frontline teams lose time wondering whether they're using the right thing.

This guide covers what changed, what didn't, and a practical checklist for making the switch without disrupting inspections.

## SafetyCulture is now Mitti: what changed

The name and the brand changed. Mitti is the new name for the platform previously called SafetyCulture, and many teams still call its inspection app iAuditor, an earlier name. Trade coverage describes the rename as part of a [push into frontline operations software](https://itbrief.com.au/story/safetyculture-rebrands-as-mitti-in-frontline-software-push).

In practice, three names may now be in use inside one organisation: iAuditor, SafetyCulture and Mitti. Expect people to use all three for a while, and plan to make Mitti the default.

## What stays the same

A rename isn't a migration. There's no reason to rebuild templates, inspection schedules, actions or reports because the name changed, and no reason to pause a rollout that's under way.

What you should do is check the details for your own account. Read Mitti's official announcements and any notices in your account's admin area for anything specific to your plan, such as sign-in pages, app listings or support channels. Treat those notices as the source of truth over any third-party summary, including this one.

## A rename checklist for operations teams

Work through these in order. Most take minutes, and together they stop the "is this the right app?" questions before they start.

### 1. Tell frontline teams first

Use your next toolbox talk or shift briefing. One sentence covers it: "SafetyCulture is now called Mitti: same app, same inspections, new name." Say it before people notice a new name or icon on their device.

### 2. Update training materials and SOPs

Search your knowledge base, induction decks and work instructions for "SafetyCulture" and "iAuditor". Use "Mitti (formerly SafetyCulture)" the first time the platform appears in each document, and "Mitti" after that.

### 3. Check how the app appears on devices

If you manage phones and tablets with a device management tool, check how the app is listed there and in the app stores. Update app catalogue names and any instructions that tell people which app to open.

### 4. Rename the tile in your sign-in portal

If people reach the platform through single sign-on, such as Okta or Microsoft Entra ID, rename the app tile to match what they hear in training. Keep "SafetyCulture" in its description for a few months so searches inside the portal still find it.

### 5. Review integration names and runbooks

The people who support your integrations work from names and documents. Confirm with each integration's owner that connections are healthy after any account notices, then update connection labels, recipe names, alerts and runbooks so an engineer searching for "Mitti" finds them.

If you connect the platform to ServiceNow, SAP, Workday or Power BI through Workato, it's also a good moment to check that every recipe has an owner and an alert. Our [integrations page](/integrations) shows the flows we typically build.

### 6. Update supplier and procurement records

Finance, legal and procurement may hold the vendor under the old name. Ask your account contact how the name will appear on contracts and invoices, and note it against the existing supplier record so renewals don't stall on a mismatch.

## Use the rename to tighten your rollout

A rename is a natural pause point. While you update documents, check whether the setup still matches how you operate:

- **Templates:** are sites using the agreed inspection templates, or have local copies drifted?
- **Ownership:** does every action have a clear owner and due date, so findings get fixed rather than just recorded?
- **Reporting:** do managers see the few numbers they act on, or a dashboard nobody opens?
- **Adoption:** which sites inspect on schedule, and which have quietly gone back to paper?

If the answers are mixed, a short review pays for itself. Our [Mitti implementation services](/services) cover platform configuration, inspections and workflows, reporting and training, and [how we work](/how-we-work) explains the four phases we use, from discovery to ongoing improvement.

## How to talk about Mitti and SafetyCulture

For the next few months, use both names wherever it helps people find things:

- **In documents and emails:** "Mitti (formerly SafetyCulture)" on first mention, then "Mitti".
- **In internal search, tags and portals:** keep "SafetyCulture" and "iAuditor" as keywords, so old habits still lead to the right place.
- **In conversation:** just say Mitti. Most people connect it to SafetyCulture after hearing it once or twice.

## Need a hand with the switch?

Avantra Technologies is a Mitti implementation partner. We help operations teams plan, configure and roll out the platform, and connect it to the systems they already run. If you'd like a second pair of eyes on your setup while you make the change, [talk to our team](/contact).
`;

export const seedPosts: Post[] = [
  {
    id: "seed-safetyculture-is-now-mitti",
    slug: "safetyculture-is-now-mitti",
    previousSlugs: [],
    status: "published",
    title: "SafetyCulture is now Mitti: what the rename means for your teams",
    seoTitle: "SafetyCulture Is Now Mitti: What It Means for Your Teams",
    description:
      "SafetyCulture is now Mitti. What the rename means for teams already using the platform, plus a practical checklist to keep inspections on track.",
    excerpt:
      "Same platform, new name. What changed, what didn't, and a six-step checklist so your frontline teams aren't left wondering which app to open.",
    focusKeyword: "SafetyCulture is now Mitti",
    tags: ["Mitti", "SafetyCulture", "Rollout"],
    content,
    faqs: [
      { q: "Is Mitti the same as SafetyCulture?", a: "Yes. Mitti is the new name for SafetyCulture; it is the same platform." },
      { q: "When did SafetyCulture become Mitti?", a: "The rename was announced in August 2026." },
      {
        q: "Do we need to rebuild our templates or inspections?",
        a: "No. A rename isn't a migration. Check Mitti's official notices for anything specific to your account, then update the name in your own documents, portals and integrations.",
      },
      {
        q: "Should we still say SafetyCulture?",
        a: "For a few months, write \"Mitti (formerly SafetyCulture)\" on first mention so people and search tools connect the two names. In conversation, just say Mitti.",
      },
    ],
    author: DEFAULT_AUTHOR,
    noindex: false,
    canonicalUrl: "",
    publishedAt: "2026-10-28T09:00:00+05:30",
    createdAt: "2026-10-28T09:00:00+05:30",
    updatedAt: "2026-10-28T09:00:00+05:30",
  },
];
