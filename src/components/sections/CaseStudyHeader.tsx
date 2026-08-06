import { audio } from "@/data/site";
import { Asterisk, CredentialIcon } from "../shared";

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

/**
 * Case study page header. The `header-content-type` attributes mark the
 * title/paragraph/button/border/asterisk elements that the site's header
 * reveal animation targets, so the intro animates in on page load.
 */
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
    <header>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center">
            <div className="padding-top padding-section-large max-width-full">
              <div className="relative flex min-w-full flex-col gap-8 pb-22 max-[991px]:pt-12 max-[767px]:pb-12">
                <div className="grid min-w-full auto-cols-fr grid-cols-[1fr_.7fr] grid-rows-[auto] [place-items:start_stretch] gap-x-4 gap-y-4 max-[991px]:grid-flow-row max-[991px]:grid-cols-1 max-[991px]:[place-items:start_center] max-[991px]:gap-y-8 max-[767px]:gap-x-6 max-[767px]:gap-y-6 max-[479px]:max-w-[97%]">
                  {/* Left: big title + key result + service tags */}
                  <div className="relative z-2 flex w-full flex-col gap-8 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6 pl-4">
                      <div className="max-[991px]:flex max-[991px]:flex-col max-[991px]:items-center max-[991px]:justify-start">
                        <div className="flex items-end justify-start gap-4 max-[991px]:relative max-[991px]:justify-center max-[767px]:gap-2">
                          <h1
                            id="home-hero-header-1"
                            header-content-type="heading-1"
                            className="heading-style-h2"
                          >
                            {title}
                          </h1>
                        </div>
                      </div>
                      <div
                        header-content-type="button"
                        className="work-projects_card-result"
                      >
                        <div className="heading-style-h5">{result}</div>
                        <div className="text-size-small text-color-secondary">
                          {resultLabel}
                        </div>
                      </div>
                      <div
                        header-content-type="button"
                        className="work_tags-wrapper"
                      >
                        {tags.map((tag) => (
                          <div key={tag} className="work_tag">
                            <div className="text-caption-2 text-color-secondary">
                              {tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Right: intro paragraph + CTA button + badge link */}
                  <div className="relative z-1 flex w-full justify-between gap-x-[4vw] gap-y-[4vw] max-[991px]:flex-col max-[991px]:gap-12 max-[991px]:px-16 max-[767px]:px-8 max-[479px]:px-[1.3rem]">
                    <div className="relative flex flex-wrap items-start justify-start gap-[3.7rem] desktop:pr-16 max-[991px]:gap-12">
                      <div className="flex w-full flex-col gap-10 pl-8 desktop:pl-16 max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6">
                        <div
                          id="home-header-p"
                          header-content-type="paragraph"
                          className="text-size-large text-color-secondary"
                        >
                          {paragraph}
                        </div>
                        <div className="btn-group btn-group--grid">
                          <a
                            id="home-header-button-1"
                            data-audio={audio.hover}
                            header-content-type="button"
                            href={buttonHref}
                            className="btn"
                          >
                            <div className="btn__text">{buttonLabel}</div>
                          </a>
                        </div>
                      </div>
                      {/* Vertical divider between the columns */}
                      <div
                        header-content-type="border"
                        className="absolute inset-y-0 left-0 z-2 h-full w-px bg-white-20 max-[991px]:hidden"
                      />
                      {/* Badge with animated asterisk reveal */}
                      <div className="badge">
                        <div className="badge__icon-wrapper">
                          <div
                            id="home-hero-asterisk"
                            header-content-type="asterisk"
                            className="badge__icon w-embed"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="badge__line">
                          <div
                            header-content-type="line-bg"
                            className="badge__line-bg"
                          />
                        </div>
                        <a
                          data-audio={audio.scramble}
                          href={badgeLink}
                          target="_blank"
                          className="badge-link"
                        >
                          <CredentialIcon />
                          <div className="text-caption-1">{badge}</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Full-width frame lines at the bottom of the header */}
                <div header-content-type="border" className="frame" />
                <div header-content-type="border" className="frame is-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
