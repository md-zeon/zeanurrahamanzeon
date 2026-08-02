import { experimentsHeader } from "@/data/experiments";
import { workHeader } from "@/data/work";
import { audio } from "@/data/site";
import { Asterisk, WebflowLogo } from "../shared";

export default function ExperimentsHeader() {
  return (
    <header data-projects-section="first" className="section_work-header">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="work-header_wrapper">
            <div className="padding-top padding-section-large max-width-full">
              <div className="work-header_component">
                <div className="w-layout-grid work-header_content">
                  <div className="work-header_content-up">
                    <div className="work-header_header-component">
                      <div className="work-header_header-layout">
                        <div className="work-header_header-wrapper is-first is-play">
                          <h1
                            id="home-hero-header-1"
                            header-content-type="heading-1"
                            className="heading-style-h0"
                          >
                            {experimentsHeader.title1}
                          </h1>
                        </div>
                        <div className="work-header_header-wrapper is-middle is-play">
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
                  <div className="work-header_content-down">
                    <div className="work-header_cta-layout">
                      <div className="work-header_cta-wrapper">
                        <div
                          id="home-header-p"
                          header-content-type="paragraph"
                          className="text-size-large"
                        >
                          {experimentsHeader.paragraph}
                        </div>
                        <div className="button-group is-grid">
                          <a
                            id="home-header-button-1"
                            data-audio={audio.hover}
                            header-content-type="button"
                            href="/contact"
                            className="button w-inline-block"
                          >
                            <div className="button-text text-brand-black">
                              {experimentsHeader.button1}
                            </div>
                          </a>
                          <a
                            id="home-header-button-2"
                            data-audio={audio.hover}
                            header-content-type="button"
                            href="/work"
                            className="button is-secondary w-inline-block"
                          >
                            <div className="button-text">
                              {experimentsHeader.button2}
                            </div>
                          </a>
                        </div>
                      </div>
                      <div
                        header-content-type="border"
                        className="work-header_border"
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
                <div
                  header-content-type="border"
                  className="home-header_border"
                />
                <div
                  header-content-type="border"
                  className="home-header_border is-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
