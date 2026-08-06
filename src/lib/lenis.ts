/**
 * Central Lenis setup for the site.
 *
 * Owns a single Lenis instance (driving the native scroller) and keeps it in
 * sync with GSAP ScrollTrigger so pinned/scrub animations stay locked to the
 * eased scroll position. Smoothness is tuned to feel responsive, not floaty:
 * a short easeOutExpo pulse at native wheel speed, with touch left untouched
 * (mobile momentum is already polished and hardware-accelerated).
 */

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;

/**
 * Create (once) and return the shared Lenis instance. Returns `null` on the
 * server or when the user prefers reduced motion, so callers can fall back to
 * native scrolling.
 */
export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  lenis = new Lenis({
    // Lerp-based smoothing (Lenis default) instead of duration+easing.
    // Duration-based easing restarts a fixed-length easeOutExpo pulse on
    // every wheel event; it's fast at the start and crawls to rest, so
    // reversing direction mid-pulse reads as a delayed/stuttery response.
    // Lerp is frame-independent damped interpolation — velocity stays
    // proportional to the gap in both directions, so up/down feel identical.
    // 0.1 = classic default; 0.08 keeps a touch more glide for this
    // creative-portfolio feel without ever feeling heavy.
    lerp: 0.05,
    // Keep wheel at native speed — multipliers are the usual cause of a
    // "laggy" feel.
    wheelMultiplier: 1,
    touchMultiplier: 1,
    smoothWheel: true,
    // `syncTouch` stays false (default): native touch scrolling on mobile,
    // which is already polished and hardware-accelerated.
    autoResize: true,
  });

  // Feed eased scroll position straight into ScrollTrigger and drive the
  // Lenis loop from GSAP's ticker so everything animates on one clock.
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  // Prevent GSAP from smoothing over frame drops (causes the "drift after
  // lag" feel when paired with Lenis).
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/** Return the active Lenis instance, or `null` when smooth scroll is off. */
export function getLenis(): Lenis | null {
  return lenis;
}

/** Tear down the shared instance (used on unmount of the app shell). */
export function destroyLenis(): void {
  if (!lenis) return;
  lenis.destroy();
  lenis = null;
}
