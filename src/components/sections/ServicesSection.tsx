"use client";

import { useRef } from "react";
import { services } from "@/data/home";
import LogosElement from "../LogosElement";

const SERVICE_ASSETS = [
  "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
  "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
  "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="services" data-parallax-type="ssection" className="section_home-services" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="home-services_component">
            <div header-animation-type="container" className="home-services_header">
              <div className="home-services_header-wrapper">
                <div className="home-services_header-top">
                  <h2 header-animation-type="heading-1" className="heading-style-h0">
                    SERVICES &amp;
                  </h2>
                </div>
                <div className="home-services_header-bottom">
                  <div header-animation-type="heading-2" className="heading-style-h0">
                    EXPERTISE
                  </div>
                </div>
              </div>
              <LogosElement caption="SER_EXP_019" />
            </div>
            <div className="home-services_layout">
              {services.map((service, i) => (
                <div key={service.index} data-audio="https://bjornflow-assets.b-cdn.net/Audio/Card%20Hover.wav" className="home-services_card">
                  <div className="home-services_card-top">
                    <div className="home-services_card-header">
                      <div className="text-caption-2 text-color-secondary">[{service.index}]</div>
                      <div className="heading-style-h5">{service.title}</div>
                    </div>
                    <div className="home-services_card-p">
                      <p className="text-size-regular text-color-secondary">{service.description}</p>
                    </div>
                  </div>
                  <div className="home-services_grid-list">
                    {service.items.map((item) => (
                      <div key={item} className="home-services_item">
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>
                  <div className="home-services_card-asset-wrapper">
                    <div data-us-lazyload="true" data-us-project={service.usProject} className="home-services_card-asset">
                      <video
                        muted
                        loop
                        playsInline
                        autoPlay
                        data-autoplay-on-scroll
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      >
                        <source src={SERVICE_ASSETS[i % SERVICE_ASSETS.length]} type="video/mp4" />
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
