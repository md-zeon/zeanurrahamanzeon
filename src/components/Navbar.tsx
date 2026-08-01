"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { navLinks, brand } from "@/data/site";
import { playSound } from "@/lib/sound";
import SoundButton from "./SoundButton";
import Clock from "./Clock";

function Logo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".navbar_logo-word");
    const tl = gsap.timeline({ paused: true });
    tl.to(words, { yPercent: -105, duration: 0.4, stagger: 0.05, ease: "power2.inOut" });
    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`navbar_logo ${className ?? ""}`}>
      {[brand.logoStart, brand.logoEnd].map((word, i) => (
        <span key={i} className="navbar_logo-word">
          {word}
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bg = root.querySelector(".navbar_h-menu-bg-wrapper");
    const bgSecond = root.querySelector(".navbar_h-menu-bg.is-second");
    const menu = root.querySelector(".navbar_h-menu-inner");
    const links = root.querySelectorAll(".navbar_h-link");
    const misc = root.querySelectorAll(".navbar_h-menu [data-menu-misc]");
    const lines = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".menu-icon_line-top, .menu-icon_line-middle-inner, .menu-icon_line-bottom"));

    const tl = gsap.timeline({ paused: true });
    tl.set(root, { pointerEvents: "none" })
      .set(menu, { display: "none" })
      .to(bg, { xPercent: 0, duration: 0, ease: "none" })
      .add(() => gsap.set(menu, { display: "block" }))
      .fromTo(bg, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: "power2.inOut" })
      .fromTo(bgSecond, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.4")
      .fromTo(menu, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
      .from(links, { yPercent: 110, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.25")
      .from(misc, { opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.3")
      .to(lines[0], { rotate: 45, y: 4, duration: 0.35 }, 0)
      .to(lines[1], { scaleX: 0, duration: 0.3 }, 0)
      .to(lines[2], { rotate: -45, y: -4, duration: 0.35 }, 0);
    tlRef.current = tl;

    return () => {
      tl.kill();
    };
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

  const handleEnter = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const target = el.querySelector(".navbar_link-bg") as HTMLElement;
    if (target) gsap.fromTo(target, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    playSound("https://bjornflow-assets.b-cdn.net/Audio/button%20hover.wav", 0.5);
  };

  const handleLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const target = el.querySelector(".navbar_link-bg") as HTMLElement;
    if (target) gsap.to(target, { scaleX: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  };

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
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    <div className="text-size-small text-weight-normal text-style-allcaps">{link.label}</div>
                    <div className="navbar_link-bg" />
                  </Link>
                ))}
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar_h-menu-component">
        <div className="navbar_h-menu-inner">
          <div className="navbar_h-menu">
            <div className="navbar_h-logo-wrapper">
              <Logo />
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
              <div className="navbar_footer-line">
                <div className="navbar_footer-line-bg" />
              </div>
              <div className="navbar_footer-asterisk w-embed" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 17" fill="none" preserveAspectRatio="xMidYMid meet">
                  <path d="M2.41002 14.2237L13.7237 2.91001M0 8.54529H16M8.0453 16.5V0.5M2.36688 2.91001L13.6806 14.2237" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div data-menu-misc className="navbar_local-component is-menu">
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
