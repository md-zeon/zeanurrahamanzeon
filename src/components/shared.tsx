"use client";

import Link from "next/link";

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

export function WebflowLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`icon-embed-xxsmall ${className}`} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 16 10"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
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

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
  target?: string;
  dataAudio?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  target,
  dataAudio,
}: ButtonProps) {
  const className = `button inline-block ${variant === "secondary" ? "is-secondary" : ""} ${size === "small" ? "is-small" : ""}`;
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel="noopener noreferrer"
        data-audio={dataAudio}
        className={className}
      >
        <div
          className={`${variant === "primary" ? "text-brand-black" : "button-text"}`}
        >
          {children}
        </div>
      </a>
    );
  }
  return (
    <Link href={href} data-audio={dataAudio} className={className}>
      <div
        className={`${variant === "primary" ? "text-brand-black" : "button-text"}`}
      >
        {children}
      </div>
    </Link>
  );
}

type WebflowBadgeProps = {
  text?: string;
  href: string;
  label?: string;
};

export function WebflowBadge({
  text = "Webflow Certified Partner",
  href,
  label,
}: WebflowBadgeProps) {
  return (
    <a
      data-audio="https://bjornflow-assets.b-cdn.net/Audio/buttons%20scramble.wav"
      href={href}
      target="_blank"
      aria-label={label}
      className="home-header_badge-link"
    >
      <WebflowLogo />
      <div className="text-size-small text-weight-medium text-style-allcaps">
        {text}
      </div>
    </a>
  );
}
