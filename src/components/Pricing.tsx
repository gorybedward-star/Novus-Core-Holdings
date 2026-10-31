import { useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { COMPARE_GROUPS, PACKAGES, SCOPE_DISCLAIMER, type CompareCell, type Package } from "../content";
import { track } from "../lib/analytics";
import { Container, Eyebrow, goToScorecard } from "./ui";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function PricingCard({ pkg }: { pkg: Package }) {
  const featured = !!pkg.featured;
  return (
    <article
      className={`relative flex min-w-0 flex-col rounded-xl p-6 sm:p-7 ${
        featured ? "bg-char text-white ring-2 ring-volt lg:-my-4 lg:py-10" : "border border-line bg-white text-ink"
      }`}
      aria-labelledby={`pkg-${pkg.id}`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-volt px-3 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white">
          Featured package
        </span>
      )}
      <h3 id={`pkg-${pkg.id}`} className="font-display text-[1.2rem] font-extrabold uppercase tracking-[0.01em]" style={{ fontStretch: "110%" }}>
        {pkg.name}
      </h3>
      <p className={`mt-2 min-h-[3rem] text-[0.95rem] leading-snug ${featured ? "text-char-muted" : "text-muted"}`}>{pkg.forWho}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-[2.8rem] font-black leading-none tracking-[-0.03em] tabular-nums">{usd(pkg.price)}</span>
        <span className={featured ? "text-char-muted" : "text-muted"}>/month</span>
      </div>
      <p className={`mt-1.5 text-[0.86rem] ${featured ? "text-char-muted" : "text-muted"}`}>
        One-time onboarding: <span className={featured ? "text-white" : "text-ink"}>{usd(pkg.onboarding)}</span>
      </p>

      <button
        type="button"
        onClick={() => {
          track("package_select", { package: pkg.id });
          goToScorecard(pkg.name);
        }}
        className={`mt-6 inline-flex min-h-[3rem] items-center justify-center rounded-md px-5 text-[0.95rem] font-semibold transition-colors ${
          featured ? "bg-volt text-white hover:bg-volt-hover" : "border border-ink/15 text-ink hover:border-ink/40"
        }`}
      >
        {pkg.cta}
      </button>
      <p className={`mt-2 text-center text-[0.78rem] ${featured ? "text-char-muted" : "text-muted"}`}>Starts with your free scorecard</p>

      <div className={`mt-6 border-t pt-5 ${featured ? "border-char-line" : "border-line"}`}>
        {pkg.includesLead && <p className="mb-3 text-[0.9rem] font-semibold">{pkg.includesLead}</p>}
        <ul className="grid gap-2.5">
          {pkg.features.map((f) => (
            <li key={f} className={`flex gap-2.5 text-[0.92rem] leading-snug ${featured ? "text-white/85" : "text-ink/85"}`}>
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-signal" : "text-volt"}`} aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Cell({ v }: { v: CompareCell }) {
  if (v === true) return <><Check className="mx-auto h-4 w-4 text-volt" aria-hidden /><span className="sr-only">Included</span></>;
  if (v === false) return <><Minus className="mx-auto h-4 w-4 text-muted/50" aria-hidden /><span className="sr-only">Not included</span></>;
  return <span className="text-[0.84rem] font-medium text-ink">{v}</span>;
}

export function CompareTable() {
  const [open, setOpen] = useState(true);
  return (
    <div className="mt-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-[1.6rem] font-extrabold tracking-[-0.015em] text-ink">Compare all plans</h3>
          <p className="mt-1 text-[0.98rem] text-muted">Every deliverable, side by side, so you can see exactly what changes when you upgrade.</p>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="compare-table"
          onClick={() => {
            setOpen((o) => !o);
            track("compare_plans_toggle", { open: !open });
          }}
          className="inline-flex min-h-[2.75rem] items-center gap-2 self-start rounded-md border border-ink/15 bg-white px-4 text-[0.92rem] font-semibold text-ink hover:border-ink/40 sm:self-auto"
        >
          {open ? "Hide comparison" : "Show full comparison"}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </div>

      <div id="compare-table" hidden={!open} className="relative mt-6 overflow-x-auto rounded-xl border border-line bg-white" tabIndex={0} aria-label="Plan comparison table, scrolls sideways on small screens">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">Comparison of Visibility Essentials, Growth Engine, and Growth + Operations</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[38%] p-4 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-muted">Deliverable</th>
              {PACKAGES.map((p) => (
                <th key={p.id} scope="col" className={`p-4 text-center align-bottom ${p.featured ? "bg-volt-soft" : ""}`}>
                  <span className="block font-display text-[0.95rem] font-extrabold text-ink">{p.name}</span>
                  <span className="block font-mono text-[0.78rem] tabular-nums text-muted">{usd(p.price)}/mo</span>
                </th>
              ))}
            </tr>
          </thead>
          {COMPARE_GROUPS.map((g) => (
            <tbody key={g.title}>
              <tr>
                <th colSpan={4} scope="colgroup" className="bg-mist px-4 py-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-volt">
                  {g.title}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="p-4 text-[0.9rem] font-medium text-ink">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i} className={`p-4 text-center ${PACKAGES[i].featured ? "bg-volt-soft/60" : ""}`}>
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
          <tbody>
            <tr className="border-t border-line">
              <th scope="row" className="p-4 text-[0.9rem] font-medium text-ink">One-time onboarding</th>
              {PACKAGES.map((p) => (
                <td key={p.id} className={`p-4 text-center font-mono text-[0.84rem] tabular-nums text-ink ${p.featured ? "bg-volt-soft/60" : ""}`}>
                  {usd(p.onboarding)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-white py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Service packages</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink [text-wrap:balance] sm:text-[2.7rem]">
            Transparent monthly pricing. Specific deliverables.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.06rem] leading-relaxed text-muted">
            Every engagement starts with the free Growth Scorecard, so we can recommend the package that fits before you commit to anything.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-start lg:gap-4">
          {PACKAGES.map((p) => (
            <PricingCard key={p.id} pkg={p} />
          ))}
        </div>

        <CompareTable />

        <p className="mt-8 max-w-4xl border-l-2 border-line pl-4 text-[0.85rem] leading-relaxed text-muted">
          <span className="font-semibold text-ink">Scope: </span>
          {SCOPE_DISCLAIMER}
        </p>
      </Container>
    </section>
  );
}
