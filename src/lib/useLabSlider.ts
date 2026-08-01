"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

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

      nextButton?.addEventListener("click", onNext);
      prevButton?.addEventListener("click", onPrev);

      return () => {
        nextButton?.removeEventListener("click", onNext);
        prevButton?.removeEventListener("click", onPrev);
      };
    }, el);

    return () => ctx.revert();
  }, [container]);
}
