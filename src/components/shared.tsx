"use client";

import Link from "next/link";
import Image from "next/image";
import { cta } from "@/data/home";
import { audio, photos } from "@/data/site";

/**
 * Small shared UI primitives used across sections:
 * decorative SVGs, the reusable `Button`, and a credential badge link.
 * Components are client components because they carry `data-audio` hooks
 * consumed by the global sound system.
 */

/** Decorative asterisk ("*") icon; purely presentational. */
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 16 17"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M2.41002 14.2237L13.7237 2.91001M0 8.54529H16M8.0453 16.5V0.5M2.36688 2.91001L13.6806 14.2237"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/** Inline credential mark (neutral asterisk glyph). */
export function CredentialIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`icon-embed-xxsmall ${className}`} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 16 17"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M2.41002 14.2237L13.7237 2.91001M0 8.54529H16M8.0453 16.5V0.5M2.36688 2.91001L13.6806 14.2237"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/** Diagonal arrow icon used in "View project" buttons. */
export function ArrowIcon({
  className = "btn__icon w-embed",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 14 14"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

/** Left or right arrow for slider prev/next controls. */
export function SliderArrow({ direction }: { direction: "left" | "right" }) {
  const d1 = direction === "left" ? "M38 24.7002H10" : "M10 24.7002H38";
  const d2 =
    direction === "left"
      ? "M24 38.7002L10 24.7002L24 10.7002"
      : "M24 10.7002L38 24.7002L24 38.7002";
  return (
    <div className="icon-embed-medium w-embed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 48 49"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d={d1}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={d2}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type SliderControlsProps = {
  /** Slot rendered in the right column (e.g. a CTA button). */
  right?: React.ReactNode;
  /** Total slide count, rendered server-side so the `[nn/total]` counter is
   * correct in the initial HTML (the JS hook re-sets it at runtime anyway). */
  total?: number;
};

/**
 * Shared slider controls bar: `[01/00]` counter + prev/next arrows + divider
 * + optional right-side CTA. The `data-slide-count` and `data-slider`
 * attributes wire up to `useLabSlider`.
 */
export function SliderControls({ right, total = 0 }: SliderControlsProps) {
  return (
    <div className="border-x border-border-tertiary">
      <div className="relative grid auto-cols-fr grid-cols-[1fr_1fr] items-center justify-between gap-0 border-r border-white-20 p-[1.8rem_1.5rem] max-[767px]:flex max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 max-[767px]:p-4 max-[479px]:flex-row max-[479px]:flex-wrap">
        <div className="flex w-full items-center justify-between pr-6 max-[767px]:order-1 max-[767px]:pr-0">
          <div className="flex items-center justify-start">
            <div className="text-size-large">[</div>
            <div data-slide-count="step" className="text-size-large">
              01
            </div>
            <div className="text-size-large">/</div>
            <div data-slide-count="total" className="text-size-large">
              {String(total).padStart(2, "0")}
            </div>
            <div className="text-size-large">]</div>
          </div>
          <div className="flex gap-2">
            <a
              data-slider="button-prev"
              data-audio={audio.hover}
              aria-label="previous slide"
              href="#"
              className="w-inline-block"
            >
              <SliderArrow direction="left" />
            </a>
            <a
              data-slider="button-next"
              data-audio={audio.hover}
              aria-label="next slide"
              href="#"
              className="w-inline-block"
            >
              <SliderArrow direction="right" />
            </a>
          </div>
        </div>
        <div className="absolute left-1/2 z-3 -ml-px h-full w-px bg-white-20 max-[767px]:hidden" />
        <div className="flex items-center justify-end max-[767px]:w-full max-[767px]:flex-col max-[767px]:items-stretch">
          {right}
        </div>
      </div>
    </div>
  );
}

type ChatWidgetProps = {
  /** className on the outer chat card div. */
  className?: string;
};

/**
 * Shared mock-chat widget markup used by both CTA sections. The message
 * element ids (`#cta-chat-*`) are consumed by `useCtaChat`.
 */
export function ChatWidget({ className }: ChatWidgetProps) {
  return (
    <div
      className={
        className ??
        "flex w-full max-w-95 flex-col gap-4 overflow-hidden rounded-lg border border-white-20 p-4 backdrop-blur-[100px] bg-[#efefe60d]"
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#413c4c]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
        </div>
        <div className="h-px w-full bg-[#ffffff1a]" />
      </div>
      <div className="flex items-center justify-start gap-2">
        <div className="h-8 w-8 flex-none overflow-hidden rounded-full">
          <Image
            src={photos.ellipseBlack}
            loading="lazy"
            alt=""
            className="h-full w-full object-cover"
            width={32}
            height={32}
          />
        </div>
        <div>
          <div className="text-[0.625rem] font-light leading-[120%] text-neutral-light-grey">
            {cta.chat.name}
          </div>
          <div className="text-size-small">{cta.chat.firstMessage}</div>
        </div>
      </div>
      <div className="cta_chat-divider is-1 h-px w-full bg-[#ffffff1a]" />
      <div className="cta_chat-content is-client is-1 flex items-center justify-end gap-2">
        <div className="flex flex-col items-end justify-end">
          <div className="overflow-hidden">
            <div
              id="cta-chat-partner-1"
              className="text-[0.625rem] font-light leading-[120%] text-neutral-light-grey"
            >
              {cta.chat.partnerName ?? "USER_1230"}
            </div>
          </div>
          <div id="cta-chat-p-1" className="text-size-small text-align-right">
            {cta.chat.partnerMessages[0]}
          </div>
        </div>
        <div
          id="cta-chat-partner-photo-1"
          className="flex h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full bg-brand-purple"
        >
          <div className="text-size-small">{cta.chat.partnerAvatar ?? "U"}</div>
        </div>
      </div>
      <div className="cta_chat-content is-client is-2 flex items-center justify-end gap-2">
        <div className="flex flex-col items-end justify-end">
          <div className="overflow-hidden">
            <div
              id="cta-chat-partner-2"
              className="text-[0.625rem] font-light leading-[120%] text-neutral-light-grey"
            >
              {cta.chat.partnerName ?? "USER_1230"}
            </div>
          </div>
          <div id="cta-chat-p-2" className="text-size-small text-align-right">
            {cta.chat.partnerMessages[1]}
          </div>
        </div>
        <div
          id="cta-chat-partner-photo-2"
          className="flex h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-full bg-brand-purple"
        >
          <div className="text-size-small">{cta.chat.partnerAvatar ?? "U"}</div>
        </div>
      </div>
      <div className="cta_chat-divider is-2 h-px w-full bg-[#ffffff1a]" />
      <div className="cta_chat-content is-1 flex items-center justify-start gap-2">
        <div
          id="cta-chat-me-photo-1"
          className="h-8 w-8 flex-none overflow-hidden rounded-full"
        >
          <Image
            src={photos.ellipseBlack}
            loading="lazy"
            alt=""
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="overflow-hidden">
            <div
              id="cta-chat-me-1"
              className="text-[0.625rem] font-light leading-[120%] text-neutral-light-grey"
            >
              {cta.chat.name}
            </div>
          </div>
          <div id="cta-chat-p-3" className="text-size-small">
            {cta.chat.myMessages[0]}
          </div>
        </div>
      </div>
      <div className="cta_chat-content is-2 flex items-center justify-start gap-2">
        <div
          id="cta-chat-me-photo-2"
          className="h-8 w-8 flex-none overflow-hidden rounded-full"
        >
          <Image
            width={32}
            height={32}
            src={photos.ellipseBlack}
            loading="lazy"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="overflow-hidden">
            <div
              id="cta-chat-me-2"
              className="text-[0.625rem] font-light leading-[120%] text-neutral-light-grey"
            >
              {cta.chat.name}
            </div>
          </div>
          <div id="cta-chat-p-4" className="text-size-small">
            {cta.chat.myMessages[1]}
          </div>
        </div>
      </div>
      <div className="cta_chat-cta flex items-center justify-end gap-2 max-[479px]:flex-wrap">
        <a
          id="cta-chat-button-1"
          data-audio={audio.hover}
          href="#"
          className="btn btn-secondary btn-chat"
        >
          <div className="btn__text">{cta.chat.buttons[0]}</div>
        </a>
        <a
          id="cta-chat-button-2"
          data-audio={audio.hover}
          href="#"
          className="btn btn-secondary btn-chat"
        >
          <div className="btn__text">{cta.chat.buttons[1]}</div>
        </a>
      </div>
    </div>
  );
}

type BadgeProps = {
  href: string;
  badge: string;
  /** Text class for the badge label; defaults to `text-size-small`. */
  labelClassName?: string;
};

/** Shared inner content (icon + label) for the badge link variants. */
function BadgeLinkContent({
  label,
  labelClassName,
}: {
  label: string;
  labelClassName?: string;
}) {
  return (
    <>
      <CredentialIcon />
      <div
        className={
          labelClassName ??
          "text-size-small text-weight-medium text-style-allcaps"
        }
      >
        {label}
      </div>
    </>
  );
}

/**
 * Reusable badge with asterisk icon, animated line, and credential link.
 * Renders a real `<a>` with `target="_blank"` for external URLs and a Next
 * `<Link>` for internal routes, matching the `Button` component's behaviour.
 * Used in page headers with `header-content-type` attributes for animation.
 */
export function Badge({ href, badge, labelClassName }: BadgeProps) {
  return (
    <div className="badge">
      <div className="badge__icon-wrapper">
        <div
          id="home-hero-asterisk"
          header-content-type="asterisk"
          className="badge__icon w-embed"
        >
          <Asterisk />
        </div>
      </div>
      <div className="badge__line">
        <div header-content-type="line-bg" className="badge__line-bg" />
      </div>
      {href.startsWith("http") ? (
        <a
          data-audio={audio.scramble}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="badge-link"
        >
          <BadgeLinkContent label={badge} labelClassName={labelClassName} />
        </a>
      ) : (
        <Link
          data-audio={audio.scramble}
          href={href}
          className="badge-link"
        >
          <BadgeLinkContent label={badge} labelClassName={labelClassName} />
        </Link>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
  target?: string;
  /** Hover sound played via `data-audio`, matched by the global sound system. */
  dataAudio?: string;
  /** Optional click handler passed through to the anchor/link. */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Reusable CTA button with the site's `.btn` styling.
 *
 * Renders a real `<a>` for external URLs and a Next.js `<Link>` for internal
 * routes. `useButtonEffects` picks up the `.btn` class automatically.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  target,
  dataAudio,
  onClick,
}: ButtonProps) {
  const className = `btn ${variant === "secondary" ? "btn-secondary" : ""} ${size === "small" ? "btn-small" : ""}`;
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel="noopener noreferrer"
        data-audio={dataAudio}
        onClick={onClick}
        className={className}
      >
        <div className="btn__text">{children}</div>
      </a>
    );
  }
  return (
    <Link href={href} data-audio={dataAudio} onClick={onClick} className={className}>
      <div className="btn__text">{children}</div>
    </Link>
  );
}

type CredentialBadgeProps = {
  text?: string;
  href: string;
  label?: string;
};

/** Small link + credential mark pairing, e.g. "Open to Work". */
export function CredentialBadge({
  text = "Open to Work",
  href,
  label,
}: CredentialBadgeProps) {
  const className = "badge-link";
  const props = {
    "aria-label": label,
    "data-audio": audio.scramble,
    className,
  } as const;
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      <CredentialIcon />
      <div className="text-size-small text-weight-medium text-style-allcaps">
        {text}
      </div>
    </a>
  ) : (
    <Link
      href={href}
      {...props}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <BadgeLinkContent label={text} />
    </Link>
  );
}
