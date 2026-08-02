"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, Observer } from "@/lib/gsap";
import { navLinks, brand, socials } from "@/data/site";
import SoundButton from "./SoundButton";
import Clock from "./Clock";
import { WebflowBadge } from "./shared";

function Logo({ className }: { className?: string }) {
  const isAnimation = className?.includes("is-animation");
  return (
    <div className={`navbar_logo ${className ?? ""}`}>
      {isAnimation ? brand.logoEnd : brand.logoStart}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    if (!root || !overlay) return;
    const bg = overlay.querySelector(".navbar_h-menu-bg-wrapper");
    const bgSecond = overlay.querySelector(".navbar_h-menu-bg.is-second");
    const menu = overlay.querySelector(".navbar_h-menu-inner");
    const links = overlay.querySelectorAll(".navbar_h-link");
    const lines = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".menu-icon_line-top, .menu-icon_line-middle-inner, .menu-icon_line-bottom"));

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(bg, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: "power2.inOut" })
      .fromTo(bgSecond, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.4")
      .fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.4")
      .fromTo(links, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.35")
      .to(lines[0], { rotate: 45, y: 4, duration: 0.35 }, 0)
      .to(lines[1], { scaleX: 0, duration: 0.3 }, 0)
      .to(lines[2], { rotate: -45, y: -4, duration: 0.35 }, 0);
    tl.eventCallback("onStart", () => gsap.set(overlay, { display: "block" }));
    tl.eventCallback("onReverseComplete", () => gsap.set(overlay, { display: "none" }));
    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    if (!root || !overlay) return;
    const cleanup: Array<() => void> = [];
    [root, overlay].forEach((scope) => {
      scope.querySelectorAll(".navbar_logo-link").forEach((link) => {
        const logo = link.querySelector(".navbar_logo.is-animation");
        if (!logo) return;
        const onEnter = () =>
          gsap.to(logo, {
            duration: 0.5,
            scrambleText: { text: "encutescu", chars: "110101110", speed: 0.3 },
          });
        const onLeave = () =>
          gsap.to(logo, {
            duration: 0.5,
            scrambleText: { text: brand.logoEnd, chars: "110101110", speed: 0.3 },
          });
        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        cleanup.push(() => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        });
      });
    });
    return () => cleanup.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const menu = root.querySelector(".navbar_menu");
    const linkBg = root.querySelector(".navbar_link-bg");
    if (!menu || !linkBg) return;
    let hasHoveredBefore = false;
    const links = menu.querySelectorAll<HTMLElement>(".navbar_link");

    const positionVars = (link: HTMLElement) => {
      const linkRect = link.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      return {
        x: linkRect.left - menuRect.left,
        width: linkRect.width,
        height: linkRect.height,
        borderRadius: "0.25rem",
        border: "1px solid rgba(239, 239, 230, 0.20)",
        background: "rgba(239, 239, 230, 0.05)",
        backdropFilter: "blur(100px)",
      };
    };

    const cleanup: Array<() => void> = [];
    links.forEach((link) => {
      const onEnter = () => {
        const vars = positionVars(link);
        if (!hasHoveredBefore) {
          gsap.set(linkBg, vars);
          hasHoveredBefore = true;
        }
        gsap.to(linkBg, { ...vars, duration: 0.4, ease: "expo.out" });
      };
      const onLeave = () => {
        gsap.to(linkBg, {
          borderRadius: 0,
          border: "none",
          background: "transparent",
          backdropFilter: "none",
          duration: 0.4,
          ease: "expo.out",
        });
      };
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      cleanup.push(() => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    const onMenuLeave = () => {
      gsap.to(linkBg, {
        background: "transparent",
        border: "none",
        backdropFilter: "none",
        duration: 0,
        ease: "expo.out",
      });
    };
    menu.addEventListener("mouseleave", onMenuLeave);
    cleanup.push(() => menu.removeEventListener("mouseleave", onMenuLeave));
    return () => cleanup.forEach((fn) => fn());
  }, []);

  const runTimeline = (open: boolean) => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.timeScale(1).play();
    else tl.timeScale(1.4).reverse();
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !openRef.current;
    openRef.current = next;
    setMenuOpen(next);
    runTimeline(next);
  };

  const closeMenu = () => {
    if (!openRef.current) return;
    openRef.current = false;
    setMenuOpen(false);
    runTimeline(false);
  };

  useEffect(() => {
    if (!openRef.current) return;
    openRef.current = false;
    tlRef.current?.timeScale(1.4).reverse();
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const menuButton = root.querySelector<HTMLElement>(".navbar_h-menu-button");
    const navbarInner = root.querySelector<HTMLElement>(".navbar_inner");
    if (!menuButton || !navbarInner) return;

    navbarInner.style.willChange = "transform";
    let isNavbarHidden = false;
    let currentTimeline: gsap.core.Timeline | null = null;

    const downTimeline = gsap.timeline({ paused: true });
    downTimeline.to(navbarInner, { duration: 0.4, y: "-110%", ease: "expo.out" }, "+=0.2");
    if (window.innerWidth > 1280) {
      downTimeline
        .set(menuButton, { display: "flex" }, ">")
        .fromTo(menuButton, { scale: 0 }, { duration: 0.3, scale: 1, ease: "expo.out" }, ">0.05");
    }

    const upTimeline = gsap.timeline({ paused: true });
    if (window.innerWidth > 1280) {
      upTimeline.to(menuButton, {
        duration: 0.3,
        scale: 0,
        ease: "expo.out",
        onComplete: () => {
          menuButton.style.display = "none";
        },
      });
    }
    upTimeline.to(navbarInner, { duration: 0.4, y: "0%", ease: "expo.out" }, "+=0.2");

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => {
        if (!isNavbarHidden) {
          currentTimeline?.kill();
          downTimeline.restart();
          currentTimeline = downTimeline;
          isNavbarHidden = true;
        }
      },
      onUp: () => {
        if (isNavbarHidden) {
          currentTimeline?.kill();
          upTimeline.restart();
          currentTimeline = upTimeline;
          isNavbarHidden = false;
        }
      },
    });

    return () => {
      observer.kill();
      downTimeline.kill();
      upTimeline.kill();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const navbarInner = root.querySelector<HTMLElement>(".navbar_inner");
    if (!navbarInner) return;

    const updateNavbarStyle = () => {
      if (window.scrollY === 0) {
        gsap.to(navbarInner, {
          duration: 0.4,
          ease: "expo.out",
          borderRadius: "0rem",
          margin: "0rem",
          borderTopColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "#444",
        });
      } else {
        gsap.to(navbarInner, {
          duration: 0.4,
          ease: "expo.out",
          borderRadius: "0.5rem",
          margin: "0.5rem",
          borderColor: "#444",
        });
      }
    };

    updateNavbarStyle();
    window.addEventListener("scroll", updateNavbarStyle);
    return () => window.removeEventListener("scroll", updateNavbarStyle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div ref={rootRef} className="navbar_component w-nav">
        <div className="navbar_inner">
          <div className="padding-global">
            <div className="navbar_layout">
              <div className="navbar_logo-wrapper">
                <Link
                  href="/"
                  aria-current={isActive("/") ? "page" : undefined}
                  data-audio="https://bjornflow-assets.b-cdn.net/Audio/buttons%20scramble.wav"
                  className="navbar_logo-link w-nav-brand"
                >
                  <Logo />
                  <Logo className="is-animation" />
                </Link>
              </div>

              <nav role="navigation" className="navbar_menu w-nav-menu">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    data-color="#ffffff"
                    data-audio="https://bjornflow-assets.b-cdn.net/Audio/button%20hover.wav"
                    className="navbar_link w-inline-block"
                  >
                    <div className="text-size-small text-weight-normal text-style-allcaps">{link.label}</div>
                  </Link>
                ))}
                <div className="navbar_link-bg" />
              </nav>

              <div className="navbar_right-wrapper">
                <div className="navbar_local-component">
                  <div className="navbar_icons-wrapper hide-mobile-portrait">
                    <SoundButton />
                  </div>
                  <div className="navbar_local-time">
                    <div id="nav-time" className="text-size-regular text-weight-light">
                      <Clock />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#"
          data-audio-click="https://bjornflow-assets.b-cdn.net/Audio/close-menu.wav"
          data-audio="https://bjornflow-assets.b-cdn.net/Audio/button%20hover.wav"
          className="navbar_h-menu-button w-inline-block"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="menu-icon is-close">
            <div className="menu-icon_line-top" />
            <div className="menu-icon_line-middle">
              <div className="menu-icon_line-middle-inner" />
            </div>
            <div className="menu-icon_line-bottom" />
          </div>
          <div className="navbar_h-open" />
          <div className="navbar_h-close" />
        </a>
      </div>

      <div ref={overlayRef} className="navbar_h-menu-component">
        <div className="navbar_h-menu-inner">
          <div className="navbar_h-menu">
            <div className="navbar_h-logo-wrapper">
              <Link
                href="/"
                data-audio="https://bjornflow-assets.b-cdn.net/Audio/buttons%20scramble.wav"
                className="navbar_logo-link w-nav-brand"
              >
                <Logo />
                <Logo className="is-animation" />
              </Link>
            </div>
            <nav role="navigation" className="navbar_h-menu-wrapper w-nav-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  data-menu-tab={link.href.replace("/", "")}
                  data-color="#ffffff"
                  data-audio="https://bjornflow-assets.b-cdn.net/Audio/button%20hover.wav"
                  className="navbar_h-link w-inline-block"
                >
                  <div menu-link="number" className="navbar_h-link-number">
                    <div className="text-caption-2">{link.index}</div>
                  </div>
                  <div menu-link="text" className="heading-style-h1">
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>
            <div className="navbar_h-bottom">
              <div className="home-header_badge-component">
                <div className="navbar_footer-line">
                  <div className="navbar_footer-line-bg" />
                </div>
                <div className="nav_badge-icon-wrapper">
                  <div className="navbar_footer-asterisk w-embed" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 17" fill="none" preserveAspectRatio="xMidYMid meet">
                      <path d="M2.41002 14.2237L13.7237 2.91001M0 8.54529H16M8.0453 16.5V0.5M2.36688 2.91001L13.6806 14.2237" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div menu-link="misc">
                <WebflowBadge href={socials.webflowPartner} />
              </div>
              <div menu-link="misc" className="navbar_local-component is-menu">
                <div className="navbar_icons-wrapper">
                  <SoundButton />
                </div>
                <div id="menu-time" className="text-size-regular text-weight-light">
                  <Clock />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar_h-menu-bg-wrapper">
          <div className="navbar_h-menu-bg is-second" />
        </div>
        <div className="navbar_h-bg-close" onClick={closeMenu} />
      </div>
    </>
  );
}
