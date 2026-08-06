"use client";

import { useRef } from "react";
import { whyHeader, whyCards } from "@/data/home";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { useScrubbedHighlight } from "@/lib/useHeaderReveal";

/**
 * "Why me?" section: two-line heading, a highlighted statement, and a grid
 * of video cards linking out to experiments. The heading uses the shared
 * `useSectionHeadings`/`LogosElement` reveal utilities, the statement's words
 * brighten progressively as they scroll into view, and each card's video is
 * auto-played by `AutoVideo`.
 */

/** Diagonal arrow icon used inside the card buttons. */
function ArrowIcon() {
  return (
    <div className="btn__icon" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 14 14"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        <path
          d="M0.823227 13.0732L12.8232 1.07323M12.8232 1.07323V10.9268M12.8232 1.07323H3.17677"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);

  // The statement brightens word-by-word as it scrolls through the viewport.
  useScrubbedHighlight(ref);

  return (
    <section className="relative z-2" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="flex flex-col">
            {/* Header row: heading + LogosElement; `header-animation-type`
                attributes are consumed by useSectionHeadings. */}
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-cols-[1fr_0.7fr] justify-between gap-0 border-b border-r border-b-border-tertiary border-r-white-20 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="border-r border-white-20 p-[7rem_1.5rem_1.5rem_1rem] max-[991px]:border-r-0 max-[991px]:pt-20">
                <div className="flex justify-start">
                  <h2 id="why-h1" className="heading-style-h0">
                    {whyHeader.line1}
                  </h2>
                </div>
                <div className="flex items-stretch justify-start -mt-2 pl-[7.3vw] desktop:pl-24 max-[991px]:pl-[10.7vw] max-[767px]:mt-[-0.2rem]">
                  <div id="why-h2" className="heading-style-h0">
                    {whyHeader.line2}
                  </div>
                </div>
              </div>
              <LogosElement caption={whyHeader.caption} />
            </div>
            <div className="border-b border-l border-r border-white-20 px-[7.3vw] py-20 desktop:px-24 max-[991px]:py-12 max-[767px]:px-6 max-[767px]:py-8">
              <h3 id="highlighted-text" className="heading-style-h3">
                {whyHeader.highlight}
              </h3>
            </div>
            {/* Video cards: gradient overlay, background video, and a button
                positioned on alternating corners. */}
            <div className="grid grid-cols-2 flex-none flex-wrap gap-10 border-l border-white-20 pl-8 pt-8 max-[991px]:grid-cols-1 max-[767px]:gap-6 max-[767px]:pl-6 max-[767px]:pt-6">
              {whyCards.map((card, i) => (
                <div
                  key={card.caption}
                  className="relative aspect-video h-full w-full max-h-88 max-[991px]:max-h-240"
                >
                  <div className="relative z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-white-20 max-[479px]:rounded">
                    {/* Diagonal gradient overlay; direction alternates per card. */}
                    <div
                      className={`absolute inset-0 z-2 h-full w-full opacity-30 ${i % 2 === 1 ? "bg-[linear-gradient(-45deg,#000,#000_0%,#0000)]" : "bg-[linear-gradient(45deg,#000,#000_0%,#0000)]"}`}
                    />
                    <div
                      data-parallax-type="video"
                      className="relative z-1 h-[110%] w-[110%] flex-none object-cover max-[767px]:h-[120%] max-[767px]:w-[120%]"
                    >
                      <AutoVideo
                        src={
                          card.video ??
                          "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4"
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 z-2 flex items-end p-4 ${i % 2 === 1 ? "justify-end" : "justify-start"}`}
                  >
                    <a
                      href={card.href}
                      target="_blank"
                      className="btn btn-secondary btn-icon"
                    >
                      <div className="btn__text">{card.buttonLabel}</div>
                      <ArrowIcon />
                    </a>
                    {/* Vertical caption label on the card's side edge. */}
                    <div className="absolute bottom-[2.2rem] left-[-2.3rem] transform-[rotate(-90deg)_translateY(-50%)] max-[767px]:bottom-[1.8rem] max-[767px]:left-[-1.8rem] max-[479px]:-left-8">
                      <div className="text-caption-2 text-color-teritary">
                        {card.caption}
                      </div>
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
