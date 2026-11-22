"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Split from "../Split";
import { processStages, skills, kit } from "@/content/site";

export default function Process() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  // Desktop: pin the section and travel horizontally through the six stages.
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - t.clientWidth;
      gsap.to(t.children, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: pin.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="process section--ink2" id="process" aria-labelledby="process-title">
      <div className="process__pin" ref={pin}>
        <div className="wrap process__head">
          <p className="label"><span className="label__n">Interlude</span> Process</p>
          <h2 id="process-title" className="process__title"><Split text="How a story gets made." italic={["made."]} /></h2>
          <p className="process__aside" data-reveal="up">Six movements that run through Reda’s work — each one traced to a real project.</p>
        </div>
        <ol className="process__track" ref={track}>
          {processStages.map((s) => (
            <li key={s.n} className="stage">
              <span className="stage__n">{s.n}</span>
              <h3 className="stage__title">{s.title}</h3>
              <p className="stage__body">{s.body}</p>
              <p className="stage__ref label">Seen in — {s.ref}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap callsheet">
        <div className="callsheet__head">
          <p className="label">Call sheet</p>
          <h3 className="callsheet__title">Skills &amp; kit</h3>
          <p className="callsheet__note">Away from the set and the content calendar, Reda paints and makes art — the same instinct for composition, by hand.</p>
        </div>
        <div className="callsheet__grid" data-reveal="stagger">
          {[...skills, ...kit].map((g) => (
            <div key={g.group} className="callsheet__col">
              <h4 className="label">{g.group}</h4>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
