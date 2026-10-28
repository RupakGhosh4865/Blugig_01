"use client";

import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Embed settings: inline mode (no booking-page chrome, as Calendly's own embed
 * script requests it); our header shows the event details, so Calendly's panel
 * and cookie banner are hidden; the colours follow the site (Calendly applies
 * them on paid plans and ignores them otherwise). Client-only: it reads the host.
 */
function embedSrc(url: string) {
  const u = new URL(url);
  u.searchParams.set("embed_type", "Inline");
  u.searchParams.set("embed_domain", window.location.hostname);
  u.searchParams.set("hide_event_type_details", "1");
  u.searchParams.set("hide_gdpr_banner", "1");
  u.searchParams.set("background_color", "ffffff");
  u.searchParams.set("text_color", "0b1a36");
  u.searchParams.set("primary_color", "006de0");
  return u.toString();
}

/**
 * Booking card for the contact page: a header naming the call, then the
 * Calendly scheduler. The iframe mounts once the card is near the viewport and
 * fades in when loaded, with a spinner until then.
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Event length from the event slug (e.g. ".../30min"), for the header tag.
  const minutes = new URL(url).pathname.match(/(\d+)\s*min/i)?.[1];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="book-a-call"
      className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-[0_40px_80px_-40px_rgba(4,28,66,0.35)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <CalendarDays aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <div className="flex flex-col gap-1">
            <h2 id="book-a-call" className="title-xs">
              Book a call with our team
            </h2>
            <p className="text-s text-gray-600">Pick a time that suits you. Calendly sends the invite.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {minutes ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-sm leading-none font-medium text-sky-800">
              <Clock aria-hidden className="size-4" strokeWidth={1.8} />
              {minutes} min
            </span>
          ) : null}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 underline-offset-4 hover:underline"
          >
            Open in Calendly
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
          </a>
        </div>
      </header>
      <div ref={ref} className="relative h-[44rem] bg-white">
        {!loaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" role="status">
            <span aria-hidden className="size-8 animate-spin rounded-full border-2 border-sky-100 border-t-blue-600" />
            <span className="text-s text-gray-500">Loading available times…</span>
          </div>
        ) : null}
        {show ? (
          <iframe
            src={embedSrc(url)}
            title="Book a call with Avantra Technologies"
            onLoad={() => setLoaded(true)}
            className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          />
        ) : null}
      </div>
    </section>
  );
}
