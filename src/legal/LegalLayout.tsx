import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Container, Wordmark } from "../components/ui";
import { Footer } from "../components/Footer";

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between">
          <a href="index.html" aria-label="Novus Core Holdings home"><Wordmark /></a>
          <a href="index.html#scorecard" className="text-[0.9rem] font-semibold text-volt">Free Growth Scorecard</a>
        </Container>
      </header>
      <main className="bg-white py-14 md:py-20">
        <Container>
          <article className="mx-auto max-w-[44rem]">
            <div role="note" className="mb-10 flex gap-3 rounded-md border border-amber-400 bg-amber-50 p-4 text-[0.9rem] leading-relaxed text-amber-950">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <p>
                <strong>Draft for review.</strong> This document is a starting template, not legal advice. Have it reviewed by a
                qualified attorney and confirm it matches your actual practices and GoHighLevel settings before publishing.
              </p>
            </div>
            <h1 className="font-display text-[2.4rem] font-extrabold leading-tight tracking-[-0.02em] text-ink">{title}</h1>
            <p className="mt-2 font-mono text-[0.8rem] text-muted">Last updated: {updated}</p>
            <div className="legal mt-10">{children}</div>
          </article>
        </Container>
      </main>
      <Footer onHome={false} />
    </>
  );
}
