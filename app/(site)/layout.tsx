import { SiteChrome } from "@/components/layout/SiteChrome";

/** Every public page: the marketing navbar, footer and background (the admin lives outside this group). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
