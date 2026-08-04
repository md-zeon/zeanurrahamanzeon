"use client";

import { useEffect, type RefObject } from "react";
import { gsap, SplitText } from "@/lib/gsap";

/**
 * Shared scroll-triggered reveal utilities used by most page headers.
 *
 * The markup uses `header-animation-type` attributes to signal *how* an
 * element should animate (container fade, grid of lines scaling up, single
 * line scaling out, plain text fading). Components that render such headers
 * call `useHeaderReveal`; `useSectionHeadings` handles the extra
 * per-character slide-in used on some headings.
 */

// Classes appended to decorative line placeholders by `linesFor`, so those
// lines are hidden on smaller screens where the grid layout doesn't fit.
const LINE_CLASSES = ["hide-tablet", "hide-mobile-landscape"];

/**
 * Plays the generic header entrance animations inside `container` when the
 * header scrolls into view. Every tweens once (`once: true`), keyed off the
 * header element itself.
 */
export function useHeaderReveal(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const lines = el.querySelectorAll('[header-animation-type="lines-grid"]');
    const text = el.querySelectorAll('[header-animation-type="text"]');
    const linesEl = el.querySelectorAll('[header-animation-type="line"]');
    const containerEl = el.querySelector('[header-animation-type="container"]');

    const ctx = gsap.context(() => {
      // Decorative grid lines rise up from their baseline.
      gsap.from(lines, {
        scaleY: 0,
        transformOrigin: "50% 100%",
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      // Plain text fades and nudges up.
      gsap.from(text, {
        autoAlpha: 0,
        y: 10,
        duration: 0.5,
        delay: 0.2,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      // Single horizontal rules grow out from the left.
      gsap.from(linesEl, {
        scaleX: 0,
        transformOrigin: "0% 50%",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      // The whole wrapper fades in last.
      if (containerEl) {
        gsap.from(containerEl, {
          autoAlpha: 0,
          duration: 0.6,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
    // Runs once on mount; `container` is stable so it's safe to ignore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Generates the array of class names for the decorative line grid.
 *
 * Pattern (13 desktop lines, 8 tablet lines, 6 mobile lines) mirrors the
 * Webflow template's line grid; classes are applied to placeholders so
 * responsive CSS hides the extras. Callers must render exactly the same
 * number of lines as returned.
 */
export function linesFor(): string[] {
  const classes: string[] = [];
  const chunk = (n: number, cls: string) => {
    for (let i = 0; i < n; i++) classes.push(cls);
  };
  chunk(13, LINE_CLASSES[0]);
  chunk(8, LINE_CLASSES[1]);
  chunk(6, "");
  return classes;
}

/**
 * Splits heading text into characters and slides them in from the left.
 *
 * Each character is wrapped in an overflow-hidden span (so the slide-in
 * masks cleanly), then a timeline staggers them horizontally. The reveal is
 * bound to `container`'s `header-animation-type="container"` element.
 */
export function useSectionHeadings(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const containerEl = el.querySelector<HTMLElement>('[header-animation-type="container"]');
    if (!containerEl) return;

    const headingEls = [
      containerEl.querySelector<HTMLElement>('[header-animation-type="heading-1"]'),
      containerEl.querySelector<HTMLElement>('[header-animation-type="heading-2"]'),
      containerEl.querySelector<HTMLElement>('[header-animation-type="heading-3"]'),
    ].filter((h): h is HTMLElement => !!h);

    if (!headingEls.length) return;

    const splits = headingEls
      .map((heading) => new SplitText(heading, { type: "chars" }))
      .filter((split) => split.chars.length > 0);

    // Wrap each character in an overflow-hidden inline-block so the
    // horizontal slide-in masks instead of overflowing visibly. The slight
    // padding/negative-margin pair keeps descenders from being clipped.
    splits.forEach((split) => {
      split.chars.forEach((char) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("char-wrapper");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.padding = "0.3vw";
        wrapper.style.margin = "-0.3vw";
        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });
    });

    const ctx = gsap.context(() => {
      // Start every character off-screen to the left.
      splits.forEach((split) => gsap.set(split.chars, { xPercent: -120 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "bottom bottom",
          once: true,
        },
      });

      // Slide each heading in; successive headings overlap slightly with
      // their predecessor instead of waiting for it to finish.
      splits.forEach((split, i) => {
        tl.to(
          split.chars,
          { xPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.04 },
          i === 0 ? 0 : "<+0.15"
        );
      });
    }, containerEl);

    return () => ctx.revert();
    // Runs once on mount; `container` is stable so it's safe to ignore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
