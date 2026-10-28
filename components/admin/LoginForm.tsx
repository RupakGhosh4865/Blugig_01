"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm font-medium">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
          className="rounded-xl border border-gray-200 px-4 py-3 text-base font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
        />
      </label>
      {state.error ? (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
