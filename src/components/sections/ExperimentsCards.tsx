import { experimentsCards } from "@/data/experiments";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

function ArrowIcon() {
  return (
    <div className="button-icon w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677" stroke="currentColor" />
      </svg>
    </div>
  );
}

const clonableCards = experimentsCards.filter((card) => card.index >= "project_005" && card.index <= "project_007");

export default function ExperimentsCards() {
  return (
    <section id="home-services" data-projects-section="second" data-parallax-type="section" className="section_work-projects">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="work-projects_component">
            <div className="work-projects_content">
              <div className="work-projects_content-divider" />
              {clonableCards.map((card) => (
                <div key={card.index} className="work-projects_card-layout">
                  <div className="work-projects_card-wrapper">
                    <div className="work-projects_card-text-wrapper">
                      <div className="text-caption-2 text-color-teritary">{card.index}</div>
                    </div>
                    <div className="work-projects_card-content">
                      <div className="work-projects_card-asset-wrapper">
                        <div data-parallax-type="video" className="work-projects_card-asset w-embed">
                          <AutoVideo src={card.video} poster={card.poster} />
                        </div>
                        <div className="work_card-overlay" />
                      </div>
                      <div className="work-projects_card-cta-wrapper">
                        <a data-audio={audio.hover} href={card.href} target="_blank" rel="noopener noreferrer" className="button is-icon is-small is-secondary w-inline-block">
                          <div className="button-text">View clonable</div>
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                    <h3 className="heading-style-h5">{card.title}</h3>
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
