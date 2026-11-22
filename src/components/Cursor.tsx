"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** A quiet cursor companion for fine pointers: grows and shows a label over [data-cursor] targets. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) { gsap.set(el, { x: e.clientX, y: e.clientY }); el.classList.add("is-visible"); shown = true; }
      xTo(e.clientX); yTo(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      const text = t?.dataset.cursor;
      el.classList.toggle("is-label", Boolean(text));
      el.classList.toggle("is-link", Boolean(t && !text));
      if (label.current) label.current.textContent = text || "";
    };
    const leave = () => { el.classList.remove("is-visible"); shown = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__label" ref={label} />
    </div>
  );
}
