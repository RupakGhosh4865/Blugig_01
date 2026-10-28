import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { LogoMark } from "@/components/layout/Logo";
import { adminConfigured, isAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = adminConfigured();
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-sm flex-col gap-8 rounded-[1.5rem] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(4,28,66,0.35)]">
        <div className="flex flex-col items-start gap-4">
          <LogoMark className="size-11 rounded-xl" />
          <div>
            <h1 className="text-2xl font-medium tracking-[-0.03em]">Avantra admin</h1>
            <p className="text-s mt-1 text-gray-600">Sign in to write and publish blog posts.</p>
          </div>
        </div>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
            The admin is switched off. Set <code className="font-mono">ADMIN_PASSWORD</code> in the environment (Railway → Variables, or{" "}
            <code className="font-mono">.env.local</code> locally) and restart.
          </p>
        )}
      </div>
    </main>
  );
}
