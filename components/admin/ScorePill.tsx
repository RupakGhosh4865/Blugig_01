import { scoreTone } from "@/lib/blog/seo-check";
import { cn } from "@/lib/utils";

const TONE = {
  good: "bg-emerald-50 text-emerald-800",
  ok: "bg-amber-50 text-amber-800",
  bad: "bg-red-50 text-red-800",
} as const;

/** SEO score as a coloured pill: green 80+, amber 55–79, red below. */
export function ScorePill({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn("inline-flex min-w-11 justify-center rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums", TONE[scoreTone(score)], className)}>
      {score}
    </span>
  );
}
