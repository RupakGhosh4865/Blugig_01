import { Marquee } from "@/components/motion/Marquee";
import { platforms } from "@/content/home";

/**
 * zig "Trusted by" row: label, 1px divider, infinite logo loop with a right-edge
 * fade. Shows the platforms Blugig builds on until client logos are approved.
 * [PLACEHOLDER: client/partner logos — swap label to "Trusted by teams at"]
 */
export function Platforms() {
  return (
    <section aria-label={platforms.label} className="py-10 2xl:py-[3.75rem]">
      <div className="shell flex h-14 items-center gap-6 overflow-hidden sm:gap-12 lg:h-[4.125rem] 2xl:h-[5.375rem]">
        <p className="title-s shrink-0 text-gray-600 max-sm:max-w-[7rem] max-sm:text-lg">{platforms.label}</p>
        <div className="marquee-mask h-full min-w-0 flex-1 border-l border-gray-300 pl-6 sm:pl-12">
          <Marquee duration={28} className="h-full">
            <ul className="flex h-full items-center gap-[5.625rem] pr-[5.625rem]">
              {platforms.items.map((p) => (
                <li key={p} className="text-[1.75rem] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-gray-400">
                  {p}
                </li>
              ))}
            </ul>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
