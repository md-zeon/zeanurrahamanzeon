import Link from "next/link";
import { workProjects, workNavTabs, workFeaturedHeader, workLabHeader } from "@/data/work";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

/**
 * Work page project grid — two-column list of full case-study cards. Each
 * card shows the index, tags, a looped video, title,
 * "View case study" link, and a headline result. A small nav row at the top
 * toggles between Portfolio and [See Labs].
 */
export default function WorkProjects() {
  return (
    <section
      id="home-services"
      className="relative z-2 overflow-hidden background-color-primary"
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="flex flex-col">
            {/* Portfolio / Labs switcher */}
            <div className="work-projects_nav">
              <Link
                href="/work"
                aria-current="page"
                data-audio={audio.secondaryHover}
                className="work-projects_nav-wrapper w-inline-block w--current"
              >
                <div className="text-size-tiny text-style-allcaps">
                  {workNavTabs.portfolio}
                </div>
              </Link>
              <Link
                href="/experiments"
                data-audio={audio.secondaryHover}
                className="work-projects_nav-wrapper w-inline-block"
              >
                <div className="text-size-tiny text-style-allcaps">
                  {workNavTabs.labs}
                </div>
              </Link>
              <div header-content-type="border" className="frame" />
              <div header-content-type="border" className="frame is-right" />
            </div>
            {/* Center hairline behind the grid */}
            <div className="work-projects_content-divider absolute left-1/2 z-3 h-full w-px -ml-px bg-white-20 max-[767px]:hidden" />
            {/* Project cards */}
            <div className="work-projects_content relative grid auto-cols-fr grid-cols-2 gap-0 border-x border-t border-white-20 max-[767px]:grid-cols-1">
              {workProjects.map((project) => (
                <div
                  key={project.index}
                  className="work-projects_card-layout relative z-1 flex w-full flex-none flex-col gap-4 border-b border-white-20 p-[2rem_1rem] max-[767px]:py-4"
                >
                  <div className="work-projects_card-wrapper flex flex-col gap-2">
                    {/* Index + service tags */}
                    <div className="work-projects_card-text-wrapper pl-[0.44rem]">
                      <div className="text-caption-2 text-color-secondary">
                        {project.index}
                      </div>
                      <div className="work_tags-wrapper">
                        {project.tags.map((tag) => (
                          <div key={tag} className="work_tag">
                            <div className="text-caption-2 text-color-secondary">
                              {tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Media + title + CTA overlay (only the button links) */}
                    <div className="work-projects_card-content relative block w-full">
                      <div className="work-projects_card-asset-wrapper relative z-1 flex aspect-video items-center justify-center overflow-hidden rounded-lg">
                        <div className="work-projects_card-asset h-[120%] w-[120%] flex-none">
                          <AutoVideo
                            src={project.video}
                            poster={project.poster}
                          />
                        </div>
                      </div>
                      <div className="work-projects_card-cta-wrapper absolute inset-0 z-2 flex flex-wrap items-end justify-start gap-x-4 gap-y-3 p-4">
                        <h3 className="heading-style-h4">{project.title}</h3>
                        {project.hasCaseStudy ? (
                          <Link
                            aria-label={project.ariaLabel}
                            data-audio={audio.hover}
                            href={project.href}
                            className="btn btn-small"
                          >
                            <span className="btn__text">{workFeaturedHeader.viewCaseStudyLabel}</span>
                          </Link>
                        ) : (
                          <a
                            aria-label={project.ariaLabel}
                            data-audio={audio.hover}
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-small"
                          >
                            <span className="btn__text">{workLabHeader.viewProjectLabel}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Headline result stat, separated as a footer row */}
                  <div className="work-projects_card-result mt-2 border-t border-white-20 pt-4">
                    <div className="heading-style-h5">{project.result}</div>
                    <div className="text-size-small text-color-secondary">
                      {project.resultLabel}
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
