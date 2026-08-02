"use client";

import { useEffect, type RefObject } from "react";
import { gsap, SplitText } from "@/lib/gsap";

const LINE_CLASSES = ["hide-tablet", "hide-mobile-landscape"];

export function useHeaderReveal(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const lines = el.querySelectorAll('[header-animation-type="lines-grid"]');
    const text = el.querySelectorAll('[header-animation-type="text"]');
    const linesEl = el.querySelectorAll('[header-animation-type="line"]');
    const containerEl = el.querySelector('[header-animation-type="container"]');

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        scaleY: 0,
        transformOrigin: "50% 100%",
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      gsap.from(text, {
        autoAlpha: 0,
        y: 10,
        duration: 0.5,
        delay: 0.2,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      gsap.from(linesEl, {
        scaleX: 0,
        transformOrigin: "0% 50%",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      if (containerEl) {
        gsap.from(containerEl, {
          autoAlpha: 0,
          duration: 0.6,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

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
      splits.forEach((split) => gsap.set(split.chars, { xPercent: -120 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "bottom bottom",
          once: true,
        },
      });

      splits.forEach((split, i) => {
        tl.to(
          split.chars,
          { xPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.04 },
          i === 0 ? 0 : "<+0.15"
        );
      });
    }, containerEl);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
