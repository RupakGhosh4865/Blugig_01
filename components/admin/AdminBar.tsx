import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { LogoMark } from "@/components/layout/Logo";

/** Top bar on signed-in admin pages: home of the admin, the live blog, sign out. */
export function AdminBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/admin" className="flex items-center gap-2.5 font-medium tracking-[-0.02em]">
          <LogoMark className="size-7 rounded-lg" />
          Avantra admin
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/admin" className="rounded-full px-3 py-1.5 text-gray-700 hover:bg-gray-100">
            Posts
          </Link>
          <a href="/blog" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-gray-700 hover:bg-gray-100">
            View blog <ExternalLink aria-hidden className="size-3.5" />
          </a>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-gray-700 hover:bg-gray-100">
              <LogOut aria-hidden className="size-3.5" /> Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
