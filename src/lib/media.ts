import manifest from "@/content/media.generated.json";

export type MediaEntry = {
  src: string;
  width: number;
  height: number;
  widths: number[];
  color: string;
  source: "original" | "pdf-extract";
  temp: boolean;
};

const m = manifest as Record<string, MediaEntry>;

export function getMedia(id: string): MediaEntry {
  const e = m[id];
  if (!e) throw new Error(`Unknown media id "${id}" — add it to scripts/media-sources.mjs and run npm run media`);
  return e;
}

export const srcSet = (e: MediaEntry, fmt: "avif" | "webp") => e.widths.map((w) => `${e.src}-${w}.${fmt} ${w}w`).join(", ");
export const fallbackSrc = (e: MediaEntry, max = 1200) => {
  const w = [...e.widths].reverse().find((x) => x <= max) ?? e.widths[0];
  return `${e.src}-${w}.webp`;
};
export const largestSrc = (e: MediaEntry) => `${e.src}-${e.widths[e.widths.length - 1]}.webp`;
