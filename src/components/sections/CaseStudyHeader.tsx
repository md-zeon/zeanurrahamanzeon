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
    <header>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center">
            <div className="padding-top padding-section-large max-width-full">
              <div className="relative flex min-w-full flex-col gap-8 pb-22 max-[991px]:pt-12 max-[767px]:pb-12">
                <div className="grid min-w-full auto-cols-fr grid-cols-[1fr_.7fr] grid-rows-[auto] [place-items:start_stretch] gap-x-4 gap-y-4 max-[991px]:grid-flow-row max-[991px]:grid-cols-1 max-[991px]:[place-items:start_center] max-[991px]:gap-y-8 max-[767px]:gap-x-6 max-[767px]:gap-y-6 max-[479px]:max-w-[97%]">
                  <div className="relative z-[2] flex w-full flex-col gap-8 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6 pl-4">
                      <div className="max-[991px]:flex max-[991px]:flex-col max-[991px]:items-center max-[991px]:justify-start">
                        <div className="flex items-end justify-start gap-4 max-[991px]:relative max-[991px]:justify-center max-[767px]:gap-2">
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
                  <div className="relative z-[1] flex w-full justify-between gap-x-[4vw] gap-y-[4vw] max-[991px]:flex-col max-[991px]:gap-12 max-[991px]:px-16 max-[767px]:px-8 max-[479px]:px-[1.3rem]">
                    <div className="relative flex flex-wrap items-start justify-start gap-[3.7rem] min-[1280px]:pr-16 max-[991px]:gap-12">
                      <div className="flex w-full flex-col gap-10 pl-8 min-[1280px]:pl-16 max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6">
                        <div id="home-header-p" header-content-type="paragraph" className="text-size-large text-color-secondary">
                          {paragraph}
                        </div>
                        <div className="button-group is-grid">
                          <a id="home-header-button-1" data-audio={audio.hover} header-content-type="button" href={buttonHref} className="button w-inline-block">
                            <div className="button-text">{buttonLabel}</div>
                          </a>
                        </div>
                      </div>
                      <div
                        header-content-type="border"
                        className="absolute inset-y-0 left-0 z-[2] h-full w-px bg-[#efefe633] max-[991px]:hidden"
                      />
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
