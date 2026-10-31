// All page copy and business facts live here so they can be edited without touching layout code.
// Rule: only verified facts. No invented results, testimonials, addresses, or phone numbers.

export const BRAND = {
  name: "Novus Core Holdings",
  system: "The Local Growth Engine",
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
      "CRM pipeline",
      "Automated inquiry follow-up",
      "Estimate follow-up",
      "Appointment coordination on eligible plans",
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
    fix: "Every inquiry lands in one pipeline and gets an automated first response, including missed-call follow-up where your phone setup allows it.",
    tag: "Get Booked",
  },
  {
    problem: "Estimates aren't consistently followed up.",
    fix: "Open estimates get scheduled follow-up, and on Growth + Operations a real person reviews and follows up on them.",
    tag: "Get Booked",
  },
  {
    problem: "You don't have a clear view of marketing or the pipeline.",
    fix: "You get one plain-language monthly report: what we did, what came in, and where each opportunity stands.",
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
    forWho: "For businesses that need consistent, professional online visibility.",
    features: [
      "8 edited short-form videos monthly using client-provided footage",
      "Social scheduling on two platforms",
      "Up to four Google Business Profile updates monthly",
      "Basic local business listing review",
      "Monthly activity report",
    ],
    cta: "Start Building Visibility",
  },
  {
    id: "growth",
    name: "Growth Engine",
    price: 1495,
    onboarding: 695,
    forWho: "For businesses ready to combine visibility with customer inquiry management.",
    features: [
      "12 edited short-form videos monthly",
      "Social scheduling on two platforms",
      "Four Google Business Profile updates",
      "One existing website service-page optimization monthly",
      "Two FAQ/search-readiness updates monthly",
      "CRM lead pipeline",
      "Authorized automated customer inquiry follow-up, up to 100 eligible inquiries monthly",
      "Missed-call follow-up where technically available and legally permitted",
      "Customer review-request workflow",
      "Monthly growth and appointment tracking report",
    ],
    cta: "Build My Growth Engine",
    featured: true,
  },
  {
    id: "operations",
    name: "Growth + Operations",
    price: 2495,
    onboarding: 995,
    forWho: "For growing businesses that need additional operational support.",
    includesLead: "Everything in Growth Engine, plus:",
    features: [
      "Up to 12 hours monthly of virtual administrative support",
      "Appointment coordination",
      "Human-reviewed follow-up on up to 50 open estimates monthly",
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
      { label: "Edited short-form videos (client-provided footage)", values: ["8 / month", "12 / month", "12 / month"] },
      { label: "Social scheduling", values: ["2 platforms", "2 platforms", "2 platforms"] },
      { label: "Google Business Profile updates", values: ["Up to 4 / month", "4 / month", "4 / month"] },
      { label: "Local business listing review", values: ["Basic", "Basic", "Basic"] },
      { label: "Existing website service-page optimization", values: [false, "1 / month", "1 / month"] },
      { label: "FAQ / search-readiness updates", values: [false, "2 / month", "2 / month"] },
    ],
  },
  {
    pillar: "chosen",
    title: "Get Chosen",
    rows: [{ label: "Customer review-request workflow", values: [false, true, true] }],
  },
  {
    pillar: "booked",
    title: "Get Booked",
    rows: [
      { label: "CRM lead pipeline", values: [false, true, true] },
      { label: "Automated customer inquiry follow-up", values: [false, "Up to 100 eligible / month", "Up to 100 eligible / month"] },
      { label: "Missed-call follow-up (where available and permitted)", values: [false, true, true] },
      { label: "Appointment coordination", values: [false, false, true] },
      { label: "Human-reviewed open-estimate follow-up", values: [false, false, "Up to 50 / month"] },
    ],
  },
  {
    pillar: "support",
    title: "Reporting and support",
    rows: [
      { label: "Monthly report", values: ["Activity report", "Growth + appointment tracking", "Growth + appointment tracking"] },
      { label: "Weekly pipeline summary", values: [false, false, true] },
      { label: "Virtual administrative support", values: [false, false, "Up to 12 hrs / month"] },
      { label: "Monthly 30-minute strategy meeting", values: [false, false, true] },
      { label: "Priority business-day support", values: [false, false, true] },
    ],
  },
];

export const SCOPE_DISCLAIMER =
  "Advertising spend, additional software usage fees, onsite filming, and custom website development are not included unless separately agreed. Deliverables require appropriate client access and approvals. No specific rankings, lead counts, or revenue results are guaranteed.";

export const SCORECARD_AREAS = [
  "Google visibility and business profile",
  "Online reputation and customer trust",
  "Website clarity and conversion opportunities",
  "Customer inquiry and follow-up process",
];

export const SCORECARD_RECEIVES = [
  "A concise one-page assessment",
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
    a: "No. We set up the lead pipeline and follow-up alongside the tools you already use wherever we can. Missed-call follow-up depends on what your current phone setup supports, and we check that with you during onboarding before promising it.",
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
