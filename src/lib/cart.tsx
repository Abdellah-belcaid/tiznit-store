import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProduct, type Product } from "../data/products";

interface CartLine {
  id: string;
  size: string;
  qty: number;
}

export interface CartItem extends CartLine {
  product: Product;
  price: number;
}

interface Toast {
  id: string;
  size: string;
  key: number;
}

interface CartValue {
  items: CartItem[];
  count: number;
  total: number;
  add: (id: string, size: string, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  toast: Toast | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartValue | null>(null);
const KEY = "ts-cart";

function load(): CartLine[] {
  try {
    const raw: CartLine[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    // Drop lines whose product/size no longer exists in the catalogue
    return raw.filter((l) => getProduct(l.id)?.sizes.some((s) => s.label === l.size));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add = useCallback((id: string, size: string, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id && l.size === size);
      if (found) return ls.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
      return [...ls, { id, size, qty }];
    });
    clearTimeout(toastTimer.current);
    setToast({ id, size, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const setQty = useCallback((id: string, size: string, qty: number) => {
    setLines((ls) =>
      qty <= 0 ? ls.filter((l) => !(l.id === id && l.size === size)) : ls.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l))
    );
  }, []);

  const value = useMemo<CartValue>(() => {
    // load() already dropped unknown products/sizes, so these lookups are safe
    const items = lines.map((l) => {
      const product = getProduct(l.id)!;
      const price = product.sizes.find((s) => s.label === l.size)!.price;
      return { ...l, product, price };
    });
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
      add,
      setQty,
      clear: () => setLines([]),
      open,
      setOpen,
      toast,
      dismissToast: () => setToast(null),
    };
  }, [lines, open, toast, add, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
