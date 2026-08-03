import { contactHeader } from "@/data/contact";

export default function ContactHeader() {
  return (
    <header>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center">
            <div
              header-content-type="border"
              className="absolute inset-y-0 left-1/2 z-[2] h-full w-px -ml-px bg-[#efefe633] max-[991px]:hidden"
            />
            <div className="padding-top padding-section-large max-width-full">
              <div className="relative flex min-w-full flex-col gap-8 pb-12 max-[991px]:pt-12">
                <div className="grid min-w-full grid-cols-2 items-center gap-4 max-[991px]:grid-cols-1 max-[991px]:grid-flow-row max-[991px]:items-start max-[991px]:justify-items-center max-[991px]:gap-12 max-[767px]:gap-6 max-[479px]:max-w-[97%]">
                  <div className="relative z-[2] flex w-full flex-col gap-8 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6">
                      <div className="pl-4 max-[991px]:pl-0">
                        <div className="flex items-end justify-start gap-x-4 gap-y-4 max-[767px]:gap-y-2">
                          <h1
                            id="home-hero-header-1"
                            header-content-type="heading-1"
                            className="heading-style-h0"
                          >
                            {contactHeader.title1}
                          </h1>
                        </div>
                        <div className="flex -mt-2 items-end justify-start gap-x-4 gap-y-4 pl-[5vw] min-[1280px]:pl-16 max-[991px]:pl-0 max-[991px]:pr-[17vw] max-[767px]:-mt-[0.3rem] max-[767px]:gap-y-2">
                          <div
                            id="home-hero-header-2"
                            header-content-type="heading-2"
                            className="heading-style-h0"
                          >
                            {contactHeader.title2}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-[1] flex w-full justify-between gap-x-[4vw] gap-y-[4vw] max-[991px]:flex-col max-[991px]:gap-12 max-[991px]:px-16 max-[767px]:px-8 max-[479px]:px-[1.3rem]">
                    <div className="relative flex flex-wrap items-start justify-start gap-[3.7rem] min-[1280px]:pr-16 max-[991px]:gap-12">
                      <div className="flex w-full flex-col gap-10 px-8 min-[1280px]:pl-16 min-[1280px]:pr-0 max-[991px]:gap-8 max-[991px]:pl-0 max-[991px]:pr-0 max-[767px]:gap-6">
                        <div
                          id="home-header-p"
                          header-content-type="paragraph"
                          className="text-size-large"
                        >
                          {contactHeader.paragraph}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div header-content-type="border" className="frame" />
            <div header-content-type="border" className="frame is-bottom" />
            <div header-content-type="border" className="frame is-right" />
          </div>
        </div>
      </div>
    </header>
  );
}
