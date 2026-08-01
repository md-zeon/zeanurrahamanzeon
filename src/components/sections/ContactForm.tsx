"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { contactForm } from "@/data/contact";
import { audio } from "@/data/site";

function CopyIcon() {
  return (
    <div className="icon-embed-xxsmall w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 25 25" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M20.7795 9.74677H11.7795C10.675 9.74677 9.77954 10.6422 9.77954 11.7468V20.7468C9.77954 21.8513 10.675 22.7468 11.7795 22.7468H20.7795C21.8841 22.7468 22.7795 21.8513 22.7795 20.7468V11.7468C22.7795 10.6422 21.8841 9.74677 20.7795 9.74677Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.77954 15.7468H4.77954C4.24911 15.7468 3.7404 15.5361 3.36533 15.161C2.99025 14.7859 2.77954 14.2772 2.77954 13.7468V4.74677C2.77954 4.21633 2.99025 3.70762 3.36533 3.33255C3.7404 2.95748 4.24911 2.74677 4.77954 2.74677H13.7795C14.31 2.74677 14.8187 2.95748 15.1938 3.33255C15.5688 3.70762 15.7795 4.21633 15.7795 4.74677V5.74677" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="icon-embed-xxsmall w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 25 25" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M20.9375 6.55023L9.9375 17.5502L4.9375 12.5502" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function ContactForm() {
  const emailRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const copyText = emailRef.current?.querySelector("[copy-text]")?.textContent;
    if (copyText) await navigator.clipboard.writeText(copyText.trim());
    const icons = emailRef.current?.querySelectorAll<HTMLElement>(".contact_copy-icon");
    if (!icons || icons.length < 2) return;
    gsap.killTweensOf([icons[0], icons[1]]);
    gsap.to([icons[0], icons[1]], { yPercent: -100, duration: 0.3, ease: "expo.out" });
    gsap.to([icons[0], icons[1]], { yPercent: 0, duration: 0.3, ease: "expo.inOut", delay: 1.8 });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const layout = e.currentTarget.closest(".form_checkbox-layout");
    if (!layout) return;
    layout.querySelectorAll<HTMLElement>(".form_pill-check").forEach((pill) => pill.classList.remove("w--redirected-checked"));
    const pill = e.currentTarget.previousElementSibling;
    if (pill) pill.classList.add("w--redirected-checked");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formBlock = form.closest(".w-form");
    const success = formBlock?.querySelector<HTMLElement>(".w-form-done");
    form.style.display = "none";
    if (success) success.style.display = "block";
  };

  return (
    <section header-content-type="border" className="section_contact-form">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="contact-form_component">
            <div className="w-layout-grid contact-form_content">
              <div className="contact-form_content-left">
                <div className="contact-form_wrapper">
                  <div className="text-caption-2 text-color-secondary">[Email]</div>
                  <div className="contact_email" ref={emailRef}>
                    <a href={`mailto:${contactForm.email}`} className="text-style-nounderline w-inline-block">
                      <div copy-text="true" className="text-size-medium">
                        {contactForm.email}
                      </div>
                    </a>
                    <a aria-label="copy-email" copy-button="true" data-audio={audio.hover} href="#" className="contact_email-copy w-inline-block" onClick={handleCopy}>
                      <div className="contact_copy-icon">
                        <CopyIcon />
                      </div>
                      <div className="contact_copy-icon is-2">
                        <CheckIcon />
                      </div>
                    </a>
                  </div>
                </div>
                {contactForm.sections.map((section) => (
                  <div key={section.label} className="contact-form_wrapper">
                    <div className="text-caption-2 text-color-secondary">{section.label}</div>
                    <div className="text-size-regular">
                      {section.text.split("FAQ below").map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 ? (
                            <a href="#faq-section" className="text-color-secondary">
                              FAQ below
                            </a>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact_form-block w-form">
                <form id="wf-form-Contact" name="wf-form-Contact" method="get" className="contact_form" onSubmit={handleSubmit}>
                  <div className="form_field-layout">
                    <div className="form_field-wrapper">
                      <label htmlFor="Full-Name" className="form_field-label">
                        What&apos;s your name?
                      </label>
                      <input className="form_input w-input" maxLength={256} name="Full-Name" data-name="Full Name" placeholder="Full Name" type="text" id="Full-Name" required />
                    </div>
                    <div className="form_field-wrapper">
                      <label htmlFor="Email" className="form_field-label">
                        What&apos;s your email?
                      </label>
                      <input className="form_input w-input" maxLength={256} name="Email" data-name="Email" placeholder="name@company.com" type="email" id="Email" required />
                    </div>
                  </div>
                  <div className="form_field-wrapper">
                    <label htmlFor="Message" className="form_field-label">
                      What&apos;s your brief?
                    </label>
                    <textarea id="Message" name="Message" maxLength={5000} data-name="Message" placeholder="Write your brief here: I need ___ with this scope, pages, specific needs ___." required className="form_input is-text-area w-input" />
                  </div>
                  <div className="form_field-layout">
                    <div className="form_field-wrapper">
                      <label htmlFor="Current-website-URL" className="form_field-label">
                        Current website URL
                      </label>
                      <input className="form_input w-input" maxLength={256} name="Current-website-URL" data-name="Current website URL" placeholder="www.example.com" type="url" id="Current-website-URL" />
                    </div>
                    <div className="form_field-wrapper">
                      <label htmlFor="Company-Stage" className="form_field-label">
                        Company stage
                      </label>
                      <select id="Company-Stage" name="Company-Stage" data-name="Company Stage" required className="form_input w-select">
                        <option value="">Please select</option>
                        {contactForm.companyStage.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form_field-layout">
                    <div className="form_field-wrapper">
                      <label htmlFor="Deadline" className="form_field-label">
                        Do you have a deadline?
                      </label>
                      <select id="Deadline" name="Deadline" data-name="Deadline" required className="form_input w-select">
                        <option value="">Please select</option>
                        {contactForm.deadline.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form_field-wrapper">
                      <label htmlFor="Budget" className="form_field-label">
                        What is your Estimated budget?
                        <br />
                      </label>
                      <select id="Budget" name="Budget" data-name="Budget" required className="form_input w-select">
                        <option value="">Please select</option>
                        {contactForm.budget.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="form_field-desc">
                        <label htmlFor="Budget" className="text-size-tiny text-color-secondary">
                          {contactForm.budget.note}
                          <br />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form_field-wrapper">
                    <label htmlFor="Source" className="form_field-label">
                      How did you hear about me?
                    </label>
                    <div className="form_checkbox-layout">
                      {contactForm.source.options.map((option) => (
                        <label key={option} className="form_pill-checkbox w-radio">
                          <div className="form_pill-check w-radio-input" />
                          <input type="radio" data-name="Source" id={option.replace(/\s+/g, "-")} name="Source" style={{ opacity: 0, position: "absolute", zIndex: -1 }} value={option} onChange={handleRadioChange} />
                          <span className="w-form-label">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form_cta-wrapper">
                    <input type="submit" data-wait="Please wait..." data-audio={audio.hover} className="button is-small w-button" value="Submit" />
                  </div>
                </form>
                <div className="form_message-success-wrapper w-form-done">
                  <div className="form_message-success">
                    <div className="success-text">{contactForm.success}</div>
                  </div>
                </div>
                <div className="form_message-error-wrapper w-form-fail">
                  <div className="form_message-error">
                    <div className="error-text">{contactForm.error}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
