"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initSound, playSound } from "@/lib/sound";
import { useButtonEffects } from "@/lib/useButtonEffects";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cursor from "./Cursor";

/**
 * Global application shell mounted once in the root layout.
 *
 * Owns everything that spans the whole site: the Navbar/Footer/Cursor, global
 * event delegation for `data-audio` hover/click sounds, the page fade-in, and
 * a scroll-to-top + ScrollTrigger refresh on every route change.
 */
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  // Button scramble/magnetic effects for all `.btn` elements (dynamic too).
  useButtonEffects();

  // Global sound delegation: any element with `data-audio` plays a hover
  // sound, `data-audio-click` a click sound. Keeps sound wiring out of the
  // markup of every individual button.
  useEffect(() => {
    initSound();

    const onAudioOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest?.("[data-audio]") as HTMLElement | null;
      if (el?.dataset.audio) playSound(el.dataset.audio, 0.4);
    };
    const onAudioClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest?.("[data-audio-click]") as HTMLElement | null;
      if (el?.dataset.audioClick) playSound(el.dataset.audioClick, 0.5);
    };

    document.addEventListener("pointerover", onAudioOver);
    document.addEventListener("click", onAudioClick);

    return () => {
      document.removeEventListener("pointerover", onAudioOver);
      document.removeEventListener("click", onAudioClick);
    };
  }, []);

  // Fade the whole page in on first load.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const wrapper = root.querySelector(".page-wrapper");
    if (wrapper) {
      gsap.fromTo(wrapper, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.15, ease: "power2.out" });
    }
  }, []);

  // On route change: reset scroll and recompute ScrollTrigger positions after
  // the new page has had a moment to lay out.
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div ref={rootRef}>
      <div className="page-wrapper is-gsap-hidden">
        <div id="smooth-wrapper" className="smooth-wrapper">
          <div id="smooth-content" className="smooth-content">
            <Navbar />
            <main className="main-wrapper background-color-black">{children}</main>
            <Footer />
          </div>
        </div>
      </div>
      <Cursor />
    </div>
  );
}
