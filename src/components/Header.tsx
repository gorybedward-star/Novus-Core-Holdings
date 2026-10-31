import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink, Container, Wordmark } from "./ui";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky z-40 bg-white/90 backdrop-blur transition-shadow ${scrolled || open ? "shadow-[0_1px_0_#E1E5ED]" : ""}`}
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="Novus Core Holdings, back to top" className="rounded-sm">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[0.92rem] font-medium text-muted transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="#scorecard" trackAs="header" className="min-h-[2.5rem] px-4 text-[0.88rem]">
            Get My Free Scorecard
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white md:hidden">
        <Container className="flex flex-col py-3">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-base font-medium text-ink last:border-0"
            >
              {n.label}
            </a>
          ))}
          <ButtonLink href="#scorecard" trackAs="mobile_menu" arrow className="mb-2 mt-3" onClick={() => setOpen(false)}>
            Get My Free Growth Scorecard
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
