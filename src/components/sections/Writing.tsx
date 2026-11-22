import Link from "next/link";
import Split from "../Split";
import { articles, authorPage, fmtDate } from "@/content/writing";

export default function Writing() {
  const featured = articles.filter((a) => a.featured);

  return (
    <section className="writing section--paper" id="writing" tabIndex={-1} aria-labelledby="writing-title">
      <div className="wrap">
        <div className="masthead" data-reveal="up">
          <p className="label"><span className="label__n">(05)</span> Writing</p>
          <p className="label">Brand Equity · The Economic Times</p>
          <p className="label">Jan 2022 — Jan 2023</p>
        </div>
        <h2 id="writing-title" className="writing__title"><Split text="The business of brands, on the record." italic={["brands,"]} /></h2>

        <div className="writing__grid">
          <div className="writing__intro" data-reveal="up">
            <p className="writing__dek">For a year at ETBrandEquity (Times Internet), Reda reported on marketing, advertising and the business landscape of brands — from royal-themed campaigns to the economics of a blue tick.</p>
            <a href={authorPage} target="_blank" rel="noopener noreferrer" className="btn btn--ink">
              All articles on ETBrandEquity <span aria-hidden="true">↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
            <Link href="/work/etbrandequity/" className="textlink">The full archive — {articles.length} articles →</Link>
          </div>

          <ol className="headlines" data-reveal="stagger">
            {featured.map((h, i) => (
              <li key={h.url} className="headline">
                <a href={h.url} target="_blank" rel="noopener noreferrer" className="headline__link">
                  <span className="headline__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="headline__kicker">{h.exclusive ? "Exclusive · " : ""}<time dateTime={h.date}>{fmtDate(h.date)}</time></span>
                    <span className="headline__title">{h.title} <span aria-hidden="true" className="headline__arrow">↗</span></span>
                    <span className="sr-only">(opens ETBrandEquity in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <p className="writing__note label">Published under the byline “Reda Fatma Mobin”.</p>
      </div>
    </section>
  );
}
