import { ArrowRight, Workflow } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AgentConsole } from "@/components/sections/home/AgentConsole";
import { ParticleField } from "@/components/three/ParticleField";
import { Chip } from "@/components/ui/Chip";
import { agent } from "@/content/home";

/**
 * Workflow spotlight in zig's navy testimonial slot: dotted pattern bottom-left,
 * wave particles behind, copy left, typed (illustrative) workflow log right.
 */
export function AgentSpotlight() {
  return (
    <section className="relative isolate overflow-hidden bg-navy pt-20 pb-28 text-white lg:pb-40">
      <ParticleField
        shape="wave"
        blending="additive"
        colorA="#0a80fb"
        colorB="#7fd6fc"
        sparkle="#29b9fa"
        opacity={0.55}
        pointSize={4}
        density={0.7}
        cameraZ={2.6}
        spin={0.015}
        interactive={false}
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] opacity-80"
        posterClassName="opacity-40"
      />
      <div
        aria-hidden
        className="dot-pattern absolute bottom-0 left-0 -z-10 size-[54rem] -translate-x-1/2 translate-y-1/2 text-blue-300/25 [mask-image:radial-gradient(circle,black,transparent_70%)]"
      />
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex max-w-[34rem] flex-col gap-6">
          <Chip icon={Workflow} tone="light">
            {agent.chip}
          </Chip>
          <h2 className="title-l">{agent.title}</h2>
          <p className="text-l text-blue-100">{agent.body}</p>
          <Link
            href={agent.link.href}
            className="group mt-2 inline-flex w-fit items-center gap-2 border-b border-sky-500 pb-1 text-base font-medium text-white"
          >
            {agent.link.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <AgentConsole lines={agent.console} label={agent.consoleLabel} />
        </Reveal>
      </div>
    </section>
  );
}
