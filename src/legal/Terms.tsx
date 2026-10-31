import { BRAND, SCOPE_DISCLAIMER } from "../content";
import { LegalLayout } from "./LegalLayout";

export function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="[DATE BEFORE PUBLISHING]">
      <p>
        These terms govern your use of this website, operated by {BRAND.legalEntity}. By using
        the site you agree to them. Paid services are governed by a separate written service agreement, which controls if it
        conflicts with these terms.
      </p>

      <h2>The free Growth Scorecard</h2>
      <p>
        The scorecard is a free, general assessment based on publicly available information and anything you share with us.
        It is provided for informational purposes, without obligation, and is not a guarantee of any outcome. We may decline
        a request at our discretion, for example for businesses outside our service area or industries.
      </p>

      <h2>Pricing and services</h2>
      <p>
        Prices shown on this site are in US dollars and describe our standard packages. Final scope, pricing, billing terms,
        and cancellation terms are set out in your service agreement. {SCOPE_DISCLAIMER}
      </p>

      <h2>No guarantees</h2>
      <p>
        Search rankings, lead volume, and revenue depend on many factors outside our control. We do not guarantee specific
        results. Any example metrics on this website are illustrative and do not represent actual client results.
      </p>

      <h2>Automated follow-up and messaging</h2>
      <p>
        Automated inquiry follow-up and missed-call follow-up are provided only where technically available and legally
        permitted, and only for contacts with the required consent. Clients are responsible for providing accurate contact
        data and for honoring their customers' opt-out requests.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content and design of this website belong to {BRAND.legalEntity}. You may not copy or reuse them without
        permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        This website is provided "as is". To the fullest extent permitted by law, {BRAND.legalEntity} is not liable for
        indirect or consequential damages arising from your use of the website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Florida. [Confirm venue with counsel.]</p>

      <h2>Contact</h2>
      <p>Email: {BRAND.email}</p>
    </LegalLayout>
  );
}
