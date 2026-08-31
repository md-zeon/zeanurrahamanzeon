"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLabSlider } from "@/lib/useLabSlider";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import { workProjects, workFeaturedHeader, workLabHeader } from "@/data/work";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { SliderControls } from "../shared";

/**
 * Home-page carousel of featured client projects ("Featured client
 * projects"). A 2-up slider driven by `useLabSlider` via the
 * `data-slider="list" / slide / button-prev / button-next` attributes, with a
 * step/total counter (the `[01/00]` readout) updated by the same hook.
 */
export default function CaseStudyFeatured() {
  const ref = useRef<HTMLElement>(null);

  useLabSlider(ref);
  useSectionHeadings(ref);

  return (
    <section
      id="case-study-featured"
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
              className="grid auto-cols-fr grid-rows-[auto] grid-cols-[1.5fr_1fr] justify-between gap-0 border-b border-l border-neutral-black pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="pt-[7rem] pb-6 pr-6 max-[767px]:pt-20">
                <div className="flex justify-start">
                  <h2
                    id="why-h1"
                    header-animation-type="heading-1"
                    className="heading-style-h2"
                  >
                    <span className="header_italic-word">{workFeaturedHeader.title1}</span>{" "}
                    {workFeaturedHeader.title2}
                  </h2>
                </div>
              </div>
              <LogosElement caption={workFeaturedHeader.caption} />
            </div>
            <SliderControls
              total={workProjects.length}
              right={
                <Link
                  href="/work"
                  data-audio={audio.hover}
                  className="btn btn-secondary"
                >
                  <div className="btn__text">{workFeaturedHeader.visitButtonLabel}</div>
                </Link>
              }
            />
            {/* Slide track: two project slides side-by-side per page */}
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
                    <div className="relative w-inline-block">
                      <div className="relative z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                        {/* Oversized media so the looped video covers the
                            frame completely on every breakpoint */}
                        <div className="aspect-video h-[110%] w-[110%] flex-none max-[991px]:h-[120%] max-[991px]:w-[120%]">
                          <AutoVideo
                            src={project.video}
                            poster={project.poster}
                            label={project.title}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Overlay: title + "View case study" action */}
                    <div className="absolute inset-0 z-2 flex items-end justify-start p-4">
                      <h3 className="heading-style-h4">{project.title}</h3>
                      {project.hasCaseStudy ? (
                        <Link
                          data-audio={audio.hover}
                          href={project.href}
                          className="btn btn-small"
                        >
                          <div className="btn__text">{workFeaturedHeader.viewCaseStudyLabel}</div>
                        </Link>
                      ) : (
                        <a
                          data-audio={audio.hover}
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-small"
                        >
                          <div className="btn__text">{workLabHeader.viewProjectLabel}</div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Full-width wash behind the strip + center hairline on desktop */}
            <div className="absolute inset-y-0 right-full -left-full z-2 mr-px bg-[#0a090f80]" />
            <div className="absolute left-1/2 z-3 -ml-px h-full w-px bg-border-tertiary max-[767px]:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
