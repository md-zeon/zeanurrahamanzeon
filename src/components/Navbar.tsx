"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, Observer } from "@/lib/gsap";
import { navLinks, brand, socials, audio } from "@/data/site";
import SoundButton from "./SoundButton";
import Clock from "./Clock";
import { CredentialBadge } from "./shared";

/**
 * Fixed site header with two distinct states:
 *  - Desktop/wide: logo + inline nav with a moving "pill" highlight on hover.
 *  - Mobile: hamburger button that opens a right-side drawer (slides in from
 *    the right, links stagger up, icon morphs into an X). The drawer sits
 *    above the header bar, and the header's own logo/clock/sound are
 *    duplicated inside it, so the drawer is self-contained.
 *
 * Other behaviours: the logo's second word scrambles on hover, the navbar
 * hides on scroll-down and reappears on scroll-up, its shape/border changes
 * once the page is scrolled, and body scroll is locked for as long as the
 * drawer is animating open/closed (unlocked only once it fully closes).
 */

/** One half of the two-tone logo (start = first word, is-animation = second). */
function Logo({ className }: { className?: string }) {
  const isAnimation = className?.includes("is-animation");
  return (
    <div
      className={`navbar_logo font-brockmann text-[1.5rem] font-normal leading-[100%] text-brand-white no-underline max-[767px]:text-[1.25rem] ${className ?? ""}`}
    >
      {isAnimation ? brand.logoEnd : brand.logoStart}
    </div>
  );
}

const menuIconLine = "h-[0.125rem] w-[1.2rem]";

/** Focusable elements inside the sheet, used by the Tab focus trap. */
const SHEET_FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLAnchorElement>(null);
  // Paused timelines built once and (re)played/reversed by the open/close logic.
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const iconTlRef = useRef<gsap.core.Timeline | null>(null);
  // Mirror of `menuOpen` so imperative handlers don't read stale state.
  const openRef = useRef(false);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build the mobile menu + hamburger-icon timelines once. The sheet is
  // display:none until the timeline starts and hidden again after it fully
  // reverses. The drawer slides in from the right as a single panel (the
  // yellow/purple layers are its own background), then the links stagger up.
  // Scroll lock is tied to the actual animation so the page only unlocks once
  // the drawer has closed. The icon morph is a separate timeline so the X
  // stays put until the drawer is fully closed.
  useEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    const button = menuButtonRef.current;
    if (!root || !overlay || !button) return;
    const reduced = prefersReducedMotion();
    const d = (n: number) => (reduced ? 0.001 : n);

    const menu = overlay.querySelector(".navbar_h-menu-inner");
    const links = overlay.querySelectorAll(".navbar_h-link");
    const lines = gsap.utils.toArray<HTMLElement>(
      button.querySelectorAll(
        ".menu-icon_line-top, .menu-icon_line-middle, .menu-icon_line-bottom",
      ),
    );

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      menu,
      { xPercent: 100 },
      { xPercent: 0, duration: d(0.6), ease: "power2.inOut" },
    ).fromTo(
      links,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: d(0.5),
        stagger: d(0.06),
        ease: "power3.out",
      },
      "-=0.35",
    );
    tl.eventCallback("onStart", () => {
      gsap.set(overlay, { display: "block" });
      document.body.style.overflow = "hidden";
    });
    tl.eventCallback("onReverseComplete", () => {
      gsap.set(overlay, { display: "none" });
      document.body.style.overflow = "";
      iconTlRef.current?.reverse();
      menuButtonRef.current?.focus();
    });
    tlRef.current = tl;

    // Hamburger lines -> X, played with a small delay so the X forms as the
    // sheet appears; reversed only after the sheet fully closes. Each line is
    // translated exactly one spacing unit (line height 2px + gap 4px = 6px)
    // toward the icon center so both rotated midpoints meet at the exact
    // center point -> a symmetric, perfectly-aligned cross.
    const iconTl = gsap.timeline({ paused: true, delay: reduced ? 0 : 0.15 });
    iconTl
      .to(
        lines[0],
        { rotate: 45, y: 6, duration: d(0.35), ease: "expo.out" },
        0,
      )
      .to(lines[1], { scaleX: 0, duration: d(0.3), ease: "expo.out" }, 0)
      .to(
        lines[2],
        { rotate: -45, y: -6, duration: d(0.35), ease: "expo.out" },
        0,
      );
    iconTlRef.current = iconTl;

    return () => {
      tl.kill();
      iconTl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  // Scramble the second logo word ("is-animation") on hover in both the
  // topbar and the menu overlay.
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
            scrambleText: {
              text: "rahamanzeon",
              chars: "1101011101",
              speed: 0.3,
            },
          });
        const onLeave = () =>
          gsap.to(logo, {
            duration: 0.5,
            scrambleText: {
              text: brand.logoEnd,
              chars: "110101110",
              speed: 0.3,
            },
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

  // Desktop nav link hover: slide a rounded "pill" background behind the
  // hovered link. First hover sets it in place, later hovers animate it.
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

    // Leaving the whole menu bar clears the pill instantly.
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

  const openMenu = useCallback(() => {
    openRef.current = true;
    setMenuOpen(true);
    tlRef.current?.timeScale(1).play();
    iconTlRef.current?.timeScale(1).play();
    requestAnimationFrame(() => {
      overlayRef.current?.focus();
    });
  }, []);

  // Closing only reverses the sheet; the icon reverts and focus returns once
  // the sheet has fully slid out (see onReverseComplete above).
  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setMenuOpen(false);
    tlRef.current?.timeScale(1.4).reverse();
  }, []);

  const toggleMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (openRef.current) closeMenu();
      else openMenu();
    },
    [closeMenu, openMenu],
  );

  // Close the menu automatically whenever navigation happens.
  useEffect(() => {
    if (openRef.current) closeMenu();
  }, [pathname, closeMenu]);

  // Escape closes the sheet; Tab is trapped inside it while it is open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!openRef.current) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusables = Array.from(
        overlay.querySelectorAll<HTMLElement>(SHEET_FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      // If focus isn't on one of the sheet's own focusables (e.g. the dialog
      // itself, right after opening), pull it back inside.
      const insideList = focusables.includes(active as HTMLElement);
      if (e.shiftKey && (active === first || !insideList)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !insideList)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  // Rolling text hover on the sheet links: two stacked copies of the label
  // inside an overflow-hidden mask; on hover/focus the top copy slides up and
  // the bottom copy slides in from below.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (prefersReducedMotion()) return;

    const links = overlay.querySelectorAll<HTMLElement>(".navbar_h-link");
    const cleanup: Array<() => void> = [];

    links.forEach((link) => {
      const copies = link.querySelectorAll<HTMLElement>(
        ".navbar_h-link-text-copy",
      );
      if (copies.length < 2) return;
      const [top, bottom] = copies;

      const tl = gsap.timeline({ paused: true });
      tl.to(top, { yPercent: -100, duration: 0.5, ease: "expo.out" }, 0).fromTo(
        bottom,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.5, ease: "expo.out" },
        0,
      );

      const play = () => tl.timeScale(1).play();
      const replay = () => tl.timeScale(1).reverse();

      link.addEventListener("mouseenter", play);
      link.addEventListener("mouseleave", replay);
      link.addEventListener("focusin", play);
      link.addEventListener("focusout", replay);
      cleanup.push(() => {
        link.removeEventListener("mouseenter", play);
        link.removeEventListener("mouseleave", replay);
        link.removeEventListener("focusin", play);
        link.removeEventListener("focusout", replay);
        tl.kill();
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  // Hide-on-scroll-down / reveal-on-scroll-up for the header bar. On wide
  // screens the hamburger button pops in while hidden so the menu stays
  // reachable. Skipped entirely while the sheet is open or when reduced
  // motion is requested.
  useEffect(() => {
    const root = rootRef.current;
    const menuButton = menuButtonRef.current;
    const navbarInner = root?.querySelector<HTMLElement>(".navbar_inner");
    if (!root || !menuButton || !navbarInner) return;
    if (prefersReducedMotion()) return;

    navbarInner.style.willChange = "transform";
    let isNavbarHidden = false;
    let currentTimeline: gsap.core.Timeline | null = null;

    const downTimeline = gsap.timeline({ paused: true });
    downTimeline.to(
      navbarInner,
      { duration: 0.4, y: "-110%", ease: "expo.out" },
      "+=0.2",
    );
    if (window.innerWidth > 1280) {
      downTimeline
        .set(menuButton, { display: "flex" }, ">")
        .fromTo(
          menuButton,
          { scale: 0 },
          { duration: 0.3, scale: 1, ease: "expo.out" },
          ">0.05",
        );
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
    upTimeline.to(
      navbarInner,
      { duration: 0.4, y: "0%", ease: "expo.out" },
      "+=0.2",
    );

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => {
        if (openRef.current) return;
        if (!isNavbarHidden) {
          currentTimeline?.kill();
          downTimeline.restart();
          currentTimeline = downTimeline;
          isNavbarHidden = true;
        }
      },
      onUp: () => {
        if (openRef.current) return;
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

  // Morph the header from a flat full-width bar (at top of page) into a
  // rounded floating card once the user scrolls.
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div ref={rootRef} className="fixed inset-x-0 top-0 z-9999 w-nav">
        <div className="navbar_inner fixed inset-x-0 top-0 z-2 border border-transparent border-b-white-20 bg-brand-black">
          <div className="padding-global">
            <div className="relative grid h-full w-full grid-cols-[.5fr_auto] items-center justify-between gap-4 py-4 desktop:grid-cols-[.5fr_auto_.55fr] wide:grid-cols-[.4fr_auto_.4fr] max-[991px]:flex max-[991px]:grid-cols-[.25fr_1fr] max-[767px]:py-[1.1rem] max-[479px]:py-[1.4rem]">
              <div>
                <Link
                  href="/"
                  aria-current={isActive("/") ? "page" : undefined}
                  data-audio={audio.scramble}
                  className="navbar_logo-link flex w-nav-brand flex-row pl-0"
                >
                  <Logo />
                  <Logo className="is-animation" />
                </Link>
              </div>

              <nav
                role="navigation"
                className="navbar_menu relative flex gap-2 max-[991px]:absolute max-[991px]:flex max-[991px]:w-full max-[991px]:justify-center max-[991px]:overflow-auto max-[991px]:border-b max-[991px]:border-neutral-black max-[991px]:bg-brand-black max-[991px]:px-[5%] max-[991px]:pt-4 max-[991px]:pb-10 w-nav-menu"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    data-color="#ffffff"
                    data-audio={audio.hover}
                    className="navbar_link relative z-1 flex items-center justify-center gap-2 rounded-full px-5 py-[0.6rem] text-brand-white desktop:cursor-pointer desktop:px-6 desktop:static max-[991px]:py-3 max-[991px]:text-center max-[991px]:text-[1.125rem] w-inline-block"
                  >
                    <div className="text-size-small text-weight-normal text-style-allcaps">
                      {link.label}
                    </div>
                  </Link>
                ))}
                <div className="navbar_link-bg absolute left-0 top-0 z-0 h-full w-full rounded-[0.25rem] border-0 bg-transparent" />
              </nav>

              <div className="flex gap-4 pr-20 desktop:pr-0 max-[991px]:items-center max-[767px]:pr-16">
                <div className="flex items-center justify-end gap-4 max-[767px]:gap-2">
                  <div className="flex gap-2 max-[479px]:hidden">
                    <SoundButton />
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <div
                      id="nav-time"
                      className="text-size-regular text-weight-light"
                    >
                      <Clock />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        ref={menuButtonRef}
        href="#"
        data-audio-click={audio.closeMenu}
        data-audio={audio.hover}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="navbar_h-menu-button fixed right-6 top-3 z-10001 flex items-center justify-center rounded-full border border-white-20 bg-black-30 p-2 shadow-[inset_0_0_0_1000px_#0a090e33] backdrop-blur-[100px] desktop:hidden desktop:top-6 max-[767px]:right-4 max-[767px]:top-[0.8rem] w-inline-block"
        onClick={toggleMenu}
      >
        <div className="relative z-1 flex h-8 w-8 flex-col items-center justify-center gap-1 max-[767px]:h-[1.7rem] max-[767px]:w-[1.7rem]">
          <div
            className={`${menuIconLine} menu-icon_line-top bg-neutral-white`}
          />
          <div
            className={`${menuIconLine} menu-icon_line-middle bg-brand-white`}
          />
          <div
            className={`${menuIconLine} menu-icon_line-bottom bg-neutral-white`}
          />
        </div>
      </a>

      <div
        ref={overlayRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        className="fixed inset-0 z-10000 hidden h-screen w-screen overflow-hidden focus:outline-none"
      >
        <div className="navbar_h-menu-inner absolute inset-y-0 right-0 z-2 h-screen w-full max-w-180 overflow-hidden max-[991px]:max-w-120 max-[767px]:max-w-[20rem]">
          <div className="navbar_h-menu-bg-wrapper absolute inset-0 z-0 overflow-hidden">
            <div className="navbar_h-menu-bg absolute inset-0 z-0 bg-brand-yellow [clip-path:polygon(100%_0,100%_100%,4%_100%,4%_85%,0_82%,0_0)]" />
            <div className="navbar_h-menu-bg is-second absolute inset-0 z-0 bg-brand-purple [clip-path:polygon(100%_0,100%_100%,4%_100%,4%_85%,0_82%,0_0)]" />
          </div>
          <div className="relative z-2 flex h-screen flex-col items-start justify-start gap-4 overflow-y-auto pb-40 pl-14 pr-10 pt-[7rem] max-[767px]:px-6 max-[767px]:pb-44 max-[479px]:pt-[5.5rem]">
            <div className="absolute left-6 top-6 flex flex-col overflow-hidden pb-[0.2rem]">
              <Link
                href="/"
                data-audio={audio.scramble}
                className="navbar_logo-link flex w-nav-brand flex-row pl-0"
              >
                <Logo />
                <Logo className="is-animation" />
              </Link>
            </div>
            <div className="relative z-3 flex flex-col items-start justify-start gap-4 w-nav-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  data-menu-tab={link.href.replace("/", "")}
                  data-color="#ffffff"
                  data-audio={audio.hover}
                  className="navbar_h-link relative z-1 flex items-start justify-start gap-3 overflow-hidden px-0 py-0 text-brand-white font-features-['ss01'_on] max-[991px]:pr-1 w-inline-block"
                >
                  <div
                    menu-link="number"
                    className="navbar_h-link-number pt-[0.4rem]"
                  >
                    <div className="text-caption-2">{link.index}</div>
                  </div>
                  <div
                    menu-link="text"
                    className="navbar_h-link-text relative overflow-hidden"
                  >
                    <span className="navbar_h-link-text-copy block whitespace-nowrap heading-style-h1">
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="navbar_h-link-text-copy absolute left-0 top-full block whitespace-nowrap heading-style-h1"
                    >
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="navbar_h-bottom absolute bottom-6 left-20 right-10 z-2 grid grid-cols-2 items-end justify-between gap-2 max-[991px]:flex max-[991px]:flex-col max-[991px]:items-stretch max-[767px]:flex max-[767px]:flex-wrap max-[767px]:items-stretch max-[767px]:left-12 max-[479px]:left-12">
              <div className="badge">
                <div className="relative h-[0.06rem] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-brand-white" />
                </div>
              </div>
              <div menu-link="misc">
                <CredentialBadge href={socials.github} />
              </div>
              <div
                menu-link="misc"
                className="flex items-center justify-end gap-4 pr-6 max-[991px]:justify-start max-[991px]:pr-0 max-[767px]:w-full max-[767px]:justify-between max-[767px]:gap-2"
              >
                <div className="flex gap-2">
                  <SoundButton />
                </div>
                <div
                  id="menu-time"
                  className="text-size-regular text-weight-light"
                >
                  <Clock />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="navbar_h-bg-close absolute inset-0 z-1 h-full w-full bg-[#0000001a] backdrop-blur-[5px]"
          onClick={closeMenu}
        />
      </div>
    </>
  );
}
