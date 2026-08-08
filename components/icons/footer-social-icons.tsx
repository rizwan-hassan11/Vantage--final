/** Footer socials — white marks on rust, matching the Socials brand sheet. */

type IconProps = {
  className?: string;
  size?: number;
};

/** Outline camera (rounded square + lens + flash dot) */
export function FooterIconInstagram({ className, size = 22 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="3.1"
        y="3.1"
        width="17.8"
        height="17.8"
        rx="5.4"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <circle
        cx="12"
        cy="12"
        r="4.15"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <circle cx="17.15" cy="6.85" r="1.15" fill="currentColor" />
    </svg>
  );
}

/** Filled rounded tile with “in” punched through */
export function FooterIconLinkedIn({ className, size = 22 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.6 1.85h14.8A2.75 2.75 0 0 1 22.15 4.6v14.8a2.75 2.75 0 0 1-2.75 2.75H4.6A2.75 2.75 0 0 1 1.85 19.4V4.6A2.75 2.75 0 0 1 4.6 1.85ZM8.55 10.2H6.4v7.4h2.15v-7.4Zm.05-2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm9.15 5.85v3.8h-2.15v-3.55c0-.93-.33-1.56-1.17-1.56-.64 0-1.02.43-1.19.84-.06.15-.08.36-.08.57v3.7H10.9s.03-6 0-6.62h2.15v.94h.01l-.01.01v-.01c.28-.44.8-1.08 1.95-1.08 1.42 0 2.65.93 2.65 2.94Z"
      />
    </svg>
  );
}

/** Filled rounded tile with “f” punched through */
export function FooterIconFacebook({ className, size = 22 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.6 1.85h14.8A2.75 2.75 0 0 1 22.15 4.6v14.8a2.75 2.75 0 0 1-2.75 2.75h-3.55v-6.45h2.15l.32-2.55h-2.47v-1.62c0-.74.2-1.25 1.27-1.25h1.35V7.3c-.23-.03-1.03-.1-1.96-.1-1.94 0-3.27 1.18-3.27 3.36v1.88H9.65v2.55h2.14V22.15H4.6A2.75 2.75 0 0 1 1.85 19.4V4.6A2.75 2.75 0 0 1 4.6 1.85Z"
      />
    </svg>
  );
}
