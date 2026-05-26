// Minimal monoline icon set, 24x24 frame, 1.5px stroke.
// Used in the app shell (tab bar, headers).

type Props = { className?: string; size?: number };

const stroke = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

export const IconFeed = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
  </svg>
);

export const IconHome = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z" />
  </svg>
);

export const IconBell = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const IconSearch = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16" y1="16" x2="21" y2="21" />
  </svg>
);

export const IconDrops = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M12 3v6" />
    <path d="M12 21a7 7 0 0 1-7-7c0-3.5 7-11 7-11s7 7.5 7 11a7 7 0 0 1-7 7z" />
  </svg>
);

export const IconStylist = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M4 4h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9l-5 4V4z" />
    <circle cx="9" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="13" cy="11" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const IconBag = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M5 8h14l-1 12.5a1 1 0 0 1-1 .9H7a1 1 0 0 1-1-.9L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const IconYou = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M4 21c1-4.5 4-6.5 8-6.5s7 2 8 6.5" />
  </svg>
);

export const IconBack = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M14 6l-6 6 6 6" />
  </svg>
);

export const IconClose = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

export const IconHeart = ({ size = 24, className, filled = false }: Props & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  </svg>
);

export const IconShare = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <circle cx="6" cy="12" r="2.2" />
    <circle cx="18" cy="6" r="2.2" />
    <circle cx="18" cy="18" r="2.2" />
    <line x1="8" y1="11" x2="16" y2="7" />
    <line x1="8" y1="13" x2="16" y2="17" />
  </svg>
);

export const IconArrowDown = ({ size = 16, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="6 13 12 19 18 13" />
  </svg>
);

export const IconArrowRight = ({ size = 16, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

export const IconPin = ({ size = 16, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M12 22s-6-6.5-6-12a6 6 0 1 1 12 0c0 5.5-6 12-6 12z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);
