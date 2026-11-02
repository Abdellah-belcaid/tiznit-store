import { config } from "./config";
import type { Lang } from "../data/products";

export interface OrderLine {
  name: string;
  size: string;
  qty: number;
  price: number;
}

export interface Customer {
  name?: string;
  city?: string;
  address?: string;
  note?: string;
}

export function waLink(text?: string) {
  const base = `https://wa.me/${config.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Builds the pre-filled order message. */
export function orderMessage({
  items,
  customer = {},
  lang,
  formatPrice,
}: {
  items: OrderLine[];
  customer?: Customer;
  lang: Lang;
  formatPrice: (n: number) => string;
}) {
  const ar = lang === "ar";
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const lines: string[] = [];

  lines.push(ar ? "السلام عليكم 👋" : "Bonjour 👋");
  lines.push(ar ? "أريد طلب المنتجات التالية من متجر تيزنيت:" : "Je souhaite commander chez Tiznit Store :");
  lines.push("");
  items.forEach((i) => {
    lines.push(`• ${i.name} (${i.size}) × ${i.qty} = ${formatPrice(i.price * i.qty)}`);
  });
  lines.push("");
  lines.push(`${ar ? "المجموع" : "Total"} : ${formatPrice(total)}`);

  const info = (
    [
      [ar ? "الاسم" : "Nom", customer.name],
      [ar ? "المدينة" : "Ville", customer.city],
      [ar ? "العنوان" : "Adresse", customer.address],
      [ar ? "ملاحظة" : "Note", customer.note],
    ] as const
  ).filter(([, v]) => v && v.trim());

  if (info.length) {
    lines.push("");
    info.forEach(([k, v]) => lines.push(`${k} : ${v!.trim()}`));
  }
  return lines.join("\n");
}
