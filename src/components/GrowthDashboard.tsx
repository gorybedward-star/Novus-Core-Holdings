import { CalendarCheck, MessageSquare, PhoneMissed, Search, Star } from "lucide-react";

// Illustrative only. Every number and name below is example data, labeled as such in the UI.
const STAGES = [
  { icon: Search, label: "Discovery", detail: "“ac repair winter garden”", sub: "Profile viewed → website visit" },
  { icon: MessageSquare, label: "Inquiry", detail: "Call missed at 6:42 PM", sub: "Text follow-up sent automatically" },
  { icon: CalendarCheck, label: "Appointment", detail: "Booked: Tue 9:00 AM", sub: "Reminder scheduled" },
];

const PIPELINE: { col: string; count: number; cards: string[] }[] = [
  { col: "New", count: 6, cards: ["AC not cooling · Ocoee", "Fence quote · Apopka"] },
  { col: "Contacted", count: 4, cards: ["Pool service · Windermere"] },
  { col: "Estimate", count: 3, cards: ["Landscape redo · Winter Garden"] },
  { col: "Booked", count: 5, cards: ["Panel upgrade · Orlando"] },
];

export function GrowthDashboard() {
  return (
    <figure
      className="relative rounded-xl bg-char p-4 text-white shadow-[0_40px_80px_-40px_rgba(15,18,23,.55)] ring-1 ring-black/5 sm:p-5"
      aria-label="Illustrative growth dashboard showing an example customer journey from discovery to inquiry to appointment. Example data only."
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-char-line pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal" aria-hidden />
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-char-muted">
            Growth dashboard
          </span>
        </div>
        <span className="rounded border border-amber-300/40 bg-amber-300/10 px-2 py-0.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-amber-200">
          Illustrative example
        </span>
      </div>

      {/* Journey */}
      <ol className="relative mt-4 grid gap-2.5">
        {STAGES.map(({ icon: Icon, label, detail, sub }, i) => (
          <li key={label} className="relative flex items-start gap-3 rounded-lg bg-char-2 p-3">
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-volt/15 text-signal ring-1 ring-volt/30">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-char-muted">
                  {String(i + 1).padStart(2, "0")} · {label}
                </span>
                {i === 1 && <PhoneMissed className="h-3.5 w-3.5 text-char-muted" aria-hidden />}
                {i === 2 && <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-emerald-300">Booked</span>}
              </div>
              <p className="mt-0.5 truncate text-[0.92rem] font-semibold">{detail}</p>
              <p className="text-[0.78rem] text-char-muted">{sub}</p>
            </div>
          </li>
        ))}
        <span aria-hidden className="lge-flow pointer-events-none absolute bottom-6 left-[1.85rem] top-6 w-px bg-gradient-to-b from-volt/0 via-volt/60 to-volt/0" />
      </ol>

      {/* Pipeline */}
      <div className="mt-4 rounded-lg border border-char-line p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-char-muted">Lead pipeline</span>
          <span className="flex items-center gap-1 text-[0.72rem] text-char-muted">
            <Star className="h-3 w-3 text-signal" aria-hidden /> Review requests: on
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PIPELINE.map((p) => (
            <div key={p.col} className="min-w-0 rounded-md bg-char-2 p-2">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.72rem] font-semibold text-char-muted">{p.col}</span>
                <span className="font-mono text-[0.8rem] font-semibold tabular-nums">{p.count}</span>
              </div>
              <div className="mt-1.5 grid gap-1">
                {p.cards.map((c) => (
                  <span key={c} className="truncate rounded bg-white/[0.06] px-1.5 py-1 text-[0.68rem] text-white/80">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-3 text-[0.72rem] leading-snug text-char-muted">
        Example data for illustration. Not a real client and not a projected result.
      </figcaption>
    </figure>
  );
}
