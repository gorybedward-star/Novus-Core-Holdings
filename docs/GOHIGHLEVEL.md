# Connecting the scorecard form to GoHighLevel

Target workflow:

**Website visitor → Free Scorecard form → GoHighLevel contact → New Lead pipeline → Owner notification → Scorecard preparation → Discovery conversation → Proposal**

The browser posts only to `/api/lead` on your own site. That server function holds the GoHighLevel credentials and talks to GoHighLevel. No key is ever in the frontend code.

## What the server sends

For every valid request `api/lead.ts`:

1. **Upserts a contact** (matched on email/phone, so repeat requests don't create duplicates) with name, email, phone (E.164), company, website, city, state FL, source `Website: Free Growth Scorecard`.
2. **Adds tags**
   - `website-lead`, `scorecard-request`
   - `industry-hvac`, `industry-plumbing`, `industry-electrical`, `industry-landscaping`, `industry-fencing`, `industry-pool-services`, `industry-cleaning`, `industry-other-service-trade`
   - `marketing-consent-yes` **or** `marketing-consent-no`
   - `interest-growth-engine` etc. when the visitor clicked a package first
3. **Adds a note** with every form answer, the consent decision, its timestamp, IP, the exact consent wording, page URL, referrer and UTM tags (your consent record).
4. **Creates an opportunity** in your pipeline stage, if `GHL_PIPELINE_ID` and `GHL_PIPELINE_STAGE_ID` are set.

## Setup, option A (recommended): Private Integration token

Uses GoHighLevel's API v2. Included with your subscription, no extra paid platform.

1. In the sub-account: **Settings → Private Integrations → Create new integration**.
   Name it `Website lead form`. Scopes: `contacts.write`, `contacts.readonly`, `opportunities.write`, `opportunities.readonly`.
   Copy the token (shown once).
2. **Settings → Business Profile**: copy the **Location ID**.
3. Create the pipeline: **Opportunities → Pipelines → Create** `Scorecard Leads` with stages:
   `New Lead` → `Scorecard In Progress` → `Scorecard Sent` → `Discovery Booked` → `Proposal Sent` → `Won` / `Lost`.
4. Get the pipeline and stage IDs. Easiest: open the pipeline in GoHighLevel and copy the IDs from the URL / pipeline settings, or call
   `GET https://services.leadconnectorhq.com/opportunities/pipelines?locationId=...` with the token and `Version: 2021-07-28` header.
5. In Vercel → Settings → Environment Variables (Production and Preview):

   | Variable | Value |
   |---|---|
   | `GHL_PRIVATE_TOKEN` | token from step 1 |
   | `GHL_LOCATION_ID` | from step 2 |
   | `GHL_PIPELINE_ID` | `Scorecard Leads` pipeline id |
   | `GHL_PIPELINE_STAGE_ID` | `New Lead` stage id |
   | `ALLOWED_ORIGINS` | `https://yourdomain.com,https://www.yourdomain.com` |

6. Redeploy. Submit a test with your own details and confirm the contact, tags, note and opportunity appear.

## Setup, option B: workflow Inbound Webhook

Use only if you'd rather not create a Private Integration. Note GoHighLevel may bill "premium" workflow triggers such as Inbound Webhook per execution on some plans; check your plan first.

1. **Automation → Workflows → Create** → trigger **Inbound Webhook**. Copy the URL.
2. Set `GHL_WEBHOOK_URL` in Vercel. Submit one test so GoHighLevel sees a sample payload.
3. In the workflow add **Create/Update Contact** mapping `email`, `phone`, `firstName`, `lastName`, `businessName`, `website`, `city`; **Add Tag** from `tags`; **Add Note** from `note`; **Create/Update Opportunity** in `Scorecard Leads / New Lead`.

## Workflows to build in GoHighLevel

**1. New scorecard request** (trigger: *Contact Tag Added* = `scorecard-request`)
- Internal notification to Gory (email and/or app push): "New scorecard request: {{contact.company_name}}, {{contact.city}}". Include a link to the contact.
- Send the requester ONE transactional confirmation email: "We received your request. Your scorecard will arrive within [X] business days." This is a direct response to their request, not marketing.
- Create a task "Prepare scorecard" due in [X] business days, assigned to Gory.

**2. Scorecard delivery** (trigger: opportunity moved to `Scorecard Sent`)
- Email the scorecard PDF (made from a Google Docs template) with a booking link for the optional 15-minute review (GoHighLevel calendar).

**3. Discovery booked** (trigger: *Appointment Booked* on the 15-minute calendar)
- Move opportunity to `Discovery Booked`, send reminder 24h and 1h before.

**4. Marketing nurture** (trigger: *Contact Tag Added* = `marketing-consent-yes`)
- Only this workflow may send promotional email or SMS.

## Consent and suppression rules (set these before any automation goes live)

- **No promotional SMS or email without `marketing-consent-yes`.** Add an *If/Else* at the top of every marketing workflow: if tag `marketing-consent-yes` is absent, end.
- Contacts tagged `marketing-consent-no` get only messages directly about their scorecard request (confirmation, delivery, scheduling).
- Keep GoHighLevel's default STOP / UNSUBSCRIBE handling on. When a contact opts out, GoHighLevel sets DND; never clear DND manually.
- Add a workflow: *Contact DND changed → enabled* → remove `marketing-consent-yes`, add `opted-out`.
- Complete **A2P 10DLC brand and campaign registration** in GoHighLevel (LC Phone) before sending any SMS. Unregistered traffic is blocked by carriers.
- Send SMS only 8am to 9pm recipient local time (Florida's telemarketing law restricts hours and frequency).
- For client sub-accounts you set up later (missed-call text-back, inquiry follow-up), apply the same rules per client and document each client's consent capture.

Have an attorney review the SMS consent wording and your Privacy Policy before launch.

## Spam protection

Already in place: hidden honeypot field, minimum fill time (2.5s), server-side validation, per-instance rate limit (5 per 10 min per IP), optional origin allow-list.
If spam gets through, add **Cloudflare Turnstile** (free): add the widget to the form and verify the token in `api/lead.ts` with a `TURNSTILE_SECRET` env var. Or enable Vercel's Firewall rate-limiting rule on `/api/lead`.

## Alternative: GoHighLevel native form embed

If you ever prefer zero code: build the form in **Sites → Forms**, add the same fields and an unchecked consent checkbox, and embed it in `Scorecard.tsx` with GoHighLevel's iframe snippet. You lose the custom design, validation and analytics events, so the server route above is recommended.
