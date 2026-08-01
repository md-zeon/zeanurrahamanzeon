"use client";

import Link from "next/link";
import { useEffect } from "react";
import { brand, footer, socials } from "@/data/site";
import Clock from "./Clock";

function WebflowLogo() {
  return (
    <div className="icon-embed-xxsmall w-embed" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 10" fill="none" preserveAspectRatio="xMidYMid meet">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0004 0L10.9622 10H6.22988L8.33836 5.85558H8.24379C6.50429 8.14825 3.90892 9.6575 0.210938 10V5.91292C0.210938 5.91292 2.57662 5.77108 3.96735 4.2865H0.210938V7.51019e-05H4.43273V3.52558L4.5275 3.52525L6.25266 7.51019e-05H9.44554V3.50325L9.54027 3.50308L11.3302 0H16.0004Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  useEffect(() => {
    const year = document.querySelector(".footer_year");
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  const columns = [
    { title: "Overview", links: footer.overview, start: 1 },
    { title: "Case Studies", links: footer.caseStudies, start: 5 },
    { title: "Connect", links: footer.connect, start: 9 },
  ];

  return (
    <footer className="footer_component">
      <div className="padding-global is-bigger">
        <div className="footer_comp">
          <div className="container-large">
            <div className="footer_layout">
              <div className="footer_top-layout">
                <div className="w-layout-grid footer_top-wrapper">
                  <div className="footer_left-wrapper">
                    <div className="footer_logo-link-wrapper">
                      <Link href="/" className="navbar_logo-link w-nav-brand">
                        <div className="navbar_logo">{brand.logoStart}</div>
                        <div className="navbar_logo is-animation">{brand.logoEnd}</div>
                      </Link>
                    </div>
                    <div className="footer_tag">
                      <div className="align-right">
                        <a href={socials.webflowPartner} target="_blank" className="home-header_badge-link w-inline-block">
                          <WebflowLogo />
                          <div className="text-size-small text-weight-medium text-style-allcaps">Webflow Certified Partner</div>
                        </a>
                      </div>
                      <div className="logos_element-line">
                        <div className="testimonial_line-bg" />
                      </div>
                    </div>
                    <div className="footer_menu-wrapper">
                      {columns.map((col) => (
                        <div key={col.title} className="footer_link-column">
                          <div className="footer_link-header">
                            <div className="heading-style-h6 text-color-teritary">{col.title}</div>
                          </div>
                          <div className="footer_link-list">
                            {col.links.map((link, i) => (
                              <a key={link.href} href={link.href} className="footer_link w-inline-block">
                                <div className="text-caption-2 text-color-teritary">[{String(col.start + i).padStart(2, "0")}]</div>
                                <div className="text-size-small text-style-allcaps">{link.label}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="footer_link-column">
                        <div className="footer_link-header">
                          <div className="heading-style-h6 text-color-teritary">Connect</div>
                        </div>
                        <div className="footer_link-wrapper">
                          <div className="footer_link-list">
                            {footer.connect.map((link, i) => (
                              <a key={link.href} href={link.href} target="_blank" className="footer_link w-inline-block">
                                <div className="text-caption-2 text-color-teritary">[{String(9 + i).padStart(2, "0")}]</div>
                                <div className="text-size-small text-style-allcaps">{link.label}</div>
                              </a>
                            ))}
                          </div>
                          <div className="footer_link-list">
                            {footer.connectMore.map((link, i) => (
                              <a key={link.href} href={link.href} target="_blank" className="footer_link w-inline-block">
                                <div className="text-caption-2 text-color-teritary">[{String(13 + i).padStart(2, "0")}]</div>
                                <div className="text-size-small text-style-allcaps">{link.label}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer_divider" />
                <div className="footer_bottom-wrapper">
                  <div className="text-size-small text-color-teritary">
                    © <span className="footer_year">2024</span> {brand.logoStart}{brand.logoEnd}. All rights reserved.
                  </div>
                  <div className="footer_local-time">
                    <div id="footer-time" className="text-size-small text-color-teritary">
                      <Clock />
                    </div>
                  </div>
                  <div className="w-layout-grid footer_legal-list">
                    <Link href="/privacy-policy" className="footer_legal-link w-inline-block">
                      <div className="text-size-small text-color-teritary">Privacy Policy</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer_line w-embed" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 26 734" fill="none" preserveAspectRatio="xMidYMid meet">
                <path d="M1 734C1.00001 458.764 1.00002 304.451 1.00003 29.2154L25 1" stroke="currentColor" />
              </svg>
            </div>
            <div className="footer_line is-right w-embed" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 734" fill="none" preserveAspectRatio="xMidYMid meet">
                <path d="M17.0001 734L17 19.6102L1 1" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
