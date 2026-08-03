import type { CaseBlock, CaseMedia, CaseStudy } from "@/data/caseStudies";
import AutoVideo from "../media/AutoVideo";

type CaseStudyBlocksProps = {
  study: CaseStudy;
};

const VIDEO_CLASS =
  "relative z-[2] h-full w-full shrink-0 object-cover max-[767px]:h-[120%] max-[767px]:w-[120%] max-[767px]:rounded";

function Media({ media, grid }: { media: CaseMedia; grid: boolean }) {
  const wrapperClass = grid
    ? "relative z-[2] flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-lg border border-[#1f1e1e33] inset-0 min-[1280px]:max-h-[93.4vh] max-[767px]:rounded"
    : "relative z-[2] flex aspect-video h-[68vh] w-full items-center justify-center overflow-hidden rounded-lg border border-[#1f1e1e33] inset-0 min-[1280px]:h-[44vw] max-[991px]:h-[50vw] max-[767px]:rounded";
  if (media.kind === "video") {
    return (
      <div className={wrapperClass}>
        <AutoVideo className={VIDEO_CLASS} src={media.video} poster={media.poster} />
      </div>
    );
  }
  return (
    <div className={wrapperClass}>
      <img className={VIDEO_CLASS} src={media.image} alt={media.alt} loading="lazy" />
    </div>
  );
}

const TEXT_WRAPPER_CLASS =
  "absolute left-[-2.7rem] top-1/2 [transform:rotate(-90deg)_translateY(-50%)] max-[991px]:left-[-2.2rem] max-[767px]:left-[-2.3rem] max-[479px]:left-[-2rem]";

function Example({ block }: { block: Extract<CaseBlock, { type: "example" }> }) {
  const isGrid = block.media.length > 1;
  const layoutClass = [
    "relative grid h-full w-full auto-cols-fr grid-cols-1 grid-rows-[1fr] [place-content:start_center] [place-items:end_center] gap-0 [transform-style:preserve-3d] max-[767px]:gap-6 max-[767px]:[place-items:start_center] max-[479px]:[place-items:start_center]",
    block.row === "second" ? "pt-8" : "",
  ].join(" ");
  const projectClass = isGrid
    ? "relative z-[1] grid w-[90%] auto-cols-fr grid-rows-[auto] grid-cols-2 gap-8 [transform-origin:50%_0] [transform-style:preserve-3d] max-[991px]:grid-cols-1"
    : "relative z-[1] flex w-[90%] [transform-origin:50%_0] [transform-style:preserve-3d]";
  return (
    <section data-parallax-type="section" className="relative z-[2] flex w-full flex-col gap-8 overflow-hidden">
      <div className={layoutClass}>
        {isGrid ? (
          <div className={projectClass}>
            {block.media.map((media) => (
              <div
                key={media.caption}
                data-index="1"
                className="relative z-[1] flex h-auto w-auto [transform-origin:50%_0] [transform-style:preserve-3d]"
              >
                <div className={TEXT_WRAPPER_CLASS}>
                  <div className="text-caption-2 text-color-secondary">{media.caption}</div>
                </div>
                <Media media={media} grid />
              </div>
            ))}
          </div>
        ) : (
          <div data-index="1" className={projectClass}>
            <div className={TEXT_WRAPPER_CLASS}>
              <div className="text-caption-2 text-color-secondary">{block.media[0].caption}</div>
            </div>
            <Media media={block.media[0]} grid={false} />
          </div>
        )}
        <div className="z-0 flex w-auto max-w-[81.25rem] items-start justify-end border-l border-r border-[#efefe633] absolute inset-[0_4.37rem] max-[991px]:inset-x-[1.5rem]" />
      </div>
    </section>
  );
}

const INFO_ITEM_CLASS =
  "rounded-full border-[0.5px] border-neutral-black px-3.5 py-1.5 text-sm text-color-secondary [backdrop-filter:blur(100px)] [-webkit-backdrop-filter:blur(100px)] max-[767px]:px-3 max-[767px]:py-1 max-[767px]:text-[.9rem] max-[767px]:tracking-[-0.03rem] max-[479px]:text-[.85rem] max-[479px]:tracking-[-0.025rem]";

function Info({ study }: { study: CaseStudy }) {
  return (
    <section cs-content-type="container">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative grid auto-cols-fr grid-rows-[auto] grid-cols-[1.3fr_1fr] gap-0 border-b border-l border-neutral-black py-10 max-[991px]:grid-cols-[1fr_auto] max-[767px]:grid-cols-1 max-[767px]:gap-8">
            <div className="flex flex-wrap items-start justify-between gap-4 pl-4 max-[991px]:flex-col max-[767px]:flex-wrap max-[479px]:gap-8">
              <div className="flex flex-col items-start justify-start gap-4">
                <div cs-content-type="caption" className="text-caption-2 text-color-secondary">
                  {study.info.servicesCaption}
                </div>
                <div cs-content-type="services" className="relative z-[2] flex max-w-[49.25rem] flex-wrap gap-2 max-[991px]:max-w-none">
                  {study.info.services.map((service) => (
                    <div key={service} className={INFO_ITEM_CLASS}>
                      <div>{service}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-4 pl-4 max-[991px]:flex-col max-[767px]:flex-wrap max-[479px]:gap-8">
              <div className="flex flex-col items-start justify-start gap-8">
                <div className="flex flex-col items-start justify-start gap-4">
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
            <div className="absolute bottom-0 left-[56.5%] z-[2] -ml-px h-full w-px bg-[#efefe633] max-[991px]:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Content({ block }: { block: Extract<CaseBlock, { type: "content" }> }) {
  return (
    <section cs-content-type="container">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative grid auto-cols-fr grid-rows-[auto] grid-cols-[1.5fr_1fr] gap-0 border-l border-neutral-black max-[991px]:block">
            <div className="flex items-center justify-between border-r border-neutral-black px-4 py-20 max-[991px]:py-16">
              <div className="flex flex-col items-start justify-start gap-2">
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
