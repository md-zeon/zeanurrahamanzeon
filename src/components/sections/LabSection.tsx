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
    <div className="btn__icon w-embed">
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
          d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

export default function LabSection() {
  const ref = useRef<HTMLElement>(null);

  useLabSlider(ref);
  useSectionHeadings(ref);

  return (
    <section
      id="lab"
      data-parallax-type="ssection"
      className="relative z-2 overflow-hidden"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="flex flex-col">
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-cols-[1fr_1fr] justify-between gap-0 border-b border-l border-white-20 pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="pt-[7rem] pb-6 pr-6 max-[767px]:pt-20">
                <div className="flex justify-start">
                  <div
                    header-animation-type="heading-1"
                    className="heading-style-h0"
                  >
                    From
                  </div>
                </div>
                <div className="flex items-stretch justify-start -mt-2 pl-[7.2vw] desktop:pl-24 max-[991px]:pl-[10vw] max-[767px]:mt-[-0.2rem] max-[767px]:pl-0">
                  <h2
                    header-animation-type="heading-2"
                    className="heading-style-h0"
                  >
                    the lab
                  </h2>
                </div>
              </div>
              <LogosElement caption="LAB_BF_188" />
            </div>
            <div className="border-x border-border-tertiary">
              <div className="relative grid auto-cols-fr grid-cols-[1fr_1fr] items-center justify-between gap-0 border-r border-white-20 p-[1.8rem_1.5rem] max-[767px]:flex max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 max-[767px]:p-4 max-[479px]:flex-row max-[479px]:flex-wrap">
                <div className="flex w-full items-center justify-between pr-6 max-[767px]:order-1 max-[767px]:pr-0">
                  <div className="flex items-center justify-start">
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
                  <div className="flex gap-2">
                    <a
                      data-audio={audio.hover}
                      data-slider="button-prev"
                      aria-label="previous slide"
                      href="#"
                      className="w-inline-block"
                    >
                      <div className="icon-embed-medium w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 48 49"
                          fill="none"
                          preserveAspectRatio="xMidYMid meet"
                          aria-hidden="true"
                          role="img"
                        >
                          <path
                            d="M38 24.7002H10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M24 38.7002L10 24.7002L24 10.7002"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </a>
                    <a
                      data-audio={audio.hover}
                      data-slider="button-next"
                      aria-label="next slide"
                      href="#"
                      className="w-inline-block"
                    >
                      <div className="icon-embed-medium w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 48 49"
                          fill="none"
                          preserveAspectRatio="xMidYMid meet"
                          aria-hidden="true"
                          role="img"
                        >
                          <path
                            d="M10 24.7002H38"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M24 10.7002L38 24.7002L24 38.7002"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="absolute left-1/2 z-3 -ml-px h-full w-px bg-white-20 max-[767px]:hidden" />
                <div className="flex items-center justify-end max-[767px]:w-full max-[767px]:flex-col max-[767px]:items-stretch">
                  <Button href="/experiments" variant="secondary">
                    Visit experiments page
                  </Button>
                </div>
              </div>
            </div>
            <div
              data-slider="list"
              className="relative flex border-x border-border-tertiary"
            >
              {labSlides.map((slide) => (
                <div
                  key={slide.caption}
                  data-slider="slide"
                  className="relative z-1 flex w-1/2 flex-none flex-col gap-4 border-y border-white-20 px-4 py-8 max-[767px]:w-full max-[767px]:py-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="pl-[0.44rem]">
                      <div className="text-caption-2 text-color-teritary">
                        {slide.caption}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="relative z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                        <div
                          data-parallax-type="video"
                          className="aspect-video h-[110%] w-[110%] flex-none max-[991px]:h-[120%] max-[991px]:w-[120%]"
                        >
                          <AutoVideo src={slide.video} />
                        </div>
                        <div className="absolute inset-0 z-2 h-full w-full bg-[linear-gradient(45deg,#000,#000_0%,#0000)] opacity-30" />
                      </div>
                      <div className="absolute inset-0 z-2 flex items-end justify-start p-4">
                        <a
                          data-audio={audio.hover}
                          href={slide.href}
                          target={
                            slide.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-small btn-icon"
                        >
                          <div className="btn__text">View clonable</div>
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                    <h3 className="heading-style-h5">{slide.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 right-full -left-full z-2 mr-px bg-[#0a090f80]" />
            <div className="absolute left-1/2 z-3 -ml-px h-full w-px bg-border-tertiary max-[767px]:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
