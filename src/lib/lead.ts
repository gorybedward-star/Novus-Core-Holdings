// Scorecard lead form: shared types, validation and submission.
// The browser only ever talks to our own endpoint (/api/lead). GoHighLevel credentials live on the server.

import { INDUSTRIES } from "../content";

export interface LeadInput {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: (typeof INDUSTRIES)[number] | "";
  city: string;
  marketingConsent: boolean;
  interest: string; // package the visitor clicked, if any
}

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export function validateLead(v: LeadInput): LeadErrors {
  const e: LeadErrors = {};
  if (v.businessName.trim().length < 2) e.businessName = "Enter your business name.";
  if (v.contactName.trim().length < 2) e.contactName = "Enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email, like you@yourcompany.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) e.phone = "Enter a 10-digit phone number.";
  if (v.website.trim()) {
    try {
      const u = new URL(normalizeUrl(v.website));
      if (!u.hostname.includes(".")) throw new Error();
    } catch {
      e.website = "Enter a website address like yourcompany.com, or leave it blank.";
    }
  }
  if (!v.industry) e.industry = "Choose your industry.";
  if (v.city.trim().length < 2) e.city = "Enter the main city you serve.";
  return e;
}

export type SubmitResult =
  | { status: "success" }
  | { status: "dev"; message: string }
  | { status: "error"; message: string };

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || "/api/lead";

export async function submitLead(
  input: LeadInput,
  spam: { honeypot: string; startedAt: number },
): Promise<SubmitResult> {
  const body = {
    ...input,
    website: normalizeUrl(input.website),
    pageUrl: window.location.href,
    referrer: document.referrer || undefined,
    utm: Object.fromEntries(
      [...new URLSearchParams(window.location.search)].filter(([k]) => k.startsWith("utm_")),
    ),
    hp: spam.honeypot,
    elapsedMs: Date.now() - spam.startedAt,
  };

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      status: "dev",
      message: "The form backend couldn't be reached from this preview, so your details were not sent.",
    };
  }

  let data: { ok?: boolean; code?: string; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON response, handled below */
  }

  if (res.ok && data.ok === true) return { status: "success" };
  if (data.code === "NOT_CONFIGURED" || res.status === 404 || res.status === 405) {
    return {
      status: "dev",
      message: "The form isn't connected to the CRM yet, so your details were not sent.",
    };
  }
  return {
    status: "error",
    message: data.message || "Something went wrong on our side and your request wasn't saved. Please try again.",
  };
}
