import Link from "next/link";
import Img from "../Img";
import Split from "../Split";
import WorkIndex from "../WorkIndex";
import { projects } from "@/content/projects";

/** Art direction per film — each feature gets its own composition. */
const layouts: Record<string, { variant: string; img: string; second?: string; sizes: string }> = {
  gharq: { variant: "poster", img: "gharq-boat", second: "gharq-poster", sizes: "(max-width: 900px) 92vw, 52vw" },
  crossroads: { variant: "wide", img: "crossroads-stretch", sizes: "(max-width: 900px) 92vw, 66vw" },
  fitoor: { variant: "full", img: "fitoor-turban", sizes: "100vw" },
  "on-the-loose": { variant: "offset", img: "otl-park", sizes: "(max-width: 900px) 92vw, 56vw" },
  saayah: { variant: "split", img: "saayah-still", second: "saayah-bts-1", sizes: "(max-width: 900px) 92vw, 58vw" },
  abhaav: { variant: "portrait", img: "photo-hands", sizes: "(max-width: 900px) 80vw, 34vw" },
};

export default function Work() {
  const films = projects.filter((p) => p.act === "storyteller");
  const strategy = projects.filter((p) => p.act === "strategist");

  return (
    <section className="work section--dark" id="work" tabIndex={-1} aria-labelledby="work-title">
      <div className="wrap">
        <header className="sec-head sec-head--split">
          <p className="label"><span className="label__n">(02)</span> Selected Work</p>
          <h2 id="work-title" className="display">
            <Split text="Stories that stay." italic={["stay"]} />
          </h2>
          <p className="sec-head__aside" data-reveal="up">Ten projects across documentary, fiction, photography, social media and journalism. Each opens into its own case study.</p>
        </header>

        <div className="act" data-reveal="up">
          <span className="act__n">Act I</span>
          <p className="act__title">The Storyteller</p>
          <p className="act__sub label">Films, screenplays &amp; photographs</p>
        </div>
      </div>

      <div className="features">
        {films.map((p) => {
          const l = layouts[p.slug];
          const media = l.img === p.cover.id ? p.cover : { id: l.img, alt: p.cover.alt };
          return (
            <article key={p.slug} className={`feature feature--${l.variant}`} style={{ ["--accent" as string]: p.accent }}>
              <Link href={`/work/${p.slug}/`} className="feature__link" data-cursor="View">
                <div className="feature__media" data-reveal="image">
                  <div className="feature__parallax" data-parallax="0.1">
                    <Img id={media.id} alt={media.alt} sizes={l.sizes} />
                  </div>
                </div>
                {l.second && (
                  <div className="feature__second" data-reveal="image" data-delay="0.15">
                    <Img id={l.second} alt="" sizes="(max-width: 900px) 40vw, 22vw" />
                  </div>
                )}
                <div className="feature__text">
                  <p className="feature__n label">{p.n} <span>/ {p.format}</span></p>
                  <h3 className="feature__title"><Split text={p.title} /></h3>
                  <p className="feature__summary" data-reveal="up">{p.summary}</p>
                  {p.recognition && (
                    <p className="feature__rec label" data-reveal="fade">
                      <span className="laurel" aria-hidden="true">✦</span>
                      {p.recognition.length > 1 ? `${p.recognition.length} festival selections & screenings` : "Official festival selection"}
                    </p>
                  )}
                  <span className="feature__cta label">View case study <i aria-hidden="true">→</i></span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="strategist section--slate">
        <div className="wrap">
          <div className="act act--light" data-reveal="up">
            <span className="act__n">Act II</span>
            <p className="act__title">The Strategist</p>
            <p className="act__sub label">Social media, content &amp; journalism</p>
          </div>

          <p className="strategist__statement" data-reveal="up">
            Content, told on a deadline. Reda leads organic content strategy for ISB Admissions — and shoots and edits <em>around 70%</em> of what goes live herself.
          </p>

          <ul className="cards">
            {strategy.map((p) => (
              <li key={p.slug} className="card" style={{ ["--accent" as string]: p.accent }} data-reveal="up">
                <Link href={`/work/${p.slug}/`} className="card__link" data-cursor="View">
                  <div className="card__media">
                    <Img id={p.cover.id} alt={p.cover.alt} sizes="(max-width: 700px) 80vw, 24vw" />
                  </div>
                  <p className="card__n label">{p.n} / {p.format}</p>
                  <h3 className="card__title">{p.title}</h3>
                  <p className="card__summary">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <WorkIndex />
      </div>
    </section>
  );
}
