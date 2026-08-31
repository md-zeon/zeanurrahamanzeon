/**
 * Central Lenis setup for the site.
 *
 * Owns a single Lenis instance (driving the native scroller) and keeps it in
 * sync with GSAP ScrollTrigger so pinned/scrub animations stay locked to the
 * eased scroll position. Smoothness is tuned to feel responsive, not floaty:
 * a short easeOutExpo pulse at native wheel speed, with touch left untouched
 * (mobile momentum is already polished and hardware-accelerated).
 *
 * Lenis is skipped on mobile (touch + small screen) and when the user prefers
 * reduced motion. On desktop it defers to requestIdleCallback so first paint
 * isn't blocked by smooth-scroll setup.
 */

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;

/** Whether the current device is mobile (touch + small screen). */
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  return hasTouchScreen && isSmallScreen;
}

/**
 * Create (once) and return the shared Lenis instance. Returns `null` on the
 * server, on mobile devices, or when the user prefers reduced motion, so
 * callers can fall back to native scrolling.
 */
export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  if (isMobileDevice()) return null;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  lenis = new Lenis({
    lerp: 0.05,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    smoothWheel: true,
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

/**
 * Deferred init: calls `initLenis` inside requestIdleCallback so smooth
 * scroll setup doesn't block first paint. Falls back to setTimeout for
 * browsers without requestIdleCallback.
 */
export function initLenisDeferred(): void {
  if (typeof window === "undefined") return;
  const boot = () => initLenis();
  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(boot);
  } else {
    setTimeout(boot, 500);
  }
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
