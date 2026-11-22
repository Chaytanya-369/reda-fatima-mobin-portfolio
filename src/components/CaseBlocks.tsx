import Img from "./Img";
import VideoEmbed from "./VideoEmbed";
import type { Block, MediaRef } from "@/content/projects";
import { getMedia } from "@/lib/media";
import { articles, fmtDate } from "@/content/writing";

const ratio = (id: string) => { const e = getMedia(id); return e.width / e.height; };

function Figure({ m, sizes, fill, reveal = true }: { m: MediaRef; sizes: string; fill?: boolean; reveal?: boolean }) {
  return (
    <figure className="cs-fig">
      <div className="cs-fig__media" data-reveal={reveal ? "image" : undefined}>
        <Img id={m.id} alt={m.alt} sizes={sizes} fill={fill} />
      </div>
      {m.caption && <figcaption className="label">{m.caption}</figcaption>}
    </figure>
  );
}

function Gallery({ b }: { b: Extract<Block, { type: "gallery" }> }) {
  const { layout, items, caption } = b;
  let inner: React.ReactNode;

  switch (layout) {
    case "filmstrip":
      inner = (
        <div className="g-filmstrip">
          <ul className="g-filmstrip__track" tabIndex={0} aria-label="Film stills, scroll horizontally">
            {items.map((m, i) => (
              <li key={m.id}>
                <span className="g-filmstrip__perf" aria-hidden="true" />
                <Img id={m.id} alt={m.alt} sizes="(max-width: 700px) 80vw, 40vw" />
                <span className="g-filmstrip__n label" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      );
      break;
    case "sequence":
      inner = (
        <ol className="g-sequence">
          {items.map((m, i) => (
            <li key={m.id} className={`g-sequence__item g-sequence__item--${i % 2 ? "r" : "l"}`}>
              <Figure m={m} sizes="(max-width: 900px) 92vw, 70vw" />
            </li>
          ))}
        </ol>
      );
      break;
    case "surveillance":
      inner = (
        <div className="g-surv">
          {items.map((m, i) => (
            <div key={m.id} className={`g-surv__cam g-surv__cam--${i}`} data-reveal="image">
              <Img id={m.id} alt={m.alt} sizes="(max-width: 900px) 92vw, 50vw" fill />
              <span className="g-surv__hud" aria-hidden="true">
                <span><i className="g-surv__dot" /> REC · CAM {String(i + 1).padStart(2, "0")}</span>
                <span>SUBJECT NOT FOUND</span>
              </span>
            </div>
          ))}
        </div>
      );
      break;
    case "phones":
      inner = (
        <div className="g-phones">
          {items.map((m) => (
            <div key={m.id} className="g-phones__device" data-reveal="up">
              <Img id={m.id} alt={m.alt} sizes="(max-width: 700px) 70vw, 30vw" />
            </div>
          ))}
        </div>
      );
      break;
    case "squares":
      inner = (
        <div className="g-squares" data-reveal="stagger">
          {items.map((m) => <div key={m.id} className="g-squares__item"><Img id={m.id} alt={m.alt} sizes="(max-width: 700px) 46vw, 24vw" /></div>)}
        </div>
      );
      break;
    case "pair":
      inner = <div className="g-pair">{items.map((m) => <Figure key={m.id} m={m} sizes="(max-width: 700px) 92vw, 44vw" />)}</div>;
      break;
    case "full":
      inner = <div className="g-full">{items.map((m) => <Figure key={m.id} m={m} sizes="100vw" />)}</div>;
      break;
    default: {
      // mosaic — first item large, the rest stack beside it
      inner = (
        <div className="g-mosaic">
          {items.map((m, i) => (
            <div key={m.id} className={`g-mosaic__item g-mosaic__item--${i}`} style={{ ["--r" as string]: ratio(m.id) }}>
              <Figure m={m} sizes={i === 0 ? "(max-width: 900px) 92vw, 60vw" : "(max-width: 900px) 92vw, 34vw"} />
            </div>
          ))}
        </div>
      );
    }
  }
  return (
    <section className={`cs-block cs-gallery cs-gallery--${layout}`}>
      {inner}
      {caption && <p className="cs-gallery__cap label">{caption}</p>}
    </section>
  );
}

export default function CaseBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "lead":
            return <p key={i} className="cs-block cs-lead" data-reveal="up">{b.text}</p>;
          case "text":
            return (
              <section key={i} className="cs-block cs-text">
                {b.heading && <h2 className="cs-text__h" data-reveal="up">{b.heading}</h2>}
                <div data-reveal="stagger">{b.body.map((p, k) => <p key={k}>{p}</p>)}</div>
              </section>
            );
          case "gallery":
            return <Gallery key={i} b={b} />;
          case "video":
            return (
              <section key={i} className="cs-block cs-video" data-reveal="up">
                <VideoEmbed youtubeId={b.youtubeId} title={b.title} poster={b.poster.id} posterAlt={b.poster.alt} />
              </section>
            );
          case "voices":
            return (
              <section key={i} className="cs-block cs-voices" aria-label="Voices from the film">
                {b.lines.map((l, k) => (
                  <blockquote key={k} className="cs-voices__line" data-reveal="up" data-delay={k * 0.08}><p>{l}</p></blockquote>
                ))}
                <p className="label cs-voices__cite">— {b.cite}</p>
              </section>
            );
          case "stat":
            return (
              <section key={i} className="cs-block cs-stat" data-reveal="stagger">
                {b.items.map((s) => (
                  <div key={s.label} className="cs-stat__item">
                    <span className="cs-stat__v">{s.value}</span>
                    <span className="cs-stat__l">{s.label}</span>
                  </div>
                ))}
              </section>
            );
          case "list":
            return (
              <section key={i} className="cs-block cs-list">
                <h2 className="label">{b.heading}</h2>
                <ul data-reveal="stagger">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </section>
            );
          case "headlines": {
            const list = articles.filter((a) => (b.filter === "featured" ? a.featured : !a.featured));
            return (
              <section key={i} className="cs-block cs-headlines">
                <h2 className="cs-text__h">{b.heading}</h2>
                <ol data-reveal="stagger">
                  {list.map((h, k) => (
                    <li key={h.url}>
                      <a href={h.url} target="_blank" rel="noopener noreferrer" className="headline__link">
                        <span className="headline__n">{String(k + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="headline__kicker">{h.exclusive ? "Exclusive · " : ""}{h.section} · <time dateTime={h.date}>{fmtDate(h.date)}</time></span>
                          <span className="headline__title">{h.title} <span aria-hidden="true" className="headline__arrow">↗</span></span>
                          <span className="sr-only">(opens ETBrandEquity in a new tab)</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
                {b.note && <p className="label">{b.note}</p>}
              </section>
            );
          }
        }
      })}
    </>
  );
}
