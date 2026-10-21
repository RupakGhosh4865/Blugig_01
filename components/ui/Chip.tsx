import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  default: "text-gray-600",
  light: "text-gray-200",
  sky: "text-gray-800",
  zone: "text-[color:var(--page-muted)]",
} as const;

/** zig.ai `.section_chips` — line icon + medium 16px label above every heading. */
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
    <p className={cn("flex items-center gap-2 text-base leading-[1.3] font-medium tracking-normal", tones[tone], className)}>
      {Icon ? <Icon aria-hidden className="size-6 shrink-0" strokeWidth={1.4} /> : null}
      <span>{children}</span>
    </p>
  );
}
