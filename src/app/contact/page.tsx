import type { Metadata } from "next";
import ContactHeader from "@/components/sections/ContactHeader";
import ContactForm from "@/components/sections/ContactForm";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch today if you're looking to launch a website, refine your existing site, or discuss a potential collaboration.",
};

/** Contact page: hero, brief form, and FAQ accordion. */
export default function Contact() {
  return (
    <main className="main-wrapper background-color-black">
      <ContactHeader />
      <ContactForm />
      <FaqSection />
    </main>
  );
}
