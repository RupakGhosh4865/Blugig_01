import { z } from "zod";
import { services, supportOptions } from "@/content/services";
import { solutions } from "@/content/solutions";

/** "What can we help with?" — grouped in the form; `/contact?topic={value}` pre-selects one. */
export const topicGroups = [
  {
    label: "Where you are with Mitti",
    options: supportOptions.items.map((o) => ({ value: o.slug, label: o.title })),
  },
  {
    label: "What you want to improve",
    options: solutions.map((s) => ({ value: s.slug, label: s.title })),
  },
  {
    label: "Services",
    options: services.map((s) => ({ value: s.slug, label: s.title })),
  },
];

export const topicOptions = [...topicGroups.flatMap((g) => g.options), { value: "not-sure", label: "Not sure yet" }];

const topicValues = new Set(topicOptions.map((o) => o.value));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid work email.").max(200),
  company: z.string().trim().min(2, "Please enter your company.").max(160),
  topic: z
    .string()
    .refine((v) => v === "" || topicValues.has(v), "Please choose a topic.")
    .optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(5000),
  source: z.string().trim().max(200).optional(),
  /** Honeypot — real people never see or fill this. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
