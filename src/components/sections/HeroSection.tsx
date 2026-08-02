"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { brand, socials } from "@/data/site";
import { Button, WebflowBadge, Asterisk } from "../shared";
import AutoVideo from "../media/AutoVideo";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".home-header_header-wrapper",
          ".home-header_video-wrapper",
          ".home-header_cta-wrapper",
        ],
        { autoAlpha: 0, y: 40 },
      );

      const name = new SplitText("#home-hero-name", { type: "chars" });
      const split1 = new SplitText("#home-hero-header-1", { type: "chars" });
      const split2 = new SplitText("#home-hero-header-2", { type: "chars" });

      gsap.from(name.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(split1.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.45,
      });
      gsap.from(split2.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.55,
      });

      gsap.to(
        ".home-header_header-wrapper, .home-header_video-wrapper, .home-header_cta-wrapper",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.9,
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      data-projects-section="first"
      data-parallax-type="section"
      className="section_home-header"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="home-header_wrapper">
            <div className="padding-section-large max-width-full">
              <div className="home-header_component">
                <div className="w-layout-grid home-header_content">
                  <div className="home-header_content-up">
                    <div className="home-header_header-component">
                      <div className="home-header_header-layout">
                        <div className="home-header_header-wrapper is-first">
                          <div className="home-header_p-wrapper">
                            <div className="home-header_p">
                              <p
                                id="home-hero-name"
                                className="text-size-medium"
                              >
                                {brand.heroName}
                              </p>
                            </div>
                          </div>
                          <h1
                            id="home-hero-header-1"
                            className="heading-style-h0"
                          >
                            {brand.heroLine1}
                          </h1>
                        </div>
                        <div className="home-header_header-wrapper is-middle">
                          <div
                            id="home-hero-header-2"
                            className="heading-style-h0"
                          >
                            {brand.heroLine2}
                          </div>
                        </div>
                        <div className="home-header_header-wrapper is-last">
                          <div
                            id="home-hero-header-2"
                            className="heading-style-h0"
                          >
                            {brand.heroLine3}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home-header_content-down">
                    <div className="home-header_video-wrapper">
                      <div
                        className="home-header_video-border w-embed"
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
                      <div className="home-header_video-w">
                        <div
                          data-parallax-type="video"
                          className="home-header_loop-video is-home-hero w-embed"
                        >
                          <AutoVideo src={brand.heroVideo} />
                        </div>
                      </div>
                      <div className="home-header_video-misc">
                        <div className="text-caption-2 text-color-teritary">
                          {brand.heroVideoCaption}
                        </div>
                      </div>
                    </div>
                    <div className="home-header_cta-layout">
                      <div className="home-header_badge-component">
                        <div className="home-header_badge-icon-wrapper">
                          <div
                            id="home-hero-asterisk"
                            className="home-header_asterisk w-embed"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <div className="home-header_badge-line">
                              <div className="home-header_badge-line-bg" />
                            </div>
                            <WebflowBadge href={socials.webflowPartner} />
                          </div>
                          <div className="home-header_cta-wrapper">
                            <div id="home-header-p" className="text-size-large">
                              {brand.heroIntro}
                            </div>
                            <div className="button-group is-grid">
                              <Button href="/contact">Get in touch</Button>
                              <Button href="/work" variant="secondary">
                                See work
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="home-header_inner-border" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-header_border" />
                <div className="home-header_border is-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
