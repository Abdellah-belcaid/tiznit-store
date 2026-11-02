import { LogoMark } from "./Logo";

// Illustrated packaging for products that don't have a photo yet.
export default function JarArt({ kind = "jar", fill = "#d9951c", lid = "#3a1f2b", className = "" }) {
  if (kind === "bottle") {
    return (
      <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
        <ellipse cx="100" cy="246" rx="58" ry="7" fill="#3a1f2b" opacity=".12" />
        <rect x="84" y="14" width="32" height="22" rx="5" fill="#3a1f2b" />
        <path d="M88 36h24v22c0 8 26 18 26 44v126a14 14 0 0 1-14 14H76a14 14 0 0 1-14-14V102c0-26 26-36 26-44Z" fill="#fff" opacity=".55" />
        <path d="M66 130h68v98a10 10 0 0 1-10 10H76a10 10 0 0 1-10-10Z" fill={fill} />
        <path d="M66 112c6-4 10-6 18-8l50 4v22H66Z" fill={fill} opacity=".75" />
        <rect x="66" y="140" width="68" height="62" rx="4" fill="#3a1f2b" />
        <foreignObject x="84" y="150" width="32" height="32">
          <LogoMark className="size-8" tone="light" />
        </foreignObject>
        <rect x="76" y="188" width="48" height="4" rx="2" fill="#f0b13b" opacity=".8" />
        <path d="M74 70c-6 10-8 18-8 30v120" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".6" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <ellipse cx="100" cy="242" rx="70" ry="8" fill="#3a1f2b" opacity=".12" />
      <rect x="46" y="40" width="108" height="30" rx="8" fill={lid} />
      <rect x="46" y="58" width="108" height="6" fill="#000" opacity=".12" />
      <path d="M48 76h104c8 0 12 6 12 14v128c0 12-8 20-20 20H56c-12 0-20-8-20-20V90c0-8 4-14 12-14Z" fill="#fff" opacity=".5" />
      <path d="M40 92c0-6 4-10 10-10h100c6 0 10 4 10 10v124c0 10-6 16-16 16H56c-10 0-16-6-16-16Z" fill={fill} />
      <circle cx="68" cy="210" r="3" fill="#fff" opacity=".25" />
      <circle cx="132" cy="110" r="2.5" fill="#fff" opacity=".25" />
      <circle cx="120" cy="214" r="2" fill="#000" opacity=".15" />
      <rect x="40" y="120" width="120" height="76" fill="#3a1f2b" />
      <rect x="40" y="186" width="120" height="10" fill="#f0b13b" opacity=".85" />
      <foreignObject x="84" y="130" width="32" height="32">
        <LogoMark className="size-8" tone="light" />
      </foreignObject>
      <rect x="66" y="168" width="68" height="5" rx="2.5" fill="#f3e5c9" opacity=".8" />
      <rect x="92" y="30" width="16" height="96" rx="2" fill="#fbf4e6" opacity=".95" />
      <path d="M52 100v100" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}
