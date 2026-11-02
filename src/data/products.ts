// Product catalogue. Prices are demo values in MAD — edit them here.
// Describe taste, origin and use only: no health or medical claims (law 31-08 on misleading ads, ONSSA labelling rules).
// `image` points to /public/images; products without a photo get an illustrated jar
// using `art` (fill = product colour, kind = jar | bottle | small).

export type Lang = "ar" | "fr";
export type Localized<T = string> = Record<Lang, T>;
export type CategoryId = "honey" | "amlou" | "saffron" | "oils";

export interface JarArtSpec {
  kind?: "jar" | "bottle";
  fill?: string;
  lid?: string;
}

export interface Size {
  label: string;
  price: number;
}

export interface Category {
  id: CategoryId;
  name: Localized;
  blurb: Localized;
  image?: string;
  art?: JarArtSpec;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: Localized;
  origin: Localized;
  short: Localized;
  description: Localized;
  benefits: Localized<string[]>;
  sizes: Size[];
  image?: string;
  gallery?: string[];
  art?: JarArtSpec;
  badge?: Localized;
  featured?: boolean;
}

export const categories: Category[] = [
  { id: "honey", name: { ar: "العسل الحر", fr: "Miels" }, blurb: { ar: "أزهار سوس والأطلس", fr: "Fleurs du Souss et de l'Atlas" }, image: "/images/miel-euphorbe.webp" },
  { id: "amlou", name: { ar: "أملو", fr: "Amlou" }, blurb: { ar: "لوز، أركان وعسل", fr: "Amande, argan & miel" }, image: "/images/amlou-amande.webp" },
  { id: "saffron", name: { ar: "زعفران", fr: "Safran" }, blurb: { ar: "زعفران تالوين الحر", fr: "Safran pur de Taliouine" }, image: "/images/safran.webp" },
  { id: "oils", name: { ar: "الزيوت", fr: "Huiles" }, blurb: { ar: "أركان وزيتون بلدي", fr: "Argan & olive beldi" }, art: { kind: "bottle", fill: "#c99a2e" } },
];

export const products: Product[] = [
  {
    id: "miel-euphorbe",
    category: "honey",
    name: { ar: "عسل الدغموس", fr: "Miel d'Euphorbe" },
    origin: { ar: "سوس · تيزنيت", fr: "Souss · Tiznit" },
    short: {
      ar: "عسل نادر بطعم قوي وحار قليلاً، يُجنى من نبتة الدغموس الصحراوية.",
      fr: "Miel rare au goût puissant et légèrement poivré, butiné sur l'euphorbe du désert.",
    },
    description: {
      ar: "يُعد عسل الدغموس من أشهر أنواع العسل المغربي. تجمعه النحل من أزهار نبتة الدغموس التي تنمو في المناطق الجافة لسوس. لونه عنبري داكن وطعمه قوي مع لمسة حارة في الحلق، وهي علامة على أصالته.",
      fr: "Le miel d'euphorbe (Daghmous) est l'un des miels marocains les plus recherchés. Les abeilles le butinent sur l'euphorbe résinifère des zones arides du Souss. Couleur ambrée, goût intense et une légère sensation piquante en gorge — signe de son authenticité.",
    },
    benefits: {
      ar: ["طعم قوي ومميز", "عسل نادر من سوس", "ملعقة في الصباح أو مع مشروب ساخن"],
      fr: ["Goût intense et typé", "Miel rare du Souss", "Une cuillère le matin ou dans une infusion"],
    },
    sizes: [
      { label: "250g", price: 90 },
      { label: "500g", price: 170 },
      { label: "1kg", price: 320 },
    ],
    image: "/images/miel-euphorbe.webp",
    gallery: ["/images/miel-euphorbe.webp", "/images/miel-euphorbe-1kg.webp", "/images/honey-stack.webp"],
    badge: { ar: "الأكثر طلباً", fr: "Best-seller" },
    featured: true,
  },
  {
    id: "miel-thym",
    category: "honey",
    name: { ar: "عسل الشوك", fr: "Miel de Thym" },
    origin: { ar: "الأطلس الصغير", fr: "Anti-Atlas" },
    short: {
      ar: "عسل جبلي عطري، مثالي للفطور ومع الشاي.",
      fr: "Miel de montagne très aromatique, parfait au petit-déjeuner et dans le thé.",
    },
    description: {
      ar: "عسل جبلي يُجنى من أزهار الشوك والزعتر البري في جبال الأطلس الصغير. له رائحة عطرية مميزة وقوام كثيف، ويتبلور بشكل طبيعي مع الوقت.",
      fr: "Récolté sur le thym sauvage et les fleurs épineuses des montagnes de l'Anti-Atlas. Parfum herbacé marqué, texture dense, il cristallise naturellement avec le temps.",
    },
    benefits: {
      ar: ["رائحة الزعتر البري", "قوام كثيف", "يتبلور بشكل طبيعي"],
      fr: ["Parfum de thym sauvage", "Texture dense", "Cristallise naturellement"],
    },
    sizes: [
      { label: "250g", price: 80 },
      { label: "500g", price: 150 },
      { label: "1kg", price: 280 },
    ],
    image: "/images/miel-thym.webp",
    gallery: ["/images/miel-thym.webp", "/images/honey-stack.webp"],
    featured: true,
  },
  {
    id: "miel-oranger",
    category: "honey",
    name: { ar: "عسل الليمون", fr: "Miel d'Oranger" },
    origin: { ar: "سهل سوس", fr: "Plaine du Souss" },
    short: {
      ar: "عسل فاتح ولطيف برائحة زهر الليمون، يحبه الأطفال.",
      fr: "Miel clair et doux au parfum de fleur d'oranger, adoré des enfants.",
    },
    description: {
      ar: "يُجنى من بساتين الحوامض في سهل سوس. لونه ذهبي فاتح وطعمه حلو ولطيف مع رائحة زهر الليمون. مثالي للحلويات والمشروبات.",
      fr: "Issu des vergers d'agrumes de la plaine du Souss. Couleur dorée claire, saveur douce et florale. Idéal pour les pâtisseries, les boissons et les tartines.",
    },
    benefits: {
      ar: ["طعم حلو ولطيف", "رائحة زهر الليمون", "مثالي للحلويات والمشروبات"],
      fr: ["Saveur douce et florale", "Parfum de fleur d'oranger", "Idéal en pâtisserie et boissons"],
    },
    sizes: [
      { label: "250g", price: 50 },
      { label: "500g", price: 90 },
      { label: "1kg", price: 170 },
    ],
    image: "/images/miel-oranger.webp",
    gallery: ["/images/miel-oranger.webp", "/images/honey-stack.webp"],
    featured: true,
  },
  {
    id: "miel-eucalyptus",
    category: "honey",
    name: { ar: "عسل الأوكاليبتوس", fr: "Miel d'Eucalyptus" },
    origin: { ar: "سوس ماسة", fr: "Souss-Massa" },
    short: {
      ar: "عسل بطعم منعش، صديق الجهاز التنفسي في فصل الشتاء.",
      fr: "Saveur fraîche et mentholée, l'allié de l'hiver pour les voies respiratoires.",
    },
    description: {
      ar: "عسل داكن بنكهة منعشة مميزة، يُجنى من أشجار الأوكاليبتوس. رفيق مثالي للمشروبات الساخنة في فصل الشتاء.",
      fr: "Miel foncé aux notes fraîches et boisées, récolté sur les eucalyptus. Parfait avec une boisson chaude en hiver.",
    },
    benefits: {
      ar: ["نكهة منعشة مميزة", "لون داكن وطعم قوي", "مثالي لفصل الشتاء"],
      fr: ["Notes fraîches et boisées", "Couleur foncée, goût affirmé", "Idéal en hiver"],
    },
    sizes: [
      { label: "500g", price: 90 },
      { label: "1kg", price: 170 },
    ],
    image: "/images/miel-eucalyptus.webp",
    gallery: ["/images/miel-eucalyptus.webp", "/images/honey-stack.webp"],
  },
  {
    id: "amlou-amande",
    category: "amlou",
    name: { ar: "أملو اللوز", fr: "Amlou Amande" },
    origin: { ar: "صنع تقليدي · تيزنيت", fr: "Fait main · Tiznit" },
    short: {
      ar: "لوز محمص، زيت أركان وعسل حر — الفطور المغربي الأصيل.",
      fr: "Amandes torréfiées, huile d'argan et miel pur — le vrai petit-déjeuner berbère.",
    },
    description: {
      ar: "أملو تقليدي محضّر بطريقة يدوية من اللوز المحمص وزيت الأركان الأصلي والعسل الحر. قوام كريمي غني وطعم لا يُنسى، يُقدّم مع الخبز البلدي أو المسمن.",
      fr: "Amlou traditionnel préparé à la main avec des amandes torréfiées, de l'huile d'argan pure et du miel naturel. Texture onctueuse, goût inoubliable — à déguster avec du pain beldi ou des msemen.",
    },
    benefits: {
      ar: ["محضّر يدوياً", "بدون مواد حافظة مضافة", "مثالي لوجبة الفطور"],
      fr: ["Préparé à la main", "Sans conservateurs ajoutés", "Idéal au petit-déjeuner"],
    },
    sizes: [
      { label: "500g", price: 110 },
      { label: "1kg", price: 200 },
    ],
    image: "/images/amlou-amande.webp",
    gallery: ["/images/amlou-amande.webp"],
    badge: { ar: "صنع يدوي", fr: "Fait main" },
    featured: true,
  },
  {
    id: "amlou-beldi",
    category: "amlou",
    name: { ar: "أملو بلدي بالأركان", fr: "Amlou Beldi à l'Argan" },
    origin: { ar: "تعاونيات سوس", fr: "Coopératives du Souss" },
    short: {
      ar: "الوصفة البلدية الأصلية بزيت أركان أكثر وطعم أعمق.",
      fr: "La recette beldi d'origine, plus riche en argan, au goût profond.",
    },
    description: {
      ar: "وصفة الجدات: لوز بلدي، زيت أركان محمص بنسبة عالية وعسل حر. طعم عميق ولون داكن.",
      fr: "La recette des grands-mères : amandes beldi, forte proportion d'huile d'argan torréfiée et miel pur. Goût profond et couleur foncée.",
    },
    benefits: {
      ar: ["زيت أركان أصلي", "لوز بلدي", "صنع تقليدي"],
      fr: ["Huile d'argan pure", "Amandes beldi", "Fabrication traditionnelle"],
    },
    sizes: [
      { label: "500g", price: 140 },
      { label: "1kg", price: 260 },
    ],
    art: { kind: "jar", fill: "#8a5a2b", lid: "#3a1f2b" },
  },
  {
    id: "amlou-cacahuete",
    category: "amlou",
    name: { ar: "أملو الكاوكاو", fr: "Amlou Cacahuètes" },
    origin: { ar: "صنع تقليدي", fr: "Fait maison" },
    short: {
      ar: "النسخة الاقتصادية والمحبوبة عند الأطفال.",
      fr: "La version gourmande et économique, adorée des enfants.",
    },
    description: {
      ar: "أملو محضّر من الكاوكاو المحمص مع زيت الأركان والعسل. طعم لذيذ وسعر مناسب للعائلة.",
      fr: "Amlou préparé avec des cacahuètes torréfiées, de l'huile d'argan et du miel. Délicieux et à petit prix pour toute la famille.",
    },
    benefits: {
      ar: ["سعر مناسب", "طعم يحبه الصغار", "مثالي لوجبة الفطور"],
      fr: ["Prix doux", "Les enfants adorent", "Parfait au petit-déjeuner"],
    },
    sizes: [
      { label: "500g", price: 60 },
      { label: "1kg", price: 110 },
    ],
    art: { kind: "jar", fill: "#b9803f", lid: "#c0392b" },
  },
  {
    // Keep "Taliouine" only if the jar carries the official AOP label (law 25-06); otherwise rename to "Safran marocain".
    id: "safran-taliouine",
    category: "saffron",
    name: { ar: "زعفران تالوين", fr: "Safran de Taliouine" },
    origin: { ar: "تالوين · تارودانت", fr: "Taliouine · Taroudant" },
    short: {
      ar: "الذهب الأحمر: زعفران حر 100% من تالوين.",
      fr: "L'or rouge : safran 100% pur de Taliouine, en filaments.",
    },
    description: {
      ar: "زعفران تالوين معروف بجودته العالية. خيوط حمراء قانية، تُقطف يدوياً زهرة بزهرة. لون قوي ورائحة عطرية رائعة للطاجين والشاي والحلويات.",
      fr: "Le safran de Taliouine est réputé pour sa qualité. Filaments rouge vif cueillis à la main, fleur par fleur. Couleur intense et arôme envoûtant pour vos tajines, thés et desserts.",
    },
    benefits: {
      ar: ["خيوط حمراء كاملة", "قطف يدوي", "لون ورائحة قوية"],
      fr: ["Filaments entiers", "Cueilli à la main", "Couleur et arôme intenses"],
    },
    sizes: [
      { label: "1g", price: 40 },
      { label: "2g", price: 75 },
      { label: "5g", price: 180 },
    ],
    image: "/images/safran.webp",
    gallery: ["/images/safran.webp"],
    badge: { ar: "الذهب الأحمر", fr: "L'or rouge" },
    featured: true,
  },
  {
    id: "huile-argan",
    category: "oils",
    name: { ar: "زيت أركان الطعام", fr: "Huile d'Argan alimentaire" },
    origin: { ar: "تعاونيات نسائية · سوس", fr: "Coopératives féminines · Souss" },
    short: {
      ar: "زيت أركان محمص، معصور على البارد بالطريقة التقليدية.",
      fr: "Huile d'argan torréfiée, pressée à froid de façon traditionnelle.",
    },
    description: {
      ar: "زيت أركان غذائي بطعم الجوز المحمص، من إنتاج تعاونيات نسائية في سوس. مثالي مع الخبز، الأملو، والسلطات.",
      fr: "Huile d'argan alimentaire au goût de noisette grillée, produite par des coopératives féminines du Souss. Parfaite avec le pain, l'amlou et les salades.",
    },
    benefits: {
      ar: ["طعم الجوز المحمص", "عصر تقليدي", "إنتاج تعاونيات"],
      fr: ["Goût de noisette grillée", "Pressage traditionnel", "Issu de coopératives"],
    },
    sizes: [
      { label: "250ml", price: 120 },
      { label: "500ml", price: 220 },
      { label: "1L", price: 420 },
    ],
    art: { kind: "bottle", fill: "#c99a2e" },
    featured: true,
  },
  {
    id: "huile-olive",
    category: "oils",
    name: { ar: "زيت الزيتون البلدي", fr: "Huile d'Olive Beldi" },
    origin: { ar: "معصرة تقليدية", fr: "Pressoir traditionnel" },
    short: {
      ar: "زيت زيتون بلدي بطعم قوي من المعصرة مباشرة.",
      fr: "Huile d'olive beldi au goût fruité intense, directement du pressoir.",
    },
    description: {
      ar: "زيت زيتون بكر من المعصرة التقليدية، لونه أخضر ذهبي وطعمه قوي. للطبخ والسلطات والفطور.",
      fr: "Huile d'olive vierge du pressoir traditionnel, couleur vert doré et goût fruité intense. Pour la cuisine, les salades et le petit-déjeuner.",
    },
    benefits: {
      ar: ["عصرة أولى", "بدون خلط", "طعم بلدي أصيل"],
      fr: ["Première pression", "100% pure", "Goût beldi authentique"],
    },
    sizes: [
      { label: "1L", price: 80 },
      { label: "5L", price: 380 },
    ],
    art: { kind: "bottle", fill: "#8f9a2c" },
  },
];

export const getProduct = (id: string | undefined) => products.find((p) => p.id === id);
export const minPrice = (p: Product) => Math.min(...p.sizes.map((s) => s.price));
