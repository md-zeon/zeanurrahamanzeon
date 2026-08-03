"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { logosBannerText } from "@/data/home";

function BannerLayout({ text, number }: { text: string; number?: string }) {
  const line = "logos_banner-line h-3 w-[0.094rem] rotate-[15deg] bg-brand-white max-[767px]:h-2";
  const row = "logos_banner-wrapper flex gap-[0.3rem] overflow-hidden px-[0.15rem] max-[767px]:gap-[0.2rem]";
  return (
    <div className="logos_banner-layout flex flex-none items-center justify-center gap-[0.7rem]">
      <div className={row}>
        {Array.from({ length: 27 }).map((_, i) => (
          <div key={i} className={line} />
        ))}
      </div>
      <div className="logos_banner-text mt-[0.1rem] flex-none text-[0.65rem] font-normal uppercase leading-[120%] tracking-normal">{text}</div>
      <div className={row}>
        {Array.from({ length: 27 }).map((_, i) => (
          <div key={i} className={line} />
        ))}
      </div>
      {number ? <div className="logos_banner-text is-number mt-[0.1rem] flex-none text-[0.65rem] font-normal uppercase leading-[120%] tracking-normal">{number}</div> : null}
    </div>
  );
}

export default function LogosBanner({ text = logosBannerText, number }: { text?: string; number?: string }) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const init = (component: HTMLElement, direction: "left" | "right"): (() => void) => {
      const layout = component.querySelector<HTMLElement>(".logos_banner-layout");
      if (!layout) return () => undefined;
      const layoutWidth = layout.offsetWidth;
      const screenWidth = window.innerWidth;
      const repeatCount = Math.ceil(screenWidth / layoutWidth) + 1;
      for (let i = 0; i < repeatCount; i++) {
        component.appendChild(layout.cloneNode(true));
      }
      const tween = gsap.to(component.querySelectorAll<HTMLElement>(".logos_banner-layout"), {
        x: direction === "left" ? "-101%" : "101%",
        repeat: -1,
        duration: 50,
        ease: "linear",
      });
      const onEnter = () => tween.pause();
      const onLeave = () => tween.resume();
      component.addEventListener("mouseenter", onEnter);
      component.addEventListener("mouseleave", onLeave);
      return () => {
        component.removeEventListener("mouseenter", onEnter);
        component.removeEventListener("mouseleave", onLeave);
        tween.kill();
      };
    };

    const cleanups: Array<() => void> = [];
    if (topRef.current) cleanups.push(init(topRef.current, "left"));
    if (bottomRef.current) cleanups.push(init(bottomRef.current, "right"));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const textElements = Array.from(root.querySelectorAll<HTMLElement>(".logos_banner-text.is-number"));
    if (!textElements.length) return;
    const chars = ["1", "0"];
    const timers: number[] = [];
    textElements.forEach((el) => {
      const originalText = el.textContent ?? "";
      const scrambleLength = originalText.length;
      const scrambleAnimation = () => {
        gsap.to(el, {
          duration: 1.5,
          ease: "expo.out",
          onUpdate: () => {
            let scrambled = "";
            for (let i = 0; i < scrambleLength; i++) {
              scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
            el.textContent = scrambled;
          },
          onComplete: () => {
            el.textContent = originalText;
            timers.push(window.setTimeout(scrambleAnimation, 3000));
          },
        });
      };
      scrambleAnimation();
    });
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      gsap.killTweensOf(textElements);
    };
  }, []);

  return (
    <div ref={rootRef} className="logos_banner relative flex w-full overflow-hidden whitespace-nowrap border-y border-neutral-white">
      <div ref={topRef} className="logos_banner-component relative flex gap-[0.7rem] py-[0.333333rem]">
        <BannerLayout text={text} number={number} />
      </div>
      <div ref={bottomRef} className="logos_banner-component is-bottom relative flex justify-end gap-[0.7rem] py-[0.333333rem]">
        <BannerLayout text={text} number={number} />
      </div>
    </div>
  );
}
