"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The moving half of a clip figure (design.md §5). The surrounding frame,
 * number, and caption come from `Figure` — this renders only the picture.
 *
 * It starts as the poster still and swaps to the clip on mount, once motion is
 * known to be welcome. That order is deliberate rather than incidental:
 * `prefers-reduced-motion` cannot be read during a static render, and the
 * blanket rule in `globals.css` collapses animation and transition durations
 * but has no power over a `<video>`. Beginning at the still is what makes the
 * reduced-motion fallback real — a reader who asked for no motion, or who has
 * no JavaScript at all, is never sent a frame of it.
 */
export function Clip({
  src,
  poster,
  alt,
  width,
  height,
}: {
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Matches the photograph treatment: capped at 30rem and centred at its
  // natural ratio, never cropped (design.md §5).
  const frame = "mx-auto h-auto max-h-[30rem] w-auto";

  if (!motionAllowed) {
    return (
      <Image
        src={poster}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 40rem, (min-width: 768px) 90vw, 100vw"
        className={frame}
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      width={width}
      height={height}
      className={frame}
      // The caption carries the description for a sighted reader; this carries
      // it for everyone else. Without it the element announces as "video".
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      // An illustration that happens to move, not a player: no chrome, no tab
      // stop, and no fullscreen or picture-in-picture affordance of its own.
      // A controls-less <video> still reports `tabIndex` 0, so the stop is
      // removed explicitly rather than left to the default — there is no
      // interaction here, and offering one to a keyboard user is a dead end.
      controls={false}
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
