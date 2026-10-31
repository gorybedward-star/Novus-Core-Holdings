import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, FileText, Loader2, Lock, MessagesSquare, Wrench } from "lucide-react";
import { BRAND, INDUSTRIES, SCORECARD_AREAS, SCORECARD_RECEIVES } from "../content";
import { track } from "../lib/analytics";
import { submitLead, validateLead, type LeadErrors, type LeadInput } from "../lib/lead";
import { Container } from "./ui";

const EMPTY: LeadInput = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  city: "",
  marketingConsent: false,
  interest: "",
};

const RECEIVE_ICONS = [FileText, Wrench, MessagesSquare];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "dev"; message: string }
  | { kind: "error"; message: string };

export function Scorecard() {
  return (
    <section id="scorecard" className="scroll-mt-16 bg-volt py-20 text-white md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="min-w-0">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/75">
            Free Local Business Growth Scorecard
          </p>
          <h2 className="mt-3 font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] [text-wrap:balance] sm:text-[2.9rem]">
            Discover where your business may be missing opportunities.
          </h2>

          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-white/85">
            Get a free one-page assessment of your business with three prioritized recommendations you can act on, whether or not you work with us.
          </p>

          <h3 className="mt-9 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-white/75">Your assessment covers</h3>
          <ol className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {SCORECARD_AREAS.map((a, i) => (
              <li key={a} className="flex gap-3 rounded-lg bg-white/10 p-3.5 text-[0.95rem] font-medium leading-snug">
                <span className="font-mono text-[0.85rem] font-semibold tabular-nums text-white/70">{i + 1}</span>
                {a}
              </li>
            ))}
          </ol>

          <h3 className="mt-9 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-white/75">You receive</h3>
          <ul className="mt-4 grid gap-3">
            {SCORECARD_RECEIVES.map((r, i) => {
              const Icon = RECEIVE_ICONS[i];
              return (
                <li key={r} className="flex items-center gap-3 text-[1rem] font-semibold">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-volt">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {r}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 max-w-md text-[0.92rem] leading-relaxed text-white/80">
            Prepared by {BRAND.founder}, founder of Novus Core Holdings. No cost and no obligation to buy anything.
          </p>
        </div>

        <ScorecardForm />
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-[0.88rem] font-semibold text-ink">
        {label}
        {optional && <span className="text-[0.78rem] font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.82rem] font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (err?: string) =>
  `block w-full min-h-[3rem] rounded-md border bg-white px-3.5 text-[1rem] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-volt/40 ${
    err ? "border-red-600" : "border-line focus:border-volt"
  }`;

export function ScorecardForm() {
  const [v, setV] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());
  const started = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onInterest = (e: Event) => setV((s) => ({ ...s, interest: (e as CustomEvent<string>).detail }));
    window.addEventListener("lge:interest", onInterest);
    return () => window.removeEventListener("lge:interest", onInterest);
  }, []);

  useEffect(() => {
    if (status.kind !== "idle" && status.kind !== "submitting") statusRef.current?.focus();
  }, [status]);

  const set = <K extends keyof LeadInput>(k: K, val: LeadInput[K]) => {
    if (!started.current) {
      started.current = true;
      track("scorecard_form_start");
    }
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const aria = (k: keyof LeadInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateLead(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    track("scorecard_submit_attempt", { industry: v.industry, interest: v.interest || "none" });
    setStatus({ kind: "submitting" });
    const r = await submitLead(v, { honeypot, startedAt: startedAt.current });
    if (r.status === "success") {
      track("scorecard_submit_success", { industry: v.industry, interest: v.interest || "none" });
      setStatus({ kind: "success" });
    } else if (r.status === "dev") {
      track("scorecard_submit_dev_mode");
      setStatus({ kind: "dev", message: r.message });
    } else {
      track("scorecard_submit_error");
      setStatus({ kind: "error", message: r.message });
    }
  }

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-xl bg-white p-7 text-ink shadow-2xl sm:p-9">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden />
        <h3 className="mt-4 font-display text-[1.6rem] font-extrabold tracking-[-0.01em]">Request received.</h3>
        <p className="mt-2 text-[1rem] leading-relaxed text-muted">
          Thanks, {v.contactName.split(" ")[0]}. We'll review {v.businessName} and email your one-page scorecard to{" "}
          <span className="font-semibold text-ink">{v.email}</span>. If you'd like to add anything, email{" "}
          <span className="select-all font-semibold text-ink">{BRAND.email}</span>.
        </p>
      </div>
    );
  }

  const busy = status.kind === "submitting";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="scorecard-form-title"
      className="min-w-0 rounded-xl bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgba(10,20,80,.55)] sm:p-8"
    >
      <h3 id="scorecard-form-title" className="font-display text-[1.35rem] font-extrabold tracking-[-0.01em]">
        Request your free scorecard
      </h3>
      <p className="mt-1 text-[0.9rem] text-muted">Takes about a minute. All fields are required unless marked optional.</p>

      {v.interest && (
        <p className="mt-4 flex flex-wrap items-center gap-2 rounded-md bg-volt-soft px-3 py-2 text-[0.85rem] text-ink">
          Interested in <span className="font-semibold">{v.interest}</span>
          <button type="button" onClick={() => set("interest", "")} className="ml-auto text-[0.8rem] font-semibold text-volt underline-offset-2 hover:underline">
            Clear
          </button>
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="businessName" label="Business name" error={errors.businessName}>
          <input id="businessName" name="businessName" autoComplete="organization" className={inputCls(errors.businessName)} value={v.businessName} onChange={(e) => set("businessName", e.target.value)} {...aria("businessName")} />
        </Field>
        <Field id="contactName" label="Contact name" error={errors.contactName}>
          <input id="contactName" name="contactName" autoComplete="name" className={inputCls(errors.contactName)} value={v.contactName} onChange={(e) => set("contactName", e.target.value)} {...aria("contactName")} />
        </Field>
        <Field id="email" label="Business email" error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={inputCls(errors.email)} value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
        </Field>
        <Field id="phone" label="Phone number" error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(407) 555-0123" className={inputCls(errors.phone)} value={v.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
        </Field>
        <Field id="website" label="Website URL" optional error={errors.website}>
          <input id="website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="yourcompany.com" className={inputCls(errors.website)} value={v.website} onChange={(e) => set("website", e.target.value)} {...aria("website")} />
        </Field>
        <Field id="industry" label="Industry" error={errors.industry}>
          <select id="industry" name="industry" className={`${inputCls(errors.industry)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23576074%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9`} value={v.industry} onChange={(e) => set("industry", e.target.value as LeadInput["industry"])} {...aria("industry")}>
            <option value="">Select…</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="city" label="Primary service city" error={errors.city}>
            <input id="city" name="city" autoComplete="address-level2" placeholder="e.g. Winter Garden" list="lge-cities" className={inputCls(errors.city)} value={v.city} onChange={(e) => set("city", e.target.value)} {...aria("city")} />
            <datalist id="lge-cities">
              {["Orlando", "Apopka", "Ocoee", "Winter Garden", "Clermont", "Windermere", "Kissimmee", "Sanford", "Winter Park"].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
        </div>
      </div>

      {/* Spam trap: hidden from people and assistive tech, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_fax">Leave this field empty</label>
        <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="mt-5 flex gap-3 rounded-md border border-line p-3.5">
        <input
          id="marketingConsent"
          name="marketingConsent"
          type="checkbox"
          checked={v.marketingConsent}
          onChange={(e) => set("marketingConsent", e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#2150FF]"
        />
        <label htmlFor="marketingConsent" className="text-[0.82rem] leading-relaxed text-muted">
          <span className="font-semibold text-ink">Optional:</span> I agree to receive occasional promotional emails and text
          messages from Novus Core Holdings, LLC at the contact details above. Message and data rates may
          apply. Reply STOP to opt out at any time. Not required to get your scorecard.
        </label>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex min-h-[3.4rem] w-full items-center justify-center gap-2 rounded-md bg-volt px-6 text-[1.02rem] font-semibold text-white transition-colors hover:bg-volt-hover disabled:cursor-wait disabled:opacity-80"
      >
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          "Get My Free Growth Scorecard"
        )}
      </button>

      <p className="mt-4 flex gap-2 text-[0.8rem] leading-relaxed text-muted">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>
          We use your details only to prepare your scorecard and contact you about it. We don't sell your information. See our{" "}
          <a href="privacy.html" className="font-medium text-ink underline underline-offset-2">Privacy Policy</a>.
        </span>
      </p>

      <div aria-live="polite">
        {(status.kind === "dev" || status.kind === "error") && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className={`mt-5 rounded-md border p-4 text-[0.88rem] leading-relaxed ${
              status.kind === "dev" ? "border-amber-400 bg-amber-50 text-amber-950" : "border-red-300 bg-red-50 text-red-900"
            }`}
          >
            <p className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              {status.kind === "dev" ? "Development mode: not submitted" : "Your request wasn't sent"}
            </p>
            <p className="mt-1">{status.message}</p>
            <p className="mt-1">
              To request your scorecard now, email <span className="select-all font-semibold">{BRAND.email}</span>.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
