"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";
import { aboutHeader } from "@/data/about";
import { audio } from "@/data/site";
import { Asterisk, CredentialIcon } from "../shared";
import AutoVideo from "../media/AutoVideo";

/**
 * About page hero.
 *
 * Plays a choreographed load-in: both headline lines slide in character by
 * character, the asterisk spins + fades in, the divider line grows, the
 * badge fades in, and the intro paragraph reveals line-by-line. Everything
 * runs once on mount (no scroll dependency).
 */
export default function AboutHeader() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hide all secondary elements until their timeline step plays.
      gsap.set(
        [
          "#about-header-p",
          "[data-about-fade]",
          ".badge-link",
          "[data-about-caption]",
        ],
        { opacity: 0 },
      );

      const header1 = new SplitText("#about-hero-header-1", { type: "chars" });
      const header2 = new SplitText("#about-hero-header-2", { type: "chars" });

      // Wrap each character in an overflow-hidden box (masks the slide-in);
      // the small padding/margin pair keeps descenders from clipping.
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
        // Characters start off-screen to the left.
        gsap.set(header.chars, { xPercent: -120, opacity: 0 });
      });

      // One timeline with labeled positions so every step's relative timing
      // is explicit ("headings+=0.6" = 0.6s after the headline finishes).
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.add("headings");
      tl.to(
        header1.chars,
        { xPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
        "headings",
      );
      tl.to(
        header2.chars,
        { xPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
        "headings+=0.04",
      );

      tl.fromTo(
        ["#about-hero-asterisk", "[data-about-fade]"],
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        "headings+=0.6",
      ).to("#about-hero-asterisk", { rotate: 90, duration: 0.3 }, "<");

      tl.fromTo(
        "[data-about-line]",
        { xPercent: -100 },
        { xPercent: 0, duration: 0.3 },
        "headings+=0.8",
      );

      tl.to(".badge-link", { opacity: 1, duration: 0.1 }, "headings+=1.1");

      const paragraph = el.querySelector("#about-header-p");
      if (paragraph) {
        // Split paragraph into masked lines, then reveal them in sequence.
        const splitText = new SplitText(paragraph, { type: "lines" });
        splitText.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("line-wrapper");
          wrapper.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        gsap.set(paragraph, { opacity: 1 });
        // Pre-hide the lines while the headline is still animating...
        tl.to(
          "[data-about-cta] .line-wrapper",
          { yPercent: 100, opacity: 0, duration: 0.001 },
          "headings+=0.2",
        );
        // ...then reveal them once the rest has settled.
        tl.to(
          "[data-about-cta] .line-wrapper",
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          "headings+=1.2",
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      data-parallax-type="section"
      className="relative z-2 overflow-hidden"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center">
            <div className="padding-section-large max-width-full">
              <div className="relative z-2 text-brand-white max-[991px]:pt-12">
                <div className="grid grid-cols-1 items-center gap-12 desktop:gap-6 max-[991px]:grid-flow-row max-[991px]:gap-8 max-[767px]:gap-6">
                  <div className="relative z-2 wide:pr-[6.29rem]">
                    <div>
                      <div className="pl-4 max-[767px]:pr-4">
                        <h1
                          id="about-hero-header-1"
                          className="heading-style-h0"
                        >
                          {aboutHeader.title1}
                        </h1>
                        <div className="flex -mt-2 items-end justify-start gap-4 pl-[5.5vw] desktop:pl-18 max-[767px]:pl-[7.6vw] max-[479px]:mt-[-0.3rem] max-[479px]:pl-0">
                          <div
                            id="about-hero-header-2"
                            className="heading-style-h0"
                          >
                            {aboutHeader.title2}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-1 flex w-full flex-col justify-between gap-x-[4vw] gap-y-[4vw] pl-13 pr-[4.2rem] desktop:grid desktop:grid-cols-2 desktop:gap-16 max-[991px]:gap-x-12 max-[991px]:gap-y-12 max-[991px]:pr-13 max-[767px]:gap-y-6 max-[479px]:pl-[1.3rem] max-[479px]:pr-[1.3rem]">
                    <div className="relative z-2 flex aspect-square h-full w-full max-w-full flex-none items-end justify-center overflow-visible desktop:max-w-xl max-[991px]:mr-auto max-[991px]:max-w-none">
                      <div
                        className="pointer-events-none absolute inset-0 z-3 flex h-full w-full flex-col items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 518 518"
                          fill="none"
                        >
                          <path
                            d="M0.5 487.823V0.5H513V31.9941V32.1989L513.144 32.3449L517.5 36.7696V517.5H31.6998L0.5 487.823Z"
                            stroke="#EFEFE6"
                          />
                        </svg>
                      </div>
                      <div className="flex h-full w-full items-center justify-center [clip-path:polygon(99%_0,99%_6%,100%_7%,100%_100%,6%_100%,0_94%,0_0)]">
                        <div
                          data-parallax-type="video"
                          className="z-2 flex-none bg-neutral-dark-grey object-cover h-[110%] w-[110%]"
                        >
                          <AutoVideo src={aboutHeader.video} />
                        </div>
                      </div>
                      <div
                        data-about-caption
                        className="absolute -rotate-90 bottom-[3.2rem] left-[-2.7rem] max-[991px]:bottom-[7.9vw] max-[991px]:-left-10 max-[767px]:bottom-[9.9vw] max-[767px]:left-[-2.1rem] max-[479px]:bottom-[10.2vw] max-[479px]:left-[-1.9rem]"
                      >
                        <div className="text-caption-2 text-color-teritary">
                          {aboutHeader.videoCaption}
                        </div>
                      </div>
                    </div>
                    <div className="relative flex flex-wrap items-start justify-start gap-6 desktop:pt-16 max-[991px]:pt-0">
                      <div className="relative z-3 flex w-full items-center justify-start gap-2">
                        <div className="bg-brand-black py-1 text-brand-white">
                          <div
                            id="about-hero-asterisk"
                            className="flex h-4 w-4 flex-col items-center justify-center"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="relative h-[0.06rem] w-full overflow-hidden">
                          <div
                            data-about-line
                            className="absolute inset-0 bg-brand-white"
                          />
                        </div>
                        <a
                          data-audio={audio.scramble}
                          href={aboutHeader.badgeLink}
                          target="_blank"
                          className="badge-link"
                        >
                          <CredentialIcon />
                          <div className="text-size-small text-weight-medium text-style-allcaps">
                            {aboutHeader.badge}
                          </div>
                        </a>
                      </div>
                      <div
                        data-about-cta
                        className="flex w-full max-w-148 flex-col gap-10 desktop:pl-16 max-[991px]:mt-0 max-[991px]:max-w-none max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6"
                      >
                        <div id="about-header-p" className="text-size-large">
                          {aboutHeader.paragraph}
                        </div>
                        <div className="btn-group btn-group--grid">
                          <a
                            id="about-header-button-1"
                            data-audio={audio.hover}
                            href="/contact"
                            className="btn"
                          >
                            <div className="btn__text">
                              {aboutHeader.button1}
                            </div>
                          </a>
                          <Link
                            id="about-header-button-2"
                            data-audio={audio.hover}
                            href="/work"
                            className="btn btn-secondary"
                          >
                            <div className="btn__text">
                              {aboutHeader.button2}
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        data-about-fade
                        className="absolute bottom-0 left-2 top-24 z-2 hidden h-[170%] w-px bg-white-20 desktop:block max-[991px]:hidden"
                      />
                    </div>
                  </div>
                </div>
                <div
                  data-about-fade
                  className="absolute inset-y-0 left-0 z-2 h-full w-px bg-white-20"
                />
                <div
                  data-about-fade
                  className="absolute inset-y-0 right-0 z-2 h-full w-px bg-white-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
