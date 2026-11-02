# Legal guide: running Tiznit Store online in Morocco

> **Not legal advice.** This is research compiled on 2 November 2026 from official texts (where available) and Moroccan professional sources. Laws and thresholds change. Before launch, confirm with the **CNDP**, the provincial **ONSSA** office, and an accountant or lawyer.
>
> Confidence markers used below:
> - ✅ **Verified**: read in the official text (Bulletin officiel text or official CNDP guide).
> - ⚠️ **To confirm**: from secondary sources (consultants, press) or sources that disagree.

---

## 0. TL;DR: what must be done before going live

| # | What | Who | Law | Status of the current site |
|---|---|---|---|---|
| 1 | Have a legal business status (auto-entrepreneur or RC) with an **ICE** | Seller | Tax law / Law 114-13 | Unknown: ask him |
| 2 | **Declare the website's data processing to the CNDP** (+ transfer request, since WhatsApp/hosting are abroad) | Seller (you can prepare it) | Law 09-08 | ❌ Not done |
| 3 | Add **legal notices + CGV (terms of sale) + privacy notice**, in **Arabic** (French optional) | You | 31-08 art. 29, 30, 206 · 09-08 | ❌ Missing |
| 4 | Add a **non-pre-checked checkbox** "I accept the CGV and the data notice" before sending an order | You | 31-08 art. 30 · CNDP guide | ❌ Missing |
| 5 | Show **seller identity**: name, address, phone, email, ICE/RC | You | 31-08 art. 29 | ⚠️ Only phone + city |
| 6 | Show **delivery fees and delays**, payment methods, 7-day return right | You + seller | 31-08 art. 29, 36 | ⚠️ Says "fees confirmed later" |
| 7 | **ONSSA sanitary authorization** for packing/labelling honey, amlou, etc. + number on labels | Seller | Law 28-07, decree 2-17-463 | Unknown: ask him |
| 8 | Only say **"Safran de Taliouine"** if the saffron is **AOP-certified** | Seller | Law 25-06 | ⚠️ Name used on site |
| 9 | Remove or soften **health claims** ("boosts immunity", "helps sleep") unless provable | You | 31-08 art. 21–22 | ❌ Present in product data |
| 10 | Written contract between you and him (scope, price/%, data, ownership) | You + seller | Code of obligations · 09-08 | ❌ Not done |

---

## 1. Who is responsible for what?

- **The seller (your brother's friend)** is the **"fournisseur"** under consumer law and the **"responsable du traitement"** (data controller) under the data law. Customers buy from him, and their names and addresses end up on his WhatsApp. **The legal obligations are his.**
- **You (the developer)** are a **service provider / "sous-traitant"** (data processor). Your job is to:
  - build the site so he *can* comply (legal pages, consent checkbox, security);
  - sign a contract with him that says what you do with data, if anything (CNDP guide §7 ✅).
- If you later **host his data on your VPS** (PocketBase version), you become a real data processor: you must protect it and only use it for him.

> **Example.** A customer complains that their address was leaked. The CNDP will ask the **seller** first. If the leak came from your badly secured VPS, he can turn against you, which is why the contract and security matter.

---

## 2. Business status: can he legally sell online?

Selling online is just selling. He needs the same status as for his shop, plus correct invoicing.

| Option | When it fits | Key facts |
|---|---|---|
| **Auto-entrepreneur** (Law 114-13) | Small turnover, one person | Tax on turnover: **0.5 %** for commercial activity, **1 %** for services ⚠️. Declared quarterly on **ae.gov.ma**. Turnover ceilings: **500,000 MAD** commerce / **200,000 MAD** services according to most sources ⚠️ (one source says the reverse; check ae.gov.ma). |
| **Registre de commerce** (individual or SARL) | He already has a shop with RC, or higher turnover | Needed for a merchant bank account / online card payment (CMI) ⚠️ |

- **ICE** (Identifiant Commun de l'Entreprise) must appear on invoices ⚠️. Under 31-08 art. 29 ✅, an online seller must display his **RC number** (if registered) and his **tax ID** (if subject to VAT).
- Under 31-08 art. 4 ✅, he must give a **receipt or invoice** for every purchase. A simple invoice slip in each delivery package works.

> **Example.** He already has a physical shop "Tiznit Store" with an RC. The website just adds a sales channel: no new company is needed. He shows his RC + ICE in the site's legal notices.
>
> **Example.** He sells only from home, with no status. He should register as **auto-entrepreneur** (free, online) before advertising the site.

---

## 3. Personal data: Law 09-08 and the CNDP

The authority is the **CNDP** (Commission Nationale de contrôle de la protection des Données à caractère Personnel), **www.cndp.ma**.

### 3.1 Does this site collect personal data?

**Yes.** In the basket the customer types their **name, city, address, note**, and this is sent with their **phone number** (via WhatsApp) to the seller. The CNDP lists exactly these as personal data (name, address, email, phone, ID number, photo…) ✅.

Current data flow:

```
Customer's browser ──(name, city, address, order)──► WhatsApp (Meta, servers abroad) ──► seller's phone
        │
        └─ basket + form saved in the customer's own browser (localStorage), never sent to our server
Site hosting: Vercel (abroad); static files only, no customer database
```

### 3.2 What the CNDP official website guide requires ✅

*Source: CNDP, "Lignes directrices relatives à la conformité des sites web à la loi 09-08".*

1. **Notify the CNDP before starting** (§2–3). Any website owner collecting personal data must notify:
   - a **prior declaration** (*déclaration préalable*): the normal case for this shop;
   - an **authorization request**: only for national ID numbers (CIN) or sensitive data (health, religion, ethnicity…). **Never ask for the CIN on the order form**, and you stay in the simple case;
   - a **transfer request** when data is **hosted or stored on servers abroad**. It must be filed **at the same time** as the declaration.
   - Forms are on cndp.ma. Some consultants report an online e-service and a processing time of about **2 months for authorizations** ⚠️.
2. **Inform people at collection time** (§4): who the seller is, why the data is collected, who receives it, which fields are mandatory, their **right of access, rectification and opposition**, how to exercise it, and the **CNDP receipt number**.
3. **Ask for consent** with a **checkbox that is NOT pre-checked** (§4, remarks).
4. Put a **data protection clause in the legal notices / CGV** (model below, §5.1).
5. **Collect only what's needed** (§6): name, phone, city and address are justified for delivery. Birthday or CIN are not.
6. **Security** (§7): restrict access, secure systems, contract with any processor (that's you).
7. **Keep data only as long as needed** (§8). Example: delete old WhatsApp orders and customer lists after X months/years, keeping only what accounting requires.
8. **Marketing messages** (§9): only with prior consent, or to existing customers for similar products, **always with a way to unsubscribe**. Example: "Send STOP to stop receiving our offers".
9. **Cookies** (§10): consent is needed **before** setting cookies that use personal data. *Today the site sets no cookies and has no analytics. If you add Meta Pixel / Google Analytics, you need a cookie banner first.*

### 3.3 Transfers abroad: why it matters here ⚠️

Law 09-08 **art. 43–44** only allow sending data to a foreign country with adequate protection, or with **CNDP authorization**. Consultants say using foreign cloud services counts as a transfer.

- **WhatsApp (Meta):** order messages go through Meta's servers abroad.
- **Vercel:** hosts the site in the US/EU. Today it only serves static files and stores no customer data, but it logs IP addresses.
- **Future PocketBase on your VPS:** if the VPS is outside Morocco (Hetzner, OVH, Contabo…), customer data is stored abroad, so a transfer request is needed. A Moroccan host avoids this.

The practical answer: in the CNDP declaration, **tick/declare the transfer** and list WhatsApp/Meta and the hosting provider.

### 3.4 Model texts ✅ (adapted from the CNDP guide §5)

**In the legal notices / CGV (§5.1 model):**
> [Seller's name / Tiznit Store], [address]. The information collected on [site address] is used to process and deliver your orders. Recipients: the Tiznit Store team and its delivery partner. In accordance with Law 09-08 of 18 February 2009, you have a right of access, rectification and, for legitimate reasons, opposition, which you can exercise by contacting [phone / email]. This processing has been notified to the CNDP under receipt n° [….] of [date].

**Under the order form (§5.2 model):**
> In accordance with Law 09-08, you have a right of access, rectification and opposition to the processing of your personal data. This processing has been notified to the CNDP under n° [….].
> ☐ I have read and accept the terms of sale and the personal data notice.

### 3.5 Penalties ⚠️

Per press and consultants, Law 09-08 art. 52 punishes processing **without declaration or authorization** with a fine of about **10,000–100,000 MAD**. Security failures (art. 55) can bring **3 months–1 year of prison and/or 20,000–200,000 MAD**. The CNDP has increased its inspections in recent years.

---

## 4. Consumer protection: Law 31-08 (distance selling) ✅

A WhatsApp order from a website is a **"vente à distance"**. Everything below was read in the official text.

### 4.1 What the site must show before the order (art. 29)
1. The **main characteristics** of each product (weight, origin…). Already on the site ✓.
2. **Seller identity**: name, **phone**, **email and physical address**. For a registered merchant: **RC number** (+ company capital if a company), and **tax ID** if subject to VAT.
3. **Delivery delays and fees**.
4. The **7-day withdrawal right** (see 4.4).
5. **Payment, delivery and execution terms**: e.g. "cash on delivery, delivery in 2–5 days".
6. **How long the offer and price are valid**.
7. The cost of the communication method (WhatsApp is free; say so).
8. Before the contract is concluded, the customer must be able to **review their choices and confirm or modify them**. The basket review + WhatsApp message does this ✓.

**Prices (art. 5):** must be the **total price** including taxes and **every mandatory extra cost**. If delivery is mandatory and paid, show it, or show "+ delivery X DH".

### 4.2 Terms of sale (CGV) (art. 30)
- Must be **easy to reach from the home page**.
- Must be **expressly accepted by the customer before confirming** the order, hence the checkbox.

### 4.3 Written confirmation (art. 32)
At the latest **on delivery**, the customer must receive **in writing or on a durable medium**:
the order details, the **address where to complain**, the **withdrawal right conditions**, after-sales/guarantee information.
> Easy way to comply: the seller replies on WhatsApp with a confirmation template (WhatsApp counts as durable writing) **and** puts a printed slip with the same info in the parcel.

### 4.4 Withdrawal right (art. 36–38)
- The customer has **7 days** from receiving the goods to withdraw, **without giving a reason and without penalty**, except **return shipping costs**.
- If the seller **did not send the written confirmation** (art. 32), this becomes **30 days**.
- **Refund within 15 days** of the withdrawal (art. 37); after that, legal interest is due.
- **Exceptions (art. 38-3):** goods made to the customer's specifications, or that **by their nature can't be sent back, deteriorate or expire quickly**.
  - Honey, amlou, saffron and oil are **not** quickly perishable, so the 7-day right **probably applies**.
  - A reasonable CGV rule: *"returns accepted within 7 days for **unopened, sealed** products; return costs paid by the customer"*. Food hygiene makes opened jars hard to resell; that rule is widely used, but whether it holds in court is untested ⚠️.

### 4.5 Delivery deadline (art. 39–40)
- Unless agreed otherwise, the order must be delivered within **30 days** of confirmation.
- If a product is **unavailable**, tell the customer and refund **within 15 days** of payment.

### 4.6 Arabic is mandatory (art. 206)
> Any document written in a foreign language must be accompanied by its **Arabic translation**.

So the **CGV, legal notices and privacy text must exist in Arabic**. French can be added. The site is already Arabic-first ✓.

### 4.7 Advertising and claims (art. 21–22, 174)
Misleading advertising is punished with **50,000–250,000 MAD** (art. 174). The advertiser must be able to **prove** claims.
> ⚠️ The current product data says things like "boosts immunity", "soothes cough", "helps sleep". These are **health claims**. Reword to traditional or taste-based wording, e.g. *"traditionally enjoyed in winter with tea"* instead of *"soulage les voies respiratoires"*.

### 4.8 Penalties (Title IX) ✅
| Breach | Fine |
|---|---|
| Missing general information (Title II: prices, labelling…) | art. 173: **2,000–5,000 MAD** |
| Missing distance-selling info / CGV / written confirmation (art. 29, 30, 32) | art. 177: **1,200–10,000 MAD** (doubled if repeated) |
| Refusing to refund (art. 37, 40) | art. 178: **1,200–50,000 MAD** |
| Not delivering within the deadline (art. 39) | art. 179: **2,000–20,000 MAD** |
| Misleading advertising (art. 21–22) | art. 174: **50,000–250,000 MAD** |

---

## 5. Food safety: ONSSA (Law 28-07)

- Every unit that **produces, processes, packages (*conditionnement*), stores or labels** food for sale needs an **ONSSA sanitary authorization**, filed with the **provincial ONSSA office** before starting (ONSSA communications ✅ via press).
- Honey has its own decree, **n° 2-17-463 (2017)** ✅: **honey packing workshops must be sanitarily authorized** (via decree 2-10-473) and ensure **traceability**. ONSSA publishes the list of authorized honey packing establishments.
- Products made in Morocco should show the **ONSSA authorization number on the label**.
- Pure retail (selling already-packaged, labelled products from authorized producers) is generally exempt from approval ⚠️.

> **Example 1.** He buys honey in bulk and fills jars with his own "Tiznit Store" labels. That is **packaging/labelling**, so **he needs an ONSSA authorization** and the number goes on the label.
>
> **Example 2.** He resells jars already packed and labelled by an authorized cooperative (with their ONSSA number). That is retail, and generally no authorization is needed for him ⚠️.
>
> The labels in the photos show "Tiznit store" branding but **no visible ONSSA number**. **Ask him.** A website makes him much more visible to inspectors and competitors.

---

## 6. Protected names: "Safran de Taliouine", "Argane"

- **Law 25-06** on distinctive signs of origin and quality ✅ (via WIPO) protects AOP/IGP names.
- **"Safran de Taliouine" is an AOP** (arrêté n° 1355-10 of 30 April 2010, amended 2018) ✅. Only saffron **produced and certified** under its specification may use the name. Producers actively complain about fake "Taliouine" saffron.
- **"Argane"** is also a protected IGP.

> **Rule for the site:** if his saffron comes with **AOP certification** from a Taliouine cooperative, keep the name and show the AOP mention. If not, call it *"Safran marocain"* or *"Safran de la région du Souss"* ⚠️.
> "Huile d'argan" as a generic product name is common. Only claim the **IGP Argane** label if the product carries it.

---

## 7. Domain, hosting, payment

- **.ma domains** are managed by the **ANRT** and sold by accredited registrars. Register it **in the seller's name** (or his company).
- **Hosting abroad** (Vercel, Cloudflare, foreign VPS): fine technically, but **declare the transfer to the CNDP** if it stores customer data (§3.3).
- **Vercel's free Hobby plan is for non-commercial use only.** For the real shop, use **Cloudflare Pages** (free, commercial OK) or a paid plan.
- **Cash on delivery** needs no special license. **Online card payment** requires a payment provider (e.g. CMI) and generally an RC + bank account ⚠️, and 31-08 art. 35 requires **secure payment means** ✅.

---

## 8. Your own side (the developer)

1. **Your status:** to invoice him legally, register as **auto-entrepreneur (services, ~1 % tax ⚠️)** or use your existing status. Since 2023, revenue above **80,000 MAD/year from a single client** falls outside the auto-entrepreneur regime ⚠️. That won't apply here, but keep it in mind.
2. **Contract with him** (one page is enough), covering:
   - scope (what's included, what's extra), price or **% of delivered site orders** + monthly minimum + duration;
   - **domain and data belong to him**; you hand everything over if you stop working together;
   - **data processing clause**: you only process customer data to run the site, keep it secure, back it up, and never reuse or sell it (CNDP guide §7 ✅);
   - who pays hosting and the domain.
3. **Percentage income is income:** declare it under your status.
4. **Security if you host data (PocketBase):** HTTPS, strong admin passwords, daily backups, OS updates, no admin panel exposed without auth. A leak can trigger art. 55-type penalties for the controller, and liability for you.

---

## 9. Scenarios

| Situation | What's needed |
|---|---|
| **Demo only** (link sent to him, no real customers) | Nothing legally; it's a prototype. Keep "demo prices" visible. |
| **Launch as-is with WhatsApp orders** | Status + ICE · CNDP declaration (+ transfer: WhatsApp) · legal notices + CGV + privacy in Arabic · consent checkbox · delivery fees/delays · ONSSA if he packs · fix claims & saffron naming |
| **Add analytics / Meta Pixel** | Everything above + **cookie consent banner before loading them** |
| **Send promos to past customers on WhatsApp** | Allowed for similar products to existing customers, **with an easy opt-out** ("STOP") |
| **V2: PocketBase on your VPS storing customers & orders** | Update the CNDP declaration (new storage, VPS location → transfer if abroad) · processor contract with you · backups & security · retention rule (e.g. delete customer data after 3 years without orders) |
| **Online card payment** | RC + bank/CMI contract · secure payment page · same CGV with payment & refund rules |
| **Selling to customers abroad** (MRE in France…) | Customs/food import rules of the destination country apply; much more complex. Start with Morocco only. |

---

## 10. Site changes to make (developer to-do)

- [ ] `/mentions-legales` page (AR + FR): seller name, address, phone, email, RC/ICE, host (Vercel/Cloudflare + address), CNDP receipt n°, data clause (§3.4).
- [ ] `/cgv` page (AR + FR): products, prices TTC, delivery zones/fees/delays, cash on delivery, 7-day withdrawal (sealed products), refund in 15 days, complaints address, 30-day delivery max.
- [ ] `/confidentialite` page: data collected, purpose, recipients (seller, delivery, WhatsApp/Meta), retention, rights, contact, CNDP n°.
- [ ] Footer links to the three pages (art. 30: reachable from the home page).
- [ ] Basket: **unchecked checkbox** "I accept the CGV and the data notice" + 09-08 short notice + CNDP n°. Block sending until checked.
- [ ] Show **delivery fee / delay** in basket and product pages.
- [ ] Reword **health claims** in `src/data/products.ts`.
- [ ] Rename saffron unless AOP-certified; add ONSSA n° to product pages if he has one.
- [ ] WhatsApp **confirmation template** for the seller (art. 32) + printed slip in parcels.
- [ ] Before adding analytics: cookie banner.

---

## 11. Sources

**Official / primary**
- CNDP: [Lignes directrices relatives à la conformité des sites web à la loi 09-08 (PDF)](https://www.cndp.ma/wp-content/uploads/2023/01/CNDP-guide-conformite-sites-web-fr.pdf) · [Conformité des sites web](https://www.cndp.ma/conformite-des-sites-web/) · [CNDP press release on sanctions (2022)](https://www.cndp.ma/wp-content/uploads/2023/11/CNDP-DEC-Communiqu_Version_franaise_20221220.pdf)
- Law 31-08, consumer protection, BO n° 5932 of 07/04/2011: [full text (ONSSA mirror, PDF)](https://www.onssa.gov.ma/wp-content/uploads/2022/06/Reglementation/C.Reglementation-Connexe/4.%20Divers/LOI.31-08.FR.pdf) · [WIPO Lex](https://www.wipo.int/wipolex/fr/legislation/details/19773) · [Ministry of Commerce consumer guide (PDF)](https://www.mcinet.gov.ma/sites/default/files/Guide%20du%20consommateur%20-%20FR.pdf)
- Honey decree n° 2-17-463: [ONSSA (PDF)](https://www.onssa.gov.ma/wp-content/uploads/Reglementation/R%C3%A9glementation%20Sectorielle/Produits%20Alimentaires/Produits%20d%E2%80%99origine%20Animale/Miel%20et%20Produits%20de%20la%20Ruche/DEC.2-17-463.FR.pdf) · [List of authorized honey packing establishments (PDF)](https://www.onssa.gov.ma/wp-content/uploads/2022/10/5-Miel.pdf)
- Ministry of Agriculture: [Sécurité sanitaire](https://www.agriculture.gov.ma/fr/programme/securite-sanitaire)
- Law 25-06 / AOP Safran de Taliouine: [WIPO Lex: Law 25-06](https://www.wipo.int/wipolex/fr/legislation/details/19878) · [WIPO Lex: AOP Taliouine order](https://www.wipo.int/wipolex/en/legislation/details/19878)

**Secondary (press, consultants): used for points marked ⚠️**
- [Medias24: sanctions for personal data violations](https://medias24.com/2023/07/01/donnees-personnelles-ce-que-prevoit-la-loi-en-cas-de-violations/) · [Hespress: CNDP steps up inspections](https://fr.hespress.com/425645-425645.html)
- [Upsilon Consulting: international transfers](https://upsilon-consulting.com/transfert-international-donnees-personnelles-maroc/) · [CNDP sanctions](https://upsilon-consulting.com/sanctions-cndp-risques-penaux-amendes/) · [auto-entrepreneur tax](https://upsilon-consulting.com/auto-entrepreneur-ir-regime-fiscal-maroc/)
- [Nooralto: online shop legal checklist (Morocco)](https://www.nooralto.com/blog/obligations-legales-boutique-en-ligne-maroc.html) · [Samed Agency: legal notices](https://samedagency.com/blog/mentions-legales-site-internet-maroc/) · [Samed Agency: 31-08 checklist](https://samedagency.com/blog/loi-31-08-vente-en-ligne-maroc/)
- [Maroc Hebdo: ONSSA authorization reminder](https://www.maroc-hebdo.com/article/agroalimentaire-onssa-autorisation-sanitaire) · [Le360: saffron counterfeiting](https://fr.le360.ma/societe/comment-les-producteurs-de-safran-au-maroc-luttent-contre-les-contrefacons-180578/)
- [Wafir: auto-entrepreneur ceilings 2026](https://wafir.ma/fr/guide/plafonds-auto-entrepreneur-cpu-cnss-maroc-2026) · [FNH: auto-entrepreneur taxation](https://fnh.ma/article/actualite-financiere-maroc/fiscalite-de-l-autoentrepreneuriat-ou-placer-le-curseur)

**Where to confirm**
- CNDP: www.cndp.ma · contact@cndp.ma · +212 5 37 57 11 24
- ONSSA provincial office (Tiznit) for the sanitary authorization
- Auto-entrepreneur portal: ae.gov.ma · Tax: tax.gov.ma (DGI)
