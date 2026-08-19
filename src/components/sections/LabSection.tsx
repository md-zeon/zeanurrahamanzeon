"use client";

import { useRef } from "react";
import { useLabSlider } from "@/lib/useLabSlider";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import { labSlides } from "@/data/home";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { ArrowIcon, Button, SliderControls } from "../shared";

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
            <SliderControls
              right={
                <Button href="/experiments" variant="secondary">
                  Visit experiments page
                </Button>
              }
            />
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
                          <div className="btn__text">View project</div>
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
