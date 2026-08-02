"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initSound, playSound } from "@/lib/sound";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cursor from "./Cursor";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initSound();

    const onAudioOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest?.("[data-audio]") as HTMLElement | null;
      if (el?.dataset.audio) playSound(el.dataset.audio, 0.4);
    };
    const onAudioClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest?.("[data-audio-click]") as HTMLElement | null;
      if (el?.dataset.audioClick) playSound(el.dataset.audioClick, 0.5);
    };

    document.addEventListener("pointerover", onAudioOver);
    document.addEventListener("click", onAudioClick);

    return () => {
      document.removeEventListener("pointerover", onAudioOver);
      document.removeEventListener("click", onAudioClick);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const wrapper = root.querySelector(".page-wrapper");
    if (wrapper) {
      gsap.fromTo(wrapper, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.15, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div ref={rootRef}>
      <div className="page-wrapper is-gsap-hidden">
        <div id="smooth-wrapper" className="smooth-wrapper">
          <div id="smooth-content" className="smooth-content">
            <Navbar />
            <main className="main-wrapper background-color-black">{children}</main>
            <Footer />
          </div>
        </div>
      </div>
      <Cursor />
    </div>
  );
}
