"use client";

import { Button } from "@/components/shared";
import { audio } from "@/data/site";

/**
 * Global error boundary: branded dead-end shown when a page render throws.
 * `reset` lets the visitor retry the failed route without a full reload.
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="main-wrapper background-color-black">
      <section header-content-type="border">
        <div className="padding-global is-bigger">
          <div className="container-large">
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 border-x border-b border-white-20 p-[6rem_2.5rem] text-center max-[767px]:px-[1.3rem]">
              <div className="text-caption-2 text-color-secondary">
                ERROR_500 / SOMETHING_WENT_WRONG
              </div>
              <h1 className="font-brockmann text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-[-0.02em] text-brand-white">
                The grid
                <br />
                glitched.
              </h1>
              <p className="max-w-xl text-[1.125rem] leading-[160%] text-color-secondary">
                An unexpected error broke the layout. Try again — if it
                persists, reach out directly and I&apos;ll sort it out.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="#"
                  size="small"
                  dataAudio={audio.hover}
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}
                >
                  Try again
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="small"
                  dataAudio={audio.hover}
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