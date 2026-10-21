import Image from "next/image";
import logoOnLight from "@/public/brand/avantra-logo.png";
import logoOnDark from "@/public/brand/avantra-logo-white.png";
import { cn } from "@/lib/utils";

const RATIO = logoOnLight.width / logoOnLight.height;

/**
 * The Avantra Technologies logo (public/brand). `auto` renders both versions and
 * lets globals.css show the white wordmark while a navy/brand scroll zone is active.
 * `height` is the largest rendered height (sizes the srcset); `className` sets the
 * displayed size. Callers wrap it in a link that carries the accessible name.
 */
export function Logo({
  variant = "auto",
  height = 36,
  alt = "",
  eager = false,
  className = "h-9 w-auto",
}: {
  variant?: "auto" | "onLight" | "onDark";
  height?: number;
  alt?: string;
  eager?: boolean;
  className?: string;
}) {
  const size = { width: Math.round(height * RATIO), height, loading: eager ? ("eager" as const) : undefined };

  if (variant !== "auto") {
    return <Image src={variant === "onDark" ? logoOnDark : logoOnLight} alt={alt} className={cn("block", className)} {...size} />;
  }
  return (
    <span className="block">
      <Image src={logoOnLight} alt={alt} className={cn("logo-auto logo-on-light block", className)} {...size} />
      <Image src={logoOnDark} alt="" aria-hidden className={cn("logo-auto logo-on-dark", className)} {...size} />
    </span>
  );
}

/** Mark-only version (blue square, white "A" with the rising arrow), traced from the logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" aria-hidden className={cn("block", className)}>
      <rect width="240" height="240" fill="#003FA9" />
      <path d="M120 22 234 224 134.5 178.5V151H157.5L120 101 82.5 151H105.5V178.5L6 224Z" fill="#fff" />
    </svg>
  );
}
