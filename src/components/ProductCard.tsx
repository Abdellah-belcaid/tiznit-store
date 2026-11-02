import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useLang } from "../lib/i18n";
import { useCart } from "../lib/cart";
import { minPrice, type Product } from "../data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { t, tr, price } = useLang();
  const { add } = useCart();
  const first = product.sizes[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_rgba(58,31,43,.06),0_12px_30px_-18px_rgba(58,31,43,.35)] ring-1 ring-plum-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(58,31,43,.45)]">
      <Link to={`/produit/${product.id}`} className="relative block">
        <ProductImage
          src={product.image}
          art={product.art}
          alt={tr(product.name)}
          className="aspect-[4/5]"
          imgClassName="transition duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute start-3 top-3 rounded-full bg-plum-800/90 px-3 py-1 text-xs font-semibold text-honey-300 backdrop-blur">
            {tr(product.badge)}
          </span>
        )}
      </Link>

      <button
        onClick={() => add(product.id, first.label)}
        aria-label={`${t.add} — ${tr(product.name)}`}
        className="absolute end-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-plum-800 shadow-lg backdrop-blur transition hover:bg-honey-500 active:scale-90"
      >
        <Plus className="size-5" />
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-honey-700">{tr(product.origin)}</p>
        <Link to={`/produit/${product.id}`} className="font-display text-lg font-semibold leading-snug text-plum-900 hover:text-plum-600 sm:text-xl">
          {tr(product.name)}
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="whitespace-nowrap text-sm text-plum-600">
            <span className="block text-[0.7rem] text-plum-600/70">{t.from}</span>
            <span className="text-lg font-bold text-plum-900">{price(minPrice(product))}</span>
          </p>
          <div className="hidden flex-wrap justify-end gap-1 sm:flex">
            {product.sizes.map((s) => (
              <span key={s.label} className="rounded-full bg-cream-100 px-2 py-0.5 text-[0.68rem] font-semibold text-plum-700" dir="ltr">
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
