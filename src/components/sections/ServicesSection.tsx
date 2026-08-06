"use client";

import { useRef } from "react";
import { services } from "@/data/home";
import { audio } from "@/data/site";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import LogosElement from "../LogosElement";

// Thumbnail videos cycled through the service cards, one per card (looping).
const SERVICE_ASSETS = [
  "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
  "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
  "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
];

/**
 * Services & Expertise section.
 *
 * Header heading is char-split/slid in via `useSectionHeadings`; each
 * service is a bordered card with an index, title, description, skill tags
 * and a looping background video on the right (desktop only).
 */
export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useSectionHeadings(ref);

  return (
    <section
      id="services"
      data-parallax-type="ssection"
      className="relative z-2"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="grid gap-20 max-[479px]:gap-12">
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-cols-[auto_auto] justify-between gap-0 border-b border-l border-white-20 pl-4 pt-12 max-[991px]:grid-cols-1 max-[991px]:place-items-start max-[479px]:pt-0"
            >
              <div className="pt-[7rem] pb-6 pr-6">
                <div className="flex justify-start">
                  <h2
                    header-animation-type="heading-1"
                    className="heading-style-h0"
                  >
                    SERVICES &
                  </h2>
                </div>
                <div className="flex items-stretch justify-start -mt-2 pl-[12.4vw] desktop:pl-24 max-[991px]:pl-[10.7vw] max-[767px]:mt-[-0.2rem] max-[767px]:pl-0">
                  <div
                    header-animation-type="heading-2"
                    className="heading-style-h0"
                  >
                    EXPERTISE
                  </div>
                </div>
              </div>
              <LogosElement caption="SER_EXP_019" />
            </div>
            <div className="relative z-2 flex flex-col items-stretch justify-start gap-6">
              {services.map((service, i) => (
                <div
                  key={service.index}
                  data-audio={audio.cardHover}
                  className="relative flex h-146.5 flex-col items-stretch justify-between overflow-hidden rounded-lg border border-white-20 bg-[#efefe60d] p-[2.5rem_2.5rem_2.5rem_2rem] backdrop-blur-[100px] transform-3d transition-all duration-200 ease-out max-[991px]:h-auto max-[991px]:gap-16 max-[991px]:px-0 max-[991px]:py-8 max-[767px]:gap-8"
                >
                  <div className="relative z-2 flex flex-col gap-2 max-[991px]:px-8 max-[767px]:px-6 max-[767px]:gap-y-[0.3rem]">
                    <div className="flex gap-2 overflow-hidden max-[991px]:flex-col max-[767px]:gap-1">
                      <div className="text-caption-2 text-color-secondary">
                        [{service.index}]
                      </div>
                      <div className="heading-style-h5">{service.title}</div>
                    </div>
                    <div className="flex max-w-125 flex-col items-start justify-start gap-6 pl-8 max-[991px]:max-w-none max-[991px]:pl-0">
                      <p className="text-size-regular text-color-secondary">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-2 flex max-w-197 flex-wrap gap-2 max-[991px]:max-w-none max-[991px]:px-8 max-[767px]:px-6">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="rounded bg-white-10 px-4 py-2 text-[1rem] backdrop-blur-[100px] max-[767px]:px-3 max-[767px]:py-1 max-[767px]:text-[0.9rem] max-[767px]:tracking-[-0.03rem] max-[479px]:text-[0.85rem] max-[479px]:tracking-[-0.025rem]"
                      >
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-y-0 right-0 z-1 flex w-[40%] items-center justify-center overflow-hidden max-[991px]:relative max-[991px]:inset-auto max-[991px]:bottom-0 max-[991px]:hidden max-[991px]:w-full">
                    <div
                      data-us-lazyload="true"
                      className="z-2 h-[110%] w-[110%] flex-none object-cover object-[0%_0%]"
                    >
                      <video
                        muted
                        loop
                        playsInline
                        autoPlay
                        data-autoplay-on-scroll
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      >
                        <source
                          src={SERVICE_ASSETS[i % SERVICE_ASSETS.length]}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
