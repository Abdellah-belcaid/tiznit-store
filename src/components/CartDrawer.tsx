import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { useLang } from "../lib/i18n";
import { orderMessage, waLink, type Customer } from "../lib/whatsapp";
import ProductImage from "./ProductImage";
import { WhatsAppIcon } from "./Icons";
import { config, deliveryFor } from "../lib/config";
import { legalPaths } from "../data/legal";

const CUSTOMER_KEY = "ts-customer";

function loadCustomer(): Customer {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
  } catch {
    return {};
  }
}

export function QtyStepper({ value, onChange, size = "sm" }: { value: number; onChange: (qty: number) => void; size?: "sm" | "lg" }) {
  const btn = size === "sm" ? "size-8" : "size-11";
  return (
    <div className="flex items-center rounded-full bg-cream-100 ring-1 ring-plum-900/10" dir="ltr">
      <button onClick={() => onChange(value - 1)} className={`${btn} grid place-items-center rounded-full text-plum-800 hover:bg-cream-200`} aria-label="-">
        <Minus className="size-4" />
      </button>
      <span className={`min-w-8 text-center font-bold ${size === "sm" ? "text-sm" : "text-base"}`}>{value}</span>
      <button onClick={() => onChange(value + 1)} className={`${btn} grid place-items-center rounded-full text-plum-800 hover:bg-cream-200`} aria-label="+">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty } = useCart();
  const { t, tr, price, lang, isRtl } = useLang();
  const [customer, setCustomer] = useState<Customer>(loadCustomer);
  const [error, setError] = useState(false);
  // Law 09-08 / 31-08: consent must be an explicit, unticked-by-default choice
  const [agreed, setAgreed] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const delivery = deliveryFor(total);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    } catch {}
  }, [customer]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const field = (key: keyof Customer) => ({
    value: customer[key] || "",
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCustomer((c) => ({ ...c, [key]: e.target.value }));
      setError(false);
    },
  });

  const send = () => {
    if (!customer.name?.trim() || !customer.city?.trim()) {
      setError(true);
      return;
    }
    if (!agreed) {
      setConsentError(true);
      return;
    }
    const text = orderMessage({
      items: items.map((i) => ({ name: tr(i.product.name), size: i.size, qty: i.qty, price: i.price })),
      customer,
      lang,
      formatPrice: price,
      delivery,
    });
    window.open(waLink(text), "_blank", "noopener");
  };

  const input =
    "w-full rounded-2xl border-0 bg-white px-4 py-3 text-[0.95rem] text-plum-900 ring-1 ring-plum-900/10 placeholder:text-plum-600/50 focus:outline-none focus:ring-2 focus:ring-honey-500";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-plum-950/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label={t.cart}
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream-50 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-plum-900/10 px-5 py-4">
              <h2 className="font-display flex items-center gap-2 text-xl font-semibold">
                <ShoppingBag className="size-5 text-honey-600" />
                {t.cart}
                {items.length > 0 && <span className="rounded-full bg-honey-200 px-2 text-sm text-plum-800">{items.reduce((s, i) => s + i.qty, 0)}</span>}
              </h2>
              <button onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-plum-900/5" aria-label={t.close}>
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <div className="grid size-20 place-items-center rounded-full bg-honey-200/60">
                  <ShoppingBag className="size-9 text-honey-700" />
                </div>
                <p className="font-display text-xl font-semibold">{t.cartEmpty}</p>
                <p className="text-sm text-plum-600">{t.cartEmptySub}</p>
                <Link to="/boutique" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-plum-800 px-6 py-3 font-semibold text-cream-50 hover:bg-plum-700">
                  {t.shopNow}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((i) => (
                        <motion.li
                          key={i.id + i.size}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-plum-900/5"
                        >
                          <ProductImage src={i.product.image} art={i.product.art} alt="" className="size-20 shrink-0 rounded-xl" />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate font-semibold">{tr(i.product.name)}</p>
                                <p className="text-xs text-plum-600" dir="ltr">
                                  {i.size}
                                </p>
                              </div>
                              <button onClick={() => setQty(i.id, i.size, 0)} className="text-plum-600/60 hover:text-red-600" aria-label={t.remove}>
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <QtyStepper value={i.qty} onChange={(q) => setQty(i.id, i.size, q)} />
                              <span className="font-bold">{price(i.price * i.qty)}</span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-bold text-plum-800">{t.yourInfo}</h3>
                    <div className="grid gap-2.5">
                      <div className="grid grid-cols-2 gap-2.5">
                        <input className={input} placeholder={t.name + " *"} autoComplete="name" {...field("name")} />
                        <input className={input} placeholder={t.city + " *"} autoComplete="address-level2" {...field("city")} />
                      </div>
                      <input className={input} placeholder={t.address} autoComplete="street-address" {...field("address")} />
                      <textarea className={input + " resize-none"} rows={2} placeholder={t.note} {...field("note")} />
                    </div>
                    {error && <p className="mt-2 text-sm font-medium text-red-600">{t.required}</p>}
                    <p className="mt-3 text-xs leading-relaxed text-plum-600/80">{t.privacyNotice}</p>
                  </div>
                </div>

                <div className="border-t border-plum-900/10 bg-white px-5 pb-6 pt-4">
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between text-plum-600">
                      <dt>{t.subtotal}</dt>
                      <dd>{price(total)}</dd>
                    </div>
                    <div className="flex justify-between text-plum-600">
                      <dt>{t.delivery}</dt>
                      <dd>{delivery === null ? t.deliveryTbd : delivery === 0 ? t.deliveryFree : price(delivery)}</dd>
                    </div>
                    <div className="flex items-baseline justify-between pt-1 text-plum-900">
                      <dt className="font-semibold">{t.total}</dt>
                      <dd className="font-display text-2xl font-bold">{price(total + (delivery ?? 0))}</dd>
                    </div>
                  </dl>
                  {config.freeDeliveryFrom > 0 && delivery !== 0 && (
                    <p className="mt-1 text-xs text-honey-700">{t.freeFrom(price(config.freeDeliveryFrom))}</p>
                  )}
                  <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-plum-700">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        setConsentError(false);
                      }}
                      className="mt-0.5 size-4 shrink-0 accent-plum-800"
                    />
                    <span>
                      {t.consent[0]}
                      <Link to={legalPaths.cgv} onClick={() => setOpen(false)} className="font-semibold underline underline-offset-2">
                        {t.consent[1]}
                      </Link>
                      {t.consent[2]}
                      <Link to={legalPaths.privacy} onClick={() => setOpen(false)} className="font-semibold underline underline-offset-2">
                        {t.consent[3]}
                      </Link>
                    </span>
                  </label>
                  {consentError && <p className="mt-1.5 text-sm font-medium text-red-600">{t.consentRequired}</p>}
                  <button
                    onClick={send}
                    className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-wa py-4 text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,.7)] transition hover:bg-wa-dark active:scale-[.98]"
                  >
                    <WhatsAppIcon className="size-5" />
                    {t.sendOrder}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
