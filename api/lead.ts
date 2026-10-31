// POST /api/lead : receives the Growth Scorecard form and creates the lead in GoHighLevel.
// Runs on the server (Vercel Serverless Function). Credentials come from environment variables only
// and are never sent to the browser.
//
// Modes, picked automatically from which env vars are set:
//   1. API mode (recommended): GHL_PRIVATE_TOKEN + GHL_LOCATION_ID
//        Upserts the contact, adds tags and a note, and (if GHL_PIPELINE_ID + GHL_PIPELINE_STAGE_ID
//        are set) opens an opportunity in your "New Lead" pipeline stage.
//   2. Webhook mode: GHL_WEBHOOK_URL (a GoHighLevel workflow "Inbound Webhook" trigger URL)
//   3. Google Sheets mode (free, no CRM yet): SHEETS_WEBHOOK_URL + SHEETS_WEBHOOK_SECRET
//        Posts to a Google Apps Script web app that appends a row to a Sheet and emails the owner.
//        See docs/GOOGLE_SHEETS.md. Used only when GoHighLevel isn't configured.
//   4. Development mode: nothing configured. Responds 503 NOT_CONFIGURED and the page says so.
//      It never pretends the lead was received.

import type { VercelRequest, VercelResponse } from "@vercel/node";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const INDUSTRIES = ["HVAC", "Plumbing", "Electrical", "Landscaping", "Fencing", "Pool Services", "Cleaning", "Other service trade"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500; // humans don't complete seven fields in under 2.5 seconds

// Best-effort, per-instance rate limit. For stronger protection add Vercel's firewall rate limiting
// or Cloudflare Turnstile (both free) as described in docs/GOHIGHLEVEL.md.
const hits = new Map<string, number[]>();
function rateLimited(ip: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

interface Lead {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  city: string;
  marketingConsent: boolean;
  interest: string;
  pageUrl: string;
  referrer: string;
  utm: Record<string, string>;
}

function parse(body: Record<string, unknown>): { lead?: Lead; error?: string } {
  const lead: Lead = {
    businessName: clean(body.businessName),
    contactName: clean(body.contactName, 120),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 30),
    website: clean(body.website, 300),
    industry: clean(body.industry, 40),
    city: clean(body.city, 80),
    marketingConsent: body.marketingConsent === true,
    interest: clean(body.interest, 60),
    pageUrl: clean(body.pageUrl, 500),
    referrer: clean(body.referrer, 500),
    utm: {},
  };
  if (body.utm && typeof body.utm === "object") {
    for (const [k, v] of Object.entries(body.utm as Record<string, unknown>)) {
      if (/^utm_[a-z]+$/.test(k)) lead.utm[k] = clean(v, 120);
    }
  }
  const digits = lead.phone.replace(/\D/g, "");
  if (lead.businessName.length < 2) return { error: "Business name is required." };
  if (lead.contactName.length < 2) return { error: "Contact name is required." };
  if (!EMAIL_RE.test(lead.email)) return { error: "A valid email is required." };
  if (digits.length < 10 || digits.length > 11) return { error: "A 10-digit phone number is required." };
  if (!INDUSTRIES.includes(lead.industry)) return { error: "Choose an industry." };
  if (lead.city.length < 2) return { error: "Primary service city is required." };
  lead.phone = digits.length === 10 ? `+1${digits}` : `+${digits}`;
  return { lead };
}

function splitName(full: string) {
  const parts = full.split(/\s+/);
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function tagsFor(lead: Lead): string[] {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const tags = ["website-lead", "scorecard-request", `industry-${slug(lead.industry)}`];
  // Consent tag drives every automated marketing workflow. Without it, only direct replies about the scorecard are allowed.
  tags.push(lead.marketingConsent ? "marketing-consent-yes" : "marketing-consent-no");
  if (lead.interest) tags.push(`interest-${slug(lead.interest)}`);
  return tags;
}

function noteFor(lead: Lead, ip: string): string {
  return [
    "Free Growth Scorecard request (website form)",
    `Business: ${lead.businessName}`,
    `Industry: ${lead.industry}`,
    `Primary service city: ${lead.city}`,
    `Website: ${lead.website || "not provided"}`,
    `Package interest: ${lead.interest || "none selected"}`,
    `Marketing email/SMS consent: ${lead.marketingConsent ? "YES" : "NO"} (recorded ${new Date().toISOString()}, IP ${ip})`,
    `Consent text: "I agree to receive occasional promotional emails and text messages from Novus Core Holdings, LLC... Reply STOP to opt out."`,
    `Page: ${lead.pageUrl}`,
    lead.referrer ? `Referrer: ${lead.referrer}` : "",
    Object.keys(lead.utm).length ? `UTM: ${JSON.stringify(lead.utm)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function ghl(path: string, token: string, body: unknown) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GHL ${path} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

async function sendViaApi(lead: Lead, ip: string) {
  const token = process.env.GHL_PRIVATE_TOKEN!;
  const locationId = process.env.GHL_LOCATION_ID!;
  const { firstName, lastName } = splitName(lead.contactName);

  const upsert = await ghl("/contacts/upsert", token, {
    locationId,
    firstName,
    lastName,
    name: lead.contactName,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.businessName,
    website: lead.website || undefined,
    city: lead.city,
    state: "FL",
    country: "US",
    source: "Website: Free Growth Scorecard",
    tags: tagsFor(lead),
  });
  const contactId: string | undefined = upsert?.contact?.id;
  if (!contactId) throw new Error("GHL upsert returned no contact id");

  await ghl(`/contacts/${contactId}/notes`, token, { body: noteFor(lead, ip) });

  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_PIPELINE_STAGE_ID;
  if (pipelineId && stageId) {
    try {
      await ghl("/opportunities/", token, {
        locationId,
        pipelineId,
        pipelineStageId: stageId,
        contactId,
        name: `${lead.businessName}: Growth Scorecard`,
        status: "open",
        source: "Website: Free Growth Scorecard",
      });
    } catch (err) {
      // A duplicate opportunity for a returning contact shouldn't fail the request; the contact and note are saved.
      console.warn("[lead] opportunity not created", err);
    }
  }
}

async function sendViaWebhook(lead: Lead, ip: string) {
  const res = await fetch(process.env.GHL_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      firstName: splitName(lead.contactName).firstName,
      lastName: splitName(lead.contactName).lastName,
      tags: tagsFor(lead).join(","),
      note: noteFor(lead, ip),
      submittedAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`GHL webhook ${res.status}`);
}

async function sendViaSheets(lead: Lead, ip: string) {
  const res = await fetch(process.env.SHEETS_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // Apps Script reads the raw body
    redirect: "follow",
    body: JSON.stringify({
      secret: process.env.SHEETS_WEBHOOK_SECRET,
      submittedAt: new Date().toISOString(),
      ...lead,
      utm: Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join("&"),
      tags: tagsFor(lead).join(", "),
      ip,
    }),
  });
  const text = await res.text();
  let data: { ok?: boolean; error?: string } = {};
  try {
    data = JSON.parse(text);
  } catch {
    /* Apps Script returns HTML on errors */
  }
  if (!res.ok || data.ok !== true) throw new Error(`Sheets webhook ${res.status}: ${data.error || text.slice(0, 200)}`);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const allowed = process.env.ALLOWED_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (allowed?.length && origin && !allowed.includes(origin)) {
    return res.status(403).json({ ok: false, message: "This form can only be submitted from our website." });
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please wait a few minutes and try again." });
  }

  const body = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}) as Record<string, unknown>;

  // Spam checks. Bots get a generic error and nothing is stored.
  const tooFast = typeof body.elapsedMs !== "number" || body.elapsedMs < MIN_FILL_MS;
  if (clean(body.hp) || tooFast) {
    return res.status(400).json({ ok: false, message: "We couldn't process that submission. Please try again." });
  }

  const { lead, error } = parse(body);
  if (!lead) return res.status(422).json({ ok: false, message: error });

  const apiMode = !!(process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID);
  const webhookMode = !!process.env.GHL_WEBHOOK_URL;
  const sheetsMode = !!(process.env.SHEETS_WEBHOOK_URL && process.env.SHEETS_WEBHOOK_SECRET);
  if (!apiMode && !webhookMode && !sheetsMode) {
    console.info("[lead] DEVELOPMENT MODE: GoHighLevel is not configured; lead was NOT stored.", {
      industry: lead.industry,
      city: lead.city,
    });
    return res.status(503).json({ ok: false, code: "NOT_CONFIGURED", message: "Lead capture is not configured yet." });
  }

  try {
    if (apiMode) await sendViaApi(lead, ip);
    else if (webhookMode) await sendViaWebhook(lead, ip);
    else await sendViaSheets(lead, ip);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return res.status(502).json({
      ok: false,
      message: "We couldn't save your request just now. Please try again, or email gorybedward@gmail.com.",
    });
  }
}
