/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_PHONE_DISPLAY?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_STORE_CITY?: string;
  readonly VITE_CURRENCY?: string;
  readonly VITE_DELIVERY_FEE?: string;
  readonly VITE_FREE_DELIVERY_FROM?: string;
  readonly VITE_LEGAL_NAME?: string;
  readonly VITE_LEGAL_STATUS?: string;
  readonly VITE_LEGAL_ICE?: string;
  readonly VITE_LEGAL_ADDRESS?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CNDP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
