import type { Metadata } from "next";
import { Button } from "@/components/shared";
import { audio } from "@/data/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/** Global 404 page: branded dead-end with a way back to the site. */
export default function NotFound() {
  return (
    <main className="main-wrapper background-color-black">
      <section header-content-type="border">
        <div className="padding-global is-bigger">
          <div className="container-large">
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 border-x border-b border-white-20 p-[6rem_2.5rem] text-center max-[767px]:px-[1.3rem]">
              <div className="text-caption-2 text-color-secondary">
                ERROR_404 / PAGE_NOT_FOUND
              </div>
              <h1 className="font-brockmann text-[clamp(6rem,18vw,14rem)] leading-[0.9] tracking-[-0.02em] text-brand-white">
                404
              </h1>
              <p className="max-w-xl text-[1.125rem] leading-[160%] text-color-secondary">
                This page wandered off the grid — but the person behind it is
                still here. Head back to the work or reach out directly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button href="/work" dataAudio={audio.hover} size="small">
                  See the work
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  dataAudio={audio.hover}
                  size="small"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}