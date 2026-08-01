"use client";

import { useRef } from "react";
import { whyHeader, whyCards } from "@/data/home";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import Reveal from "../Reveal";

function ArrowIcon() {
  return (
    <div className="button-icon w-embed" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M0.823227 13.0732L12.8232 1.07323M12.8232 1.07323V10.9268M12.8232 1.07323H3.17677" stroke="currentColor" />
      </svg>
    </div>
  );
}

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section className="section_why" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="why_component">
            <div header-animation-type="container" className="why_header">
              <div className="why_header-wrapper">
                <div className="why_header-top">
                  <h2 id="why-h1" className="heading-style-h0">
                    {whyHeader.line1}
                  </h2>
                </div>
                <div className="why_header-bottom">
                  <div id="why-h2" className="heading-style-h0">
                    {whyHeader.line2}
                  </div>
                </div>
              </div>
              <LogosElement caption={whyHeader.caption} />
            </div>
            <Reveal>
              <div className="why_paragraph-wrapper">
                <h3 id="highlighted-text" className="heading-style-h3">
                  {whyHeader.highlight}
                </h3>
              </div>
            </Reveal>
            <div className="why_card-layout">
              {whyCards.map((card, i) => (
                <div key={card.caption} className="why_card-wrapper">
                  <div className="why_card-asset-wrapper">
                    <div className={`why_card-overlay ${i % 2 === 1 ? "is-right" : ""}`} />
                    <div data-parallax-type="video" className={`why_card-asset w-embed ${card.webgl ? "is-webgl" : ""}`}>
                      {card.webgl ? (
                        <AutoVideo src={card.video ?? "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4"} />
                      ) : (
                        <AutoVideo src={card.video ?? "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4"} />
                      )}
                    </div>
                  </div>
                  <div className={`why_card-content ${i % 2 === 1 ? "is-right" : ""}`}>
                    <a href={card.href} target="_blank" className="button is-secondary is-icon w-inline-block">
                      <div className="button-text">{card.buttonLabel}</div>
                      <ArrowIcon />
                    </a>
                    <div className="why_text-wrapper">
                      <div className="text-caption-2 text-color-teritary">{card.caption}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
