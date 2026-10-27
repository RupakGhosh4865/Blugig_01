import { Newspaper } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { blog } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Blog | Avantra Technologies",
    description: "Practical writing on Mitti rollouts, digital inspections and Workato integrations from Avantra Technologies.",
    path: "/blog",
  }),
  // No articles yet: keep the empty index out of search (and out of sitemap.ts) until the first post.
  robots: { index: false, follow: true },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function BlogPage() {
  const leadCount = blog.titleLead.split(/\s+/).length;
  return (
    <section className="relative isolate overflow-hidden">
      <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="shell flex flex-col gap-14 pt-32 pb-[clamp(4.5rem,8vw,6.25rem)]">
        <div className="flex flex-col gap-6">
          <Chip icon={Newspaper} className="enter-fade">
            {blog.chip}
          </Chip>
          <h1 className="title-xl max-w-[56rem]">
            <SplitWords text={blog.titleLead} />{" "}
            <SplitWords text={blog.titleAccent} offset={leadCount} wordClassName="text-grad" />
          </h1>
          <p className="enter-fade text-l max-w-[36rem]" style={d(0.5)}>
            {blog.sub}
          </p>
        </div>

        <div
          className="enter-fade flex flex-col gap-6 rounded-[1.5rem] bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          style={d(0.7)}
        >
          <div className="flex flex-col gap-2">
            <h2 className="title-s">{blog.empty.title}</h2>
            <p className="text-m text-gray-600">{blog.empty.body}</p>
          </div>
          <ButtonLink href={blog.empty.cta.href} className="w-fit shrink-0">
            {blog.empty.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
