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
    <section id="home-services" data-parallax-type="section" className="section_lab background-color-primary" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="lab_component">
            <div header-animation-type="container" className="grid auto-cols-fr grid-rows-[auto] grid-cols-[1.5fr_1fr] justify-between gap-0 border-b border-l border-neutral-black pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start">
              <div className="lab_header-wrapper">
                <div className="flex justify-start">
                  <h2 id="why-h1" header-animation-type="heading-1" className="heading-style-h2">
                    <span className="header_italic-word">Featured</span> client projects
                  </h2>
                </div>
              </div>
              <LogosElement caption="WRK_CS_267" />
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
                  <Link href="/work" data-audio={audio.hover} className="btn btn-secondary">
                    <div className="btn__text">Visit work page</div>
                  </Link>
                </div>
              </div>
            </div>
            <div data-slider="list" className="lab_content">
              {workProjects.map((project) => (
                <div key={project.index} data-slider="slide" className="lab_card-layout">
                  <div className="lab_card-wrapper">
                    <div className="lab_card-text-wrapper">
                      <div className="text-caption-2 text-color-secondary">{project.index}</div>
                    </div>
                    <Link
                      aria-label={project.ariaLabel}
                      data-audio={audio.hover}
                      href={project.href}
                      className="lab_card-content w-inline-block"
                    >
                      <div className="lab_card-asset-wrapper">
                        <div className="lab_card-asset">
                          <AutoVideo src={project.video} poster={project.poster} />
                        </div>
                      </div>
                    </Link>
                    <div className="lab_card-cta-wrapper">
                      <h3 className="heading-style-h4">{project.title}</h3>
                      <Link data-audio={audio.hover} href={project.href} className="btn btn-small">
                        <div className="btn__text">View case study</div>
                      </Link>
                    </div>
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
