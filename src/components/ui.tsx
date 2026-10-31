import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "../lib/analytics";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-gutter ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-signal" : "text-volt"
      }`}
    >
      {children}
    </p>
  );
}

type Variant = "primary" | "secondary" | "ghostDark" | "white";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-volt text-white hover:bg-volt-hover shadow-[0_8px_24px_-10px_rgba(33,80,255,.7)]",
  secondary: "border border-ink/15 text-ink hover:border-ink/40 bg-white",
  ghostDark: "border border-white/20 text-white hover:border-white/50",
  white: "bg-white text-ink hover:bg-mist",
};

export function ButtonLink({
  variant = "primary",
  arrow = false,
  trackAs,
  className = "",
  children,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  arrow?: boolean;
  trackAs?: string;
}) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        if (trackAs) track("cta_click", { location: trackAs });
        onClick?.(e);
      }}
      className={`group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-md px-5 text-[0.95rem] font-semibold transition-colors duration-150 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

/** Three rising bars: found, chosen, booked. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect width="28" height="28" rx="6" fill="#2150FF" />
      <rect x="6" y="15" width="4" height="7" rx="1" fill="#fff" fillOpacity=".55" />
      <rect x="12" y="11" width="4" height="11" rx="1" fill="#fff" fillOpacity=".8" />
      <rect x="18" y="6" width="4" height="16" rx="1" fill="#fff" />
    </svg>
  );
}

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`font-display text-[0.95rem] font-extrabold uppercase leading-none tracking-[0.02em] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
        style={{ fontStretch: "112%" }}
      >
        Novus Core Holdings
        <span className={`mt-1 block text-[0.6rem] font-semibold normal-case tracking-[0.14em] ${tone === "dark" ? "text-char-muted" : "text-muted"}`} style={{ fontStretch: "100%" }}>
          BUSINESS GROWTH &amp; OPERATIONS
        </span>
      </span>
    </span>
  );
}

/** Scroll to the scorecard form and optionally preselect the package the visitor was looking at. */
export function goToScorecard(interest?: string) {
  if (interest) window.dispatchEvent(new CustomEvent("lge:interest", { detail: interest }));
  const el = document.getElementById("scorecard");
  if (el) {
    el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => (document.getElementById("businessName") as HTMLInputElement | null)?.focus({ preventScroll: true }), 600);
  }
}
