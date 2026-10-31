import { Plus } from "lucide-react";
import { FAQS } from "../content";
import { track } from "../lib/analytics";
import { Container, Eyebrow } from "./ui";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 bg-white py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[2.7rem]">
            Straight answers.
          </h2>
          <p className="mt-4 max-w-sm text-[1.02rem] leading-relaxed text-muted">
            Don't see your question? Ask it when you request your scorecard and we'll answer it there.
          </p>
        </div>
        <div className="min-w-0 border-t border-line">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              className="group border-b border-line"
              onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && track("faq_open", { index: i + 1 })}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-display text-[1.08rem] font-bold leading-snug text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="mt-0.5 h-5 w-5 shrink-0 text-volt transition-transform duration-200 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="-mt-1 max-w-[42rem] pb-6 text-[1rem] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
