import { BRAND } from "../content";
import { LegalLayout } from "./LegalLayout";

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="[DATE BEFORE PUBLISHING]">
      <p>
        This policy explains how {BRAND.legalEntity} ("we", "us") collects and uses
        information through this website. Questions: <strong>{BRAND.email}</strong>.
      </p>

      <h2>Information we collect</h2>
      <p>When you request a Growth Scorecard, we collect the details you enter:</p>
      <ul>
        <li>Business name, contact name, business email, and phone number</li>
        <li>Website URL, industry, and primary service city</li>
        <li>Your optional choice about marketing emails and text messages</li>
      </ul>
      <p>
        We also receive basic technical information, such as the page you came from, campaign tags in the page address (for
        example utm_source), and, if analytics is enabled, anonymous usage data collected through cookies or similar tools.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To prepare and deliver your scorecard and contact you about it</li>
        <li>To schedule an optional review conversation if you want one</li>
        <li>To send promotional emails or texts, only if you gave separate consent</li>
        <li>To operate, secure, and improve this website</li>
      </ul>

      <h2>Text messages</h2>
      <p>
        Agreeing to marketing texts is optional and is never a condition of receiving a scorecard or buying a service. If you
        opt in, message frequency varies and message and data rates may apply. Reply STOP to opt out or HELP for help at any
        time. We do not sell or share mobile numbers or SMS opt-in consent with third parties for their marketing.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We don't sell your personal information. We share it only with service providers that help us run the business,
        such as our CRM and messaging platform (GoHighLevel), our email and document tools (Google Workspace), and our website
        host, and only for the purposes above. We may also disclose information when required by law.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep scorecard requests for as long as needed to respond and to maintain business records, then delete or
        anonymize them. [Confirm retention period.]
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Unsubscribe from marketing emails using the link in any email</li>
        <li>Reply STOP to any text message</li>
        <li>Email {BRAND.email} to access, correct, or delete your information</li>
      </ul>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards, including encrypted connections, and form submissions are sent to our CRM through a
        secure server rather than directly from your browser. No method of transmission is completely secure.
      </p>

      <h2>Children</h2>
      <p>This website is intended for business owners and is not directed to children under 13.</p>

      <h2>Changes</h2>
      <p>We may update this policy. The date above shows when it last changed.</p>

      <h2>Contact</h2>
      <p>
        {BRAND.legalEntity}
        <br />
        Email: {BRAND.email}
        <br />
        [Add mailing address if required]
      </p>
    </LegalLayout>
  );
}
