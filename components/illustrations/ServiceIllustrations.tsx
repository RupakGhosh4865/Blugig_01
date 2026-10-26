import { ArrowRight, Check, Flag, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import mittiLogo from "@/public/brand/mitti-logo.png";

export type IllustrationId = "plan" | "settings" | "tablet" | "chart" | "team" | "refresh";

/**
 * zig's bento cards carry small product figures. These are illustrative UI
 * mock-ups built in markup (decorative, aria-hidden) — one per service. They
 * are generic rollout screens, not reproductions of the Mitti product UI.
 */
export function ServiceIllustration({ id, className }: { id: IllustrationId; className?: string }) {
  const map = {
    plan: SheetMock,
    settings: PipelineMock,
    tablet: InspectionMock,
    chart: ChartMock,
    team: MigrationMock,
    refresh: AgentMock,
  } as const;
  const Comp = map[id];
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <Comp />
    </div>
  );
}

const pill = "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-none";

function SheetMock() {
  const rows = [
    { name: "Template build", who: "AM", status: "On track", tone: "bg-[#dcf5e8] text-[#157f4b]", pct: 72 },
    { name: "Pilot — North site", who: "JR", status: "At risk", tone: "bg-[#fde2dd] text-[#b4321f]", pct: 45 },
    { name: "Discovery workshop", who: "SK", status: "Done", tone: "bg-blue-100 text-blue-800", pct: 100 },
  ];
  return (
    <div className="relative w-[min(27rem,100%)]">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-[11px] text-ink">
        <div className="grid grid-cols-[1.7fr_0.5fr_0.9fr_1fr] gap-2 px-2 pb-2 font-mono text-[9px] tracking-[0.14em] text-gray-500 uppercase">
          <span>Rollout task</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Progress</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-[1.7fr_0.5fr_0.9fr_1fr] items-center gap-2 rounded-lg bg-white px-2 py-2.5">
              <span className="truncate font-medium">{r.name}</span>
              <span className="flex size-6 items-center justify-center rounded-full bg-sky-100 text-[9px] font-semibold text-sky-900">{r.who}</span>
              <span className={cn(pill, r.tone, "w-fit")}>{r.status}</span>
              <span className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <span className="block h-full rounded-full bg-blue-500" style={{ width: `${r.pct}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-5 right-2 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] text-ink shadow-[0_12px_30px_-8px_rgba(4,28,66,0.25)]">
        <span className="flex size-5 items-center justify-center rounded-full bg-sky-500">
          <Zap className="size-3" strokeWidth={2} />
        </span>
        Alert owner when <b className="font-semibold">At risk</b>
      </div>
    </div>
  );
}

function InspectionMock() {
  const items = [
    { t: "PPE worn by all crew", ok: true },
    { t: "Fire exits clear", ok: true },
    { t: "Forklift guard secured", ok: false },
  ];
  return (
    <div className="w-[min(25rem,100%)] rounded-2xl bg-white p-4 text-[12px] text-ink shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Site inspection</p>
          <p className="text-[11px] text-gray-500">North yard · Daily</p>
        </div>
        <div
          className="flex size-12 items-center justify-center rounded-full text-[11px] font-semibold"
          style={{ background: "conic-gradient(#0a80fb 0 86%, #e7ebf2 86% 100%)" }}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-white">86%</span>
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {items.map((i) => (
          <li key={i.t} className="flex items-center justify-between rounded-lg bg-canvas px-2.5 py-2">
            <span className="flex items-center gap-2">
              <span className={cn("flex size-4 items-center justify-center rounded-full", i.ok ? "bg-blue-600 text-white" : "bg-[#fde2dd] text-[#b4321f]")}>
                {i.ok ? <Check className="size-2.5" strokeWidth={3} /> : <Flag className="size-2.5" strokeWidth={2.5} />}
              </span>
              {i.t}
            </span>
            {i.ok ? null : <span className={cn(pill, "bg-sky-500 text-ink")}>Action created</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartMock() {
  const bars = [38, 52, 46, 64, 58, 78, 92];
  return (
    <div className="w-[min(26rem,100%)] rounded-2xl bg-white p-4 text-[11px] text-ink shadow-[0_20px_40px_-18px_rgba(6,90,168,0.45)]">
      <p className="mb-2 flex justify-end">
        <span className="rounded-full bg-canvas px-2 py-0.5 font-mono text-[9px] tracking-wide text-gray-500 uppercase">Illustrative</span>
      </p>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Checks done", "94%"],
          ["Open actions", "12"],
          ["Overdue", "3"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-canvas px-2.5 py-2">
            <p className="text-[10px] text-gray-500">{k}</p>
            <p className="text-[18px] leading-tight font-medium tracking-[-0.03em]">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-24 items-end gap-2 border-b border-gray-200 px-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-blue-600" : "bg-ink/85")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between px-1 font-mono text-[9px] text-gray-500">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function PipelineMock() {
  const left = ["Sites", "Teams", "Roles"];
  const right = ["Templates", "Schedules", "Permissions"];
  const chip = "flex h-9 w-[6.5rem] items-center rounded-lg bg-blue-50 px-3 text-[11px] font-medium text-ink";
  return (
    <div className="relative grid w-[min(26rem,100%)] grid-cols-[auto_1fr_auto_1fr_auto] items-center">
      <div className="flex flex-col gap-3">
        {left.map((l) => (
          <span key={l} className={chip}>
            {l}
          </span>
        ))}
      </div>
      <Connector />
      <div className="flex flex-col items-center gap-1 rounded-xl bg-white px-3 py-3 shadow-[0_12px_30px_-8px_rgba(4,28,66,0.25)]">
        <Image src={mittiLogo} alt="" width={60} height={23} className="h-auto w-15" />
        <span className="text-[10px] font-medium text-ink">Mitti account</span>
      </div>
      <Connector />
      <div className="flex flex-col gap-3">
        {right.map((l) => (
          <span key={l} className={cn(chip, "bg-sky-50")}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <svg viewBox="0 0 60 120" className="h-[7.5rem] w-full" fill="none" preserveAspectRatio="none">
      <g stroke="#b4bdcc" strokeDasharray="3 4" vectorEffect="non-scaling-stroke">
        <path d="M0 18 C30 18 30 60 60 60" vectorEffect="non-scaling-stroke" />
        <path d="M0 60 L60 60" vectorEffect="non-scaling-stroke" />
        <path d="M0 102 C30 102 30 60 60 60" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

function MigrationMock() {
  return (
    <div className="w-[min(26rem,100%)] text-[11px] text-ink">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-1.5 rounded-xl border border-dashed border-gray-300 bg-canvas p-3">
          <p className="font-mono text-[9px] tracking-[0.14em] text-gray-500 uppercase">Paper</p>
          <span className="rounded-md bg-white px-2 py-1.5">Pre-start.pdf</span>
          <span className="rounded-md bg-white px-2 py-1.5">Audit sheet.xlsx</span>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-500">
          <ArrowRight className="size-4" strokeWidth={2} />
        </span>
        <div className="flex flex-1 flex-col gap-1.5 rounded-xl bg-blue-600 p-3 text-white">
          <p className="font-mono text-[9px] tracking-[0.14em] text-blue-100 uppercase">Mitti</p>
          <span className="rounded-md bg-white/15 px-2 py-1.5">Digital templates</span>
          <span className="rounded-md bg-white/15 px-2 py-1.5">Role-based onboarding</span>
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {["Administrators trained", "Managers onboarded", "Frontline teams live"].map((t) => (
          <li key={t} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-[0_6px_16px_-10px_rgba(4,28,66,0.3)]">
            {t}
            <span className="flex size-4 items-center justify-center rounded-full bg-sky-500">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AgentMock() {
  return (
    <div className="w-[min(26rem,100%)] rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-[11px] leading-relaxed text-blue-100 backdrop-blur">
      <p className="text-white">&gt; review: quarterly-optimization</p>
      <p>
        <span className="text-sky-400">✓</span> Template feedback collected
      </p>
      <p>
        <span className="text-sky-400">✓</span> 2 improvements prioritized
      </p>
      <p>
        <span className="text-sky-400">✓</span> Next sites ready for rollout
      </p>
      <div className="mt-3 flex items-center justify-between font-sans">
        <span className="text-[11px] text-blue-200">Awaiting approval</span>
        <span className={cn(pill, "bg-sky-500 px-3 py-1.5 text-[11px] text-ink")}>Approve</span>
      </div>
    </div>
  );
}
