// Store settings injected from environment variables (see .env.example).
const env = import.meta.env;

// wa.me needs the international format without "+" or leading zeros: 0640508854 -> 212640508854
function toInternational(raw: string | undefined) {
  let n = String(raw || "").replace(/\D/g, "");
  if (n.startsWith("00")) n = n.slice(2);
  if (n.startsWith("0")) n = "212" + n.slice(1);
  return n;
}

export const config = {
  whatsapp: toInternational(env.VITE_WHATSAPP_NUMBER || "0640508854"),
  phoneDisplay: env.VITE_PHONE_DISPLAY || "06 40 50 88 54",
  facebook: env.VITE_FACEBOOK_URL || "",
  instagram: env.VITE_INSTAGRAM_URL || "",
  city: env.VITE_STORE_CITY || "Casablanca, Maroc",
  currency: env.VITE_CURRENCY || "DH",
  // Flat delivery fee in DH (0 = confirmed with the customer) and free-delivery threshold (0 = none)
  deliveryFee: Number(env.VITE_DELIVERY_FEE) || 0,
  freeDeliveryFrom: Number(env.VITE_FREE_DELIVERY_FROM) || 0,
  // Seller identity for the legal pages (empty = shown as "to complete")
  legal: {
    name: env.VITE_LEGAL_NAME || "",
    status: env.VITE_LEGAL_STATUS || "",
    ice: env.VITE_LEGAL_ICE || "",
    address: env.VITE_LEGAL_ADDRESS || "",
    email: env.VITE_CONTACT_EMAIL || "",
    cndp: env.VITE_CNDP_NUMBER || "",
  },
};

/** Delivery fee for a basket subtotal, or null when it is confirmed later. */
export function deliveryFor(subtotal: number): number | null {
  if (config.freeDeliveryFrom && subtotal >= config.freeDeliveryFrom) return 0;
  return config.deliveryFee || null;
}

export const telHref = `tel:${config.phoneDisplay.replace(/\s/g, "")}`;
