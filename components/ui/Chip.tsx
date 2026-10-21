import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  default: "text-blue-600",
  light: "text-sky-300",
  zone: "text-[color:var(--page-muted)]",
} as const;

/** Section eyebrow (zig `.section_chips`): optional line icon + small uppercase label above a heading. */
export function Chip({
  icon: Icon,
  children,
  tone = "default",
  className,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[0.8125rem] leading-[1.3] font-semibold tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon aria-hidden className="size-[1.125rem] shrink-0" strokeWidth={1.8} /> : null}
      <span>{children}</span>
    </p>
  );
}
