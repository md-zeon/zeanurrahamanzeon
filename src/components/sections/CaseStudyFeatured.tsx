"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLabSlider } from "@/lib/useLabSlider";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import { workProjects } from "@/data/work";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";

export default function CaseStudyFeatured() {
  const ref = useRef<HTMLElement>(null);

  useLabSlider(ref);
  useSectionHeadings(ref);

  return (
    <section
      id="home-services"
      data-parallax-type="section"
      className="relative z-2 overflow-hidden background-color-primary"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="flex flex-col">
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-rows-[auto] grid-cols-[1.5fr_1fr] justify-between gap-0 border-b border-l border-neutral-black pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="pt-[7rem] pb-6 pr-6 max-[767px]:pt-20">
                <div className="flex justify-start">
                  <h2
                    id="why-h1"
                    header-animation-type="heading-1"
                    className="heading-style-h2"
                  >
                    <span className="header_italic-word">Featured</span> client
                    projects
                  </h2>
                </div>
              </div>
              <LogosElement caption="WRK_CS_267" />
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
                  <Link
                    href="/work"
                    data-audio={audio.hover}
                    className="btn btn-secondary"
                  >
                    <div className="btn__text">Visit work page</div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              data-slider="list"
              className="relative flex border-x border-border-tertiary"
            >
              {workProjects.map((project) => (
                <div
                  key={project.index}
                  data-slider="slide"
                  className="relative z-1 flex w-1/2 flex-none flex-col gap-4 border-y border-white-20 px-4 py-8 max-[767px]:w-full max-[767px]:py-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="pl-[0.44rem]">
                      <div className="text-caption-2 text-color-secondary">
                        {project.index}
                      </div>
                    </div>
                    <Link
                      aria-label={project.ariaLabel}
                      data-audio={audio.hover}
                      href={project.href}
                      className="relative w-inline-block"
                    >
                      <div className="relative z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                        <div className="aspect-video h-[110%] w-[110%] flex-none max-[991px]:h-[120%] max-[991px]:w-[120%]">
                          <AutoVideo
                            src={project.video}
                            poster={project.poster}
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="absolute inset-0 z-2 flex items-end justify-start p-4">
                      <h3 className="heading-style-h4">{project.title}</h3>
                      <Link
                        data-audio={audio.hover}
                        href={project.href}
                        className="btn btn-small"
                      >
                        <div className="btn__text">View case study</div>
                      </Link>
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
