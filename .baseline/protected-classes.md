# Protected Classes (grep-verified GSAP/JS hooks)

These class names are queried by GSAP/JS and MUST NOT be removed during consolidation.
Styling may move to inline utilities or @apply classes, but the names must survive.

## From components (querySelector / querySelectorAll / gsap)

- .logos_banner-layout (LogosBanner - marquee)
- .logos_banner-text.is-number (LogosBanner - scramble)
- .target-cursor-corner, .target-cursor-dot (Cursor)
- .w--redirected-checked (ContactForm - radio pill toggle)
- .form_pill-check (ContactForm)
- .w-form, .w-form-done (ContactForm)
- .contact_copy-icon (ContactForm - copy anim)
- .testimonial_photo, .testimonial_nav-wrapper, .testimonial_quote-layout, .testimonial_info-layout, .testimonial_nav-component (Testimonials)
- .footer_link, .footer_year (Footer - scramble + year)
- .about-story_grid, .about-story_left, #highlighted-text, #career-year (AboutStory)
- .badge-link (AboutHeader)
- .navbar_h-menu-bg-wrapper, .navbar_h-menu-bg.is-second, .navbar_h-menu-inner, .navbar_h-link, .menu-icon_line-top, .menu-icon_line-middle-inner, .menu-icon_line-bottom, .navbar_logo-link, .navbar_logo.is-animation, .navbar_menu, .navbar_link-bg, .navbar_link, .navbar_h-menu-button, .navbar_inner (Navbar)
- .home-projects_project, .home-projects_banner-component, .home-projects_nav-wrapper, .home-projects_nav-image-wrapper, .home-projects_track (HomeProjects / ExperimentsProjects)
- .faq_answer, .faq_icon-wrapper .icon-embed-small, .faq_question, .faq_question-wrapper, .faq_content, .faq_component, .faq_wrapper (FaqSection)
- .line-wrapper (SplitText runtime - created dynamically)
- .pin-spacer-projectsScroll (runtime - created by ScrollTrigger)
- .page-wrapper (SiteShell)

## Runtime / infrastructure (must stay as plain CSS)

- .w-\* (w-inline-block, w-button, w-form, w-input, w-select, w-radio, w-nav, w-layout-grid, w-embed, w-form-done, w-form-fail)
- .target-cursor-wrapper, .target-cursor-dot, .target-cursor-corner, .corner-tl/tr/br/bl, html.has-target-cursor
- .swiper-wrapper, .swiper-slide, .swiper-pagination-bullet, .swiper.about-card (Swiper runtime)
- .about-header_video-w, .about-fun_loop-asset-w (clip-path masks)
- .form_pill-check.w--redirected-checked (runtime radio)
- .footer_link-column.is-connect, .footer_local-time (w-node grid placement)
- .logos_element-component.is-faq (w-node justify-self)
- .navbar_menu (991 hide)
- .is-gsap-hidden, .pin-spacer, .hide, .hide-tablet, .hide-mobile-landscape, .hide-mobile
