"use client";

import Link from "next/link";

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
        role="img"
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
        role="img"
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

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
  target?: string;
  /** Hover sound played via `data-audio`, matched by the global sound system. */
  dataAudio?: string;
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
}: ButtonProps) {
  const className = `btn ${variant === "secondary" ? "btn-secondary" : ""} ${size === "small" ? "btn-small" : ""}`;
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel="noopener noreferrer"
        data-audio={dataAudio}
        className={className}
      >
        <div className="btn__text">{children}</div>
      </a>
    );
  }
  return (
    <Link href={href} data-audio={dataAudio} className={className}>
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
  return (
    <a
      href={href}
      target="_blank"
      aria-label={label}
      className="badge-link"
    >
      <CredentialIcon />
      <div className="text-size-small text-weight-medium text-style-allcaps">
        {text}
      </div>
    </a>
  );
}
