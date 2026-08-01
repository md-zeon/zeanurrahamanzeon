"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { logosBannerText } from "@/data/home";

function BannerLayout({ text, number }: { text: string; number?: string }) {
  return (
    <div className="logos_banner-layout">
      <div className="logos_banner-wrapper">
        {Array.from({ length: 27 }).map((_, i) => (
          <div key={i} className="logos_banner-line" />
        ))}
      </div>
      <div className="logos_banner-text">{text}</div>
      <div className="logos_banner-wrapper">
        {Array.from({ length: 27 }).map((_, i) => (
          <div key={i} className="logos_banner-line" />
        ))}
      </div>
      {number ? <div className="logos_banner-text is-number">{number}</div> : null}
    </div>
  );
}

export default function LogosBanner({ text = logosBannerText, number }: { text?: string; number?: string }) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="logos_banner">
      <div ref={topRef} className="logos_banner-component is-top">
        <BannerLayout text={text} number={number} />
      </div>
      <div ref={bottomRef} className="logos_banner-component is-bottom">
        <BannerLayout text={text} number={number} />
      </div>
    </div>
  );
}
