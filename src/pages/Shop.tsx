import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLang } from "../lib/i18n";
import { categories, minPrice, products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { t, tr } = useLang();
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "all";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = products.filter((p) => cat === "all" || p.category === cat);
    if (q) out = out.filter((p) => [p.name.ar, p.name.fr, p.origin.ar, p.origin.fr].join(" ").toLowerCase().includes(q));
    if (sort === "asc") out = [...out].sort((a, b) => minPrice(a) - minPrice(b));
    if (sort === "desc") out = [...out].sort((a, b) => minPrice(b) - minPrice(a));
    if (sort === "popular") out = [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return out;
  }, [cat, query, sort]);

  const chips = [{ id: "all", name: { ar: t.all, fr: t.all } }, ...categories];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="honeycomb relative mt-6 overflow-hidden rounded-[2.5rem] bg-plum-800 px-6 py-12 text-cream-50 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -end-20 -top-20 size-72 rounded-full bg-honey-500/25 blur-3xl" />
        <h1 className="font-display relative text-4xl font-semibold sm:text-5xl">{t.shopTitle}</h1>
        <p className="relative mt-3 max-w-lg text-cream-100/80">{t.shopSub}</p>
      </header>

      <div className="sticky top-[4.5rem] z-30 -mx-4 mt-6 bg-cream-50/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            {chips.map((c) => (
              <button
                key={c.id}
                onClick={() => setParams(c.id === "all" ? {} : { cat: c.id })}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  cat === c.id ? "bg-plum-800 text-honey-300 shadow-lg" : "bg-white text-plum-800 ring-1 ring-plum-900/10 hover:ring-plum-900/25"
                }`}
              >
                {tr(c.name)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 lg:w-72">
              <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-plum-600/60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search}
                className="w-full rounded-full bg-white py-2.5 pe-4 ps-11 text-sm ring-1 ring-plum-900/10 focus:outline-none focus:ring-2 focus:ring-honey-500"
              />
            </label>
            <label className="relative">
              <SlidersHorizontal className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-plum-600/60" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-full appearance-none rounded-full bg-white py-2.5 pe-4 ps-10 text-sm font-medium ring-1 ring-plum-900/10 focus:outline-none focus:ring-2 focus:ring-honey-500"
              >
                {Object.entries(t.sort).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mb-4 mt-2 text-sm text-plum-600">{t.results(list.length)}</p>

      {list.length === 0 ? (
        <p className="rounded-3xl bg-cream-100 py-20 text-center text-plum-600">{t.noResults}</p>
      ) : (
        <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
