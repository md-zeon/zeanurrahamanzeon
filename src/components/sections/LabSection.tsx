"use client";

import { useRef } from "react";
import { useLabSlider } from "@/lib/useLabSlider";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import { labSlides } from "@/data/home";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { Button } from "../shared";

function ArrowIcon() {
  return (
    <div className="button-icon w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677" stroke="currentColor" />
      </svg>
    </div>
  );
}

export default function LabSection() {
  const ref = useRef<HTMLElement>(null);

  useLabSlider(ref);
  useSectionHeadings(ref);

  return (
    <section id="lab" data-parallax-type="ssection" className="section_lab" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="lab_component">
            <div header-animation-type="container" className="lab_header">
              <div className="lab_header-wrapper">
                <div className="lab_header-top">
                  <div header-animation-type="heading-1" className="heading-style-h0">
                    From
                  </div>
                </div>
                <div className="lab_header-bottom">
                  <h2 header-animation-type="heading-2" className="heading-style-h0">
                    the lab
                  </h2>
                </div>
              </div>
              <LogosElement caption="LAB_BF_188" />
            </div>
            <div className="lab_controls">
              <div className="lab_buttons-layout">
                <div className="lab_controls-wrapper">
                  <div className="lab_tabs-number">
                    <div className="text-size-large">[</div>
                    <div data-slide-count="step" className="text-size-large">
                      01
                    </div>
                    <div className="text-size-large">/</div>
                    <div data-slide-count="total" className="text-size-large">
                      00
                    </div>
                    <div className="text-size-large">]</div>
                  </div>
                  <div className="lab_buttons-wrapper">
                    <a
                      data-audio={audio.hover}
                      data-slider="button-prev"
                      aria-label="previous slide"
                      href="#"
                      className="lab_button w-inline-block"
                    >
                      <div className="icon-embed-medium w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 49" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                          <path d="M38 24.7002H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M24 38.7002L10 24.7002L24 10.7002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </a>
                    <a
                      data-audio={audio.hover}
                      data-slider="button-next"
                      aria-label="next slide"
                      href="#"
                      className="lab_button w-inline-block"
                    >
                      <div className="icon-embed-medium w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 49" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                          <path d="M10 24.7002H38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M24 10.7002L38 24.7002L24 38.7002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="lab_buttons-divider" />
                <div className="lab_button-wrapper">
                  <Button href="/experiments" variant="secondary">
                    Visit experiments page
                  </Button>
                </div>
              </div>
            </div>
            <div data-slider="list" className="lab_content">
              {labSlides.map((slide) => (
                <div key={slide.caption} data-slider="slide" className="lab_card-layout">
                  <div className="lab_card-wrapper">
                    <div className="lab_card-text-wrapper">
                      <div className="text-caption-2 text-color-teritary">{slide.caption}</div>
                    </div>
                    <div className="lab_card-content">
                      <div className="lab_card-asset-wrapper">
                        <div data-parallax-type="video" className="lab_card-asset">
                          <AutoVideo src={slide.video} />
                        </div>
                        <div className="lab_card-overlay" />
                      </div>
                      <div className="lab_card-cta-wrapper">
                        <a
                          data-audio={audio.hover}
                          href={slide.href}
                          target={slide.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="button is-secondary is-small is-icon w-inline-block"
                        >
                          <div className="button-text">View clonable</div>
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                    <h3 className="heading-style-h5">{slide.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="lab_overlay" />
            <div className="lab_content-divider" />
          </div>
        </div>
      </div>
    </section>
  );
}
