import { useState } from "react";
import { Copy, Mail } from "lucide-react";
import { BRAND } from "../content";
import { track } from "../lib/analytics";
import { ButtonLink, Container } from "./ui";

export function FinalCTA() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.getElementById("final-email");
      if (el) window.getSelection()?.selectAllChildren(el);
    }
  };

  return (
    <section className="bg-char py-20 text-white md:py-28">
      <Container>
        <h2 className="max-w-4xl font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.02em] [text-wrap:balance] sm:text-[3.3rem]">
          You handle the service calls. <span className="text-signal">We'll help build the growth system.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-char-muted">
          Let's identify where your business can improve visibility, strengthen follow-up, and create a more organized customer pipeline.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="#scorecard" trackAs="final_primary" arrow className="min-h-[3.4rem] px-6 text-base">
            Get My Free Growth Scorecard
          </ButtonLink>
          <ButtonLink
            href={`mailto:${BRAND.email}?subject=${encodeURIComponent("Novus Core Holdings inquiry")}`}
            variant="ghostDark"
            className="min-h-[3.4rem] px-6 text-base"
            onClick={() => track("email_click", { location: "final_cta" })}
          >
            <Mail className="h-4 w-4" aria-hidden /> Email Gory
          </ButtonLink>
        </div>
        <p className="mt-5 flex flex-wrap items-center gap-2 text-[0.95rem] text-char-muted">
          Email: <span id="final-email" className="select-all font-semibold text-white">{BRAND.email}</span>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.82rem] font-semibold text-signal hover:bg-white/5">
            <Copy className="h-3.5 w-3.5" aria-hidden /> <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </p>
      </Container>
    </section>
  );
}
