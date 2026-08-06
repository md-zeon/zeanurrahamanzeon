"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Drives the slide carousel inside the Lab section.
 *
 * Slides are horizontally arranged children marked with
 * `data-slider="slide"`; the slider translates the whole track by whole
 * slides (xPercent multiples). Prev/next buttons (matched by
 * `data-slider="button-*"`) wrap around at either end, and the current/step
 * counters (matched by `data-slide-count`) are kept in sync.
 */
export function useLabSlider(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('[data-slider="slide"]');
      const nextButton = el.querySelector('[data-slider="button-next"]');
      const prevButton = el.querySelector('[data-slider="button-prev"]');
      const totalElement = el.querySelector('[data-slide-count="total"]');
      const stepElement = el.querySelector('[data-slide-count="step"]');

      let current = 0;
      const total = slides.length;

      // Move the track so slide `current` is centered/visible. The counter
      // is 1-indexed and zero-padded ("01", "02", ...).
      const updateSlides = () => {
        gsap.to(slides, {
          xPercent: -100 * current,
          duration: 0.75,
          ease: "power3.inOut",
        });
        if (stepElement) stepElement.textContent = String(current + 1).padStart(2, "0");
      };

      if (totalElement) totalElement.textContent = String(total).padStart(2, "0");
      updateSlides();

      // Modulo arithmetic makes the slider loop seamlessly in both directions.
      const onNext = (event: Event) => {
        event.preventDefault();
        current = (current + 1) % total;
        updateSlides();
      };
      const onPrev = (event: Event) => {
        event.preventDefault();
        current = (current - 1 + total) % total;
        updateSlides();
      };

      const cleanups: Array<() => void> = [];
      nextButton?.addEventListener("click", onNext);
      prevButton?.addEventListener("click", onPrev);
      cleanups.push(() => {
        nextButton?.removeEventListener("click", onNext);
        prevButton?.removeEventListener("click", onPrev);
      });

      // Light hover feedback on the arrow controls.
      [nextButton, prevButton].forEach((btn) => {
        if (!btn) return;
        const onEnter = () =>
          gsap.to(btn, {
            scale: 1.15,
            opacity: 0.8,
            duration: 0.25,
            ease: "expo.out",
          });
        const onLeave = () =>
          gsap.to(btn, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "expo.out",
          });
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, el);

    return () => ctx.revert();
  }, [container]);
}
