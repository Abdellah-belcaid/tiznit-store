import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "../lib/i18n";
import { config, telHref } from "../lib/config";
import { waLink } from "../lib/whatsapp";
import { categories } from "../data/products";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const { t, tr } = useLang();
  return (
    <footer className="honeycomb relative mt-24 bg-plum-900 text-cream-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-200/75">{t.footerText}</p>
          <div className="mt-5 flex gap-2">
            <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-wa hover:text-white">
              <WhatsAppIcon />
            </a>
            {config.facebook && (
              <a href={config.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#1877f2] hover:text-white">
                <FacebookIcon />
              </a>
            )}
            {config.instagram && (
              <a href={config.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#e1306c] hover:text-white">
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-honey-300">{t.nav.shop}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/boutique?cat=${c.id}`} className="text-cream-200/80 transition hover:text-honey-300">
                  {tr(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-honey-300">{t.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telHref} className="flex items-center gap-2.5 text-cream-200/80 hover:text-honey-300">
                <Phone className="size-4 text-honey-400" />
                <span dir="ltr">{config.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-cream-200/80 hover:text-honey-300">
                <WhatsAppIcon className="size-4 text-honey-400" /> WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-cream-200/80">
              <MapPin className="size-4 text-honey-400" /> {config.city}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream-200/55 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Tiznit Store · {t.rights}</p>
          <p className="rounded-full bg-white/5 px-3 py-1">{t.demo}</p>
        </div>
      </div>
    </footer>
  );
}
