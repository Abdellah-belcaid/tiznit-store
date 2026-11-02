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
  city: env.VITE_STORE_CITY || "Tiznit, Maroc",
  currency: env.VITE_CURRENCY || "DH",
};

export const telHref = `tel:${config.phoneDisplay.replace(/\s/g, "")}`;
