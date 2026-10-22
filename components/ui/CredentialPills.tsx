import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Partner credentials as text pills — names only, not official programme logos. */
export function CredentialPills({ className, pillClassName }: { className?: string; pillClassName?: string }) {
  return (
    <ul aria-label="Partner credentials" className={cn("flex flex-wrap gap-2", className)}>
      {site.credentials.map((c) => (
        <li
          key={c.name}
          className={cn("inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm leading-none font-medium text-ink", pillClassName)}
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-blue-600" />
          {c.name} {c.line}
        </li>
      ))}
    </ul>
  );
}
