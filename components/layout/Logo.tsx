import Image from "next/image";
import logoOnLight from "@/public/brand/avantra-logo.png";
import logoMono from "@/public/brand/avantra-logo-mono.png";
import logoOnDark from "@/public/brand/avantra-logo-white.png";
import mark from "@/public/brand/avantra-mark.png";
import wordmarkOnLight from "@/public/brand/avantra-wordmark.png";
import wordmarkMono from "@/public/brand/avantra-wordmark-mono.png";
import wordmarkOnDark from "@/public/brand/avantra-wordmark-white.png";
import { cn } from "@/lib/utils";

const ART = {
  /** Full lockup with the "Smarter operations. Safer teams." tagline. */
  lockup: { light: logoOnLight, dark: logoOnDark, brand: logoMono },
  /** Wordmark only — for small sizes (navbar, menus) where the tagline would be illegible. */
  wordmark: { light: wordmarkOnLight, dark: wordmarkOnDark, brand: wordmarkMono },
} as const;

/**
 * The Avantra logo (public/brand) in three colourways: full colour on light
 * backgrounds, white on dark, and one-colour navy on the cyan brand surfaces
 * (where the logo's own cyan "a" would disappear). `auto` renders all three and
 * lets globals.css pick one for the active scroll zone (ink → white, sky → navy).
 * `height` is the largest rendered height (sizes the srcset); `className` sets
 * the displayed size. Callers wrap it in a link that carries the accessible name.
 */
export function Logo({
  variant = "auto",
  kind = "wordmark",
  height = 36,
  alt = "",
  eager = false,
  className = "h-9 w-auto",
}: {
  variant?: "auto" | "onLight" | "onDark" | "onBrand";
  kind?: keyof typeof ART;
  height?: number;
  alt?: string;
  eager?: boolean;
  className?: string;
}) {
  const art = ART[kind];
  const size = {
    width: Math.round((height * art.light.width) / art.light.height),
    height,
    loading: eager ? ("eager" as const) : undefined,
  };

  // An eager logo is the LCP element on inner pages: fetch the colourway that paints first ahead of the rest.
  const first = eager ? { fetchPriority: "high" as const } : null;

  if (variant !== "auto") {
    const src = variant === "onDark" ? art.dark : variant === "onBrand" ? art.brand : art.light;
    return <Image src={src} alt={alt} className={cn("block", className)} {...size} {...first} />;
  }
  return (
    <span className="block">
      <Image src={art.light} alt={alt} className={cn("logo-auto logo-on-light block", className)} {...size} {...first} />
      <Image src={art.dark} alt="" aria-hidden className={cn("logo-auto logo-on-dark", className)} {...size} />
      <Image src={art.brand} alt="" aria-hidden className={cn("logo-auto logo-on-brand", className)} {...size} />
    </span>
  );
}

/** App-icon style mark: the gradient "a" on a logo-navy tile. Size it with className. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex items-center justify-center bg-navy", className)}>
      <Image src={mark} alt="" className="h-[74%] w-[74%] object-contain" sizes="96px" />
    </span>
  );
}
