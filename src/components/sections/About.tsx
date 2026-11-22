import Img from "../Img";
import Split from "../Split";
import { journey, dimensions } from "@/content/site";

export default function About() {
  return (
    <section className="about section--light" id="about" tabIndex={-1} aria-labelledby="about-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="label"><span className="label__n">(01)</span> Meet Reda</p>
          <h2 id="about-title" className="about__title">
            <Split text="Trained as an engineer. Drawn to stories." italic={["stories"]} />
          </h2>
        </header>

        <div className="about__grid">
          <figure className="about__portrait">
            <div className="about__portrait-main" data-reveal="image">
              <Img id="portrait-gallery" alt="Reda Fatima Mobin standing in a gallery beside an abstract painting, wearing a long dark coat" sizes="(max-width: 900px) 90vw, 40vw" />
            </div>
            <div className="about__portrait-inset" data-reveal="image" data-delay="0.2">
              <Img id="portrait-camera" alt="Reda behind a Panasonic broadcast camera on a tripod, framing a shot outdoors" sizes="(max-width: 900px) 45vw, 18vw" />
            </div>
            <figcaption className="label">On and off set</figcaption>
          </figure>

          <div className="about__text">
            <p className="about__lead" data-reveal="up">
              Reda Fatima Mobin is a filmmaker, screenwriter and content strategist — currently an <strong>Assistant Manager in Marketing &amp; Communications at the Indian School of Business</strong>.
            </p>
            <div className="about__body" data-reveal="stagger">
              <p>Driven by a passion for both the arts and STEM, she moved from Electronics and Communication Engineering to study Mass Communication at AJK MCRC, Jamia Millia Islamia.</p>
              <p>Her media journey began at ETBrandEquity by The Economic Times, followed by two years in social media marketing with brands such as NerdNerdy Education and Medizyn Care.</p>
              <p>She is drawn to documentary filmmaking — her short films have been making festival rounds — and is equally interested in fiction, especially thriller and suspense-driven stories. Outside of work, she turns to art, painting and anything that sparks creativity.</p>
            </div>

            <ol className="journey" aria-label="Career path" data-reveal="stagger">
              {journey.map((j, i) => (
                <li key={j.label}>
                  <span className="journey__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="journey__label">{j.label}</span>
                  <span className="journey__note">{j.note}</span>
                  {j.period && <span className="journey__period">{j.period}</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ul className="dims" data-reveal="stagger">
          {dimensions.map((d, i) => (
            <li key={d.key} className="dims__item">
              <span className="dims__n" aria-hidden="true">{["I", "II", "III"][i]}</span>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
