import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { config } from "./config";
import type { Lang, Localized } from "../data/products";

const dict = {
  ar: {
    announce: "توصيل لجميع مدن المغرب · الدفع عند الاستلام",
    nav: { home: "الرئيسية", shop: "المتجر", about: "من نحن" },
    heroKicker: "منتجات طبيعية من قلب سوس",
    heroTitle: ["من خيرات تيزنيت", "إلى مائدتكم"],
    heroText: "عسل حر، أملو تقليدي، زعفران تالوين وزيوت بلدية — مختارة بعناية من المنتجين المحليين، وتصلكم حتى باب الدار.",
    shopNow: "اكتشف المنتجات",
    orderWa: "اطلب عبر واتساب",
    trust: ["100% طبيعي", "مباشرة من المنتج", "الدفع عند الاستلام"],
    categories: "تسوق حسب الصنف",
    categoriesSub: "كل منتج له حكاية من أرض سوس",
    bestsellers: "الأكثر طلباً",
    bestsellersSub: "اختيارات زبنائنا المفضلة",
    viewAll: "عرض الكل",
    howTitle: "كيف تطلب؟",
    howSub: "بدون حساب، بدون تعقيد — في 3 خطوات",
    steps: [
      ["اختر منتجاتك", "أضف ما يعجبك إلى السلة واختر الحجم المناسب."],
      ["أرسل الطلب عبر واتساب", "رسالة جاهزة بتفاصيل طلبك، فقط اضغط إرسال."],
      ["استلم وادفع", "نؤكد معك الطلب ويصلك حتى الباب، والدفع عند الاستلام."],
    ],
    storyKicker: "حكايتنا",
    storyTitle: "أصالة مغربية بطعم سوس",
    storyText: "من تيزنيت، نجمع أجود منتجات المنطقة من النحالين والتعاونيات المحلية: عسل الدغموس النادر، أملو محضّر يدوياً، وزعفران تالوين الأحمر. هدفنا بسيط: منتجات حقيقية، بدون غش، وبأسعار عادلة.",
    storyPoints: ["نحالون محليون نعرفهم بالاسم", "منتجات بدون إضافات", "تغليف محكم وآمن"],
    ctaTitle: "عندك سؤال؟ نحن هنا على واتساب",
    ctaText: "نجاوبك بسرعة على أي سؤال حول المنتجات، الأحجام أو التوصيل.",
    chat: "تواصل معنا",
    from: "ابتداءً من",
    add: "أضف للسلة",
    added: "تمت الإضافة إلى السلة",
    shopTitle: "متجرنا",
    shopSub: "منتجات طبيعية مختارة من سوس والأطلس",
    all: "الكل",
    search: "ابحث عن منتج…",
    sort: { popular: "الأكثر طلباً", asc: "السعر: من الأقل", desc: "السعر: من الأعلى" },
    noResults: "لا توجد منتجات مطابقة",
    results: (n: number) => `${n} منتج`,
    size: "الحجم",
    qty: "الكمية",
    buyNow: "اطلب الآن عبر واتساب",
    benefits: "فوائد المنتج",
    about: "عن المنتج",
    origin: "المصدر",
    related: "قد يعجبك أيضاً",
    back: "رجوع للمتجر",
    guarantees: ["100% طبيعي ومضمون", "توصيل لكل المدن", "الدفع عند الاستلام"],
    cart: "سلة المشتريات",
    cartEmpty: "سلتك فارغة",
    cartEmptySub: "أضف بعض الخيرات الطبيعية وابدأ طلبك.",
    subtotal: "المجموع",
    deliveryNote: "تكلفة التوصيل تُحدد عند تأكيد الطلب",
    yourInfo: "معلوماتك للتوصيل",
    name: "الاسم الكامل",
    city: "المدينة",
    address: "العنوان (اختياري)",
    note: "ملاحظة (اختياري)",
    required: "المرجو إدخال الاسم والمدينة",
    sendOrder: "أرسل الطلب عبر واتساب",
    remove: "حذف",
    aboutTitle: "من نحن",
    aboutSub: "متجر تيزنيت — منتجات محلية بطعم الأصالة المغربية",
    aboutText: [
      "بدأنا من حب بسيط لخيرات أرضنا. في سوس، العسل ليس مجرد منتج، بل تراث يتوارثه النحالون جيلاً بعد جيل.",
      "نشتغل مباشرة مع نحالين وتعاونيات نعرفهم ونثق فيهم، ونختار كل منتج بعناية قبل أن يصل إلى بيتكم.",
    ],
    values: [
      ["الأصالة", "منتجات حقيقية بدون خلط ولا إضافات."],
      ["القرب", "من المنتج المحلي إلى بابك مباشرة."],
      ["الثقة", "الدفع عند الاستلام وخدمة على واتساب."],
    ],
    contact: "تواصل معنا",
    call: "اتصل بنا",
    location: "العنوان",
    footerText: "منتجات طبيعية من سوس: عسل، أملو، زعفران وزيوت.",
    rights: "جميع الحقوق محفوظة",
    demo: "نسخة تجريبية — الأسعار للعرض فقط",
    menu: "القائمة",
    close: "إغلاق",
  },
  fr: {
    announce: "Livraison partout au Maroc · Paiement à la livraison",
    nav: { home: "Accueil", shop: "Boutique", about: "À propos" },
    heroKicker: "Produits naturels du cœur du Souss",
    heroTitle: ["Les trésors de Tiznit", "jusqu'à votre table"],
    heroText: "Miels purs, amlou traditionnel, safran de Taliouine et huiles beldi — sélectionnés auprès de producteurs locaux et livrés chez vous.",
    shopNow: "Découvrir la boutique",
    orderWa: "Commander sur WhatsApp",
    trust: ["100% naturel", "Direct producteur", "Paiement à la livraison"],
    categories: "Nos univers",
    categoriesSub: "Chaque produit raconte une histoire du Souss",
    bestsellers: "Les plus demandés",
    bestsellersSub: "Les favoris de nos clients",
    viewAll: "Tout voir",
    howTitle: "Comment commander ?",
    howSub: "Sans compte, sans complication — en 3 étapes",
    steps: [
      ["Choisissez vos produits", "Ajoutez au panier et choisissez le format qui vous convient."],
      ["Envoyez sur WhatsApp", "Un message prêt avec votre commande, il suffit d'appuyer sur envoyer."],
      ["Recevez et payez", "On confirme avec vous, livraison à domicile et paiement à la réception."],
    ],
    storyKicker: "Notre histoire",
    storyTitle: "L'authenticité marocaine, au goût du Souss",
    storyText: "Depuis Tiznit, nous réunissons le meilleur de la région auprès d'apiculteurs et de coopératives locales : le rare miel d'euphorbe, l'amlou préparé à la main et le safran rouge de Taliouine. Notre promesse : des produits vrais, sans tricherie, à prix juste.",
    storyPoints: ["Des apiculteurs locaux que l'on connaît", "Aucun additif", "Emballage soigné et sécurisé"],
    ctaTitle: "Une question ? On répond sur WhatsApp",
    ctaText: "Produits, formats ou livraison — nous vous répondons rapidement.",
    chat: "Discuter avec nous",
    from: "À partir de",
    add: "Ajouter",
    added: "Ajouté au panier",
    shopTitle: "La boutique",
    shopSub: "Produits naturels sélectionnés du Souss et de l'Atlas",
    all: "Tout",
    search: "Rechercher un produit…",
    sort: { popular: "Popularité", asc: "Prix croissant", desc: "Prix décroissant" },
    noResults: "Aucun produit ne correspond",
    results: (n: number) => `${n} produit${n > 1 ? "s" : ""}`,
    size: "Format",
    qty: "Quantité",
    buyNow: "Commander sur WhatsApp",
    benefits: "Bienfaits",
    about: "Description",
    origin: "Origine",
    related: "Vous aimerez aussi",
    back: "Retour à la boutique",
    guarantees: ["100% naturel garanti", "Livraison partout au Maroc", "Paiement à la livraison"],
    cart: "Votre panier",
    cartEmpty: "Votre panier est vide",
    cartEmptySub: "Ajoutez quelques douceurs naturelles pour commencer.",
    subtotal: "Sous-total",
    deliveryNote: "Les frais de livraison sont confirmés avec vous",
    yourInfo: "Vos informations de livraison",
    name: "Nom complet",
    city: "Ville",
    address: "Adresse (optionnel)",
    note: "Note (optionnel)",
    required: "Merci d'indiquer votre nom et votre ville",
    sendOrder: "Envoyer la commande sur WhatsApp",
    remove: "Retirer",
    aboutTitle: "À propos",
    aboutSub: "Tiznit Store — des produits locaux au goût de l'authenticité marocaine",
    aboutText: [
      "Tout est parti d'un amour simple pour les richesses de notre terre. Dans le Souss, le miel n'est pas qu'un produit : c'est un héritage transmis d'apiculteur en apiculteur.",
      "Nous travaillons directement avec des apiculteurs et des coopératives que nous connaissons, et chaque produit est choisi avec soin avant d'arriver chez vous.",
    ],
    values: [
      ["Authenticité", "Des produits vrais, sans mélange ni additif."],
      ["Proximité", "Du producteur local directement à votre porte."],
      ["Confiance", "Paiement à la livraison et service sur WhatsApp."],
    ],
    contact: "Nous contacter",
    call: "Appeler",
    location: "Adresse",
    footerText: "Produits naturels du Souss : miels, amlou, safran et huiles.",
    rights: "Tous droits réservés",
    demo: "Version démo — prix indicatifs",
    menu: "Menu",
    close: "Fermer",
  },
};

type Dict = (typeof dict)[Lang];

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dict;
  isRtl: boolean;
  /** Picks the right language from a { ar, fr } field */
  tr: <T>(field: Localized<T>) => T;
  price: (n: number) => string;
}

const LangContext = createContext<LangValue | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("ts-lang");
    if (saved === "ar" || saved === "fr") return saved;
  } catch {}
  return "ar";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("ts-lang", lang);
    } catch {}
  }, [lang]);

  const value = useMemo<LangValue>(() => {
    const currency = lang === "ar" && config.currency === "DH" ? "درهم" : config.currency;
    return {
      lang,
      setLang,
      toggle: () => setLang((l) => (l === "ar" ? "fr" : "ar")),
      t: dict[lang],
      isRtl: lang === "ar",
      tr: (field) => field[lang] ?? field.fr,
      price: (n) => `${n.toLocaleString("fr-MA")} ${currency}`,
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
