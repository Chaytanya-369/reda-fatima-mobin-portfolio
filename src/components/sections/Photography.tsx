"use client";
import { useState } from "react";
import Img from "../Img";
import Split from "../Split";
import Lightbox from "../Lightbox";
import { photographs, abhaav } from "@/content/photography";

export default function Photography() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="photo section--black" id="photography" tabIndex={-1} aria-labelledby="photo-title">
      <div className="wrap">
        <header className="sec-head sec-head--split">
          <p className="label"><span className="label__n">(04)</span> Photography</p>
          <h2 id="photo-title" className="display"><Split text="Frames, held still." italic={["still."]} /></h2>
          <p className="sec-head__aside" data-reveal="up">
            People, architecture and products — indoors and out. Frames from <em>Fitoor</em>, a story told entirely in still photographs, sit alongside portrait and product work.
          </p>
        </header>

        <ul className="photo__grid">
          {photographs.map((p, i) => (
            <li key={p.id} className={`photo__item photo__item--${p.span}`}>
              <button className="photo__btn" onClick={() => setOpen(i)} data-cursor="Open" aria-label={`Open image: ${p.alt}`}>
                <span className="photo__media" data-reveal="image">
                  <Img id={p.id} alt={p.alt} sizes="(max-width: 700px) 92vw, (max-width: 1200px) 50vw, 40vw" fill />
                </span>
              </button>
              <p className="photo__cap label"><span>{String(i + 1).padStart(2, "0")}</span> {p.caption}</p>
            </li>
          ))}
          <li className="photo__item photo__item--essay">
            <a href={abhaav.href} target="_blank" rel="noopener noreferrer" className="essay" data-cursor="Open">
              <span className="label">{abhaav.label}</span>
              <span className="essay__title">{abhaav.title}</span>
              <span className="essay__note">View the full photo essay <span aria-hidden="true">↗</span><span className="sr-only">(opens Google Drive in a new tab)</span></span>
            </a>
          </li>
        </ul>
      </div>
      <Lightbox items={photographs} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
