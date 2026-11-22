"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Img from "./Img";
import { site } from "@/content/site";

const reel = [
  { id: "fitoor-turban", alt: "Still from Fitoor: a frightened woman between two men in red turbans", title: "Fitoor", kind: "Audio-Visual" },
  { id: "crossroads-stretch", alt: "Still from Crossroads: a silhouetted athlete stretching at sunset", title: "Crossroads", kind: "Documentary" },
  { id: "otl-highfive", alt: "Still from On The Loose: two friends high-five on a rooftop", title: "On The Loose", kind: "Music Video" },
  { id: "saayah-still", alt: "Still from the anthology: two men across a café table", title: "Before the Coffee Gets Cold", kind: "Anthology" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Intro timeline.
  useEffect(() => {
    const el = root.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
      tl.set("[data-reveal]", { autoAlpha: 1 })
        .fromTo(".hero__name .wi", { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.6, stagger: 0.09 })
        .fromTo(".hero__frame", { clipPath: "inset(50% 50% 50% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 }, 0.45)
        .fromTo(".hero__frame img", { scale: 1.35 }, { scale: 1, duration: 2.2 }, 0.45)
        .fromTo(".hero__meta > *:not(.hero__headline)", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.6)
        .fromTo(".hero__headline", { y: 16 }, { y: 0, duration: 1.4 }, 0.3);
    }, el);
    return () => ctx.revert();
  }, []);

  // Reel: cycles stills while visible; paused for reduced motion or when off-screen.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setPlaying(false); return; }
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    const id = setInterval(() => { if (visible && playing) setI((x) => (x + 1) % reel.length); }, 5200);
    return () => { clearInterval(id); io.disconnect(); };
  }, [playing]);

  // Running timecode (25fps) — purely decorative.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      const f = Math.floor(((t - start) / 1000) * 25);
      if (tc.current) tc.current.textContent = `00:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cur = reel[i];

  return (
    <section className="hero" id="top" ref={root} data-hero tabIndex={-1} aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__top hero__meta">
        <p className="label">Portfolio</p>
        <p className="label hero__roles">Filmmaker <span>·</span> Screenwriter <span>·</span> Creative Strategist</p>
      </div>

      <h1 className="hero__name" id="hero-title" data-reveal="split">
        <span className="hero__line">
          <span className="w"><span className="wi">Reda</span></span>{" "}
          <span className="w"><span className="wi it">Fatima</span></span>
        </span>
        <span className="hero__line hero__line--2">
          <span className="w"><span className="wi">Mobin</span></span>
          <span className="hero__frame-wrap" aria-hidden="true">
            <span className="hero__frame">
              {reel.map((r, k) => (
                <span key={r.id} className={`hero__slide ${k === i ? "is-active" : ""}`}>
                  <Img id={r.id} alt="" sizes="(max-width: 900px) 92vw, 46vw" priority={k === 0} fill />
                </span>
              ))}
              <span className="hero__frame-ui">
                <span className="hero__rec"><i /> {cur.kind}</span>
                <span ref={tc} className="hero__tc">00:00:00:00</span>
              </span>
            </span>
          </span>
        </span>
      </h1>

      <div className="hero__bottom hero__meta">
        <p className="hero__headline">{site.headline}</p>
        <div className="hero__now">
          <p className="label">Now showing</p>
          <p className="hero__now-title">{cur.title}<span className="sr-only">, {cur.kind.toLowerCase()} — {cur.alt}</span></p>
          <button className="hero__pause label" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? "Pause reel" : "Play reel"}
          </button>
        </div>
        <a href="#about" className="hero__scroll label" data-cursor="Scroll">
          <span>Scroll</span><i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
