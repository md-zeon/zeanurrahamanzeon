"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cta } from "@/data/home";
import { audio, photos } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { Button } from "../shared";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
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

      const scrambleRevealText = (
        target: HTMLElement | null,
        onComplete?: () => void
      ) => {
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
        gsap.set(
          [
            `.cta_chat-content.is-client.is-${which}`,
            ".cta_chat-divider.is-2",
          ],
          { display: "flex", autoAlpha: 1 }
        );

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
  }, []);

  return (
    <section id="cta" className="section_cta" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="cta_component">
            <div header-animation-type="container" className="cta_header">
              <div className="cta_header-wrapper">
                <div className="cta_header-top">
                  <h2 id="cta-h1" header-animation-type="heading-1" className="heading-style-h0 is-cta">
                    {cta.line1}
                  </h2>
                </div>
                <div className="cta_header-middle">
                  <div id="cta-h2" header-animation-type="heading-2" className="heading-style-h0 is-cta">
                    {cta.line2}
                  </div>
                </div>
                <div className="cta_header-bottom">
                  <div id="cta-h3" header-animation-type="heading-3" className="heading-style-h0 is-cta">
                    {cta.line3}
                  </div>
                </div>
              </div>
              <LogosElement caption={cta.caption} />
            </div>
            <div className="cta_wrapper">
              <div className="cta_video-layout">
                <div className="cta_video-wrapper">
                  <div className="cta_button-wrapper">
                    <Button href="/contact" dataAudio={audio.hover}>
                      Send a message
                    </Button>
                  </div>
                  <div className="cta_video-border w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 545 428" fill="none">
                      <path d="M1.33337 387.935V0.5H536.397V26.4229V26.7299L536.671 26.8688L543.833 30.5046V427.3H55.3455L1.33337 387.935Z" stroke="white" />
                    </svg>
                  </div>
                  <div className="cta_video-w">
                    <div data-parallax-type="video" className="cta_loop-video is-1">
                      <AutoVideo src={cta.videoLoop} />
                    </div>
                    <div data-parallax-type="video" className="cta_loop-video is-2">
                      <video
                        muted
                        loop
                        playsInline
                        autoPlay
                        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", objectFit: "cover" }}
                      >
                        <source src={cta.videoClientCall} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div data-parallax-type="video" className="cta_loop-video is-3">
                      <video
                        muted
                        loop
                        playsInline
                        autoPlay
                        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", objectFit: "cover" }}
                      >
                        <source src={cta.videoFun} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className="cta_video-misc">
                    <div className="text-caption-2 text-color-teritary">{cta.videoCaption}</div>
                  </div>
                </div>
                <div className="cta_content-wrapper">
                  <div className="cta_chat-component">
                    <div className="cta_chat-top">
                      <div className="cta_chat-buttons">
                        <div className="cta_chat-close" />
                        <div className="cta_chat-minimize" />
                        <div className="cta_chat-extend" />
                      </div>
                      <div className="cta_chat-divider" />
                    </div>
                    <div className="cta_chat-content">
                      <div className="cta_chat-photo-w">
                        <img src={photos.ellipseBlack} loading="lazy" alt="" className="cta_chat-photo" />
                      </div>
                      <div className="cta_chat-message">
                        <div className="cta_chat-name">{cta.chat.name}</div>
                        <div className="text-size-small">{cta.chat.firstMessage}</div>
                      </div>
                    </div>
                    <div className="cta_chat-divider is-1" />
                    <div className="cta_chat-content is-client is-1">
                      <div className="cta_chat-message is-client">
                        <div className="cta_chat-name-w">
                          <div id="cta-chat-partner-1" className="cta_chat-name">
                            USER_1230
                          </div>
                        </div>
                        <div id="cta-chat-p-1" className="text-size-small text-align-right">
                          {cta.chat.partnerMessages[0]}
                        </div>
                      </div>
                      <div id="cta-chat-partner-photo-1" className="cta_chat-photo-w is-client">
                        <div className="text-size-small">U</div>
                      </div>
                    </div>
                    <div className="cta_chat-content is-client is-2">
                      <div className="cta_chat-message is-client">
                        <div className="cta_chat-name-w">
                          <div id="cta-chat-partner-2" className="cta_chat-name">
                            USER_1230
                          </div>
                        </div>
                        <div id="cta-chat-p-2" className="text-size-small text-align-right">
                          {cta.chat.partnerMessages[1]}
                        </div>
                      </div>
                      <div id="cta-chat-partner-photo-2" className="cta_chat-photo-w is-client">
                        <div className="text-size-small">U</div>
                      </div>
                    </div>
                    <div className="cta_chat-divider is-2" />
                    <div className="cta_chat-content is-1">
                      <div id="cta-chat-me-photo-1" className="cta_chat-photo-w">
                        <img src={photos.ellipseBlack} loading="lazy" alt="" className="cta_chat-photo" />
                      </div>
                      <div className="cta_chat-message">
                        <div className="cta_chat-name-w">
                          <div id="cta-chat-me-1" className="cta_chat-name">
                            {cta.chat.name}
                          </div>
                        </div>
                        <div id="cta-chat-p-3" className="text-size-small">
                          {cta.chat.myMessages[0]}
                        </div>
                      </div>
                    </div>
                    <div className="cta_chat-content is-2">
                      <div id="cta-chat-me-photo-2" className="cta_chat-photo-w">
                        <img src={photos.ellipseBlack} loading="lazy" alt="" className="cta_chat-photo" />
                      </div>
                      <div className="cta_chat-message">
                        <div className="cta_chat-name-w">
                          <div id="cta-chat-me-2" className="cta_chat-name">
                            {cta.chat.name}
                          </div>
                        </div>
                        <div id="cta-chat-p-4" className="text-size-small">
                          {cta.chat.myMessages[1]}
                        </div>
                      </div>
                    </div>
                    <div className="cta_chat-cta">
                      <a
                        id="cta-chat-button-1"
                        data-audio={audio.hover}
                        href="#"
                        className="button is-secondary is-chat w-inline-block"
                      >
                        <div className="button-text">{cta.chat.buttons[0]}</div>
                      </a>
                      <a
                        id="cta-chat-button-2"
                        data-audio={audio.hover}
                        href="#"
                        className="button is-secondary is-chat w-inline-block"
                      >
                        <div className="button-text">{cta.chat.buttons[1]}</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
