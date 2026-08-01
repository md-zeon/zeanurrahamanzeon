"use client";

import { useEffect, useRef, useState } from "react";
import lottie, { type AnimationItem } from "lottie-web";
import { soundWaves } from "@/data/site";
import { isSoundEnabled, setSoundEnabled, toggleMusic } from "@/lib/sound";

export default function SoundButton() {
  const [on, setOn] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    setOn(isSoundEnabled());
    if (wrapRef.current) {
      animRef.current = lottie.loadAnimation({
        container: wrapRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: soundWaves.light,
      });
    }
    return () => {
      animRef.current?.destroy();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !on;
    setOn(next);
    setSoundEnabled(next);
    toggleMusic();
    const anim = animRef.current;
    if (anim) {
      if (next) {
        anim.playSegments([0, anim.totalFrames], true);
      } else {
        anim.playSegments([anim.totalFrames, 0], true);
      }
    }
  };

  return (
    <a
      data-audio="https://bjornflow-assets.b-cdn.net/Audio/button%20hover.wav"
      href="#"
      onClick={handleClick}
      className="navbar_sound-button w-inline-block"
    >
      <div sound-control-type="text" className="text-caption-2">
        {on ? "Turn off sound" : "Turn on sound"}
      </div>
      <div className="navbar_sound">
        <div ref={wrapRef} className="navbar_sound-lottie" />
      </div>
    </a>
  );
}
