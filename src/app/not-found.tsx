import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="nf section--dark">
      <div className="wrap">
        <p className="label">Error 404 — Scene missing</p>
        <h1 className="nf__title">This frame <em>didn’t make the cut.</em></h1>
        <Link href="/" className="btn btn--accent">Back to the beginning →</Link>
      </div>
    </section>
  );
}
