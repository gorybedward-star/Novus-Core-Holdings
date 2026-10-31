# Novus Core Holdings website

Landing page for Novus Core Holdings, LLC. "The Local Growth Engine" is the name of the service system, not the brand.
React + TypeScript + Tailwind CSS + Lucide icons, built with Vite. One serverless function (`api/lead.ts`) sends scorecard requests to GoHighLevel.

## Project layout

```
index.html            Landing page shell: SEO, Open Graph, structured data, fonts
privacy.html          Draft Privacy Policy (noindex until reviewed)
terms.html            Draft Terms of Service (noindex until reviewed)
src/content.ts        ALL copy, packages, comparison table, FAQ. Edit text here.
src/components/       Header, Hero, GrowthDashboard, Problems, System, Pricing
                      (PricingCard + CompareTable), Scorecard (form), HowItWorks,
                      Founder (+ hidden testimonials slot), FAQ, FinalCTA, Footer, MobileCTA
src/lib/lead.ts       Form validation + submit to /api/lead
src/lib/analytics.ts  Conversion events -> window.dataLayer / gtag
api/lead.ts           Server: spam checks, validation, GoHighLevel API or webhook
docs/GOHIGHLEVEL.md   GoHighLevel setup and lead workflow
docs/LAUNCH.md        Credentials needed, pre-launch QA, post-launch tests
scripts/build-preview.mjs  Builds single-file preview pages into ./preview
```

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173  (form shows "Development mode", the /api route isn't served by Vite)
npx vercel dev       # runs the site AND /api/lead together, reads .env.local
npm run build        # type-check + production build into dist/
```

## Deploy (Vercel, free Hobby plan is enough to start)

1. Push this folder to a GitHub repository (e.g. `novus-core-site`).
2. In Vercel: **Add New → Project → Import** that repository. Vercel detects Vite from `vercel.json`. No build settings to change.
3. In **Settings → Environment Variables**, add the GoHighLevel variables from `.env.example` (see `docs/GOHIGHLEVEL.md`). Do not prefix them with `VITE_`.
4. Deploy. Every push to `main` redeploys automatically.
5. **Settings → Domains**: add your domain (e.g. `novuscoreholdings.com`) and follow the DNS instructions.
6. The site URL is set to https://novus-core-holdings.vercel.app. If you add a custom domain later, replace it in `index.html` and `ALLOWED_ORIGINS`, then push.

Until step 3 is done, the form shows a clearly marked **Development mode** notice and never claims the request was received.

Other hosts: Netlify or Cloudflare Pages work too. Move `api/lead.ts` into that host's function format (the handler logic is plain `fetch` calls and needs no changes beyond the request/response wrapper).

## Editing content

- Text, prices, FAQ, comparison rows: `src/content.ts`.
- Verified testimonials: add to `TESTIMONIALS` in `src/content.ts` (only with written permission). The section appears automatically when the list isn't empty.
- Founder photo: replace the "GB" monogram in `src/components/Founder.tsx`.
- Analytics: paste a GTM or GA4 snippet where marked in `index.html`. Events listed in `docs/LAUNCH.md`.
