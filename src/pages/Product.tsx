import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Banknote, Check, Leaf, MapPin, ShoppingBag, Truck } from "lucide-react";
import { useLang } from "../lib/i18n";
import { useCart } from "../lib/cart";
import { orderMessage, waLink } from "../lib/whatsapp";
import { getProduct, products } from "../data/products";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import { QtyStepper } from "../components/CartDrawer";
import { WhatsAppIcon } from "../components/Icons";

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const { t, tr, price, lang, isRtl } = useLang();
  const { add } = useCart();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    setSizeIdx(0);
    setQty(1);
    setShot(0);
  }, [id]);

  if (!product) return <Navigate to="/boutique" replace />;

  const size = product.sizes[sizeIdx];
  const gallery = product.gallery || [product.image].filter(Boolean);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).concat(products.filter((p) => p.category !== product.category && p.featured)).slice(0, 4);
  const Back = isRtl ? ArrowRight : ArrowLeft;

  const buyNow = waLink(
    orderMessage({
      items: [{ name: tr(product.name), size: size.label, qty, price: size.price }],
      lang,
      formatPrice: price,
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <Link to="/boutique" className="inline-flex items-center gap-2 text-sm font-semibold text-plum-600 hover:text-plum-900">
        <Back className="size-4" /> {t.back}
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem]">
            <AnimatePresence mode="wait">
              <motion.div key={shot} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <ProductImage src={gallery[shot]} art={product.art} alt={tr(product.name)} className="aspect-[4/5]" />
              </motion.div>
            </AnimatePresence>
            {product.badge && (
              <span className="absolute start-4 top-4 rounded-full bg-plum-800/90 px-3.5 py-1.5 text-sm font-semibold text-honey-300 backdrop-blur">
                {tr(product.badge)}
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  onClick={() => setShot(i)}
                  className={`overflow-hidden rounded-2xl ring-2 transition ${shot === i ? "ring-honey-500" : "opacity-70 ring-transparent hover:opacity-100"}`}
                >
                  <img src={g} alt="" className="size-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-honey-700">
            <MapPin className="size-4" /> {tr(product.origin)}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{tr(product.name)}</h1>
          <p className="mt-4 text-lg leading-relaxed text-plum-700">{tr(product.short)}</p>

          <motion.p key={size.price * qty} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display mt-6 text-4xl font-bold text-plum-900">
            {price(size.price * qty)}
          </motion.p>

          <div className="mt-7">
            <p className="mb-2.5 text-sm font-bold">{t.size}</p>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSizeIdx(i)}
                  className={`rounded-2xl px-5 py-3 text-start transition ${
                    i === sizeIdx ? "bg-plum-800 text-cream-50 shadow-lg" : "bg-white ring-1 ring-plum-900/10 hover:ring-plum-900/30"
                  }`}
                >
                  <span className="block text-base font-bold" dir="ltr">
                    {s.label}
                  </span>
                  <span className={`text-xs ${i === sizeIdx ? "text-honey-300" : "text-plum-600"}`}>{price(s.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold sm:hidden">{t.qty}</span>
              <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} size="lg" />
            </div>
            <button
              onClick={() => add(product.id, size.label, qty)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-honey-500 px-6 py-3.5 font-bold text-plum-900 shadow-[0_12px_28px_-12px_rgba(217,149,28,.9)] transition hover:bg-honey-400 active:scale-[.98]"
            >
              <ShoppingBag className="size-5" /> {t.add}
            </button>
          </div>
          <a
            href={buyNow}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-wa px-6 py-3.5 font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,211,102,.8)] transition hover:bg-wa-dark"
          >
            <WhatsAppIcon className="size-5" /> {t.buyNow}
          </a>

          <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-plum-700">
            {[Leaf, Truck, Banknote].map((Icon, i) => (
              <li key={i} className="flex flex-col items-center gap-1.5 rounded-2xl bg-cream-100 px-2 py-3">
                <Icon className="size-5 text-honey-700" />
                {t.guarantees[i]}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-6 border-t border-plum-900/10 pt-8">
            <section>
              <h2 className="font-display text-xl font-semibold">{t.about}</h2>
              <p className="mt-2 leading-relaxed text-plum-700">{tr(product.description)}</p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold">{t.benefits}</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {tr(product.benefits).map((b) => (
                  <li key={b} className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-medium ring-1 ring-plum-900/5">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-honey-200 text-honey-700">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <section className="pt-20">
        <h2 className="font-display mb-6 text-3xl font-semibold">{t.related}</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
