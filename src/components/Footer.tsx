import { BRAND } from "../content";
import { Container, Wordmark } from "./ui";

export function Footer({ onHome = true }: { onHome?: boolean }) {
  const base = onHome ? "" : "./";
  const links = [
    { href: `${base}#services`, label: "Services" },
    { href: `${base}#how-it-works`, label: "How It Works" },
    { href: `${base}#scorecard`, label: "Free Growth Scorecard" },
    { href: "privacy.html", label: "Privacy Policy" },
    { href: "terms.html", label: "Terms of Service" },
  ];
  return (
    <footer className="border-t border-char-line bg-ink py-14 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0">
          <Wordmark tone="dark" />
          <p className="mt-4 text-[0.92rem] text-white/85">
            Introducing <span className="font-semibold text-signal">{BRAND.system}</span>
          </p>
          <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-char-muted">{BRAND.tagline}</p>
          <dl className="mt-6 grid gap-1.5 text-[0.9rem] text-char-muted">
                        <div><dt className="inline">Founder: </dt><dd className="inline text-white/85">{BRAND.founder}</dd></div>
            <div><dt className="inline">Email: </dt><dd className="inline"><a href={`mailto:${BRAND.email}`} className="text-white/85 underline-offset-2 hover:underline">{BRAND.email}</a></dd></div>
            <div><dd className="inline">Serving {BRAND.region} service trades: {BRAND.cities.join(", ")}, and surrounding communities</dd></div>
          </dl>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2.5 text-[0.95rem]">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/80 transition-colors hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="mt-12 border-t border-char-line pt-6 text-[0.8rem] text-char-muted">
        © {new Date().getFullYear()} {BRAND.legalEntity}. All rights reserved.
      </Container>
    </footer>
  );
}
