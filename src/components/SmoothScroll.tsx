"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window { __lenis?: Lenis }
}

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. Disabled for reduced motion. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.2 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // New route: start at the top (or at the hash target).
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target instanceof HTMLElement) {
      // Arriving from another page: Lenis still holds the previous page's scroll
      // limit, so re-measure first, then land again once layout/pins settle.
      const land = () => { window.__lenis?.resize(); scrollToEl(target, true); };
      const raf = requestAnimationFrame(land);
      const t1 = setTimeout(land, 350);
      const t2 = setTimeout(land, 900);
      return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
    }
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function scrollToEl(el: HTMLElement, immediate = false) {
  if (window.__lenis) window.__lenis.scrollTo(el, { immediate, duration: 1.4 });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}
