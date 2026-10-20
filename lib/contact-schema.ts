import { z } from "zod";
import { services } from "@/content/services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
];

const serviceValues = new Set(serviceOptions.map((o) => o.value));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid work email.").max(200),
  company: z.string().trim().min(2, "Please enter your company.").max(160),
  service: z
    .string()
    .refine((v) => v === "" || serviceValues.has(v), "Please choose a service.")
    .optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(5000),
  source: z.string().trim().max(200).optional(),
  /** Honeypot — real people never see or fill this. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
