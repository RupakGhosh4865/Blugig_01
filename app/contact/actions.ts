"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { contactSchema, topicOptions, type ContactInput } from "@/lib/contact-schema";

export type ContactResult = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes (per server instance).
// [TODO] swap for Upstash if UPSTASH_REDIS_REST_URL is configured in production.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

const SUCCESS = `Thanks — your message is in. We'll reply within ${site.replyTime}.`;

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: ContactResult["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  // Honeypot filled → pretend success, drop silently.
  if (data.website) return { ok: true, message: SUCCESS };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!allow(ip)) {
    return { ok: false, message: "Too many messages in a short time. Please try again in a few minutes." };
  }

  const topicLabel = topicOptions.find((o) => o.value === data.topic)?.label ?? "Not specified";
  const lead = {
    name: data.name,
    email: data.email,
    company: data.company,
    topic: topicLabel,
    message: data.message,
    source: data.source ?? "",
    page: h.get("referer") ?? "",
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  let delivered = false;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      delivered = delivered || res.ok;
    }
    if (resendKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Avantra Website <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `New enquiry — ${data.company} (${topicLabel})`,
          text: Object.entries(lead)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        }),
      });
      delivered = delivered || res.ok;
    }
  } catch (err) {
    console.error("[contact] delivery failed", err);
  }

  if (!webhook && !(resendKey && to)) {
    // Development / unconfigured: log the lead so the flow can be tested end to end.
    console.info("[contact] lead received (no CONTACT_WEBHOOK_URL / RESEND_API_KEY configured)", lead);
    delivered = true;
  }

  return delivered
    ? { ok: true, message: SUCCESS }
    : {
        ok: false,
        message: site.email
          ? "We couldn't send your message right now. Please email us directly."
          : "We couldn't send your message right now. Please try again shortly.",
      };
}
