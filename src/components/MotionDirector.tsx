"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Declarative scroll animation layer. Elements opt in with data attributes:
 *   data-reveal="up" | "fade" | "image" | "split" | "stagger"
 *   data-parallax="0.15"  (fraction of element height to travel)
 *   data-delay="0.2"
 * Everything is skipped when the user prefers reduced motion — content is
 * fully visible by default (CSS only hides it under html.motion).
 */
export default function MotionDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    gsap.registerPlugin(ScrollTrigger);
    const ease = "expo.out";

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest("[data-hero]")) return; // hero runs its own intro timeline
        const kind = el.dataset.reveal;
        const delay = parseFloat(el.dataset.delay || "0");
        const st = { trigger: el, start: "top 88%", once: true };

        if (kind === "split") {
          const words = el.querySelectorAll(".wi");
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(words, { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.2, ease, stagger: 0.035, delay, scrollTrigger: st });
        } else if (kind === "image") {
          const inner = el.querySelector("img");
          gsap.fromTo(el, { autoAlpha: 1, clipPath: "inset(18% 8% 18% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease, delay, scrollTrigger: st });
          if (inner) gsap.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease, delay, scrollTrigger: st });
        } else if (kind === "stagger") {
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(el.children, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1.1, ease, stagger: 0.08, delay, scrollTrigger: st });
        } else if (kind === "fade") {
          gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power2.out", delay, scrollTrigger: st });
        } else {
          gsap.fromTo(el, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.2, ease, delay, scrollTrigger: st });
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "0.12");
        gsap.fromTo(el, { yPercent: -amt * 50 }, {
          yPercent: amt * 50, ease: "none",
          scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    root.classList.add("motion-ready");

    // Recalculate once images/fonts settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
