import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const swatches = [
  ["canvas", "bg-canvas"],
  ["white", "bg-white"],
  ["ink", "bg-ink"],
  ["navy", "bg-navy"],
  ["slate", "bg-slate"],
  ["sky-300", "bg-sky-300"],
  ["blue-50", "bg-blue-50"],
  ["blue-700", "bg-blue-700"],
  ["blue-100", "bg-blue-100"],
  ["blue-500", "bg-blue-500"],
  ["blue-600", "bg-blue-600"],
  ["gray-200", "bg-gray-200"],
  ["gray-500", "bg-gray-500"],
  ["gray-800", "bg-gray-800"],
];

export default function Styleguide() {
  return (
    <div className="shell flex flex-col gap-20 pt-32 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="title-l">Styleguide</h1>
        <Link href="/styleguide/3d" className="text-blue-600 underline">
          3D shapes →
        </Link>
      </div>

      <section className="flex flex-col gap-6">
        <p className="eyebrow text-gray-500">Colour</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map(([name, cls]) => (
            <div key={name} className="flex flex-col gap-2">
              <div className={`h-20 rounded-2xl border border-gray-200 ${cls}`} />
              <span className="text-s">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <p className="eyebrow text-gray-500">Type</p>
        <Chip icon={Sparkles}>Section chip</Chip>
        <p className="title-xl">
          Title XL with <span className="text-grad">gradient words</span>
        </p>
        <p className="title-l">Title L — section headings</p>
        <p className="title-m">Title M — card titles</p>
        <p className="title-s">Title S — sub headings</p>
        <p className="title-xs">Title XS — list items</p>
        <p className="text-l max-w-[36rem]">Text L — body copy at 1.125rem with 150% line height.</p>
        <p className="text-m">Text M — 1rem body</p>
        <p className="text-mono">/ 01 — mono numbering</p>
        <p className="eyebrow">Eyebrow · mono uppercase</p>
      </section>

      <section className="flex flex-col gap-6">
        <p className="eyebrow text-gray-500">Buttons</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#">Primary</ButtonLink>
          <ButtonLink href="#" variant="outline">
            Outline
          </ButtonLink>
          <ButtonLink href="#" variant="outline-ink">
            Outline ink
          </ButtonLink>
          <ButtonLink href="#" size="sm">
            Small
          </ButtonLink>
        </div>
        <div className="flex flex-wrap gap-3 rounded-[1.5rem] bg-blue-600 p-8">
          <ButtonLink href="#" variant="white">
            White
          </ButtonLink>
          <ButtonLink href="#" variant="outline-light">
            Outline light
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="min-h-60 rounded-[1.5rem] bg-white p-8">White card</div>
        <div className="min-h-60 rounded-[1.5rem] bg-blue-600 p-8 text-white">Brand card</div>
        <div className="min-h-60 rounded-[1.5rem] bg-navy p-8 text-white">Navy card</div>
      </section>
    </div>
  );
}
