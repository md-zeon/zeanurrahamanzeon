"use client";

import { useEffect, useRef } from "react";

type AutoVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
  playsOnScroll?: boolean;
};

export default function AutoVideo({ src, poster, className, preload = "metadata", playsOnScroll = true }: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
        preload={preload}
        poster={poster}
        data-autoplay-on-scroll
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
