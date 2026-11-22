"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { projects, categories, type CategoryKey } from "@/content/projects";
import { getMedia, fallbackSrc } from "@/lib/media";

/** Filterable index of all work, with a cursor-following image preview on fine pointers. */
export default function WorkIndex() {
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [hover, setHover] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const list = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const used = new Set(projects.map((p) => p.category));

  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const xTo = gsap.quickTo(el, "x", { duration: reduce ? 0 : 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: reduce ? 0 : 0.6, ease: "power3" });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="index" id="index" tabIndex={-1} aria-labelledby="index-title">
      <p className="label index__label"><span className="label__n">(03)</span> Index — the complete directory</p>
      <div className="index__head">
        <h3 id="index-title" className="index__title">Index <sup>({projects.length})</sup></h3>
        <div className="chips" role="group" aria-label="Filter work by category">
          <button className="chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All</button>
          {categories.filter((c) => used.has(c.key)).map((c) => (
            <button key={c.key} className="chip" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>{c.label}</button>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status">{`Showing ${list.length} ${list.length === 1 ? "project" : "projects"}`}</p>
      <ul className="index__list" onMouseLeave={() => setHover(null)}>
        {list.map((p) => (
          <li key={p.slug} className="index__row" onMouseEnter={() => setHover(p.slug)} style={{ ["--accent" as string]: p.accent }}>
            <Link href={`/work/${p.slug}/`} className="index__link" onFocus={() => setHover(null)}>
              <span className="index__n">{p.n}</span>
              <span className="index__name">{p.title}</span>
              <span className="index__cat">{categories.find((c) => c.key === p.category)?.label}</span>
              <span className="index__role">{p.role.slice(0, 3).join(", ")}</span>
              <span className="index__arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={`index__preview ${hover ? "is-on" : ""}`} ref={preview} aria-hidden="true">
        {projects.map((p) => {
          const e = getMedia(p.cover.id);
          return <img key={p.slug} src={fallbackSrc(e, 800)} alt="" className={hover === p.slug ? "is-active" : ""} loading="lazy" decoding="async" width={e.width} height={e.height} />;
        })}
      </div>
    </section>
  );
}
