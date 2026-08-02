"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

const BTN_SELECTOR = ".button";
const SCRAMBLE_CHARS = "10";
const SCRAMBLE_STEP = 0.2 / (7 * 2);
const MAGNET_STRENGTH = 0.35;

const textTween = (text: () => string): gsap.TweenVars => ({
  duration: SCRAMBLE_STEP,
  text: text as unknown as string,
  ease: "expo.out",
});

export function useButtonEffects() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const cleanups = new Map<HTMLElement, () => void>();

    const attach = (button: HTMLElement) => {
      if (cleanups.has(button)) return;
      const cleanupFns: Array<() => void> = [];

      const label = button.querySelector<HTMLElement>(".button-text");
      let currentTimeline: gsap.core.Timeline | null = null;

      if (label) {
        const originalText = label.textContent ?? "";
        const textArray = originalText.split("");
        const scrambleFor = (predicate: (index: number) => boolean) =>
          textArray
            .map((char, index) => (predicate(index) ? (Math.random() > 0.5 ? "1" : "0") : char))
            .join("");

        const onEnter = () => {
          if (!textArray.length) return;
          currentTimeline?.kill();
          currentTimeline = gsap.timeline();
          for (let i = 0; i < textArray.length; i++) {
            currentTimeline.to(
              label,
              textTween(() => scrambleFor((index) => index <= i)),
              `+=${SCRAMBLE_STEP}`
            );
          }
          currentTimeline.to(label, {
            duration: 0.1,
            scrambleText: { text: originalText, chars: SCRAMBLE_CHARS, speed: 0.4 },
          });
        };

        const onLeave = () => {
          if (!textArray.length) return;
          currentTimeline?.kill();
          currentTimeline = gsap.timeline();
          for (let i = textArray.length - 1; i >= 0; i--) {
            currentTimeline.to(
              label,
              textTween(() => scrambleFor((index) => index >= i)),
              `+=${SCRAMBLE_STEP}`
            );
          }
          for (let i = textArray.length - 1; i >= 0; i--) {
            currentTimeline.to(
              label,
              textTween(() => scrambleFor((index) => index < i)),
              `+=${SCRAMBLE_STEP}`
            );
          }
        };

        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          button.removeEventListener("mouseenter", onEnter);
          button.removeEventListener("mouseleave", onLeave);
        });
      }

      if (!isTouch) {
        const onMove = (e: PointerEvent) => {
          const rect = button.getBoundingClientRect();
          const x = (e.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH;
          const y = (e.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH;
          gsap.to(button, { x, y, duration: 0.3, ease: "power2.out" });
        };
        const onEnter = () => window.addEventListener("pointermove", onMove, { passive: true });
        const onExit = () => {
          window.removeEventListener("pointermove", onMove);
          gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" });
        };
        button.addEventListener("pointerenter", onEnter);
        button.addEventListener("pointerleave", onExit);
        cleanupFns.push(() => {
          window.removeEventListener("pointermove", onMove);
          button.removeEventListener("pointerenter", onEnter);
          button.removeEventListener("pointerleave", onExit);
        });
      }

      cleanups.set(button, () => cleanupFns.forEach((fn) => fn()));
    };

    const scan = () => document.querySelectorAll<HTMLElement>(BTN_SELECTOR).forEach(attach);

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
