import {
  Building,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  Factory,
  FileText,
  HardHat,
  MessageCircle,
  MessagesSquare,
  RefreshCw,
  Settings,
  SlidersHorizontal,
  Sprout,
  Store,
  TabletSmartphone,
  Target,
  TriangleAlert,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Content files reference icons by name so they stay plain, serialisable data. */
const icons = {
  plan: FileText,
  settings: Settings,
  tablet: TabletSmartphone,
  chart: ChartNoAxesColumnIncreasing,
  team: Users,
  refresh: RefreshCw,
  inspect: ClipboardCheck,
  alert: TriangleAlert,
  person: UserRound,
  sliders: SlidersHorizontal,
  sprout: Sprout,
  chat: MessageCircle,
  chats: MessagesSquare,
  target: Target,
  factory: Factory,
  construction: HardHat,
  building: Building,
  store: Store,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className, strokeWidth = 1.5 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Glyph = icons[name];
  return <Glyph aria-hidden className={cn("size-6", className)} strokeWidth={strokeWidth} />;
}

/** Line icon in a tinted circle — the icon treatment used across the Avantra pages. */
export function IconBadge({
  name,
  tone = "light",
  size = "md",
  className,
}: {
  name: IconName;
  tone?: "light" | "dark" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full transition-colors duration-300",
        size === "sm" && "size-11",
        size === "md" && "size-14",
        size === "lg" && "size-[4.5rem]",
        tone === "light" && "bg-blue-50 text-blue-600",
        tone === "white" && "bg-white text-blue-600",
        tone === "dark" && "bg-white/10 text-sky-300",
        className,
      )}
    >
      <Icon name={name} className={size === "lg" ? "size-8" : size === "md" ? "size-6" : "size-5"} />
    </span>
  );
}
