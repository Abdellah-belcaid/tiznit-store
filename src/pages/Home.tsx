import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Leaf, MessageCircle, PackageCheck, ShoppingBasket } from "lucide-react";
import { useLang } from "../lib/i18n";
import { waLink } from "../lib/whatsapp";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import Reveal from "../components/Reveal";
import { WhatsAppIcon } from "../components/Icons";

function Arrow({ className }: { className?: string }) {
  const { isRtl } = useLang();
  const Icon = isRtl ? ArrowLeft : ArrowRight;
  return <Icon className={className} />;
}

function SpinningBadge() {
  return (
    <svg viewBox="0 0 120 120" direction="ltr" className="size-28 animate-[spin_18s_linear_infinite] sm:size-32" aria-hidden="true">
      <defs>
        <path id="circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#f0b13b" />
      <text fill="#3a1f2b" fontSize="11.5" fontWeight="700" letterSpacing="3.2" fontFamily="Manrope">
        <textPath href="#circle">100% NATUREL · TIZNIT · SOUSS ·</textPath>
      </text>
      <path d="M60 44c-6 8-9 13-9 17a9 9 0 0 0 18 0c0-4-3-9-9-17Z" fill="#3a1f2b" />
    </svg>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="honeycomb grain relative overflow-hidden bg-plum-800 text-cream-50">
      <div className="pointer-events-none absolute -end-40 -top-40 size-[34rem] rounded-full bg-honey-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -start-40 size-[30rem] rounded-full bg-plum-600/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-honey-200 ring-1 ring-white/15 backdrop-blur"
          >
            <Leaf className="size-4 text-honey-400" /> {t.heroKicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-[2.6rem] font-semibold leading-[1.08] sm:text-6xl lg:text-[4.4rem]"
          >
            {t.heroTitle[0]}
            <br />
            <span className="bg-gradient-to-r from-honey-300 via-honey-500 to-honey-400 bg-clip-text text-transparent">{t.heroTitle[1]}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/80"
          >
            {t.heroText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/boutique"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-honey-500 px-7 py-4 text-base font-bold text-plum-900 shadow-[0_14px_34px_-12px_rgba(240,177,59,.9)] transition hover:bg-honey-400"
            >
              {t.shopNow}
              <Arrow className="size-5 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-4 text-base font-semibold text-cream-50 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/15"
            >
              <WhatsAppIcon className="size-5 text-wa" /> {t.orderWa}
            </a>
          </motion.div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream-100/85">
            {t.trust.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-honey-500 text-plum-900">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>

        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative ms-auto aspect-[4/5] w-[78%] overflow-hidden rounded-t-full rounded-b-[2.5rem] ring-8 ring-white/5">
            <img src="/images/miel-euphorbe.webp" alt="Miel d'Euphorbe Tiznit Store" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-900/40 to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 start-0 w-[36%] overflow-hidden rounded-3xl bg-cream-50 p-2 shadow-2xl"
          >
            <img src="/images/safran.webp" alt="Safran de Taliouine" className="aspect-square w-full rounded-2xl object-cover" />
            <p className="font-display px-2 pb-1 pt-2 text-sm font-semibold text-plum-900">Safran · زعفران</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute start-[4%] top-[2%] hidden w-[26%] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-cream-50 sm:block"
          >
            <img src="/images/amlou-amande.webp" alt="Amlou" className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          <div className="absolute -bottom-6 end-[4%]">
            <SpinningBadge />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const { tr } = useLang();
  const names = products.map((p) => tr(p.name));
  const row = [...names, ...names];
  return (
    <div className="relative overflow-hidden border-y border-plum-900/10 bg-honey-500 py-4" dir="ltr">
      <div className="marquee-track flex w-max animate-marquee items-center gap-8">
        {row.map((n, i) => (
          <span key={i} className="font-display flex items-center gap-8 whitespace-nowrap text-xl font-semibold text-plum-900">
            {n}
            <svg viewBox="0 0 24 24" className="size-4 fill-plum-800">
              <path d="M12 1 21.5 6.5v11L12 23l-9.5-5.5v-11Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ title, sub, link, linkLabel }: { title: string; sub: string; link?: string; linkLabel?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-3xl font-semibold text-plum-900 sm:text-4xl">{title}</h2>
        <p className="mt-2 text-plum-600">{sub}</p>
      </div>
      {link && (
        <Link to={link} className="group hidden shrink-0 items-center gap-1.5 font-semibold text-plum-800 hover:text-honey-700 sm:flex">
          {linkLabel} <Arrow className="size-4 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function Categories() {
  const { t, tr } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <Reveal>
        <SectionHead title={t.categories} sub={t.categoriesSub} />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.07}>
            <Link to={`/boutique?cat=${c.id}`} className="group relative block overflow-hidden rounded-[1.75rem]">
              <ProductImage
                src={c.image}
                art={c.art}
                alt={tr(c.name)}
                className="aspect-[3/4]"
                imgClassName="transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream-50 sm:text-2xl">{tr(c.name)}</h3>
                  <p className="mt-0.5 text-xs text-cream-100/80 sm:text-sm">{tr(c.blurb)}</p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-honey-500 text-plum-900 transition group-hover:scale-110">
                  <Arrow className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Bestsellers() {
  const { t } = useLang();
  const featured = products.filter((p) => p.featured);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <Reveal>
        <SectionHead title={t.bestsellers} sub={t.bestsellersSub} link="/boutique" linkLabel={t.viewAll} />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.07}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
      <Link to="/boutique" className="mt-8 flex items-center justify-center gap-2 rounded-full bg-plum-900/5 py-3.5 font-semibold text-plum-800 sm:hidden">
        {t.viewAll} <Arrow className="size-4" />
      </Link>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLang();
  const icons = [ShoppingBasket, MessageCircle, PackageCheck];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="rounded-[2.5rem] bg-cream-100 px-5 py-12 ring-1 ring-plum-900/5 sm:px-10 sm:py-16">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t.howTitle}</h2>
          <p className="mt-2 text-plum-600">{t.howSub}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {t.steps.map(([title, text], i) => {
            const Icon = icons[i];
            return (
              <Reveal key={i} delay={i * 0.1} className="relative rounded-3xl bg-white p-6 shadow-[0_12px_30px_-20px_rgba(58,31,43,.4)]">
                <span className="font-display absolute end-5 top-3 text-6xl font-bold text-honey-200">{i + 1}</span>
                <span className={`relative grid size-12 place-items-center rounded-2xl ${i === 1 ? "bg-wa text-white" : "bg-plum-800 text-honey-300"}`}>
                  {i === 1 ? <WhatsAppIcon className="size-6" /> : <Icon className="size-6" />}
                </span>
                <h3 className="font-display relative mt-5 text-xl font-semibold">{title}</h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-plum-600">{text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const { t } = useLang();
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-24 sm:px-6 lg:grid-cols-2">
      <Reveal className="relative">
        <div className="overflow-hidden rounded-[2.5rem]">
          <img src="/images/shelf.webp" alt="Tiznit Store" className="aspect-[5/4] w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute -bottom-8 end-4 w-[38%] overflow-hidden rounded-3xl shadow-2xl ring-8 ring-cream-50 sm:end-8">
          <img src="/images/miel-oranger.webp" alt="Miel d'oranger" className="aspect-[4/5] w-full object-cover" loading="lazy" />
        </div>
      </Reveal>
      <Reveal delay={0.1} className="pt-6 lg:pt-0">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-honey-700">{t.storyKicker}</p>
        <h2 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-[2.6rem]">{t.storyTitle}</h2>
        <p className="mt-5 text-lg leading-relaxed text-plum-700">{t.storyText}</p>
        <ul className="mt-7 space-y-3">
          {t.storyPoints.map((x) => (
            <li key={x} className="flex items-center gap-3 font-medium">
              <span className="grid size-7 place-items-center rounded-full bg-honey-200 text-honey-700">
                <Check className="size-4" strokeWidth={3} />
              </span>
              {x}
            </li>
          ))}
        </ul>
        <Link to="/a-propos" className="group mt-8 inline-flex items-center gap-2 font-bold text-plum-800 hover:text-honey-700">
          {t.nav.about} <Arrow className="size-4 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

export function WhatsAppCta() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <Reveal className="honeycomb relative overflow-hidden rounded-[2.5rem] bg-plum-800 px-6 py-12 text-center text-cream-50 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-wa/25 blur-3xl" />
        <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-wa text-white shadow-xl">
          <WhatsAppIcon className="size-8" />
        </span>
        <h2 className="font-display relative mt-6 text-3xl font-semibold sm:text-4xl">{t.ctaTitle}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-cream-100/80">{t.ctaText}</p>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-wa px-8 py-4 font-bold text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,.8)] transition hover:bg-wa-dark"
        >
          <WhatsAppIcon className="size-5" /> {t.chat}
        </a>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Bestsellers />
      <HowItWorks />
      <Story />
      <WhatsAppCta />
    </>
  );
}
