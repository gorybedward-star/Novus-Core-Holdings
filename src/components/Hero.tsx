import { BarChart3, MapPin, MessageSquareReply } from "lucide-react";
import { ButtonLink, Container } from "./ui";
import { GrowthDashboard } from "./GrowthDashboard";
import { BRAND } from "../content";

const BENEFITS = [
  { icon: MapPin, label: "Stronger Local Visibility" },
  { icon: MessageSquareReply, label: "Better Customer Follow-Up" },
  { icon: BarChart3, label: "Clear Monthly Reporting" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* faint survey grid, the only decoration on the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(#EEF1F6 1px, transparent 1px), linear-gradient(90deg, #EEF1F6 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <Container className="relative grid items-center gap-12 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
        <div className="min-w-0 motion-safe:animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" aria-hidden />
            Service trades · {BRAND.region}
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink [text-wrap:balance] sm:text-[3.4rem] lg:text-[4.1rem]" style={{ fontStretch: "106%" }}>
            Your next customer is looking. Will they find <span className="text-volt">you</span>, or your competitor?
          </h1>

          <p className="mt-6 max-w-[38rem] text-[1.12rem] leading-relaxed text-muted sm:text-[1.2rem]">
            We help service trade businesses get discovered, build trust, and turn more customer inquiries into booked
            appointments, with one streamlined growth system: the Local Growth Engine.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#scorecard" trackAs="hero_primary" arrow className="min-h-[3.4rem] px-6 text-base">
              Get My Free Growth Scorecard
            </ButtonLink>
            <ButtonLink href="#system" trackAs="hero_secondary" variant="secondary" className="min-h-[3.4rem] px-6 text-base">
              See How It Works
            </ButtonLink>
          </div>
          <p className="mt-3 text-[0.85rem] text-muted">Free. One-page assessment with three prioritized fixes. No obligation.</p>

          <ul aria-label="Trades we serve" className="mt-7 flex flex-wrap gap-1.5">
            {BRAND.trades.map((t) => (
              <li key={t} className="rounded-md border border-line bg-white px-2.5 py-1 text-[0.8rem] font-semibold text-ink">
                {t}
              </li>
            ))}
          </ul>

          <ul className="mt-9 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-[0.92rem] font-semibold text-ink">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-volt-soft text-volt">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 motion-safe:animate-rise [animation-delay:120ms]">
          <GrowthDashboard />
        </div>
      </Container>
    </section>
  );
}
