"use client";

import { useRef } from "react";
import { useLabSlider } from "@/lib/useLabSlider";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import { workLabSlides, workLabHeader } from "@/data/work";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { ArrowIcon, Button, SliderControls } from "../shared";

/**
 * "From the labs" slider on the work page — a 2-up carousel of side projects
 * driven by `useLabSlider` via the `data-slider="list" / slide /
 * button-prev / button-next` attributes, with a step/total counter. Each
 * slide links out to the live project with a looped video preview.
 */
export default function WorkLabSection() {
  const ref = useRef<HTMLElement>(null);

  useLabSlider(ref);
  useSectionHeadings(ref);

  return (
    <section
      id="home-services"
      className="relative z-2 overflow-hidden background-color-primary"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="flex flex-col">
            {/* Header row: heading (revealed via header-animation-type) +
                corner caption chip */}
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-cols-[1fr_1fr] justify-between gap-0 border-b border-l border-white-20 pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="pt-[7rem] pb-6 pr-6 max-[767px]:pt-20">
                <div className="flex justify-start">
                  <h2
                    header-animation-type="heading-1"
                    className="heading-style-h2"
                  >
                    {workLabHeader.title1}{" "}
                    <span className="header_italic-word">
                      {workLabHeader.italicWord}
                    </span>
                  </h2>
                </div>
              </div>
              <LogosElement caption={workLabHeader.caption} />
            </div>
            {/* Controls bar: counter + prev/next buttons + CTA */}
            <SliderControls
              right={
                <Button href="/experiments" variant="secondary">
                  {workLabHeader.visitButtonLabel}
                </Button>
              }
            />
              {/* Slide track: two side-project slides side-by-side per page */}
            <div
              data-slider="list"
              className="relative flex border-x border-border-tertiary"
            >
              {workLabSlides.map((slide) => (
                <div
                  key={slide.caption}
                  data-slider="slide"
                  className="relative z-1 flex w-1/2 flex-none flex-col gap-4 border-y border-white-20 px-4 py-8 max-[767px]:w-full max-[767px]:py-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="pl-[0.44rem]">
                      <div className="text-caption-2 text-color-secondary">
                        {slide.caption}
                      </div>
                    </div>
                    {/* Oversized media so the looped video covers the frame */}
                    <div className="relative w-inline-block">
                      <div className="relative z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                        <div className="aspect-video h-[110%] w-[110%] flex-none max-[991px]:h-[120%] max-[991px]:w-[120%]">
                          <AutoVideo src={slide.video} />
                        </div>
                      </div>
                    </div>
                    {/* Overlay: title + "View project" action */}
                    <div className="absolute inset-0 z-2 flex items-end justify-start p-4">
                      <h3 className="heading-style-h4">{slide.title}</h3>
                      <a
                        data-audio={audio.hover}
                        href={slide.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-small btn-icon"
                      >
                        <div className="btn__text">{workLabHeader.viewProjectLabel}</div>
                        <ArrowIcon />
                      </a>
                    </div>
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
