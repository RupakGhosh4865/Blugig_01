import type { LucideIcon } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

type Props = {
  chip?: string;
  icon?: LucideIcon;
  chipTone?: "default" | "light" | "gold" | "zone";
  lead?: string;
  accent?: string;
  /** Put the gradient words before the lead (zig "impact" heading). */
  accentFirst?: boolean;
  sub?: string;
  as?: "h1" | "h2";
  size?: "xl" | "l";
  className?: string;
  subClassName?: string;
};

/** zig `.section_heading`: chip → title-l with a .text--grad span → text-l sub. */
export function SectionHeading({
  chip,
  icon,
  chipTone = "default",
  lead,
  accent,
  accentFirst,
  sub,
  as: Tag = "h2",
  size = "l",
  className,
  subClassName,
}: Props) {
  return (
    <div className={cn("flex max-w-[34rem] flex-col gap-6", className)}>
      {chip ? (
        <Chip icon={icon} tone={chipTone}>
          {chip}
        </Chip>
      ) : null}
      <Tag className={size === "xl" ? "title-xl" : "title-l"}>
        {accentFirst ? (
          <>
            {accent ? <span className="text-grad">{accent}</span> : null} {lead}
          </>
        ) : (
          <>
            {lead} {accent ? <span className="text-grad">{accent}</span> : null}
          </>
        )}
      </Tag>
      {sub ? <p className={cn("text-l", subClassName)}>{sub}</p> : null}
    </div>
  );
}
