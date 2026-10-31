import { CalendarCheck, Check, MessageSquare, PhoneCall, Search, Star } from "lucide-react";

// Illustrative only. Every number and name below is example data, labeled as such in the UI.
const STAGES = [
  { icon: Search, label: "Search", detail: "\u201Cac repair near me\u201D", sub: "Homeowner in Winter Garden finds your Google Business Profile" },
  { icon: PhoneCall, label: "Contact", detail: "Calls your HVAC company at 6:42 PM", sub: "After hours, the call goes unanswered" },
  { icon: MessageSquare, label: "Captured + follow-up", detail: "Text reply sent, added to pipeline", sub: "\u201CSorry we missed you. When works for a visit?\u201D" },
  { icon: CalendarCheck, label: "Appointment", detail: "AC repair visit: Tue 9:00 AM", sub: "Confirmation and reminder scheduled" },
];

// The same customer, shown moving through an HVAC company's pipeline.
const PIPELINE: { col: string; done: boolean }[] = [
  { col: "Inquiry", done: true },
  { col: "Follow-up", done: true },
  { col: "Scheduled", done: true },
  { col: "Completed", done: false },
];

export function GrowthDashboard() {
  return (
    <figure
      className="relative rounded-xl bg-char p-4 text-white shadow-[0_40px_80px_-40px_rgba(15,18,23,.55)] ring-1 ring-black/5 sm:p-5"
      aria-label="Illustrative example: one HVAC customer journey from search, to contact, to captured inquiry and follow-up, to a scheduled appointment. Example only, not real client data."
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
                {i === 3 && <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-emerald-300">Booked</span>}
              </div>
              <p className="mt-0.5 truncate text-[0.92rem] font-semibold">{detail}</p>
              <p className="text-[0.78rem] text-char-muted">{sub}</p>
            </div>
          </li>
        ))}
        <span aria-hidden className="lge-flow pointer-events-none absolute bottom-6 left-[1.85rem] top-6 w-px bg-gradient-to-b from-volt/0 via-volt/60 to-volt/0" />
      </ol>

      {/* Pipeline: one HVAC lead */}
      <div className="mt-4 rounded-lg border border-char-line p-3">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-char-muted">HVAC lead pipeline</span>
          <span className="flex items-center gap-1 text-[0.72rem] text-char-muted">
            <Star className="h-3 w-3 text-signal" aria-hidden /> Review request after the visit
          </span>
        </div>
        <div className="rounded-md bg-char-2 p-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[0.82rem] font-semibold">AC not cooling · Winter Garden</span>
            <span className="shrink-0 text-[0.7rem] text-char-muted">Example lead</span>
          </div>
          <ol className="mt-2.5 grid grid-cols-4 gap-1.5">
            {PIPELINE.map((p) => (
              <li key={p.col} className="min-w-0">
                <span className={`block h-1.5 rounded-full ${p.done ? "bg-volt" : "bg-white/10"}`} aria-hidden />
                <span className={`mt-1.5 flex items-center gap-1 text-[0.66rem] leading-tight ${p.done ? "text-white/85" : "text-char-muted"}`}>
                  {p.done && <Check className="hidden h-3 w-3 shrink-0 text-signal sm:block" aria-hidden />}
                  <span className="truncate">{p.col}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figcaption className="mt-3 text-[0.72rem] leading-snug text-char-muted">
        Illustrative example of how the system handles one HVAC inquiry. Not a real client and not a projected result.
      </figcaption>
    </figure>
  );
}
