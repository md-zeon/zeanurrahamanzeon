"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      gsap.set([dot, ring], { display: "none" });
      return;
    }

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-hover], video");
      gsap.to(ring, { scale: interactive ? 2.2 : 1, duration: 0.3, ease: "power2.out" });
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.to([dot, ring], { opacity: 1, duration: 0.4, delay: 0.2 });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "#efefe6", zIndex: 10000, pointerEvents: "none", mixBlendMode: "difference" }} />
      <div ref={ringRef} className="cursor-big" style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", border: "1px solid #efefe6", zIndex: 10000, pointerEvents: "none", mixBlendMode: "difference" }} />
    </>
  );
}
