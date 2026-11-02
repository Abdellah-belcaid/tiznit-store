import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, ShoppingBag, Truck, X } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "../lib/i18n";
import { useCart } from "../lib/cart";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

function LangSwitch({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex rounded-full bg-plum-900/5 p-1 text-xs font-bold ${className}`} dir="ltr">
      {(
        [
          ["ar", "ع"],
          ["fr", "FR"],
        ] as const
      ).map(([code, label]) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`min-w-9 rounded-full px-2.5 py-1.5 transition ${lang === code ? "bg-plum-800 text-honey-300 shadow" : "text-plum-700 hover:text-plum-900"}`}
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const links = [
    ["/", t.nav.home],
    ["/boutique", t.nav.shop],
    ["/a-propos", t.nav.about],
  ];

  return (
    <>
      <div className="bg-plum-900 text-honey-200">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-[0.8rem]">
          <Truck className="size-4 shrink-0 text-honey-400" />
          {t.announce}
        </p>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-cream-50/85 shadow-[0_10px_30px_-20px_rgba(58,31,43,.5)] backdrop-blur-xl" : "bg-cream-50"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" aria-label="Tiznit Store">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-[0.95rem] font-semibold transition ${
                    isActive ? "bg-plum-800 text-cream-50" : "text-plum-800 hover:bg-plum-900/5"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch className="hidden sm:flex" />
            <button
              onClick={() => setOpen(true)}
              className="relative grid size-11 place-items-center rounded-full bg-honey-500 text-plum-900 shadow-[0_8px_20px_-8px_rgba(217,149,28,.8)] transition hover:bg-honey-400 active:scale-95"
              aria-label={t.cart}
            >
              <ShoppingBag className="size-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -end-1 -top-1 grid min-w-5 place-items-center rounded-full bg-plum-800 px-1 text-[0.68rem] font-bold leading-5 text-cream-50 ring-2 ring-cream-50"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMenu(true)}
              className="grid size-11 place-items-center rounded-full text-plum-800 hover:bg-plum-900/5 md:hidden"
              aria-label={t.menu}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-plum-950/50 backdrop-blur-sm" onClick={() => setMenu(false)} />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="honeycomb absolute inset-x-0 top-0 rounded-b-[2rem] bg-plum-800 px-5 pb-8 pt-4 text-cream-50"
            >
              <div className="flex items-center justify-between">
                <Logo light />
                <button onClick={() => setMenu(false)} className="grid size-11 place-items-center rounded-full bg-white/10" aria-label={t.close}>
                  <X className="size-6" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {links.map(([to, label]) => (
                  <NavLink
                    key={to}
                    to={to}
                    end
                    className={({ isActive }) =>
                      `font-display rounded-2xl px-4 py-3 text-2xl font-semibold ${isActive ? "bg-honey-500 text-plum-900" : "hover:bg-white/5"}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-8 flex items-center justify-between gap-3">
                <LangSwitch className="bg-white/10 [&_button:not([aria-pressed=true])]:text-cream-100" />
                <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-wa px-5 py-3 font-semibold text-white">
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
