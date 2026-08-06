"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import lottie, { type AnimationItem } from "lottie-web";
import { soundWaves, audio } from "@/data/site";
import {
  setSoundEnabled,
  toggleMusic,
  subscribeSound,
  getSoundSnapshot,
  getSoundServerSnapshot,
} from "@/lib/sound";

/**
 * Navbar sound toggle.
 *
 * State lives in the shared sound store (see `@/lib/sound`), consumed via
 * `useSyncExternalStore`. The lottie animation plays forward when sound is
 * turned on and in reverse when turned off. Clicking also toggles background
 * music.
 */
export default function SoundButton() {
  // React 18 pattern: subscribe to the sound store on the client while the
  // server snapshot (always `true`) keeps hydration deterministic.
  const on = useSyncExternalStore(subscribeSound, getSoundSnapshot, getSoundServerSnapshot);
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  // Load the sound-wave lottie animation once; destroy it on unmount.
  useEffect(() => {
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
      data-audio={audio.hover}
      href="#"
      onClick={handleClick}
      className="navbar_sound-button relative flex items-center justify-start gap-1 rounded-[0.25rem] border border-transparent pl-3 no-underline w-inline-block"
    >
      <div sound-control-type="text" className="text-caption-2">
        {on ? "Turn off sound" : "Turn on sound"}
      </div>
      <div className="navbar_sound relative flex h-10 w-10 items-center justify-center gap-[0.15rem] text-brand-white max-[767px]:h-8 max-[767px]:w-8">
        <div ref={wrapRef} className="navbar_sound-lottie h-full w-full" />
      </div>
    </a>
  );
}
