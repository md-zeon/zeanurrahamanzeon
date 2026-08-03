import Link from "next/link";
import { workProjects } from "@/data/work";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

export default function WorkProjects() {
  return (
    <section
      id="home-services"
      data-projects-section="second"
      data-parallax-type="section"
      className="relative z-[2] overflow-hidden"
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div>
            <div className="work-projects_content-divider absolute left-1/2 z-[3] h-full w-px -ml-px bg-white-20 max-[767px]:hidden" />
            <div className="work-projects_nav">
              <Link
                href="/work"
                aria-current="page"
                data-audio={audio.secondaryHover}
                className="work-projects_nav-wrapper w-inline-block w--current"
              >
                <div className="text-size-tiny text-style-allcaps">
                  Portfolio
                </div>
              </Link>
              <Link
                href="/experiments"
                data-audio={audio.secondaryHover}
                className="work-projects_nav-wrapper w-inline-block"
              >
                <div className="text-size-tiny text-style-allcaps">
                  [See Labs]
                </div>
              </Link>
              <div
                header-content-type="border"
                className="frame"
              />
              <div
                header-content-type="border"
                className="frame is-right"
              />
            </div>
            <div className="work-projects_content relative grid auto-cols-fr grid-cols-2 gap-0 border-x border-t border-white-20 max-[767px]:grid-cols-1">
              {workProjects.map((project) => (
                <div key={project.index} className="work-projects_card-layout relative z-[1] flex w-full flex-none flex-col gap-4 border-b border-white-20 p-[2rem_1rem] max-[767px]:py-4">
                  <div className="work-projects_card-wrapper flex flex-col gap-2">
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
                    <Link
                      aria-label={project.ariaLabel}
                      data-audio={audio.hover}
                      href={project.href}
                      className="work-projects_card-content relative w-inline-block"
                    >
                      <div className="work-projects_card-asset-wrapper relative z-[1] flex aspect-video items-center justify-center overflow-hidden rounded-lg">
                        <div className="work-projects_card-asset h-[120%] w-[120%] flex-none">
                          <AutoVideo
                            src={project.video}
                            poster={project.poster}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="work-projects_card-bottom">
                    <div className="work-projects_card-cta-wrapper absolute inset-0 z-[2] flex items-end justify-start p-4">
                      <h3 className="heading-style-h4">{project.title}</h3>
                      <Link
                        data-audio={audio.hover}
                        href={project.href}
                        className="btn btn-small"
                      >
                        <div className="btn__text">View case study</div>
                      </Link>
                    </div>
                    <div className="work-projects_card-result">
                      <div className="heading-style-h5">{project.result}</div>
                      <div className="text-size-small text-color-secondary">
                        {project.resultLabel}
                      </div>
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
