import type { Metadata } from "next";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  "How Zeanur Rahaman Zeon's portfolio site handles your data.",
  "/privacy-policy"
);

/** Privacy policy page: plain-language notice for the static portfolio. */
export default function PrivacyPolicy() {
  const sections = [
    {
      heading: "What this policy covers",
      body: "This page explains what information this portfolio website collects, stores, and shares. The site is a static showcase of work; it does not operate user accounts or a persistent data store.",
    },
    {
      heading: "Information you submit",
      body: "The contact page includes a brief form. Submissions are handled entirely in your browser and are not transmitted to any server or third party — no messages are stored or received through this form. If you contact the owner directly (for example by email), only the details you choose to share are used to respond.",
    },
    {
      heading: "Analytics and tracking",
      body: "This site does not embed analytics, advertising, or third-party tracking pixels. Like any server, the host may keep standard technical logs (such as IP addresses and request times) for security and operation purposes.",
    },
    {
      heading: "Local storage",
      body: "The site may store small local preferences in your browser — such as your sound on/off choice — so your settings persist between visits. This data never leaves your device.",
    },
    {
      heading: "External links",
      body: "Pages link to external services (GitHub, LinkedIn, and similar). Once you leave this site, those services have their own privacy policies over which this policy has no control.",
    },
    {
      heading: "Contact",
      body: "Questions about this policy can be sent to zeon.cse@gmail.com.",
    },
  ];

  return (
    <main className="main-wrapper background-color-black">
      <section header-content-type="border">
        <div className="padding-global is-bigger">
          <div className="container-large">
            <div className="border-b border-l border-r border-white-20">
              <div className="p-[4.5rem_2.5rem] max-[767px]:px-[1.3rem] max-[767px]:pt-12">
                <div className="text-caption-2 text-color-secondary">
                  LEGAL / 01
                </div>
                <h1 className="font-brockmann text-[4rem] leading-[1.02] tracking-[-0.02em] text-brand-white max-[991px]:text-[3.25rem] max-[767px]:text-[2.5rem]">
                  Privacy Policy
                </h1>
              </div>
            </div>
            <div className="border-b border-l border-r border-white-20">
              <div className="grid auto-cols-fr grid-cols-2 gap-10 p-[3rem_2.5rem_4.5rem] max-[991px]:grid-cols-1 max-[991px]:gap-8 max-[767px]:px-[1.3rem]">
                {sections.map((section) => (
                  <div key={section.heading} className="flex flex-col gap-3">
                    <h2 className="font-brockmann text-[1.5rem] leading-snug text-brand-white">
                      {section.heading}
                    </h2>
                    <p className="text-[1rem] leading-[160%] text-color-secondary">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}