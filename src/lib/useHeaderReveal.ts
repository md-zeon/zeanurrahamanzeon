"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

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
