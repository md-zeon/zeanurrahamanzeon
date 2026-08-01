"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useCtaChat(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const video2 = el.querySelector<HTMLVideoElement>(".cta_loop-video.is-2 video");
      const video3 = el.querySelector<HTMLVideoElement>(".cta_loop-video.is-3 video");

      gsap.set(
        [
          ".cta_chat-content.is-1",
          ".cta_chat-content.is-2",
          ".cta_chat-content.is-client.is-1",
          ".cta_chat-content.is-client.is-2",
          ".cta_chat-divider.is-2",
        ],
        { display: "none", autoAlpha: 0 }
      );

      const scrambleRevealText = (target: HTMLElement | null, onComplete?: () => void) => {
        if (!target) return;
        const finalText = target.textContent?.trim() ?? "";
        const scrambleChars = "1010101100";
        let currentIndex = 0;

        const getRandomChars = (length: number) => {
          let result = "";
          for (let i = 0; i < length; i++) {
            result += scrambleChars.charAt(Math.floor(Math.random() * scrambleChars.length));
          }
          return result;
        };

        target.textContent = "";
        const interval = setInterval(() => {
          if (currentIndex <= finalText.length) {
            const visible = finalText.slice(0, currentIndex);
            target.textContent = visible + getRandomChars(10);
            currentIndex++;
          } else {
            clearInterval(interval);
            target.textContent = finalText;
            if (onComplete) setTimeout(onComplete, 1000);
          }
        }, 15);
      };

      const revealClient = (which: 1 | 2, onDone?: () => void) => {
        gsap.set([`.cta_chat-content.is-client.is-${which}`, ".cta_chat-divider.is-2"], {
          display: "flex",
          autoAlpha: 1,
        });

        gsap.from(`#cta-chat-partner-${which}`, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
        });

        scrambleRevealText(el.querySelector(`#cta-chat-p-${which}`), onDone);

        gsap.from(`#cta-chat-partner-photo-${which}`, {
          opacity: 0,
          duration: 0.6,
          ease: "expo.out",
        });
      };

      const revealMe = (which: 1 | 2) => {
        gsap.set([`.cta_chat-content.is-${which}`], { display: "flex", autoAlpha: 1 });

        gsap.from(`#cta-chat-me-${which}`, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
        });

        scrambleRevealText(el.querySelector(`#cta-chat-p-${which + 2}`));

        gsap.from(`#cta-chat-me-photo-${which}`, {
          opacity: 0,
          duration: 0.6,
          ease: "expo.out",
        });
      };

      const onClick = (which: 1 | 2) => {
        const active = which === 1 ? video2 : video3;
        const inactive = which === 1 ? video3 : video2;
        if (active) {
          active.pause();
          active.currentTime = 0;
          active.play().catch(() => undefined);
        }
        if (inactive) inactive.pause();

        gsap.set(".cta_loop-video.is-1", { display: "none" });
        gsap.set(`.cta_loop-video.is-${which}`, { display: "block" });

        revealClient(which, () => revealMe(which));
        gsap.set(".cta_chat-cta", { display: "none" });
      };

      const button1 = el.querySelector("#cta-chat-button-1");
      const button2 = el.querySelector("#cta-chat-button-2");
      const onButton1 = (event: Event) => {
        event.preventDefault();
        onClick(1);
      };
      const onButton2 = (event: Event) => {
        event.preventDefault();
        onClick(2);
      };
      button1?.addEventListener("click", onButton1);
      button2?.addEventListener("click", onButton2);

      return () => {
        button1?.removeEventListener("click", onButton1);
        button2?.removeEventListener("click", onButton2);
      };
    }, el);

    return () => ctx.revert();
  }, [container]);
}
