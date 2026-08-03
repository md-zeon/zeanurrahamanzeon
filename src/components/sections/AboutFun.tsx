"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import { aboutFacts } from "@/data/about";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

function LogoLines({ isCard = false }: { isCard?: boolean }) {
  const cls = (extra: string) =>
    `h-3 w-[0.094rem] rotate-[15deg] max-[767px]:h-2 ${isCard ? "bg-neutral-mid-grey" : "bg-brand-white"} ${extra}`.trim();
  const lines: string[] = [];
  for (let i = 0; i < 13; i++) lines.push(cls("hide-tablet"));
  for (let i = 0; i < 8; i++) lines.push(cls("hide-mobile-landscape"));
  for (let i = 0; i < 6; i++) lines.push(cls(""));
  return (
    <div className="flex gap-[0.3rem] overflow-hidden max-[767px]:gap-[0.2rem]">
      {lines.map((c, i) => (
        <div key={i} className={c} />
      ))}
    </div>
  );
}

function VideoBorder() {
  return (
    <div className="about-fun_video-border w-embed" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 545 428"
        fill="none"
      >
        <path
          d="M1.33337 387.935V0.5H536.397V26.4229V26.7299L536.671 26.8688L543.833 30.5046V427.3H55.3455L1.33337 387.935Z"
          stroke="white"
        />
      </svg>
    </div>
  );
}

function LinkIcon() {
  return (
    <div className="btn__icon btn__icon--lg w-embed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 21 17"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        <path
          d="M5.49658 13.2106L14.6647 4.04248M14.6647 4.04248V12.2538M14.6647 4.04248L6.62603 4.04248"
          stroke="currentColor"
        />
        <path
          d="M0 16.682V0.318359H3.27273V1.28995H1.08665V15.7104H3.27273V16.682H0Z"
          fill="currentColor"
        />
        <path
          d="M20.9048 0.318359V16.682H17.6321V15.7104H19.8182V1.28995H17.6321V0.318359H20.9048Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function AboutFun() {
  return (
    <section data-parallax-type="section" className="section_about-fun">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="about-fun_component">
            <div className="about-fun_layout">
              <div className="about-fun_header">
                <div className="about-fun_header-top">
                  <h2 className="heading-style-h0">FUN</h2>
                </div>
                <div className="about-fun_header-bottom">
                  <div className="heading-style-h0">Facts</div>
                  <div className="about-fun_element-component">
                    <div className="about-fun_line" />
                    <div className="about-fun_element-wrapper">
                      <LogoLines />
                      <div className="text-caption-2">{aboutFacts.caption}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Swiper
                className="about-card"
                modules={[EffectCards, Pagination]}
                effect="cards"
                grabCursor
                pagination={{ clickable: true }}
              >
                {aboutFacts.slides.map((slide, i) => (
                  <SwiperSlide key={i}>
                    <div className="about-fun_card">
                      <div className="about-fun_card-header">
                        <div className="text-caption-1 text-color-teritary">
                          {slide.caption}
                        </div>
                        <h3 className="heading-style-h1 is-card">
                          {slide.title}
                        </h3>
                      </div>
                      <div className="about-fun_element-component">
                        <div className="about-fun_line" />
                        <div className="about-fun_element-wrapper is-card">
                          <LogoLines isCard />
                          <div className="text-caption-2 text-color-teritary">
                            {slide.elementCaption}
                          </div>
                        </div>
                      </div>
                      <div className="about-fun_video-wrapper">
                        <VideoBorder />
                        <div className="about-fun_loop-asset-w">
                          {slide.video ? (
                            <div className="about-fun_loop-video w-embed">
                              <AutoVideo src={slide.video} />
                            </div>
                          ) : (
                            <>
                              <div className="about-fun_overlay" />
                              {slide.imageClass === "is-plants" ? (
                                <img
                                  src={slide.image}
                                  alt={slide.caption}
                                  loading="lazy"
                                  className="about-fun_image is-plants"
                                />
                              ) : slide.imageClass === "is-photo" ? (
                                <img
                                  src={slide.image}
                                  alt={slide.caption}
                                  loading="lazy"
                                  className="about-fun_image is-photo"
                                />
                              ) : (
                                <img
                                  src={slide.image}
                                  alt={slide.caption}
                                  loading="lazy"
                                  className="about-fun_image"
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div className="about-fun_video-misc">
                          <div className="text-caption-2 text-color-teritary">
                            {slide.videoCaption ?? slide.misc}
                          </div>
                        </div>
                        {slide.ctaLabel ? (
                          <div className="about-fun_video-cta">
                            <a
                              data-audio={audio.secondaryHover}
                              href={slide.ctaHref}
                              target="_blank"
                              className="btn btn-ghost btn-icon"
                            >
                              <div className="btn__text">{slide.ctaLabel}</div>
                              <LinkIcon />
                            </a>
                          </div>
                        ) : null}
                      </div>
                      <div className="text-size-regular">{slide.text}</div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
