"use client";

import { useRef } from "react";
import Image from "next/image";

interface Props {
  src: string;
  isVideo?: boolean;
  className?: string;
  alt?: string;
  mediaClassName?: string;
}

export default function FramedMedia({
  src,
  isVideo = false,
  className = "",
  alt = "framed-media",
  mediaClassName = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} className={`w-[320px] md:w-[420px] lg:w-[600px] ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 518 518"
      >
        <defs>
          <clipPath id="frameClip">
            <path d="M0.5 487.823V0.5H513V31.9941V32.1989L513.144 32.3449L517.5 36.7696V517.5H31.6998L0.5 487.823Z" />
          </clipPath>
        </defs>

        {/* Media inside the frame */}
        <foreignObject width="100%" height="100%" clipPath="url(#frameClip)">
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {isVideo ? (
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className={mediaClassName}
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                className={mediaClassName}
              />
            )}
          </div>
        </foreignObject>

        {/* Frame outline */}
        <path
          d="M0.5 487.823V0.5H513V31.9941V32.1989L513.144 32.3449L517.5 36.7696V517.5H31.6998L0.5 487.823Z"
          stroke="#EFEFE6"
          fill="none"
        />
      </svg>
    </div>
  );
}
