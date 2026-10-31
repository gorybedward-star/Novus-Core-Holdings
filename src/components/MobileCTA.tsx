import { useEffect, useState } from "react";
import { ButtonLink } from "./ui";

/** Slim bottom bar on phones: appears after the hero, hides while the scorecard form is on screen. */
export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("scorecard");
    if (!hero || !form || !("IntersectionObserver" in window)) return;
    let heroVisible = true;
    let formVisible = false;
    const update = () => setShow(!heroVisible && !formVisible);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === form) formVisible = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <div
      hidden={!show}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur md:hidden"
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
        paddingTop: 12,
        paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
      }}
    >
      <ButtonLink href="#scorecard" trackAs="mobile_sticky" arrow className="w-full">
        Get My Free Growth Scorecard
      </ButtonLink>
    </div>
  );
}
