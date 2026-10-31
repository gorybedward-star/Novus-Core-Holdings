import { CalendarCheck, Check, Search, ShieldCheck } from "lucide-react";
import { PILLARS, type PillarId } from "../content";
import { Container, Eyebrow } from "./ui";

const ICONS: Record<PillarId, typeof Search> = { found: Search, chosen: ShieldCheck, booked: CalendarCheck };

export function System() {
  return (
    <section id="system" className="scroll-mt-16 bg-char py-20 text-white md:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">How Local Growth Engine works</Eyebrow>
            <h2 className="mt-3 font-display text-[2.2rem] font-extrabold uppercase leading-[0.98] tracking-[-0.01em] [text-wrap:balance] sm:text-[3.2rem]" style={{ fontStretch: "112%" }}>
              More visibility.<br />
              <span className="text-signal">Less missed business.</span>
            </h2>
          </div>
          <p className="max-w-xl text-[1.06rem] leading-relaxed text-char-muted lg:justify-self-end">
            Found brings people to you. Chosen gives them a reason to call you instead of the next name on the list. Booked
            makes sure that call turns into an appointment. Each step feeds the next, and one monthly report shows all three.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.id];
            return (
              <li key={p.id} className="relative flex min-w-0 flex-col rounded-xl border border-char-line bg-char-2 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-volt text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[0.75rem] font-semibold tabular-nums text-char-muted">Step {i + 1} of 3</span>
                </div>
                <h3 className="mt-6 font-display text-[1.9rem] font-black uppercase leading-none tracking-[-0.01em]" style={{ fontStretch: "115%" }}>
                  {p.verb}
                </h3>
                <p className="mt-2 text-[1.05rem] font-semibold text-signal">{p.goal}</p>
                <p className="mt-1 text-[0.95rem] text-char-muted">{p.summary}</p>
                <ul className="mt-5 grid gap-2 border-t border-char-line pt-5">
                  {p.services.map((s) => (
                    <li key={s} className="flex gap-2.5 text-[0.94rem] text-white/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
                {i < 2 && (
                  <span aria-hidden className="absolute -bottom-3 left-1/2 z-10 h-6 w-px bg-volt lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:h-px lg:w-6" />
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
