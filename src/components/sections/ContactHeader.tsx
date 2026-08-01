import { contactHeader } from "@/data/contact";

export default function ContactHeader() {
  return (
    <header className="section_contact-header">
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="contact-header_wrapper">
            <div header-content-type="border" className="contact-header_border" />
            <div className="padding-top padding-section-large max-width-full">
              <div className="contact-header_component">
                <div className="w-layout-grid contact-header_content">
                  <div className="contact-header_content-up">
                    <div className="contact-header_header-component">
                      <div className="contact-header_header-layout">
                        <div className="contact-header_header-wrapper is-first">
                          <h1 id="home-hero-header-1" header-content-type="heading-1" className="heading-style-h0">
                            {contactHeader.title1}
                          </h1>
                        </div>
                        <div className="contact-header_header-wrapper is-middle">
                          <div id="home-hero-header-2" header-content-type="heading-2" className="heading-style-h0">
                            {contactHeader.title2}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-header_content-down">
                    <div className="contact-header_cta-layout">
                      <div className="contact-header_cta-wrapper">
                        <div id="home-header-p" header-content-type="paragraph" className="text-size-large">
                          {contactHeader.paragraph}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div header-content-type="border" className="home-header_border" />
            <div header-content-type="border" className="home-header_border is-bottom" />
            <div header-content-type="border" className="home-header_border is-right" />
          </div>
        </div>
      </div>
    </header>
  );
}
