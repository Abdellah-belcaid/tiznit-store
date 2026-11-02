# Tiznit Store — demo

Catalogue site for natural products from the Souss (honey, amlou, saffron, oils).
No backend: customers fill a basket and the order is sent as a pre-filled WhatsApp message.
Arabic (RTL) and French. React + TypeScript + Vite + Tailwind.

Legal checklist for running it in Morocco: [docs/legal-morocco.md](docs/legal-morocco.md).

## Run

```bash
npm install
npm run dev
```

## Settings (`.env`)

Copy `.env.example` to `.env` and edit:

| Variable | What it does |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Number that receives orders (`0640…` or `212640…`) |
| `VITE_PHONE_DISPLAY` | Phone shown on the site |
| `VITE_FACEBOOK_URL` / `VITE_INSTAGRAM_URL` | Social links (empty = hidden) |
| `VITE_STORE_CITY` | City shown in footer / About |
| `VITE_CURRENCY` | Currency label (`DH` shows as درهم in Arabic) |

These are read at build time: restart `npm run dev`, or redeploy, after changing them.
On Vercel, set them in Project → Settings → Environment Variables and redeploy.

## Products

Edit `src/data/products.ts` (names, prices, sizes, descriptions in `ar` / `fr`). `npm run typecheck` catches mistakes.
Products without a photo show an illustrated jar/bottle (`art` field).

To add photos, put raw pictures in a folder and adjust `scripts/prepare-images.mjs`, then:

```bash
node scripts/prepare-images.mjs path/to/photos
```

## Deploy

Deployed on Vercel (`vercel.json` handles SPA routes):

```bash
npx vercel --prod
```
