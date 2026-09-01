"use client";

import { useEffect, useRef } from "react";

type AutoVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
  /** If true, play only while the video is on screen (via IntersectionObserver). */
  playsOnScroll?: boolean;
  /** Accessible name for screen readers. */
  label?: string;
  /** If true, the video is ambient decoration and is hidden from screen
   * readers and focus (e.g. background loops with adjacent text content). */
  decorative?: boolean;
};

/**
 * Maps a video path to its static poster frame:
 *   /assets/videos/<path>.mp4  ->  /assets/images/posters/<path>.webp
 * Only used when the caller didn't pass an explicit `poster`, so explicit
 * posters (e.g. the hero) are never overridden.
 */
const derivePoster = (src: string) =>
  src
    .replace(/^\/assets\/videos\//, "/assets/images/posters/")
    .replace(/\.mp4$/i, ".webp");

/**
 * Cover-filling `<video>` that auto-plays.
 *
 * By default playback is driven by an IntersectionObserver: it plays when at
 * least 15% is visible and pauses when scrolled out. With `playsOnScroll`
 * false it simply plays on mount. Videos are muted/inline/looping because
 * browsers block unmuted autoplay without user interaction.
 *
 * Scroll-gated videos skip preloading entirely (`play()` triggers the fetch
 * when the viewer actually reaches them) so videos the visitor never scrolls
 * to cost no mobile network/decoder budget. A static poster fills the space
 * until the first frame decodes.
 */
export default function AutoVideo({
  src,
  poster,
  className,
  preload = "metadata",
  playsOnScroll = true,
  label,
  decorative = false,
}: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterSrc = poster ?? derivePoster(src);
  const effectivePreload =
    preload === "metadata" && playsOnScroll ? "none" : preload;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => undefined);
    if (!playsOnScroll) {
      play();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else video.pause();
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [playsOnScroll]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={effectivePreload}
        poster={posterSrc}
        data-autoplay-on-scroll
        aria-label={decorative ? undefined : label}
        aria-hidden={decorative || undefined}
        tabIndex={decorative ? -1 : undefined}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
