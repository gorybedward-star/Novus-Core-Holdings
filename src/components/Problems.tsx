import { ArrowRight } from "lucide-react";
import { PROBLEMS } from "../content";
import { Container, Eyebrow } from "./ui";

export function Problems() {
  return (
    <section id="services" className="scroll-mt-16 bg-mist py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>The gap</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink [text-wrap:balance] sm:text-[2.7rem]">
            You're busy running the business. Who's making sure opportunities don't slip away?
          </h2>
          <p className="mt-4 max-w-2xl text-[1.06rem] leading-relaxed text-muted">
            These are the gaps we see most often in growing service companies. Each one maps to specific work we do every month.
          </p>
        </div>

        <ul className="mt-12 overflow-hidden rounded-xl border border-line bg-white">
          {PROBLEMS.map((p) => (
            <li
              key={p.problem}
              className="grid gap-3 border-b border-line p-5 last:border-0 sm:p-6 md:grid-cols-[1fr_auto_1.25fr] md:items-center md:gap-8"
            >
              <p className="min-w-0 font-display text-[1.12rem] font-bold leading-snug text-ink">{p.problem}</p>
              <ArrowRight className="hidden h-5 w-5 text-volt md:block" aria-hidden />
              <div className="min-w-0">
                <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-volt">
                  What we do · {p.tag}
                </span>
                <p className="mt-1 text-[0.98rem] leading-relaxed text-muted">{p.fix}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
