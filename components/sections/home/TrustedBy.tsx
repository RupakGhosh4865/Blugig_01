import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { clients } from "@/content/clients";
import { trustedBy } from "@/content/home";

/** Logo box inside each card (px); every logo is fitted into it. */
const LOGO = { w: 160, h: 48 };

/**
 * zig "Trusted by" row: label, 1px divider, infinite loop of client logo cards
 * with a right-edge fade (cards after the SSPM site's logo strip). Logos sit in
 * greyscale and take their colours on hover.
 */
export function TrustedBy() {
  return (
    <section aria-label={trustedBy.label} className="py-10 2xl:py-[3.75rem]">
      {/* Phones stack the label over a full-width loop so more than one card shows. */}
      <div className="shell flex flex-col gap-4 overflow-hidden sm:flex-row sm:items-center sm:gap-12">
        <p className="title-s shrink-0 text-gray-600 max-sm:text-lg">{trustedBy.label}</p>
        <div className="marquee-mask w-full min-w-0 sm:flex-1 sm:border-l sm:border-gray-300 sm:pl-12">
          <Marquee duration={80} className="py-2">
            <ul className="flex items-center gap-6 pr-6">
              {clients.map(({ name, logo }) => {
                const fit = Math.min(LOGO.w / logo.width, LOGO.h / logo.height);
                return (
                  <li
                    key={name}
                    className="group flex h-20 min-w-[12.5rem] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-4 shadow-sm"
                  >
                    <Image
                      src={logo}
                      alt={name}
                      width={Math.round(logo.width * fit)}
                      height={Math.round(logo.height * fit)}
                      className="object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </li>
                );
              })}
            </ul>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
