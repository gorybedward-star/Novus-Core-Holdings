import { JOURNEY } from "../content";
import { Container, Eyebrow } from "./ui";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-white py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>How working with us works</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink [text-wrap:balance] sm:text-[2.7rem]">
            Four steps. No guesswork about what happens next.
          </h2>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <li key={j.step} className="flex min-w-0 flex-col bg-white p-6 sm:p-7">
              <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-volt">Step {i + 1}</span>
              <h3 className="mt-3 font-display text-[1.5rem] font-extrabold uppercase tracking-[0.005em] text-ink" style={{ fontStretch: "110%" }}>
                {j.step}
              </h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{j.text}</p>
              <div aria-hidden className="mt-6 flex gap-1">
                {JOURNEY.map((_, k) => (
                  <span key={k} className={`h-1 flex-1 rounded-full ${k <= i ? "bg-volt" : "bg-line"}`} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
