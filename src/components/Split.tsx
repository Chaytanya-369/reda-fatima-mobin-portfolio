import { Fragment, type ElementType } from "react";

const norm = (s: string) => s.replace(/[.,!?]/g, "");

/** Splits text into masked words for the "split" reveal. Reads naturally for screen readers. */
export default function Split({ text, as: Tag = "span", className, italic }: { text: string; as?: ElementType; className?: string; italic?: string[] }) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-reveal="split">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className={`wi${italic?.some((x) => norm(x) === norm(w)) ? " it" : ""}`}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
