// Analytics-ready conversion events.
// Pushes to window.dataLayer (Google Tag Manager) and calls gtag() when GA4 is loaded.
// Nothing is sent anywhere until you add GTM or GA4 to index.html. No personal data is included in events.

export type ConversionEvent =
  | "cta_click"
  | "package_select"
  | "compare_plans_toggle"
  | "scorecard_form_start"
  | "scorecard_submit_attempt"
  | "scorecard_submit_success"
  | "scorecard_submit_error"
  | "scorecard_submit_dev_mode"
  | "faq_open"
  | "email_click";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: ConversionEvent, props: Props = {}): void {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
    window.gtag?.("event", event, props);
    if (import.meta.env.DEV) console.debug("[track]", event, props);
  } catch {
    /* analytics must never break the page */
  }
}
