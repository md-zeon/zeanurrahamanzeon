import { experimentsCards } from "@/data/experiments";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

function ArrowIcon() {
  return (
    <div className="btn__icon w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677" stroke="currentColor" />
      </svg>
    </div>
  );
}

const clonableCards = experimentsCards.filter((card) => card.index >= "project_005" && card.index <= "project_007");

export default function ExperimentsCards() {
  return (
    <section id="home-services" data-projects-section="second" data-parallax-type="section" className="relative z-[2] overflow-hidden">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div>
            <div className="work-projects_content relative grid auto-cols-fr grid-cols-2 gap-0 border-x border-t border-white-20 max-[767px]:grid-cols-1">
              <div className="work-projects_content-divider absolute left-1/2 z-[3] h-full w-px -ml-px bg-white-20 max-[767px]:hidden" />
              {clonableCards.map((card) => (
                <div key={card.index} className="work-projects_card-layout relative z-[1] flex w-full flex-none flex-col gap-4 border-b border-white-20 p-[2rem_1rem] max-[767px]:py-4">
                  <div className="work-projects_card-wrapper flex flex-col gap-2">
                    <div className="work-projects_card-text-wrapper pl-[0.44rem]">
                      <div className="text-caption-2 text-color-teritary">{card.index}</div>
                    </div>
                    <div className="work-projects_card-content relative">
                      <div className="work-projects_card-asset-wrapper relative z-[1] flex aspect-video items-center justify-center overflow-hidden rounded-lg">
                        <div data-parallax-type="video" className="work-projects_card-asset h-[120%] w-[120%] flex-none">
                          <AutoVideo src={card.video} poster={card.poster} />
                        </div>
                        <div className="work_card-overlay absolute inset-0 z-[2] h-full w-full bg-[linear-gradient(45deg,#000,#000_0%,#0000)] opacity-30" />
                      </div>
                      <div className="work-projects_card-cta-wrapper absolute inset-0 z-[2] flex items-end justify-start p-4">
                        <a data-audio={audio.hover} href={card.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-small btn-icon">
                          <div className="btn__text">View clonable</div>
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
