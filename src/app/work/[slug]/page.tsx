import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import Split from "@/components/Split";
import CaseBlocks from "@/components/CaseBlocks";
import { projects, getProject, nextProject, categories } from "@/content/projects";
import { getMedia } from "@/lib/media";
import { site, SITE_URL } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = getMedia(p.cover.id);
  const img = `${cover.src}-${cover.widths[cover.widths.length - 1]}.webp`;
  return {
    title: `${p.title} — ${p.format}`,
    description: p.summary,
    alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `/work/${p.slug}/` } : undefined,
    openGraph: { title: `${p.title} — ${site.name}`, description: p.summary, url: `${SITE_URL}/work/${p.slug}/`, images: [{ url: img, width: cover.width, height: cover.height, alt: p.cover.alt }] },
    twitter: { card: "summary_large_image", title: `${p.title} — ${site.name}`, description: p.summary, images: [img] },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(p.slug);
  const cover = getMedia(p.cover.id);
  const tall = cover.height > cover.width * 0.9;
  const cat = categories.find((c) => c.key === p.category)?.label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": p.act === "storyteller" ? "CreativeWork" : "Article",
    name: p.title,
    headline: p.title,
    description: p.summary,
    genre: cat,
    creator: { "@type": "Person", name: site.name },
    url: `${SITE_URL}/work/${p.slug}/`,
  };

  return (
    <article className={`cs ${p.act === "strategist" ? "cs--strategist" : ""}`} style={{ ["--accent" as string]: p.accent }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="cs-hero wrap">
        <nav className="cs-hero__crumbs label" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/#index"><span aria-hidden="true">← </span>Index</Link></li>
            <li aria-hidden="true" className="cs-hero__sep">&gt;</li>
            <li><span aria-current="page">{p.title}</span></li>
          </ol>
        </nav>
        <p className="cs-hero__n label" aria-hidden="true">{p.n}</p>
        <h1 className="cs-hero__title"><Split text={p.title} /></h1>
        <p className="cs-hero__summary" data-reveal="up">{p.summary}</p>

        <dl className="cs-meta" data-reveal="stagger">
          <div><dt className="label">Format</dt><dd>{p.format}</dd></div>
          <div><dt className="label">Reda’s role</dt><dd>{p.role.join(", ")}</dd></div>
          {p.recognition && (
            <div className="cs-meta__wide"><dt className="label">Recognition</dt><dd><ul className="cs-laurels">{p.recognition.map((r) => <li key={r}><span aria-hidden="true">✦</span> {r}</li>)}</ul></dd></div>
          )}
          {p.links && (
            <div className="cs-meta__wide"><dt className="label">Watch / read</dt><dd className="cs-links">
              {p.links.map((l) => {
                const external = l.href.startsWith("http");
                return (
                  <span key={l.href} className="cs-links__item">
                    <a href={l.href} className="btn btn--ghost" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {l.label} <span aria-hidden="true">{external ? "↗" : "→"}</span>
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                    {l.note && <span className="cs-links__note"> {l.note}</span>}
                  </span>
                );
              })}
            </dd></div>
          )}
        </dl>
      </header>

      {/* Low-resolution sources are shown inset (max 1.5× their native width) rather than stretched full-bleed. */}
      <div
        className={`cs-cover ${tall ? "cs-cover--tall" : ""} ${!tall && cover.width < 1400 ? "cs-cover--inset" : ""}`}
        style={!tall && cover.width < 1400 ? { maxWidth: `min(${Math.round(cover.width * 1.5)}px, calc(100% - 2 * var(--gutter)))` } : undefined}
        data-reveal="image"
      >
        <div data-parallax="0.08" className="cs-cover__inner">
          <Img id={p.cover.id} alt={p.cover.alt} sizes={tall ? "(max-width: 900px) 92vw, 44vw" : cover.width < 1400 ? "(max-width: 900px) 92vw, 70vw" : "100vw"} priority />
        </div>
      </div>

      <div className="cs-body wrap">
        <CaseBlocks blocks={p.blocks} />
        {p.credit && <p className="cs-credit label">{p.credit}</p>}
      </div>

      <Link href={`/work/${next.slug}/`} className="cs-next" data-cursor="Next" style={{ ["--accent" as string]: next.accent }}>
        <div className="cs-next__media" aria-hidden="true">
          <Img id={next.cover.id} alt="" sizes="100vw" />
        </div>
        <div className="cs-next__text wrap">
          <p className="label">Next project — {next.n}</p>
          <p className="cs-next__title">{next.title}</p>
          <p className="label">{next.format}</p>
        </div>
      </Link>
    </article>
  );
}
