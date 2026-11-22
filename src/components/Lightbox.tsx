"use client";
import { useCallback, useEffect, useRef } from "react";
import { getMedia, srcSet } from "@/lib/media";

export type LightboxItem = { id: string; alt: string; caption?: string };

/** Accessible full-screen image viewer: Esc closes, ←/→ navigate, focus is trapped and restored. */
export default function Lightbox({ items, index, onChange, onClose }: { items: readonly LightboxItem[]; index: number | null; onChange: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const open = index !== null;

  const step = useCallback((d: number) => { if (index !== null) onChange((index + d + items.length) % items.length); }, [index, items.length, onChange]);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>(".lb__close")?.focus();
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = [...ref.current.querySelectorAll<HTMLElement>("button")];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  // Basic swipe support.
  const touch = useRef(0);

  if (!open) return null;
  const item = items[index!];
  const e = getMedia(item.id);

  return (
    <div className="lb" ref={ref} role="dialog" aria-modal="true" aria-label="Image viewer"
      onTouchStart={(ev) => (touch.current = ev.touches[0].clientX)}
      onTouchEnd={(ev) => { const dx = ev.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }}>
      <div className="lb__backdrop" onClick={onClose} />
      <figure className="lb__figure" key={item.id}>
        <picture>
          <source type="image/avif" srcSet={srcSet(e, "avif")} sizes="92vw" />
          <source type="image/webp" srcSet={srcSet(e, "webp")} sizes="92vw" />
          <img src={`${e.src}-${e.widths[e.widths.length - 1]}.webp`} alt={item.alt} width={e.width} height={e.height} />
        </picture>
        <figcaption>
          <span className="label">{String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          {item.caption && <span>{item.caption}</span>}
        </figcaption>
      </figure>
      <button className="lb__close label" onClick={onClose}>Close <span aria-hidden="true">✕</span></button>
      <button className="lb__nav lb__nav--prev" onClick={() => step(-1)} aria-label="Previous image"><span aria-hidden="true">←</span></button>
      <button className="lb__nav lb__nav--next" onClick={() => step(1)} aria-label="Next image"><span aria-hidden="true">→</span></button>
    </div>
  );
}
