"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { nav, contact, site } from "@/content/site";
import { scrollToEl } from "./SmoothScroll";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Compact + hide-on-scroll-down behaviour.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view (home page). Targets can nest (the Index sits
  // inside Work), so pick the last target whose top has passed the reading line.
  useEffect(() => {
    if (pathname !== "/") { setActive(pathname.startsWith("/work") ? "index" : ""); return; }
    const ids = nav.map((n) => n.href.split("#")[1]);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1];
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Sliding active indicator under the desktop links.
  useEffect(() => {
    const list = listRef.current, bar = barRef.current;
    if (!list || !bar) return;
    const place = () => {
      const a = list.querySelector<HTMLElement>('a[aria-current="true"]');
      if (!a) { bar.style.opacity = "0"; return; }
      const lr = list.getBoundingClientRect(), r = a.getBoundingClientRect();
      bar.style.opacity = "1";
      bar.style.width = `${r.width}px`;
      bar.style.transform = `translateX(${r.left - lr.left}px)`;
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Menu: lock scroll, Esc to close, keep focus inside.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === "Tab" && panelRef.current) {
        const f = [toggleRef.current!, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    if (hash && (path === "" || path === "/") && pathname === "/") {
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        setOpen(false);
        history.pushState(null, "", `#${hash}`);
        setTimeout(() => { scrollToEl(el); el.focus({ preventScroll: true }); }, open ? 350 : 0);
      }
    }
  };

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__bar">
        <Link href="/" className="nav__mark" onClick={(e) => go(e as MouseEvent<HTMLAnchorElement>, "/#top")}>
          <span className="nav__mono" aria-hidden="true">R<em>f</em>M</span>
          <span className="nav__name">{site.name}</span>
        </Link>
        <nav aria-label="Primary" className="nav__links">
          <ul ref={listRef}>
            {nav.map((n, i) => {
              const id = n.href.split("#")[1];
              return (
                <li key={n.href}>
                  <Link href={n.href} onClick={(e) => go(e, n.href)} aria-current={active === id ? "true" : undefined}>
                    <span className="nav__idx">0{i + 1}</span><span className="nav__label"><span>{n.label}</span></span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="nav__indicator" ref={barRef} aria-hidden="true" />
        </nav>
        <button ref={toggleRef} className="nav__toggle" aria-expanded={open} aria-controls="menu-panel" onClick={() => setOpen((o) => !o)}>
          <span className="nav__toggle-text">{open ? "Close" : "Menu"}</span>
          <span className="nav__burger" aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      <div id="menu-panel" ref={panelRef} className="menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Site menu">
        <ul className="menu__list">
          <li><Link href="/#top" onClick={(e) => go(e, "/#top")}><span>00</span>Home</Link></li>
          {nav.map((n, i) => (
            <li key={n.href} style={{ ["--i" as string]: i + 1 }}>
              <Link href={n.href} onClick={(e) => go(e, n.href)} aria-current={active === n.href.split("#")[1] ? "true" : undefined}>
                <span>0{i + 1}</span>{n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <div>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </header>
  );
}
