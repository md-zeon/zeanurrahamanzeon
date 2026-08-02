import { audio } from "@/data/site";
import { Asterisk, WebflowLogo } from "../shared";

type CaseStudyHeaderProps = {
  title: string;
  result: string;
  resultLabel: string;
  tags: string[];
  paragraph: string;
  buttonLabel: string;
  buttonHref: string;
  badge: string;
  badgeLink: string;
};

export default function CaseStudyHeader({
  title,
  result,
  resultLabel,
  tags,
  paragraph,
  buttonLabel,
  buttonHref,
  badge,
  badgeLink,
}: CaseStudyHeaderProps) {
  return (
    <header className="section_cs-header">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="cs-header_wrapper">
            <div className="padding-top padding-section-large max-width-full">
              <div className="cs-header_component">
                <div className="w-layout-grid cs-header_content">
                  <div className="cs-header_content-up">
                    <div className="cs-header_header-component">
                      <div className="cs-header_header-layout">
                        <div className="cs-header_header-wrapper is-first">
                          <h1 id="home-hero-header-1" header-content-type="heading-1" className="heading-style-h2">
                            {title}
                          </h1>
                        </div>
                      </div>
                      <div header-content-type="button" className="work-projects_card-result">
                        <div className="heading-style-h5">{result}</div>
                        <div className="text-size-small text-color-secondary">{resultLabel}</div>
                      </div>
                      <div header-content-type="button" className="work_tags-wrapper">
                        {tags.map((tag) => (
                          <div key={tag} className="work_tag">
                            <div className="text-caption-2 text-color-secondary">{tag}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="work-header_content-down">
                    <div className="work-header_cta-layout">
                      <div className="work-header_cta-wrapper">
                        <div id="home-header-p" header-content-type="paragraph" className="text-size-large text-color-secondary">
                          {paragraph}
                        </div>
                        <div className="button-group is-grid">
                          <a id="home-header-button-1" data-audio={audio.hover} header-content-type="button" href={buttonHref} className="button w-inline-block">
                            <div className="button-text">{buttonLabel}</div>
                          </a>
                        </div>
                      </div>
                      <div header-content-type="border" className="work-header_border" />
                      <div className="home-header_badge-component">
                        <div className="home-header_badge-icon-wrapper">
                          <div id="home-hero-asterisk" header-content-type="asterisk" className="home-header_asterisk w-embed">
                            <Asterisk />
                          </div>
                        </div>
                        <div className="home-header_badge-line">
                          <div header-content-type="line-bg" className="home-header_badge-line-bg" />
                        </div>
                        <a data-audio={audio.scramble} href={badgeLink} target="_blank" className="home-header_badge-link is-silver w-inline-block">
                          <WebflowLogo />
                          <div className="text-caption-1">{badge}</div>
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
