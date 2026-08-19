"use client";

import { useRef } from "react";
import { useCtaChat } from "@/lib/useCtaChat";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import { cta } from "@/data/home";
import { workCta } from "@/data/work";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";
import AutoVideo from "../media/AutoVideo";
import { Button, ChatWidget } from "../shared";

/**
 * Work page variant of the CTA section: same video + mock chat widget and
 * animation wiring as `CtaSection`, but with the primary background color
 * and work-page-specific heading/button copy.
 */
export default function WorkCtaSection() {
  const ref = useRef<HTMLElement>(null);

  useCtaChat(ref);
  useSectionHeadings(ref);

  return (
    <section className="background-color-primary relative z-2" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div>
            <div
              header-animation-type="container"
              className="grid grid-cols-1 justify-between border-b border-r border-white-20"
            >
              <div className="flex flex-col items-start justify-start pb-6 pl-4 pt-28 max-[991px]:pt-20 max-[767px]:pt-12">
                <h2
                  id="cta-h1"
                  header-animation-type="heading-1"
                  className="heading-style-h2"
                >
                  {workCta.line1}{" "}
                  <span className="header_italic-word">
                    {workCta.italicWord}
                  </span>
                </h2>
              </div>
              <LogosElement caption={workCta.caption} />
            </div>
            <div className="relative grid grid-cols-[1.3fr_1fr] items-stretch justify-center max-[991px]:grid-cols-[1.3fr]">
              <div className="border-x border-white-20 p-20 max-[991px]:p-12 max-[767px]:p-8">
                <div className="relative z-2 flex aspect-[1.27] w-full items-end justify-center">
                  <div className="absolute bottom-4 right-4 z-2 flex items-center justify-center max-[991px]:bottom-auto max-[991px]:left-4 max-[991px]:right-auto max-[991px]:top-4">
                    <Button href="/contact" dataAudio={audio.hover}>
                      {workCta.buttonLabel}
                    </Button>
                  </div>
                  <div className="pointer-events-none absolute inset-0 z-3 flex h-full w-full flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 545 428"
                      fill="none"
                    >
                      <path
                        d="M1.33337 387.935V0.5H536.397V26.4229V26.7299L536.671 26.8688L543.833 30.5046V427.3H55.3455L1.33337 387.935Z"
                        stroke="white"
                      />
                    </svg>
                  </div>
                  <div className="relative flex h-full w-full items-center justify-center [clip-path:polygon(98.5%_0,98.5%_6%,100%_7%,100%_100%,10%_100%,0_90%,0_0)]">
                    {/* Neutral loop + the two option-specific loops; which is
                        visible is driven by useCtaChat. */}
                    <div
                      data-parallax-type="video"
                      className="cta_loop-video is-1 absolute inset-auto z-1 block aspect-square h-[110%] w-[110%] flex-none bg-neutral-dark-grey object-cover max-[767px]:h-[120%] max-[767px]:w-[120%]"
                    >
                      <AutoVideo src={cta.videoLoop} />
                    </div>
                    <div
                      data-parallax-type="video"
                      className="cta_loop-video is-2 absolute inset-auto z-2 hidden aspect-square h-[110%] w-[110%] flex-none bg-neutral-dark-grey object-cover max-[767px]:h-[120%] max-[767px]:w-[120%]"
                    >
                      <video
                        muted
                        loop
                        playsInline
                        autoPlay
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      >
                        <source src={cta.videoClientCall} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div
                      data-parallax-type="video"
                      className="cta_loop-video is-3 absolute inset-auto z-3 hidden aspect-square h-[110%] w-[110%] flex-none bg-neutral-dark-grey object-cover max-[767px]:h-[120%] max-[767px]:w-[120%]"
                    >
                      <video
                        muted
                        loop
                        playsInline
                        autoPlay
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      >
                        <source src={cta.videoFun} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className="absolute bottom-[4.2rem] left-[-2.7rem] transform-[rotate(-90deg)] max-[767px]:left-[-2.2rem]">
                    <div className="text-caption-2 text-color-teritary">
                      {cta.videoCaption}
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-center px-4 py-24 max-[991px]:relative max-[991px]:z-4 max-[991px]:justify-end max-[991px]:items-start max-[991px]:border-x max-[991px]:border-white-20 max-[991px]:pb-12 max-[991px]:pt-0 max-[479px]:justify-center max-[479px]:items-start">
                <ChatWidget className="flex w-full max-w-93 flex-col gap-4 overflow-hidden rounded-lg border border-white-20 p-4 backdrop-blur-[100px] bg-[#efefe60d] max-[991px]:mt-[-5.6rem] max-[991px]:mr-[3.6rem] max-[767px]:mt-[-3.1rem] max-[767px]:mr-0 max-[479px]:mt-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
