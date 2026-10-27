"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useState, useTransition } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { submitContact, type ContactResult } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { contactSchema, topicGroups, topicOptions, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-[0.75rem] border border-gray-200 bg-canvas px-4 text-base tracking-normal text-ink placeholder:text-gray-500 transition-[border-color,box-shadow] duration-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 aria-[invalid=true]:border-[#b4321f]";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactResult | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", topic: "", message: "", source: "", website: "" },
  });

  // /contact?topic={slug} pre-selects the topic (read client-side so the page stays static).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("topic");
    if (slug && topicOptions.some((o) => o.value === slug)) setValue("topic", slug);
  }, [setValue]);

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const res = await submitContact(values);
      if (res.fieldErrors) {
        for (const [k, msg] of Object.entries(res.fieldErrors)) {
          if (msg) setError(k as keyof ContactInput, { message: msg });
        }
      }
      setResult(res);
    });
  });

  if (result?.ok) return <Success message={result.message} />;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name}>
          {(p) => <input {...p} {...register("name")} autoComplete="name" placeholder="Your full name" className={cn(field, "h-12")} />}
        </Field>
        <Field label="Work email" required error={errors.email}>
          {(p) => (
            <input {...p} {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" className={cn(field, "h-12")} />
          )}
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" required error={errors.company}>
          {(p) => (
            <input {...p} {...register("company")} autoComplete="organization" placeholder="Company name" className={cn(field, "h-12")} />
          )}
        </Field>
        <Field label="What can we help with?" error={errors.topic}>
          {(p) => (
            <div className="relative">
              <select {...p} {...register("topic")} className={cn(field, "h-12 appearance-none pr-10")}>
                <option value="">Select a topic</option>
                {topicGroups.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="not-sure">Not sure yet</option>
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink"
                strokeWidth={1.6}
              />
            </div>
          )}
        </Field>
      </div>
      <Field label="Message" required error={errors.message}>
        {(p) => (
          <textarea
            {...p}
            {...register("message")}
            rows={5}
            placeholder="Your sites, your current setup and what you would like to improve"
            className={cn(field, "resize-y py-3")}
          />
        )}
      </Field>
      <Field label="How did you hear about us?" error={errors.source}>
        {(p) => <input {...p} {...register("source")} placeholder="LinkedIn, a referral, search…" className={cn(field, "h-12")} />}
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {result && !result.ok ? (
        <p role="alert" className="text-s rounded-[0.75rem] bg-[#fde2dd] px-4 py-3 text-[#8a2516]">
          {result.message}
          {site.email ? (
            <>
              {" "}
              You can also email us at <span className="font-medium">{site.email}</span>.
            </>
          ) : null}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-s max-w-[20rem] text-gray-500">
          We&apos;ll only use your details to respond. See our{" "}
          <Link href="/privacy" className="underline decoration-sky-500 underline-offset-2 hover:text-blue-700">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" disabled={pending} className="w-full disabled:opacity-60 sm:w-auto">
          {pending ? "Sending…" : "Send message"}
          {pending ? null : <ArrowRight aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: FieldError;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium tracking-normal">
        {label}
        {required ? <span className="text-sky-800"> *</span> : null}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errId : undefined,
        "aria-required": required || undefined,
      })}
      {error?.message ? (
        <p id={errId} className="text-s text-[#8a2516]">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

function Success({ message }: { message: string }) {
  return (
    <div role="status" className="flex min-h-[26rem] flex-col items-center justify-center gap-6 text-center">
      <svg viewBox="0 0 64 64" className="size-20" aria-hidden>
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="#29b9fa"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M20 33l8 8 16-17"
          fill="none"
          stroke="#0b1a36"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <h2 className="title-m">Message sent</h2>
      <p className="text-l max-w-[24rem] text-gray-600">{message}</p>
    </div>
  );
}
