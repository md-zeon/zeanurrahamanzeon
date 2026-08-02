"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";
import { aboutHeader } from "@/data/about";
import { audio } from "@/data/site";
import { Asterisk, WebflowLogo } from "../shared";
import AutoVideo from "../media/AutoVideo";

export default function AboutHeader() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(["#about-header-p", ".about-header_inner-border", ".about-header_border", ".home-header_badge-link", ".about-header_video-misc .text-caption-2"], { opacity: 0 });

      const header1 = new SplitText("#about-hero-header-1", { type: "chars" });
      const header2 = new SplitText("#about-hero-header-2", { type: "chars" });

      [header1, header2].forEach((header) => {
        header.chars.forEach((char) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("char-wrapper");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "inline-block";
          wrapper.style.position = "relative";
          wrapper.style.padding = "0.3vw";
          wrapper.style.margin = "-0.3vw";
          char.parentNode?.insertBefore(wrapper, char);
          wrapper.appendChild(char);
        });
        gsap.set(header.chars, { xPercent: -120, opacity: 0 });
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.add("headings");
      tl.to(header1.chars, { xPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 }, "headings");
      tl.to(header2.chars, { xPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 }, "headings+=0.04");

      tl.fromTo(
        ["#about-hero-asterisk", ".about-header_inner-border", ".about-header_border"],
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        "headings+=0.6"
      ).to("#about-hero-asterisk", { rotate: 90, duration: 0.3 }, "<");

      tl.fromTo(".about-header_badge-line-bg", { xPercent: -100 }, { xPercent: 0, duration: 0.3 }, "headings+=0.8");

      tl.to(".home-header_badge-link", { opacity: 1, duration: 0.1 }, "headings+=1.1");

      const paragraph = el.querySelector("#about-header-p");
      if (paragraph) {
        const splitText = new SplitText(paragraph, { type: "lines" });
        splitText.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("line-wrapper");
          wrapper.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        gsap.set(paragraph, { opacity: 1 });
        tl.to(
          ".about-header_cta-wrapper .line-wrapper",
          { yPercent: 100, opacity: 0, duration: 0.001 },
          "headings+=0.2"
        );
        tl.to(
          ".about-header_cta-wrapper .line-wrapper",
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          "headings+=1.2"
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header data-parallax-type="section" className="section_about-header" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="about-header_wrapper">
            <div className="padding-section-large max-width-full">
              <div className="about-header_component">
                <div className="w-layout-grid about-header_content">
                  <div className="about-header_content-up">
                    <div className="about-header_header-component">
                      <div className="about-header_header-layout">
                        <h1 id="about-hero-header-1" className="heading-style-h0">
                          {aboutHeader.title1}
                        </h1>
                        <div className="about-header_header-wrapper">
                          <div id="about-hero-header-2" className="heading-style-h0">
                            {aboutHeader.title2}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="about-header_content-down">
                    <div className="about-header_video-wrapper">
                      <div className="about-header_video-border w-embed" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 518 518" fill="none">
                          <path d="M0.5 487.823V0.5H513V31.9941V32.1989L513.144 32.3449L517.5 36.7696V517.5H31.6998L0.5 487.823Z" stroke="#EFEFE6" />
                        </svg>
                      </div>
                      <div className="about-header_video-w">
                        <div data-parallax-type="video" className="about-header_loop-video is-about-hero w-embed">
                          <AutoVideo src={aboutHeader.video} />
                        </div>
                      </div>
                      <div className="about-header_video-misc">
                        <div className="text-caption-2 text-color-teritary">{aboutHeader.videoCaption}</div>
                      </div>
                    </div>
                    <div className="about-header_cta-layout">
                      <div className="about-header_badge-component">
                        <div className="about-header_badge-icon-wrapper">
                          <div id="about-hero-asterisk" className="about-header_asterisk w-embed">
                            <Asterisk />
                          </div>
                        </div>
                        <div className="about-header_badge-line">
                          <div className="about-header_badge-line-bg" />
                        </div>
                        <a data-audio={audio.scramble} href="https://webflow.com/@bjorn-encutescu" target="_blank" className="home-header_badge-link w-inline-block">
                          <WebflowLogo />
                          <div className="text-size-small text-weight-medium text-style-allcaps">{aboutHeader.badge}</div>
                        </a>
                      </div>
                      <div className="about-header_cta-wrapper">
                        <div id="about-header-p" className="text-size-large">
                          {aboutHeader.paragraph}
                        </div>
                        <div className="button-group is-grid">
                          <a id="about-header-button-1" data-audio={audio.hover} href="/contact" className="button w-inline-block">
                            <div className="button-text">{aboutHeader.button1}</div>
                          </a>
                          <Link id="about-header-button-2" data-audio={audio.hover} href="/work" className="button is-secondary w-inline-block">
                            <div className="button-text">{aboutHeader.button2}</div>
                          </Link>
                        </div>
                      </div>
                      <div className="about-header_inner-border" />
                    </div>
                  </div>
                </div>
                <div className="about-header_border" />
                <div className="about-header_border is-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
