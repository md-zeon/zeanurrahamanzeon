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
      className="section_work-projects"
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="work-projects_component">
            <div className="work-projects_content-divider" />
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
                className="home-header_border"
              />
              <div
                header-content-type="border"
                className="home-header_border is-right"
              />
            </div>
            <div className="work-projects_content">
              {workProjects.map((project) => (
                <div key={project.index} className="work-projects_card-layout">
                  <div className="work-projects_card-wrapper">
                    <div className="work-projects_card-text-wrapper">
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
                      className="work-projects_card-content w-inline-block"
                    >
                      <div className="work-projects_card-asset-wrapper">
                        <div className="work-projects_card-asset">
                          <AutoVideo
                            src={project.video}
                            poster={project.poster}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="work-projects_card-bottom">
                    <div className="work-projects_card-cta-wrapper">
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
