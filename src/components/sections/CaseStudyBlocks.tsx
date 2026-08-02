import type { CaseBlock, CaseMedia, CaseStudy } from "@/data/caseStudies";
import AutoVideo from "../media/AutoVideo";

type CaseStudyBlocksProps = {
  study: CaseStudy;
};

function Media({ media, grid }: { media: CaseMedia; grid: boolean }) {
  const wrapperClass = grid ? "cs-example_grid-video-wrapper" : "cs-example_video-wrapper";
  if (media.kind === "video") {
    return (
      <div className={wrapperClass}>
        <AutoVideo className="cs-example_video" src={media.video} poster={media.poster} />
      </div>
    );
  }
  return (
    <div className={wrapperClass}>
      <img className="cs-example_video" src={media.image} alt={media.alt} loading="lazy" />
    </div>
  );
}

function Example({ block }: { block: Extract<CaseBlock, { type: "example" }> }) {
  const isGrid = block.media.length > 1;
  return (
    <section data-parallax-type="section" className="section_cs-example">
      <div className={`cs-example_layout ${block.row === "second" ? "is-second-row" : ""}`}>
        {isGrid ? (
          <div className="cs-example_project is-grid">
            {block.media.map((media) => (
              <div key={media.caption} data-index="1" className="cs-example_grid-project">
                <div className="cs-example_text-wrapper">
                  <div className="text-caption-2 text-color-secondary">{media.caption}</div>
                </div>
                <Media media={media} grid />
              </div>
            ))}
          </div>
        ) : (
          <div data-index="1" className="cs-example_project">
            <div className="cs-example_text-wrapper">
              <div className="text-caption-2 text-color-secondary">{block.media[0].caption}</div>
            </div>
            <Media media={block.media[0]} grid={false} />
          </div>
        )}
        <div className="home_projects-lines" />
      </div>
    </section>
  );
}

function Info({ study }: { study: CaseStudy }) {
  return (
    <section cs-content-type="container" className="section_cs-info">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="cs-info_component">
            <div className="cs-info_layout">
              <div className="cs-info_wrapper">
                <div cs-content-type="caption" className="text-caption-2 text-color-secondary">
                  {study.info.servicesCaption}
                </div>
                <div cs-content-type="services" className="cs-info_grid-list">
                  {study.info.services.map((service) => (
                    <div key={service} className="cs-info_item">
                      <div>{service}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="cs-info_layout">
              <div className="cs-info_content">
                <div className="cs-info_wrapper">
                  <div cs-content-type="caption" className="text-caption-2 text-color-secondary">
                    {study.info.dateCaption}
                  </div>
                  <div cs-content-type="paragraph" className="heading-style-h5">
                    {study.info.date}
                  </div>
                </div>
              </div>
              <a
                data-audio="https://bjornflow-assets.b-cdn.net/Audio/button%20hover.wav"
                href={study.info.websiteUrl}
                target="_blank"
                className="button is-secondary is-icon w-inline-block"
              >
                <div className="button-text">{study.info.websiteLabel}</div>
                <div className="button-icon w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                    <path d="M0.823227 13.0732L12.8232 1.07323M12.8232 1.07323V10.9268M12.8232 1.07323H3.17677" stroke="currentColor" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="cs-info_border" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Content({ block }: { block: Extract<CaseBlock, { type: "content" }> }) {
  return (
    <section cs-content-type="container" className="section_cs-content">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="cs-content_component">
            <div className="cs-content_layout">
              <div className="cs-content_wrapper">
                <div cs-content-type="caption" className="text-caption-2 text-color-secondary">
                  {block.caption}
                </div>
                <div cs-content-type="paragraph" className="heading-style-h5">
                  {block.paragraphs.map((paragraph, i) => (
                    <span key={i}>
                      {i > 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      {paragraph}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudyBlocks({ study }: CaseStudyBlocksProps) {
  return (
    <>
      {study.blocks.map((block, index) => {
        if (block.type === "info") return <Info key={index} study={study} />;
        if (block.type === "content") return <Content key={index} block={block} />;
        return <Example key={index} block={block} />;
      })}
    </>
  );
}
