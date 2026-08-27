import type { Metadata } from "next";
import ContactHeader from "@/components/sections/ContactHeader";
import ContactForm from "@/components/sections/ContactForm";
import FaqSection from "@/components/sections/FaqSection";

import { contactMeta } from "@/data/contact";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
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
