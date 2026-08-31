"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, getLenis, initLenisDeferred } from "@/lib/lenis";
import { initSound, playSound, preloadSounds, startMusicIfEnabled } from "@/lib/sound";
import { useButtonEffects } from "@/lib/useButtonEffects";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cursor from "./Cursor";

/**
 * Wraps useButtonEffects with a 200ms delay so the MutationObserver starts
 * after the page fade-in completes and doesn't compete with critical rendering.
 */
function DeferredButtonEffects() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);
  // useButtonEffects is called unconditionally when ready=true — the
  // conditional rendering of this component keeps the hook order stable.
  return ready ? <ButtonEffectsBridge /> : null;
}

/** Thin wrapper that actually runs useButtonEffects. */
function ButtonEffectsBridge() {
  useButtonEffects();
  return null;
}

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

  // Global sound delegation: any element with `data-audio` plays a hover
  // sound, `data-audio-click` a click sound. Keeps sound wiring out of the
  // markup of every individual button.
  // Deferred to idle so audio decoding and background music don't block first paint.
  useEffect(() => {
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

    // Attach listeners immediately (lightweight) but defer audio init to idle.
    document.addEventListener("pointerover", onAudioOver);
    document.addEventListener("click", onAudioClick);

    const initAudio = () => {
      initSound();
      preloadSounds();
      startMusicIfEnabled();
    };

    if ("requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(initAudio);
    } else {
      setTimeout(initAudio, 1000);
    }

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

  // Boot smooth scroll once and tear it down when the shell unmounts.
  // Deferred so first paint isn't blocked by Lenis setup.
  useEffect(() => {
    initLenisDeferred();
    return () => destroyLenis();
  }, []);

  // On route change: reset scroll and recompute ScrollTrigger positions after
  // the new page has had a moment to lay out. Uses Lenis when active so the
  // reset is instant (not a slow animated scroll), otherwise falls back to
  // the native API.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
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
            <div className="main-wrapper background-color-black">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
      <DeferredButtonEffects />
      <Cursor />
    </div>
  );
}
