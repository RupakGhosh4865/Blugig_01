/**
 * Service content — BUILD_SPEC §11. All copy is DRAFT for owner review.
 * FAQ answers marked (draft) were written for layout where the spec only gave questions.
 */
export type ServiceVisual = "grid" | "shield" | "bars" | "stream" | "migrate" | "wave";
export type ServiceIcon = "sheet" | "shield" | "chart" | "pipeline" | "migrate" | "agent";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortName: string;
  cardLine: string;
  headline: string;
  /** Trailing words of `headline` rendered with the brand gradient (zig .text--grad). */
  headlineAccent?: string;
  summary: string;
  accent: string;
  accentB?: string;
  visual: ServiceVisual;
  icon: ServiceIcon;
  outcomes: string[];
  capabilities: { title: string; body: string }[];
  process?: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "smartsheet-consulting",
    number: "01",
    title: "Smartsheet Consulting",
    shortName: "Smartsheet",
    cardLine: "Workflows, dashboards, and automation.",
    headline: "Smartsheet, built around how your teams actually work.",
    headlineAccent: "how your teams actually work.",
    summary:
      "From a first workspace to an enterprise-wide PMO, we design Smartsheet solutions people adopt — structured sheets, automated workflows, and dashboards leadership trusts.",
    accent: "#2F7BFF",
    visual: "grid",
    icon: "sheet",
    outcomes: [
      "One source of truth for every project",
      "Less status-chasing, more doing",
      "Real-time portfolio visibility",
      "Governance that scales with you",
    ],
    capabilities: [
      {
        title: "Solution architecture & workspace design",
        body: "Sheets, reports and workspaces structured around your real process, so the system stays clean as it grows.",
      },
      {
        title: "Workflow automation & approvals",
        body: "Alerts, reminders, approvals and update requests that move work forward without chasing.",
      },
      {
        title: "Executive dashboards & reports",
        body: "Portfolio views leadership can open every morning and trust without a meeting.",
      },
      {
        title: "Portfolio / PMO setup (incl. Control Center)",
        body: "Standardised project intake, templates and roll-ups that keep every project consistent.",
      },
      {
        title: "Integrations",
        body: "Microsoft 365, Jira, Salesforce, Data Shuttle and Bridge — connected so data flows instead of being re-typed.",
      },
      {
        title: "Training, admin & governance support",
        body: "Role-based training, admin handover and governance so your team owns the solution.",
      },
    ],
    useCases: [
      {
        title: "PMO portfolio management",
        body: "Roll every project into one governed portfolio with consistent status, risks and milestones.",
      },
      {
        title: "Project intake & resource planning",
        body: "A single intake form that scores, routes and resources new requests automatically.",
      },
      {
        title: "Marketing & campaign operations",
        body: "Campaign calendars, asset approvals and launch checklists in one shared workspace.",
      },
      {
        title: "Field and construction project tracking",
        body: "Site schedules, punch lists and progress updates captured from the field in real time.",
      },
    ],
    tools: ["Smartsheet", "Control Center", "Data Shuttle", "Bridge", "Dynamic View", "Resource Management"],
    faqs: [
      {
        q: "Can you work with our existing Smartsheet setup?",
        a: "Yes — we usually start with a health check and fix what's there before building new.",
      },
      {
        q: "Do you train our team?",
        a: "Yes — role-based training and admin handover are part of every engagement.",
      },
      {
        q: "How long does an implementation take?",
        a: "It depends on scope; focused workflows can go live in weeks, enterprise rollouts are phased.",
      },
    ],
    related: ["power-bi-consulting", "data-migration", "agentic-ai"],
    seo: {
      title: "Smartsheet Consulting",
      description:
        "Smartsheet consulting for PMOs and operations teams — workspace design, workflow automation, Control Center and executive dashboards.",
    },
  },
  {
    slug: "safetyculture",
    number: "02",
    title: "Mitti by SafetyCulture",
    shortName: "SafetyCulture",
    cardLine: "Consulting for your operational needs.",
    headline: "Safer, smarter operations — from the frontline up.",
    headlineAccent: "from the frontline up.",
    summary:
      "We help operations teams roll out SafetyCulture so inspections, issues, and actions happen consistently — and leaders can finally see what's happening on the ground.",
    accent: "#3DDC97",
    visual: "shield",
    icon: "shield",
    outcomes: [
      "Consistent inspections across sites",
      "Faster corrective actions",
      "Audit-ready records",
      "Frontline visibility for leadership",
    ],
    capabilities: [
      {
        title: "Platform rollout & configuration",
        body: "Sites, groups, permissions and settings configured for how your operation is organised.",
      },
      {
        title: "Digital checklist & inspection templates",
        body: "Paper and spreadsheet checklists rebuilt as smart, scored inspection templates.",
      },
      {
        title: "Issue and action workflows",
        body: "Issues raised on site become owned, tracked actions with due dates and escalation.",
      },
      {
        title: "Asset & maintenance tracking",
        body: "Assets linked to inspections and maintenance schedules so nothing slips.",
      },
      {
        title: "Reporting and integrations",
        body: "SafetyCulture data flowing into Power BI, Smartsheet and other systems via APIs.",
      },
      {
        title: "Frontline training & adoption",
        body: "Practical, on-site friendly training that gets inspections done consistently.",
      },
    ],
    useCases: [
      { title: "Safety audits & compliance", body: "Standardised audits with evidence, scoring and follow-up actions in one record." },
      { title: "Quality inspections", body: "Consistent quality checks across shifts, lines and sites." },
      { title: "Facilities & asset maintenance", body: "Planned maintenance and asset checks scheduled and tracked to completion." },
      { title: "Multi-site operational checks", body: "The same standard applied everywhere, with a single view for leadership." },
    ],
    tools: ["SafetyCulture platform", "Power BI", "Smartsheet", "API integrations"],
    faqs: [
      {
        q: "Can you convert our paper checklists?",
        a: "Yes. We rebuild paper and spreadsheet checklists as digital templates with scoring, photos and required fields. (draft)",
      },
      {
        q: "Can SafetyCulture data flow into our dashboards?",
        a: "Yes. We connect SafetyCulture to Power BI and Smartsheet so inspection and action data shows up where leaders already look. (draft)",
      },
      {
        q: "How do you drive adoption with frontline teams?",
        a: "Short, practical training on site, simple templates and quick wins that make the app easier than paper. (draft)",
      },
    ],
    related: ["power-bi-consulting", "data-engineering", "smartsheet-consulting"],
    seo: {
      title: "SafetyCulture Consulting",
      description:
        "SafetyCulture rollout and consulting — digital inspections, issue and action workflows, asset tracking and reporting integrations.",
    },
  },
  {
    slug: "power-bi-consulting",
    number: "03",
    title: "Power BI Consulting",
    shortName: "Power BI",
    cardLine: "Clearer insights with focused Power BI reporting.",
    headline: "Reports people read. Insights people act on.",
    headlineAccent: "Insights people act on.",
    summary:
      "We turn scattered data into focused Power BI reporting — clean models, fast dashboards, and governed self-service your teams trust.",
    accent: "#F2C14E",
    visual: "bars",
    icon: "chart",
    outcomes: [
      "One version of the truth",
      "Faster, better-informed decisions",
      "Dashboards that load fast",
      "Governed self-service",
    ],
    capabilities: [
      { title: "Dashboard & report design", body: "Focused reports designed around the decisions people actually make." },
      { title: "Data modeling & DAX", body: "Clean star-schema models and measures that stay fast and maintainable." },
      {
        title: "Connectors",
        body: "Smartsheet, SafetyCulture, ERP, CRM and SQL sources brought into one model.",
      },
      { title: "Performance tuning", body: "Slow reports diagnosed and fixed — model, DAX and refresh." },
      { title: "Row-level security & governance", body: "People see exactly the data they should, nothing more." },
      {
        title: "Embedded analytics & Fabric readiness",
        body: "Reports embedded where people work, and a path to Microsoft Fabric.",
      },
    ],
    useCases: [
      { title: "Executive KPI scorecards", body: "One page leadership can trust for the numbers that matter." },
      { title: "Project portfolio analytics", body: "Portfolio health, budgets and risks across every project." },
      { title: "Operations & safety analytics", body: "Inspection, incident and action trends across sites." },
      { title: "Finance and sales reporting", body: "Revenue, margin and pipeline reporting from governed data." },
    ],
    tools: ["Power BI", "Microsoft Fabric", "Power Query", "DAX", "SQL"],
    faqs: [
      {
        q: "Can you fix slow reports we already have?",
        a: "Yes. We review the model, DAX and refresh setup, then fix the bottlenecks rather than rebuilding everything. (draft)",
      },
      {
        q: "Can Power BI read from Smartsheet?",
        a: "Yes. We connect Smartsheet (and SafetyCulture) data to Power BI with a refresh approach that fits your volume. (draft)",
      },
      {
        q: "Do you set up security so people only see their data?",
        a: "Yes. Row-level security and workspace governance are part of how we deliver. (draft)",
      },
    ],
    related: ["smartsheet-consulting", "safetyculture", "data-engineering"],
    seo: {
      title: "Power BI Consulting",
      description:
        "Power BI consulting — dashboard design, data modeling and DAX, performance tuning, row-level security and Microsoft Fabric readiness.",
    },
  },
  {
    slug: "data-engineering",
    number: "04",
    title: "Data Engineering",
    shortName: "Data Engineering",
    cardLine: "Reliable pipelines. Connected data.",
    headline: "Reliable pipelines. Connected data.",
    headlineAccent: "Connected data.",
    summary:
      "We build the plumbing that keeps your business data moving — pipelines, integrations, and warehouses that are monitored, documented, and easy to extend.",
    accent: "#5CE1FF",
    visual: "stream",
    icon: "pipeline",
    outcomes: [
      "Data that arrives on time, every time",
      "Systems that talk to each other",
      "Fewer manual exports and copy-paste",
      "Clear ownership and documentation",
    ],
    capabilities: [
      { title: "ETL/ELT pipeline design & build", body: "Pipelines that move and shape data reliably, on schedule." },
      { title: "Warehouse / lakehouse architecture", body: "A reporting-ready foundation designed for how you analyse." },
      { title: "API integrations between business apps", body: "Business systems connected so data stops being re-typed." },
      { title: "Data quality, monitoring & alerting", body: "Checks and alerts that catch problems before reports do." },
      { title: "Orchestration & automation", body: "Scheduled, dependency-aware runs with clear failure handling." },
      { title: "Documentation & handover", body: "Every pipeline documented so your team can own and extend it." },
    ],
    useCases: [
      { title: "Unifying project and finance data", body: "Project delivery and financials joined for true portfolio margin." },
      { title: "Syncing operational tools with BI", body: "Smartsheet and SafetyCulture data landing in your BI stack automatically." },
      { title: "Automating recurring data loads", body: "Monthly exports and copy-paste replaced with scheduled loads." },
      { title: "Building a reporting-ready warehouse", body: "One governed place for the data your reports depend on." },
    ],
    tools: ["[PLACEHOLDER: confirm stack]", "Azure Data Factory", "Microsoft Fabric", "SQL", "Python", "Power Automate", "n8n"],
    faqs: [
      {
        q: "Do we need a data warehouse?",
        a: "Not always. We'll recommend the lightest setup that meets your reporting and integration needs. (draft)",
      },
      {
        q: "Can you work with our existing tools?",
        a: "Yes. We build on your current platforms and licences wherever it makes sense. (draft)",
      },
      {
        q: "How do you monitor pipelines?",
        a: "With run logging, data-quality checks and alerts routed to the right owner. (draft)",
      },
    ],
    related: ["power-bi-consulting", "agentic-ai", "data-migration"],
    seo: {
      title: "Data Engineering",
      description:
        "Data engineering services — ETL/ELT pipelines, warehouse and lakehouse architecture, API integrations, data quality and monitoring.",
    },
  },
  {
    slug: "data-migration",
    number: "05",
    title: "Data Migration",
    shortName: "Data Migration",
    cardLine: "A clear path to modern systems.",
    headline: "A clear path to modern systems.",
    headlineAccent: "modern systems.",
    summary:
      "Moving platforms shouldn't mean losing data or momentum. We plan, clean, map, and validate every migration so your team starts day one on clean, trusted data.",
    accent: "#8B7CFF",
    visual: "migrate",
    icon: "migrate",
    outcomes: [
      "No data left behind",
      "Minimal disruption to the business",
      "Clean data on day one",
      "A documented, repeatable process",
    ],
    capabilities: [
      { title: "Migration assessment & planning", body: "Scope, risks and sequencing agreed before anything moves." },
      { title: "Data mapping, cleansing & transformation", body: "Fields mapped, duplicates removed and formats fixed on the way." },
      {
        title: "Platform-to-platform migrations",
        body: "Spreadsheets, MS Project and legacy PM tools → Smartsheet; legacy BI → Power BI.",
      },
      { title: "Validation & reconciliation", body: "Counts and spot-checks that prove nothing was lost." },
      { title: "Cutover planning", body: "A cutover plan that keeps the business running." },
      { title: "Post-migration support", body: "Hands-on support while teams settle into the new system." },
    ],
    useCases: [
      { title: "Spreadsheets to Smartsheet", body: "Scattered trackers consolidated into structured, connected sheets." },
      { title: "Legacy reporting to Power BI", body: "Old reports rebuilt as fast, governed Power BI dashboards." },
      { title: "Paper/legacy inspections to SafetyCulture", body: "Inspection history and templates moved into SafetyCulture." },
      { title: "System consolidation after a merger", body: "Overlapping systems merged into one clean platform." },
    ],
    tools: ["Smartsheet", "Power BI", "SafetyCulture", "SQL", "Python", "[PLACEHOLDER: confirm]"],
    faqs: [
      {
        q: "How do you make sure nothing is lost?",
        a: "Every migration includes reconciliation — record counts, field checks and sign-off before cutover. (draft)",
      },
      {
        q: "Will our teams have downtime?",
        a: "We plan cutovers to minimise disruption, often running old and new in parallel for a short period. (draft)",
      },
      {
        q: "Can you migrate in phases?",
        a: "Yes. Phased migrations are common and let teams adopt the new system step by step. (draft)",
      },
    ],
    related: ["smartsheet-consulting", "power-bi-consulting", "data-engineering"],
    seo: {
      title: "Data Migration",
      description:
        "Data migration services — assessment, mapping and cleansing, platform-to-platform migrations to Smartsheet and Power BI, validation and cutover.",
    },
  },
  {
    slug: "agentic-ai",
    number: "06",
    title: "Agentic AI & AI Agents",
    shortName: "Agentic AI",
    cardLine: "Practical intelligence for everyday work.",
    headline: "Practical intelligence for everyday work.",
    headlineAccent: "for everyday work.",
    summary:
      "We design AI agents that take real work off your team's plate — triaging requests, summarizing status, drafting reports — inside the tools you already use, with the right guardrails.",
    accent: "#2F7BFF",
    accentB: "#5CE1FF",
    visual: "wave",
    icon: "agent",
    outcomes: [
      "Hours of manual work removed",
      "Faster responses to requests",
      "Knowledge available on demand",
      "AI that's governed and auditable",
    ],
    capabilities: [
      { title: "AI opportunity assessment", body: "Where agents can safely remove work — prioritised by value and risk." },
      {
        title: "Custom agents for workflows",
        body: "Intake triage, status summaries and report drafting built around your process.",
      },
      {
        title: "AI inside Smartsheet, Power BI & Microsoft 365",
        body: "Agents that work where your team already works.",
      },
      { title: "Knowledge assistants over your documents", body: "Answers grounded in your policies, SOPs and project history." },
      {
        title: "Guardrails, security & human-in-the-loop",
        body: "Approval steps, access control and logging designed in from the start.",
      },
      { title: "Measurement & continuous improvement", body: "Clear metrics so agents get better, not just busier." },
    ],
    useCases: [
      { title: "Automated weekly status reports", body: "Status pulled from your sheets and drafted for leadership review." },
      { title: "Request intake triage and routing", body: "New requests classified, enriched and routed to the right owner." },
      { title: "Policy/SOP knowledge assistant", body: "Instant, sourced answers from your own documents." },
      { title: "Data quality checks with AI", body: "Anomalies and missing data flagged before they reach reports." },
    ],
    tools: ["[PLACEHOLDER: confirm]", "Claude", "Azure OpenAI", "Copilot Studio", "n8n", "Power Automate"],
    faqs: [
      {
        q: "Where do we start with AI?",
        a: "With one repetitive workflow and the data behind it. We assess, prototype and measure before scaling. (draft)",
      },
      {
        q: "Is our data safe?",
        a: "We design agents inside your environment with role-based access, logging and human approval steps. (draft)",
      },
      {
        q: "Will agents replace our team?",
        a: "No — they remove repetitive work so people focus on judgment.",
      },
    ],
    related: ["smartsheet-consulting", "data-engineering", "power-bi-consulting"],
    seo: {
      title: "Agentic AI & AI Agents",
      description:
        "Agentic AI consulting — custom AI agents for intake triage, status summaries and reporting inside Smartsheet, Power BI and Microsoft 365, with guardrails.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getNextService(slug: string) {
  const i = services.findIndex((s) => s.slug === slug);
  return services[(i + 1) % services.length];
}

export const defaultProcess = [
  { title: "Discover", body: "Map processes, data, and pain points." },
  { title: "Design", body: "Blueprint the solution and the outcomes." },
  { title: "Build", body: "Configure, integrate, automate, test." },
  { title: "Adopt & Scale", body: "Train teams, govern, improve." },
];
