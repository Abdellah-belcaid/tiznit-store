import { useLang } from "../lib/i18n";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFab() {
  const { lang } = useLang();
  const hello = lang === "ar" ? "السلام عليكم، عندي سؤال حول منتجاتكم" : "Bonjour, j'ai une question sur vos produits";
  return (
    <a
      href={waLink(hello)}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-5 end-5 z-40 grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,.75)] transition hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-wa opacity-30 [animation-duration:2.4s]" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
