import { cn } from "@/lib/utils";

/**
 * Text wordmark until the real SVG lands in public/brand/ (BUILD_SPEC §4.1).
 * Swap the inner markup for <Image src="/brand/logo.svg" …/> in one place.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.35em] text-[1.375rem] leading-none font-bold tracking-[-0.02em]",
        className,
      )}
    >
      <span aria-hidden className="size-[0.62em] rounded-[0.12em] bg-[var(--logo-mark,var(--color-gold-500))] transition-colors duration-300" />
      <span>BLUGIG</span>
    </span>
  );
}

/** Square brand mark (used where zig shows its "Z" icon tile). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex aspect-square items-center justify-center rounded-[22%] bg-gold-500 font-bold text-ink",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-[58%]" fill="none">
        <path
          d="M6.5 4.5h6.2c2.6 0 4.3 1.3 4.3 3.4 0 1.5-.9 2.6-2.3 3 1.8.3 3 1.6 3 3.4 0 2.4-1.9 4-4.8 4H6.5z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M6.5 11.2h7.2" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    </span>
  );
}
