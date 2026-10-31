import { Quote } from "lucide-react";
import { BRAND, TESTIMONIALS } from "../content";
import { Container, Eyebrow } from "./ui";

export function Founder() {
  return (
    <section id="about" className="scroll-mt-16 bg-mist py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0">
          <Eyebrow>Who you'll work with</Eyebrow>
          {/* Replace the monogram with a real founder photo when available: <img src="/gory.jpg" alt="Gory Bedward" ... /> */}
          <div className="mt-5 flex items-center gap-4">
            <div aria-hidden className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-char font-display text-[1.6rem] font-black text-white" style={{ fontStretch: "115%" }}>
              GB
            </div>
            <div>
              <p className="font-display text-[1.5rem] font-extrabold leading-tight text-ink">{BRAND.founder}</p>
              <p className="text-[0.95rem] text-muted">Founder | Novus Core Holdings</p>
              <p className="text-[0.85rem] text-muted">{BRAND.legalEntity}</p>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <blockquote className="font-display text-[1.45rem] font-bold leading-[1.3] tracking-[-0.01em] text-ink [text-wrap:pretty] sm:text-[1.75rem]">
            “Novus Core Holdings was built around a straightforward belief: small service businesses deserve practical,
            measurable growth support without the complexity of managing multiple agencies and disconnected tools.”
          </blockquote>
          <div className="mt-6 grid max-w-[40rem] gap-4 text-[1.02rem] leading-relaxed text-muted">
            <p>
              You'll work with one accountable partner who handles visibility, follow-up, and reporting together, and who
              focuses on {BRAND.region} service trade businesses instead of trying to serve everyone.
            </p>
            <p>
              Novus Core Holdings is a new company, so you won't find a wall of borrowed logos here. Instead, every
              relationship starts with the free scorecard. You see the quality of our thinking on your own business before
              you spend anything.
            </p>
          </div>
        </div>
      </Container>

      {/* Verified testimonials and case studies render here automatically once added to TESTIMONIALS in content.ts. */}
      {TESTIMONIALS.length > 0 && (
        <Container className="mt-16">
          <h3 className="font-display text-[1.5rem] font-extrabold text-ink">From Central Florida business owners</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <li key={t.name + t.company} className="rounded-xl border border-line bg-white p-6">
                <Quote className="h-5 w-5 text-volt" aria-hidden />
                <p className="mt-3 text-[1rem] leading-relaxed text-ink">{t.quote}</p>
                <p className="mt-4 text-[0.88rem] font-semibold text-ink">{t.name}</p>
                <p className="text-[0.84rem] text-muted">{t.company} · {t.trade} · {t.city}</p>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
}
