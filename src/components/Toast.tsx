import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useCart } from "../lib/cart";
import { useLang } from "../lib/i18n";
import { getProduct } from "../data/products";
import ProductImage from "./ProductImage";

export default function Toast() {
  const { toast, setOpen, dismissToast } = useCart();
  const { t, tr } = useLang();
  const p = toast && getProduct(toast.id);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 sm:bottom-8">
      <AnimatePresence>
        {p && (
          <motion.button
            key={toast.key}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={() => {
              dismissToast();
              setOpen(true);
            }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-plum-900 py-2.5 pe-5 ps-2.5 text-start text-cream-50 shadow-2xl"
          >
            <ProductImage src={p.image} art={p.art} alt="" className="size-12 rounded-xl" />
            <span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-honey-300">
                <Check className="size-4" /> {t.added}
              </span>
              <span className="text-sm text-cream-100/90">
                {tr(p.name)} · <span dir="ltr">{toast.size}</span>
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
