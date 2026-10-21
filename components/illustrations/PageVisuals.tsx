import { ArrowDown, Check, Circle, ClipboardCheck, ImageIcon, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero visuals for the inner pages. Illustrative UI built in markup (decorative,
 * aria-hidden) in place of photography: generic inspection/rollout screens, not
 * reproductions of the Mitti product UI.
 */

const card = "rounded-2xl bg-white text-ink shadow-[0_30px_60px_-28px_rgba(17,29,51,0.45)]";
const label = "text-[10px] font-semibold tracking-[0.12em] text-gray-500 uppercase";

function BrandTile({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute rounded-[2.25rem] bg-gradient-to-br from-blue-500 to-blue-800 shadow-[0_40px_80px_-30px_rgba(0,43,117,0.55)]",
        className,
      )}
    />
  );
}

/** Solutions: an issue raised on site becomes an owned action and shows up in reporting. */
export function SolutionsVisual() {
  return (
    <div aria-hidden className="relative mx-auto aspect-[1/0.95] w-full max-w-[34rem] select-none">
      <BrandTile className="top-[8%] right-[4%] size-[60%]" />
      <div className="dot-pattern absolute bottom-0 left-[2%] size-[40%] text-blue-200 [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className={cn(card, "absolute top-0 left-0 w-[66%] p-4 sm:p-5")}>
        <p className="flex items-center gap-2 text-[11px] font-medium text-[#b4321f]">
          <TriangleAlert className="size-3.5" strokeWidth={2} />
          Issue reported
        </p>
        <p className="mt-2 text-[15px] leading-tight font-semibold tracking-[-0.02em] sm:text-[17px]">Spill near loading bay</p>
        <p className="mt-1 text-[11px] text-gray-500">Loading dock · 08:42</p>
        <div className="mt-3 flex h-16 items-center justify-center gap-2 rounded-xl bg-[repeating-linear-gradient(135deg,#eef3fc_0_8px,#f4f6fa_8px_16px)] text-[11px] text-gray-500">
          <ImageIcon className="size-4" strokeWidth={1.6} />
          Photo attached
        </div>
        <span className="mt-3 inline-flex rounded-full bg-[#fdf0eb] px-2.5 py-1 text-[10px] font-medium text-[#b4321f]">High priority</span>
      </div>

      <span className="absolute top-[47%] left-[30%] flex size-9 items-center justify-center rounded-full bg-navy text-white shadow-lg">
        <ArrowDown className="size-4" strokeWidth={2} />
      </span>

      <div className={cn(card, "absolute top-[40%] right-0 w-[64%] p-4 sm:p-5")}>
        <p className={label}>Corrective action</p>
        <p className="mt-2 text-[14px] leading-tight font-semibold tracking-[-0.02em] sm:text-[15px]">Clean up and place signage</p>
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-50 text-[9px] font-semibold text-blue-700">MR</span>
            Facilities
          </span>
          <span className="text-gray-500">Due today</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <span className="block h-full w-[60%] rounded-full bg-blue-600" />
        </div>
      </div>

      <div className={cn(card, "absolute bottom-0 left-[6%] w-[52%] p-4")}>
        <p className={label}>Open actions by site</p>
        <div className="mt-3 flex h-16 items-end gap-2 border-b border-gray-200 px-1">
          {[70, 45, 85, 30].map((h, i) => (
            <span key={i} className={cn("flex-1 rounded-t-md", i === 2 ? "bg-blue-600" : "bg-navy/80")} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between px-1 font-mono text-[9px] text-gray-500">
          {["N", "S", "E", "W"].map((s) => (
            <span key={s} className="flex-1 text-center">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Services: a phased rollout plan with deliverables ticking off. */
export function ServicesVisual() {
  const phases = [
    { t: "Discovery & planning", s: "done" },
    { t: "Platform configuration", s: "done" },
    { t: "Training & launch", s: "active" },
    { t: "Ongoing optimization", s: "next" },
  ] as const;
  return (
    <div aria-hidden className="relative mx-auto aspect-[1/0.92] w-full max-w-[34rem] select-none">
      <BrandTile className="top-0 left-[6%] size-[58%]" />
      <div className="dot-pattern absolute right-0 bottom-0 size-[40%] text-blue-200 [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className={cn(card, "absolute top-[12%] right-0 w-[88%] p-5 sm:p-6")}>
        <div className="flex items-center justify-between">
          <div>
            <p className={label}>Mitti rollout plan</p>
            <p className="mt-1 text-[16px] font-semibold tracking-[-0.02em] sm:text-[18px]">North region</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700">Phase 3 of 4</span>
        </div>
        <ol className="mt-5 flex flex-col">
          {phases.map((p, i) => (
            <li key={p.t} className="flex items-center gap-3 border-t border-gray-100 py-3 text-[12px] first:border-t-0 sm:text-[13px]">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px]",
                  p.s === "done" && "bg-blue-600 text-white",
                  p.s === "active" && "border-2 border-blue-600 text-blue-700",
                  p.s === "next" && "border border-gray-300 text-gray-500",
                )}
              >
                {p.s === "done" ? <Check className="size-3" strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("flex-1", p.s === "next" && "text-gray-500")}>{p.t}</span>
              {p.s === "active" ? (
                <span className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                  <span className="block h-full w-[60%] rounded-full bg-blue-600" />
                </span>
              ) : (
                <span className="text-[10px] text-gray-500">{p.s === "done" ? "Complete" : "Next"}</span>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className={cn(card, "absolute top-[2%] right-[4%] flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-medium")}>
        <Circle className="size-2.5 fill-sky-400 text-sky-400" />
        Pilot feedback session · Thu
      </div>

      <div className={cn(card, "absolute bottom-[2%] left-0 flex items-center gap-3 p-3.5 pr-5")}>
        <span className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ClipboardCheck className="size-4.5" strokeWidth={1.8} />
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-semibold">Templates configured</span>
          <span className="text-[11px] text-gray-500">Ready for pilot users</span>
        </span>
      </div>
    </div>
  );
}

/** About: a workshop process map turning into a practical template. */
export function AboutVisual() {
  const nodes = ["Check", "Issue", "Owner", "Review"];
  return (
    <div aria-hidden className="relative mx-auto aspect-[1/0.9] w-full max-w-[34rem] select-none">
      <BrandTile className="right-0 bottom-[4%] size-[56%]" />

      <div className={cn(card, "absolute top-0 left-0 w-[86%] overflow-hidden p-5 sm:p-6")}>
        <div className="dot-pattern absolute inset-0 text-gray-200" />
        <div className="relative">
          <p className={label}>Process map · Workshop</p>
          <div className="mt-6 flex items-center">
            {nodes.map((n, i) => (
              <div key={n} className="flex flex-1 items-center last:flex-none">
                <span
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-[11px] font-medium sm:px-3 sm:text-[12px]",
                    i === 0 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white",
                  )}
                >
                  {n}
                </span>
                {i < nodes.length - 1 ? <span className="mx-1 h-px flex-1 border-t border-dashed border-gray-400" /> : null}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {["Who signs off?", "Daily or per shift?", "Photo required?"].map((q, i) => (
              <span
                key={q}
                className={cn(
                  "rounded-md px-3 py-2 text-[11px] shadow-sm",
                  i === 1 ? "-rotate-2 bg-sky-100" : "rotate-1 bg-blue-50",
                )}
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(card, "absolute right-[4%] bottom-0 w-[58%] p-4 sm:p-5")}>
        <p className={label}>Template</p>
        <p className="mt-1 text-[14px] font-semibold tracking-[-0.02em] sm:text-[15px]">Pre-start checklist</p>
        <ul className="mt-3 flex flex-col gap-1.5 text-[11px]">
          {["Area inspected", "Equipment checked", "Sign-off recorded"].map((t) => (
            <li key={t} className="flex items-center gap-2 rounded-lg bg-canvas px-2.5 py-2">
              <span className="flex size-4 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
