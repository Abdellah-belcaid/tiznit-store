import { HeartHandshake, MapPin, Phone, ShieldCheck, Sprout } from "lucide-react";
import { useLang } from "../lib/i18n";
import { config, telHref } from "../lib/config";
import { waLink } from "../lib/whatsapp";
import Reveal from "../components/Reveal";
import { WhatsAppIcon } from "../components/Icons";
import { LogoMark } from "../components/Logo";

export default function About() {
  const { t } = useLang();
  const icons = [Sprout, HeartHandshake, ShieldCheck];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="honeycomb relative mt-6 overflow-hidden rounded-[2.5rem] bg-plum-800 px-6 py-14 text-center text-cream-50 sm:py-20">
        <div className="pointer-events-none absolute -bottom-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-honey-500/20 blur-3xl" />
        <LogoMark className="relative mx-auto size-16" tone="light" />
        <h1 className="font-display relative mt-5 text-4xl font-semibold sm:text-5xl">{t.aboutTitle}</h1>
        <p className="relative mx-auto mt-3 max-w-xl text-cream-100/80">{t.aboutSub}</p>
      </header>

      <section className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="grid grid-cols-2 gap-3">
          <img src="/images/honey-stack.webp" alt="" className="row-span-2 h-full w-full rounded-[2rem] object-cover" loading="lazy" />
          <img src="/images/safran.webp" alt="" className="aspect-square w-full rounded-[2rem] object-cover" loading="lazy" />
          <img src="/images/amlou-amande.webp" alt="" className="aspect-square w-full rounded-[2rem] object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          {t.aboutText.map((p, i) => (
            <p key={i} className={`leading-relaxed text-plum-700 ${i === 0 ? "font-display text-2xl text-plum-900 sm:text-3xl" : "mt-5 text-lg"}`}>
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-3">
        {t.values.map(([title, text], i) => {
          const Icon = icons[i];
          return (
            <Reveal key={title} delay={i * 0.08} className="rounded-3xl bg-white p-7 ring-1 ring-plum-900/5">
              <span className="grid size-12 place-items-center rounded-2xl bg-honey-200 text-honey-700">
                <Icon className="size-6" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-plum-600">{text}</p>
            </Reveal>
          );
        })}
      </section>

      <section className="mt-20 rounded-[2.5rem] bg-cream-100 p-6 sm:p-10">
        <h2 className="font-display text-3xl font-semibold">{t.contact}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-3xl bg-wa p-5 text-white transition hover:bg-wa-dark">
            <WhatsAppIcon className="size-7" />
            <span>
              <span className="block text-sm opacity-80">WhatsApp</span>
              <span className="font-bold" dir="ltr">
                {config.phoneDisplay}
              </span>
            </span>
          </a>
          <a href={telHref} className="flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-plum-900/5 transition hover:ring-plum-900/20">
            <Phone className="size-7 text-honey-700" />
            <span>
              <span className="block text-sm text-plum-600">{t.call}</span>
              <span className="font-bold" dir="ltr">
                {config.phoneDisplay}
              </span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-plum-900/5">
            <MapPin className="size-7 text-honey-700" />
            <span>
              <span className="block text-sm text-plum-600">{t.location}</span>
              <span className="font-bold">{config.city}</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
