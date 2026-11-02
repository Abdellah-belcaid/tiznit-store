// Tiznit Store logo: a hexagon (honeycomb cell) holding a honey dipper and a falling drop.
export function LogoMark({ className = "size-10", tone = "dark" }) {
  const bg = tone === "dark" ? "#3a1f2b" : "#f0b13b";
  const fg = tone === "dark" ? "#f0b13b" : "#3a1f2b";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill={bg} />
      <path d="M32 9.5 51.5 20.75v22.5L32 54.5 12.5 43.25v-22.5Z" fill="none" stroke={fg} strokeWidth="1.6" opacity=".55" />
      <rect x="30.5" y="12" width="3" height="14" rx="1.5" fill={fg} />
      <ellipse cx="32" cy="30" rx="8.5" ry="2.5" fill={fg} />
      <ellipse cx="32" cy="35.6" rx="10.5" ry="2.7" fill={fg} />
      <ellipse cx="32" cy="41.2" rx="8.5" ry="2.5" fill={fg} />
      <path d="M32 45.5c-1.8 2.4-2.6 3.8-2.6 5a2.6 2.6 0 0 0 5.2 0c0-1.2-.8-2.6-2.6-5Z" fill={fg} />
    </svg>
  );
}

export default function Logo({ light = false, className = "" }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`} dir="ltr">
      <LogoMark className="size-10 shrink-0" tone={light ? "light" : "dark"} />
      <span className="flex flex-col leading-none">
        <span className={`font-['Fraunces'] text-[1.35rem] font-semibold tracking-tight ${light ? "text-cream-50" : "text-plum-800"}`}>
          Tiznit<span className="text-honey-500">.</span>
        </span>
        <span className={`mt-1 flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${light ? "text-honey-300" : "text-honey-700"}`}>
          Store <span className="font-['Tajawal'] text-[0.7rem] tracking-normal normal-case">· متجر تيزنيت</span>
        </span>
      </span>
    </span>
  );
}
