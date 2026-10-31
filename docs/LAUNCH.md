# Launch guide

## Credentials and access still needed

| Item | Why | Who provides |
|---|---|---|
| Domain name (e.g. novuscoreholdings.com) and DNS access | Live URL, canonical/OG tags, professional email | Gory (buy at Cloudflare, Namecheap, or Google-managed Squarespace Domains) |
| GitHub account + new repository | Source of truth, auto-deploys | Gory |
| Vercel account (free Hobby) connected to GitHub | Hosting + `/api/lead` function | Gory |
| GoHighLevel Private Integration token + Location ID | Form → CRM | Gory, from GoHighLevel settings |
| `Scorecard Leads` pipeline ID + `New Lead` stage ID | Opportunity creation | Gory, from GoHighLevel |
| A2P 10DLC registration (LC Phone) | Any SMS sending | Gory, inside GoHighLevel |
| GA4 measurement ID or GTM container (optional) | Conversion tracking | Gory (free) |
| Founder headshot (optional) | Replace "GB" monogram | Gory |
| Attorney review of Privacy Policy, Terms, SMS consent text | Compliance | Gory's counsel |

Recommended: a domain email (e.g. gory@yourdomain.com via Google Workspace) instead of Gmail for credibility and deliverability. Update `BRAND.email` in `src/content.ts` when ready.

## Decisions to confirm (I made reasonable assumptions)

- "Basic local business listing review" is shown as included in all three plans in the comparison table (Growth + Operations includes everything in Growth Engine; Growth Engine's list in the brief didn't mention it). Change in `COMPARE_GROUPS` if not.
- FAQ answers on account ownership, onboarding timing, and plan changes. Make sure they match your service agreement.
- Confirmation email timing ("within X business days") in GoHighLevel.

## Pre-launch QA checklist

- [ ] Replace all `https://www.example.com` in `index.html` with the real domain
- [ ] Privacy Policy and Terms reviewed, dates filled in, `[bracketed]` placeholders resolved, draft banner removed (`src/legal/LegalLayout.tsx`), `noindex` removed from `privacy.html` / `terms.html`
- [ ] GoHighLevel env vars set in Vercel; test submission creates contact + tags + note + opportunity
- [ ] Test submission WITH and WITHOUT marketing consent; confirm correct tag and that no marketing workflow fires for `marketing-consent-no`
- [ ] Owner notification arrives on your phone/email
- [ ] Error path: temporarily break the token in a Preview deployment, confirm the form shows "Your request wasn't sent" (not success)
- [ ] Form: keyboard-only completion works; error messages read by screen reader; tab order logical
- [ ] Test on a real iPhone (Safari) and Android (Chrome): menu, sticky CTA, form, comparison table scrolls sideways
- [ ] Every CTA goes to the scorecard; "Email Gory" opens mail app
- [ ] Footer links work (Services, How It Works, Scorecard, Privacy, Terms)
- [ ] Share the URL in a text/Slack/Facebook post to check the Open Graph preview
- [ ] Lighthouse (Chrome DevTools) mobile: Performance, Accessibility, SEO all 90+
- [ ] Google Search Console: verify domain, submit the homepage
- [ ] Google Business Profile for Novus Core Holdings links to the site (once you create one)
- [ ] Analytics: confirm `scorecard_submit_success` appears in GA4 DebugView; mark it as a key event

## Conversion events (already wired)

`cta_click` (location), `package_select` (package), `compare_plans_toggle`, `scorecard_form_start`, `scorecard_submit_attempt`, `scorecard_submit_success`, `scorecard_submit_error`, `scorecard_submit_dev_mode`, `faq_open`, `email_click`. No personal data is included in events.

## Three highest-impact tests after launch

1. **Hero headline + dashboard vs. a trade-specific hero.** Test the current question headline against a version that names the moment of pain ("A homeowner's AC just quit. Who do they call?", with matching versions for pool, fence, and cleaning) and, once you run ads, a version per trade (a small code change can swap the headline based on a `?trade=hvac` link parameter). Measure scorecard submissions per visitor.
2. **Form length.** Test the 7-field form against a 4-field first step (business name, name, email, phone) with website/industry/city on a second step. Shorter first steps usually lift starts; watch whether completed, qualified requests go up, not just starts.
3. **Scorecard proof.** Once you've delivered a few scorecards, add a blurred/redacted sample scorecard image next to the form ("Here's what you'll get"). Showing the actual deliverable is the honest substitute for testimonials and tends to raise trust. Later, swap in verified testimonials as they come.
