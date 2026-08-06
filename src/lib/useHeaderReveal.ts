"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { HERO_ENTRANCE_COMPLETE } from "@/lib/utils";

/**
 * Shared header reveal utilities.
 *
 * Two marker conventions:
 *  - `header-animation-type` drives the scroll-triggered reveals used by
 *    most inner sections (container fade, grid of lines scaling up, single
 *    line scaling out, plain text fading). `useHeaderReveal` plays those;
 *    `useSectionHeadings` handles the extra per-character slide-in.
 *  - `header-content-type` marks the elements of a *page* hero (the big
 *    headline, paragraph, CTAs, frames) so `usePageHeaderEntrance` can run
 *    the choreographed load-in animation on page mount.
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

/**
 * Scroll-scrubbed text highlight.
 *
 * Splits the element matched by `selector` (default `#highlighted-text`) into
 * words then characters, and brightens each character from a dim opacity to
 * full as the text scrolls through the viewport. Words are wrapped in
 * inline-block spans first so line wrapping survives the char split.
 */
export function useScrubbedHighlight(
  container: RefObject<HTMLElement | null>,
  selector = "#highlighted-text",
) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const element = el.querySelector<HTMLElement>(selector);
      if (!element) return;

      // Split into words then characters (chars are easier to stagger
      // across a scrub), and brighten each char from 20% to 100% as the
      // text scrolls through the viewport.
      const splitWords = new SplitText(element, { type: "words" });
      const allChars: Element[] = [];
      splitWords.words.forEach((word) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        const wordClone = word.cloneNode(true);
        wrapper.appendChild(wordClone);
        word.parentNode?.replaceChild(wrapper, word);
        const splitChars = new SplitText(wordClone as HTMLElement, {
          type: "chars",
        });
        allChars.push(...splitChars.chars);
      });
      gsap.fromTo(
        allChars,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 0.3,
          },
        },
      );
    }, el);

    return () => ctx.revert();
    // Runs once on mount; `container` is stable so it's safe to ignore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Plays a page hero's load-in entrance on mount.
 *
 * Mirrors the About header's choreography, driven by the
 * `header-content-type` markers that page heroes carry:
 *   - heading-1 / heading-2 → characters slide in from the left behind masks
 *   - asterisk               → spins + fades in (with the border lines)
 *   - line-bg                → grows out from the left
 *   - badge-link             → fades in
 *   - paragraph              → reveals line-by-line through masks as the finale
 *   - button                 → never hidden; the CTAs stay on screen, matching
 *                              the About header
 *
 * Dispatches HERO_ENTRANCE_COMPLETE when it finishes so the navbar can time
 * its own reveal; reduced-motion users get a calm branch that dispatches
 * immediately without animating.
 *
 * Runs in a layout effect so the initial hidden state, character wrapping and
 * line masks are applied before the browser paints the new page — without
 * this, content is visible for a moment after a client-side navigation before
 * the entrance kicks in (a flash that reads as lag).
 */
export function usePageHeaderEntrance(
  container: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const el = container.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.dispatchEvent(new CustomEvent(HERO_ENTRANCE_COMPLETE));
      return;
    }

    const ctx = gsap.context(() => {
      const headings = Array.from(
        el.querySelectorAll<HTMLElement>(
          '[header-content-type="heading-1"], [header-content-type="heading-2"]',
        ),
      );
      if (!headings.length) {
        window.dispatchEvent(new CustomEvent(HERO_ENTRANCE_COMPLETE));
        return;
      }

      // Hide the secondary elements until their timeline step plays. The
      // CTA buttons (header-content-type="button") deliberately stay visible.
      gsap.set(
        [
          '[header-content-type="paragraph"]',
          '[header-content-type="border"]',
          '[header-content-type="asterisk"]',
          '[header-content-type="line-bg"]',
          ".badge-link",
        ],
        { autoAlpha: 0 },
      );
      gsap.set('[header-content-type="line-bg"]', { xPercent: -100 });

      // Wrap each character in an overflow-hidden box so the slide-in masks
      // cleanly; the small padding/margin pair keeps descenders from
      // clipping. The splits are kept so the timeline animates the same
      // char elements that were wrapped.
      const splits = headings.map((heading) => {
        const split = new SplitText(heading, { type: "chars" });
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
        gsap.set(split.chars, { xPercent: -120 });
        return split;
      });

      // Paragraph reveals line-by-line through masks as the finale, exactly
      // like the About header. Lines are hidden at commit (pre-paint) so
      // nothing flashes before the reveal.
      const lineWrappers: HTMLElement[] = [];
      const paragraph = el.querySelector(
        '[header-content-type="paragraph"]',
      );
      if (paragraph) {
        const splitText = new SplitText(paragraph, { type: "lines" });
        splitText.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("line-wrapper");
          wrapper.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          lineWrappers.push(wrapper);
        });
        gsap.set(paragraph, { autoAlpha: 1 });
        gsap.set(lineWrappers, { yPercent: 100, opacity: 0 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () =>
          window.dispatchEvent(new CustomEvent(HERO_ENTRANCE_COMPLETE)),
      });
      tl.add("headings");
      splits.forEach((split, i) => {
        tl.to(
          split.chars,
          { xPercent: 0, duration: 0.6, stagger: 0.04 },
          i === 0 ? "headings" : "headings+=0.04",
        );
      });

      tl.to(
        '[header-content-type="asterisk"], [header-content-type="border"]',
        { autoAlpha: 1, duration: 0.1 },
        "headings+=0.6",
      );
      tl.to('[header-content-type="asterisk"]', { rotate: 90, duration: 0.3 }, "<");
      tl.to(
        '[header-content-type="line-bg"]',
        { xPercent: 0, autoAlpha: 1, duration: 0.3 },
        "headings+=0.8",
      );
      tl.to(".badge-link", { autoAlpha: 1, duration: 0.1 }, "headings+=1.1");

      if (lineWrappers.length) {
        tl.to(
          lineWrappers,
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          "headings+=1.2",
        );
      }
    }, el);

    return () => ctx.revert();
    // Runs once on mount; `container` is stable so it's safe to ignore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
