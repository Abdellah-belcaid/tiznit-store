/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_PHONE_DISPLAY?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_STORE_CITY?: string;
  readonly VITE_CURRENCY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
