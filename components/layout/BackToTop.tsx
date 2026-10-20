"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/** Appears after two screens; scrolls through Lenis when it is active. */
export function BackToTop() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 2;
    setShow((prev) => (prev === next ? prev : next));
  });

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white text-ink shadow-[0_10px_30px_rgba(21,23,26,0.12)] transition-colors hover:bg-gold-500 sm:right-6 sm:bottom-6"
        >
          <ArrowUp className="size-5" strokeWidth={1.6} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
