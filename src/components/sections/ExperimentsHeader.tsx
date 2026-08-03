import { experimentsHeader } from "@/data/experiments";
import { workHeader } from "@/data/work";
import { audio } from "@/data/site";
import Link from "next/link";
import { Asterisk, WebflowLogo } from "../shared";

export default function ExperimentsHeader() {
  return (
    <header data-projects-section="first">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center">
            <div className="padding-top padding-section-large max-width-full">
              <div className="relative flex min-w-full flex-col gap-8 pb-12 max-[991px]:pt-12">
                <div className="grid min-w-full grid-cols-[1.1fr_1fr] items-start gap-4 max-[991px]:grid-cols-1 max-[991px]:grid-flow-row max-[991px]:items-start max-[991px]:justify-items-center max-[991px]:gap-12 max-[767px]:gap-6 max-[479px]:max-w-[97%]">
                  <div className="relative z-[2] flex w-full flex-col gap-8 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6">
                      <div className="pl-4 max-[991px]:pl-0">
                        <div className="flex items-end justify-start gap-x-4 gap-y-4 pl-0 min-[1280px]:pl-[6.5rem] max-[991px]:pl-0 max-[767px]:gap-y-2">
                          <h1
                            id="home-hero-header-1"
                            header-content-type="heading-1"
                            className="heading-style-h0"
                          >
                            {experimentsHeader.title1}
                          </h1>
                        </div>
                        <div className="flex -mt-2 items-end justify-start gap-x-4 gap-y-4 max-[767px]:-mt-[0.3rem] max-[767px]:gap-y-2">
                          <div
                            id="home-hero-header-2"
                            header-content-type="heading-2"
                            className="heading-style-h0"
                          >
                            {experimentsHeader.title2}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-[1] flex w-full justify-between gap-x-[4vw] gap-y-[4vw] max-[991px]:flex-col max-[991px]:gap-12 max-[991px]:px-16 max-[767px]:px-8 max-[479px]:px-[1.3rem]">
                    <div className="relative flex flex-wrap items-start justify-start gap-[3.7rem] min-[1280px]:pr-16 max-[991px]:gap-12">
                      <div className="flex w-full flex-col gap-10 pl-8 min-[1280px]:pl-16 max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6">
                        <div
                          id="home-header-p"
                          header-content-type="paragraph"
                          className="text-size-large"
                        >
                          {experimentsHeader.paragraph}
                        </div>
                        <div className="btn-group btn-group--grid">
                          <a
                            id="home-header-button-1"
                            data-audio={audio.hover}
                            header-content-type="button"
                            href="/contact"
                            className="btn"
                          >
                            <div className="btn__text">
                              {experimentsHeader.button1}
                            </div>
                          </a>
                          <Link
                            id="home-header-button-2"
                            data-audio={audio.hover}
                            header-content-type="button"
                            href="/work"
                            className="btn btn-secondary"
                          >
                            <div className="btn__text">
                              {experimentsHeader.button2}
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        header-content-type="border"
                        className="absolute inset-y-0 left-0 z-[2] h-full w-px bg-[#efefe633] max-[991px]:hidden"
                      />
                      <div className="home-header_badge-component">
                        <div className="home-header_badge-icon-wrapper">
                          <div
                            id="home-hero-asterisk"
                            header-content-type="asterisk"
                            className="home-header_asterisk w-embed"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="home-header_badge-line">
                          <div
                            header-content-type="line-bg"
                            className="home-header_badge-line-bg"
                          />
                        </div>
                        <a
                          data-audio={audio.scramble}
                          href={workHeader.badgeLink}
                          target="_blank"
                          className="home-header_badge-link w-inline-block"
                        >
                          <WebflowLogo />
                          <div className="text-size-small text-weight-medium text-style-allcaps">
                            {workHeader.badge}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div header-content-type="border" className="home-header_border" />
                <div header-content-type="border" className="home-header_border is-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
