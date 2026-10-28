import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageBackground } from "@/components/layout/PageBackground";
import { Providers } from "@/components/layout/Providers";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * The public site's frame: skip link, smooth scroll, page background, navbar,
 * <main>, footer and the company structured data. Used by app/(site)/layout.tsx
 * and app/not-found.tsx (which renders outside the (site) group); the admin has its own.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[100] -translate-y-20 rounded-full bg-ink px-5 py-3 text-sm text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Providers>
        <SmoothScroll />
        <PageBackground />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </Providers>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
