"use client";

import { useRef } from "react";
import { useCtaChat } from "@/lib/useCtaChat";
import { cta } from "@/data/home";
import { workCta } from "@/data/work";
import { audio, photos } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { Button } from "../shared";

export default function WorkCtaSection() {
  const ref = useRef<HTMLElement>(null);

  useCtaChat(ref);

  return (
    <section className="section_cta background-color-primary" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="cta_component">
            <div header-animation-type="container" className="cta_header">
              <div className="cta_header-wrapper">
                <h2 id="cta-h1" header-animation-type="heading-1" className="heading-style-h2">
                  {workCta.line1} <span className="header_italic-word">{workCta.italicWord}</span>
                </h2>
              </div>
              <LogosElement caption={workCta.caption} />
            </div>
            <div className="cta_wrapper">
              <div className="cta_video-layout">
                <div className="cta_video-wrapper">
                  <div className="cta_button-wrapper">
                    <Button href="/contact" dataAudio={audio.hover}>
                      {workCta.buttonLabel}
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
