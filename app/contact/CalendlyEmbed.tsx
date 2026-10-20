"use client";

import { useEffect, useRef, useState } from "react";

/** Lazy Calendly embed — only mounts the iframe once it's near the viewport. */
export function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

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
    <div ref={ref} className="min-h-[42rem] overflow-hidden rounded-[1.5rem] bg-white">
      {show ? <iframe src={url} title="Schedule a call" className="h-[42rem] w-full" loading="lazy" /> : null}
    </div>
  );
}
