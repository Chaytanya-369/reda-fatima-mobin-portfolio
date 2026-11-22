import { getMedia, srcSet, fallbackSrc } from "@/lib/media";
import type { CSSProperties } from "react";

type Props = {
  id: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** CSS object-position */
  position?: string;
  /** keep intrinsic aspect ratio (default) or fill parent */
  fill?: boolean;
  style?: CSSProperties;
};

/** Responsive <picture> with AVIF + WebP, intrinsic dimensions and a colour placeholder. */
export default function Img({ id, alt, sizes = "100vw", className, priority, position, fill, style }: Props) {
  const e = getMedia(id);
  return (
    <picture className={`img ${fill ? "img--fill" : ""} ${className ?? ""}`} style={{ backgroundColor: e.color, ...style }} data-temp={e.temp || undefined}>
      <source type="image/avif" srcSet={srcSet(e, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(e, "webp")} sizes={sizes} />
      <img
        src={fallbackSrc(e)}
        alt={alt}
        width={e.width}
        height={e.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
