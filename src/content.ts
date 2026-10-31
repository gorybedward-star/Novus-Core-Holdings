// All page copy and business facts live here so they can be edited without touching layout code.
// Rule: only verified facts. No invented results, testimonials, addresses, or phone numbers.

export const BRAND = {
  name: "Novus Core Holdings",
  division: "Business Growth & Operations",
  system: "Local Growth Engine",
  tagline: "Get Found. Get Chosen. Get Booked.",
  legalEntity: "Novus Core Holdings, LLC",
  founder: "Gory Bedward",
  email: "gorybedward@gmail.com",
  region: "Central Florida",
  cities: ["Orlando", "Apopka", "Ocoee", "Winter Garden"],
  trades: ["HVAC", "Plumbing", "Electrical", "Landscaping", "Fencing", "Pool Services", "Cleaning"],
} as const;

export type PillarId = "found" | "chosen" | "booked";

export interface Pillar {
  id: PillarId;
  verb: string;
  goal: string;
  summary: string;
  services: string[];
}

export const PILLARS: Pillar[] = [
  {
    id: "found",
    verb: "Get Found",
    goal: "Improve visibility.",
    summary: "Help customers discover the business.",
    services: [
      "Short-form marketing content",
      "Google Business Profile maintenance",
      "Local search visibility improvements",
      "Website content optimization",
    ],
  },
  {
    id: "chosen",
    verb: "Get Chosen",
    goal: "Build credibility.",
    summary: "Help prospective customers trust the business.",
    services: [
      "Professional branded content",
      "Educational videos",
      "Customer review-request workflows",
      "Consistent online business information",
    ],
  },
  {
    id: "booked",
    verb: "Get Booked",
    goal: "Improve follow-up and conversion.",
    summary: "Help the business respond to and manage opportunities.",
    services: [
      "Lead capture and tracking",
      "Missed-call text-back",
      "Estimate follow-up",
      "Past-due invoice reminders on eligible plans",
      "Appointment reminders on eligible plans",
    ],
  },
];

export const PROBLEMS: { problem: string; fix: string; tag: string }[] = [
  {
    problem: "Customers can't easily find the business online.",
    fix: "We keep your Google Business Profile active and accurate, and improve the service pages people land on from search.",
    tag: "Get Found",
  },
  {
    problem: "Social media activity is inconsistent.",
    fix: "We turn short clips from your jobs into edited videos and schedule them every month, so you show up without thinking about it.",
    tag: "Get Found · Get Chosen",
  },
  {
    problem: "Calls and inquiries may go unanswered.",
    fix: "Missed callers get an automatic text back where your phone setup allows it, and every inquiry is logged so nothing slips.",
    tag: "Get Booked",
  },
  {
    problem: "Estimates aren't consistently followed up.",
    fix: "Open estimates get automatic follow-up, and on Growth + Operations a real person follows up on them too.",
    tag: "Get Booked",
  },
  {
    problem: "You don't have a clear view of marketing or the pipeline.",
    fix: "You get one plain-language monthly report: what we did, what came in, and the dollar value of jobs we can trace to our follow-up.",
    tag: "Monthly reporting",
  },
];

export type PackageId = "visibility" | "growth" | "operations";

export interface Package {
  id: PackageId;
  name: string;
  price: number;
  onboarding: number;
  forWho: string;
  includesLead?: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: "visibility",
    name: "Visibility Essentials",
    price: 795,
    onboarding: 495,
    forWho: "For businesses that want more calls from Google and a stronger reputation.",
    features: [
      "Google Business Profile managed: weekly posts, photos, services, and Q&A",
      "Replies to every Google review within two business days",
      "Customer review-request system for your techs and invoices",
      "4 edited short-form videos monthly from client-provided footage",
      "Social scheduling on two platforms",
      "Quarterly local business listing check",
      "Monthly report: calls, direction requests, reviews, and rating",
    ],
    cta: "Start Building Visibility",
  },
  {
    id: "growth",
    name: "Growth Engine",
    price: 1495,
    onboarding: 695,
    forWho: "For businesses that want to stop losing calls and open estimates.",
    includesLead: "Everything in Visibility Essentials, plus:",
    features: [
      "Missed-call text-back on your existing phone system, where available and permitted",
      "Automated follow-up on every open estimate at days 2, 7, and 14",
      "Lead and estimate tracker showing every inquiry and outcome",
      "One website service-page or FAQ update monthly",
      "Monthly tracked-value report: missed calls recovered and estimates won after follow-up",
    ],
    cta: "Build My Growth Engine",
    featured: true,
  },
  {
    id: "operations",
    name: "Growth + Operations",
    price: 2495,
    onboarding: 995,
    forWho: "For growing businesses that want money collected and the owner's time back.",
    includesLead: "Everything in Growth Engine, plus:",
    features: [
      "Personal follow-up on up to 40 open estimates monthly",
      "Past-due invoice reminders at 7, 14, and 30 days",
      "Appointment confirmations and next-day reminders",
      "Weekly pipeline summary",
      "Monthly 30-minute strategy meeting",
      "Priority business-day support",
    ],
    cta: "Explore Growth + Operations",
  },
];

/** Cell value: true = included, false = not included, string = included with this specific limit. */
export type CompareCell = boolean | string;

export const COMPARE_GROUPS: {
  pillar: PillarId | "support";
  title: string;
  rows: { label: string; values: [CompareCell, CompareCell, CompareCell] }[];
}[] = [
  {
    pillar: "found",
    title: "Get Found",
    rows: [
      { label: "Google Business Profile management", values: ["Weekly posts", "Weekly posts", "Weekly posts"] },
      { label: "Edited short-form videos (client-provided footage)", values: ["4 / month", "4 / month", "4 / month"] },
      { label: "Social scheduling", values: ["2 platforms", "2 platforms", "2 platforms"] },
      { label: "Local business listing check", values: ["Quarterly", "Quarterly", "Quarterly"] },
      { label: "Website service-page or FAQ update", values: [false, "1 / month", "1 / month"] },
    ],
  },
  {
    pillar: "chosen",
    title: "Get Chosen",
    rows: [
      { label: "Customer review-request system", values: [true, true, true] },
      { label: "Google review replies", values: [true, true, true] },
    ],
  },
  {
    pillar: "booked",
    title: "Get Booked",
    rows: [
      { label: "Missed-call text-back (where available and permitted)", values: [false, true, true] },
      { label: "Automated open-estimate follow-up", values: [false, true, true] },
      { label: "Lead and estimate tracker", values: [false, true, true] },
      { label: "Personal open-estimate follow-up", values: [false, false, "Up to 40 / month"] },
      { label: "Past-due invoice reminders", values: [false, false, true] },
      { label: "Appointment confirmations and reminders", values: [false, false, true] },
    ],
  },
  {
    pillar: "support",
    title: "Reporting and support",
    rows: [
      { label: "Monthly report", values: ["Activity + reviews", "Activity + tracked value", "Activity + tracked value"] },
      { label: "Weekly pipeline summary", values: [false, false, true] },
      { label: "Monthly 30-minute strategy meeting", values: [false, false, true] },
      { label: "Priority business-day support", values: [false, false, true] },
    ],
  },
];

export const SCOPE_DISCLAIMER =
  "Advertising spend, additional software usage fees, onsite filming, and custom website development are not included unless separately agreed. Deliverables require appropriate client access and approvals. No specific rankings, lead counts, or revenue results are guaranteed.";

export const SCORECARD_AREAS = [
  "Google visibility",
  "Online reputation",
  "Website conversion opportunities",
  "Customer inquiry and follow-up processes",
];

export const SCORECARD_RECEIVES = [
  "A free one-page assessment covering all four areas",
  "Three prioritized improvement recommendations",
  "An optional 15-minute review conversation",
];

export const JOURNEY = [
  { step: "Discover", text: "We review your business and growth opportunities." },
  { step: "Build", text: "We configure the agreed marketing and customer follow-up systems." },
  { step: "Execute", text: "We deliver your monthly content, visibility, and follow-up services." },
  { step: "Report", text: "You receive a clear report showing completed work and measurable activity." },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is Novus Core Holdings right for my business?",
    a: "We work with service trade businesses in Central Florida, including HVAC, plumbing, electrical, landscaping, fencing, pool service, and cleaning companies, typically with about 3 to 20 employees. If you want steadier visibility and fewer inquiries falling through the cracks, it's likely a fit. The free scorecard is the easiest way to find out, and if we don't think we can help, we'll tell you.",
  },
  {
    q: "Do I need to create my own videos?",
    a: "You or your techs capture short phone clips on the job. We tell you what to film, then handle the editing, captions, and scheduling. Onsite filming isn't included unless we agree on it separately.",
  },
  {
    q: "Do I have to replace my existing phone system or CRM?",
    a: "No. We work inside the phone system and field-service software you already use wherever we can, and track leads in a simple shared sheet if you do not have one. Missed-call text-back depends on what your current phone setup supports, and we check that with you during onboarding before promising it.",
  },
  {
    q: "Who owns my business accounts and customer information?",
    a: "You do. Your Google Business Profile, social accounts, website, and customer information stay in your business's name. We work through access you grant, and you can remove that access at any time.",
  },
  {
    q: "How quickly can onboarding begin?",
    a: "Onboarding starts once the agreement is signed, the onboarding fee is paid, and we have access to the accounts we need. You'll get a written setup timeline during the discovery conversation. The biggest factor is how quickly access and approvals come through.",
  },
  {
    q: "Do you guarantee leads or revenue?",
    a: "No. Nobody can honestly guarantee rankings, lead counts, or revenue. What we commit to is the specific monthly work in your package, delivered consistently, and a report that shows exactly what was done and what activity came in.",
  },
  {
    q: "Can I upgrade or change my package?",
    a: "Yes. As your needs change, we'll move you to the package that fits. Timing and any onboarding differences are covered in your service agreement.",
  },
];

/**
 * Verified testimonials and case studies go here once you have written permission to publish them.
 * The section stays hidden while this list is empty. Never add placeholder or invented entries.
 */
export const TESTIMONIALS: { quote: string; name: string; company: string; city: string; trade: string }[] = [];

export const INDUSTRIES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Fencing",
  "Pool Services",
  "Cleaning",
  "Other service trade",
] as const;
