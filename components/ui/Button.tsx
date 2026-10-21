import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * zig.ai `.button` — pill, medium weight, colour swap on hover (0.3s).
 * zig coral → Avantra logo blue; zig white/outline variants kept.
 */
const variants = {
  primary: "bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-blue-600 hover:border-white",
  outline: "border-blue-600 text-blue-600 bg-transparent hover:bg-white hover:border-white",
  white: "bg-white text-blue-600 border-white hover:bg-transparent hover:text-white",
  "outline-light": "border-white text-white bg-transparent hover:bg-white hover:text-blue-600",
  "outline-ink": "border-ink text-ink bg-transparent hover:bg-ink hover:text-white",
  ink: "bg-ink text-white border-ink hover:bg-white hover:text-ink hover:border-white",
  /** Nav outline: blue on light pages, white on the ink zone, ink on the sky zone. */
  "outline-adaptive":
    "border-[color:var(--outline-fg)] text-[color:var(--outline-fg)] bg-transparent hover:bg-white hover:text-blue-600 hover:border-white",
  /** Follows the scroll-zone page colour (light → ink → sky sections). */
  "outline-zone":
    "border-[color:var(--page-fg)] text-[color:var(--page-fg)] bg-transparent hover:bg-white hover:text-blue-600 hover:border-white",
} as const;

const sizes = {
  lg: "px-10 py-4 text-base",
  sm: "h-10 px-6 text-sm",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "lg", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium leading-[1.3] tracking-[-0.03em] whitespace-nowrap",
    "transition-[background-color,color,border-color] duration-300",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
