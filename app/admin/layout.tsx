import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Avantra admin" },
  robots: { index: false, follow: false },
};

/** Every admin page reads the session cookie before rendering, so these routes render per request (no static shell). */
export const instant = false;

/** The admin's own frame: none of the public site's navbar, footer or smooth scrolling. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-canvas text-ink">{children}</div>;
}
