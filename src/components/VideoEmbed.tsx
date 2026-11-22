"use client";
import { useState } from "react";
import Img from "./Img";

/**
 * Privacy-friendly YouTube embed: shows a local poster and loads nothing from
 * YouTube until the visitor presses play (then uses youtube-nocookie.com).
 */
export default function VideoEmbed({ youtubeId, title, poster, posterAlt }: { youtubeId: string; title: string; poster: string; posterAlt: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="video">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button className="video__poster" onClick={() => setOn(true)} data-cursor="Play" title={posterAlt}>
          <Img id={poster} alt="" sizes="(max-width: 900px) 100vw, 80vw" fill />
          <span className="video__play" aria-hidden="true"><i /></span>
          <span className="video__label label">Play — {title}<span className="sr-only"> (loads YouTube)</span></span>
        </button>
      )}
    </div>
  );
}
