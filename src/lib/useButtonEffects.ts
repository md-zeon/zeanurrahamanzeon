"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Global micro-interactions (used once from SiteShell).
 *
 * Attaches to every element matching `.btn` or `.badge-link` and layers:
 *  1. A binary "scramble" of the label text on hover in/out.
 *  2. A magnetic pull toward the cursor on pointer-capable (non-touch)
 *     devices, so buttons still feel fine on mobile (buttons only).
 *
 * Uses a MutationObserver so elements rendered later (after async data load
 * or route changes) get the effects automatically.
 */

// All effects target elements using the `.btn` / `.badge-link` conventions.
const BTN_SELECTOR = ".btn";
const BADGE_SELECTOR = ".badge-link";
// Label inside `.btn` is a single `.btn__text` wrapper.
const BTN_LABEL_SELECTOR = ".btn__text";
// Label inside `.badge-link` is whichever of these carries the text.
const BADGE_LABEL_SELECTOR = ".text-size-small, .text-caption-1";
// Characters used in the scramble effect.
const SCRAMBLE_CHARS = "10";
// Per-character reveal step duration. Scaled down from a total animation
// budget so a full scramble of any label stays ~the same duration.
const SCRAMBLE_STEP = 0.2 / (7 * 2);
// How strongly the button "pulls" toward the cursor (0 = no magnetism).
const MAGNET_STRENGTH = 0.35;

// Tween preset for revealing characters one step at a time via GSAP TextPlugin.
const textTween = (text: () => string): gsap.TweenVars => ({
  duration: SCRAMBLE_STEP,
  text: text as unknown as string,
  ease: "expo.out",
});

/**
 * Binary scramble of `label` on hover in/out. Returns cleanup functions.
 */
const attachScramble = (el: HTMLElement, label: HTMLElement): Array<() => void> => {
  const originalText = label.textContent ?? "";
  const textArray = originalText.split("");
  // Builds a scrambled variant where positions matching `predicate` show
  // random bits and the rest keep their real character.
  const scrambleFor = (predicate: (index: number) => boolean) =>
    textArray
      .map((char, index) =>
        predicate(index) ? (Math.random() > 0.5 ? "1" : "0") : char,
      )
      .join("");

  let currentTimeline: gsap.core.Timeline | null = null;

  const onEnter = () => {
    if (!textArray.length) return;
    // Kill any in-flight scramble so a fast enter/leave doesn't queue
    // conflicting text tweens.
    currentTimeline?.kill();
    currentTimeline = gsap.timeline();
    // Reveal left-to-right: each step scrambles one more character.
    for (let i = 0; i < textArray.length; i++) {
      currentTimeline.to(
        label,
        textTween(() => scrambleFor((index) => index <= i)),
        `+=${SCRAMBLE_STEP}`,
      );
    }
    // Final pass with GSAP's ScrambleTextPlugin to land exactly on the
    // original text.
    currentTimeline.to(label, {
      duration: 0.1,
      scrambleText: { text: originalText, chars: SCRAMBLE_CHARS, speed: 0.4 },
    });
  };

  const onLeave = () => {
    if (!textArray.length) return;
    currentTimeline?.kill();
    currentTimeline = gsap.timeline();
    // Scramble back right-to-left...
    for (let i = textArray.length - 1; i >= 0; i--) {
      currentTimeline.to(
        label,
        textTween(() => scrambleFor((index) => index >= i)),
        `+=${SCRAMBLE_STEP}`,
      );
    }
    // ...then restore the real label left-to-right so it reads naturally.
    for (let i = textArray.length - 1; i >= 0; i--) {
      currentTimeline.to(
        label,
        textTween(() => scrambleFor((index) => index < i)),
        `+=${SCRAMBLE_STEP}`,
      );
    }
  };

  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);
  return [
    () => el.removeEventListener("mouseenter", onEnter),
    () => el.removeEventListener("mouseleave", onLeave),
  ];
};

export function useButtonEffects() {
  useEffect(() => {
    // Magnetic effect is pointless with a touchscreen; skip attaching those
    // listeners so mobile browsers don't fight over pointer events.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const cleanups = new Map<HTMLElement, () => void>();

    const attach = (element: HTMLElement) => {
      if (cleanups.has(element)) return;
      const cleanupFns: Array<() => void> = [];

      if (element.classList.contains("btn")) {
        const label = element.querySelector<HTMLElement>(BTN_LABEL_SELECTOR);
        if (label) cleanupFns.push(...attachScramble(element, label));

        if (!isTouch) {
          // Magnetic pull: translate the button by a fraction of the distance
          // from its center to the cursor. Transform-based, so it composes with
          // any existing positioning on the button.
          const onMove = (e: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH;
            const y = (e.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH;
            gsap.to(element, { x, y, duration: 0.3, ease: "power2.out" });
          };
          const onEnter = () =>
            window.addEventListener("pointermove", onMove, { passive: true });
          const onExit = () => {
            window.removeEventListener("pointermove", onMove);
            // Elastic spring-back when the cursor leaves the button.
            gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" });
          };
          element.addEventListener("pointerenter", onEnter);
          element.addEventListener("pointerleave", onExit);
          cleanupFns.push(
            () => window.removeEventListener("pointermove", onMove),
            () => element.removeEventListener("pointerenter", onEnter),
            () => element.removeEventListener("pointerleave", onExit),
          );
        }
      } else if (element.classList.contains("badge-link")) {
        const label = element.querySelector<HTMLElement>(BADGE_LABEL_SELECTOR);
        if (label) cleanupFns.push(...attachScramble(element, label));
      }

      cleanups.set(element, () => cleanupFns.forEach((fn) => fn()));
    };

    const scan = () =>
      document
        .querySelectorAll<HTMLElement>(`${BTN_SELECTOR}, ${BADGE_SELECTOR}`)
        .forEach(attach);

    // Watch the whole document for newly-added elements (dynamic content,
    // route changes) and attach effects to them.
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    scan();

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
      cleanups.clear();
    };
  }, []);
}
