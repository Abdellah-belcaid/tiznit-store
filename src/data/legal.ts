// Legal pages (Mentions légales, CGV, Confidentialité) in Arabic and French.
// Seller details come from the VITE_LEGAL_* variables; see docs/legal-morocco.md for the why.
import { config } from "../lib/config";
import type { Lang } from "./products";

export type LegalId = "mentions" | "cgv" | "privacy";

export interface LegalSection {
  title: string;
  body: string[];
}

export interface LegalPage {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const legalPaths: Record<LegalId, string> = {
  mentions: "/mentions-legales",
  cgv: "/conditions-de-vente",
  privacy: "/confidentialite",
};

export const LEGAL_UPDATED = "2026-11-02";

const HOST_FR = "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com";
const HOST_AR = "Vercel Inc.، 440 N Barranca Ave #4133, Covina, CA 91723، الولايات المتحدة الأمريكية — vercel.com";

export function getLegalPage(id: LegalId, lang: Lang): LegalPage {
  const ar = lang === "ar";
  const todo = ar ? "[يُستكمل]" : "[à compléter]";
  const v = (s: string) => s || todo;
  const { legal } = config;
  const seller = v(legal.name);
  const email = legal.email ? (ar ? ` أو عبر البريد الإلكتروني ${legal.email}` : ` ou par e-mail à ${legal.email}`) : "";
  const contact = ar
    ? `واتساب أو الهاتف ${config.phoneDisplay}${email}`
    : `WhatsApp ou téléphone au ${config.phoneDisplay}${email}`;

  const pages: Record<LegalId, LegalPage> = ar
    ? {
        mentions: {
          title: "الإشعار القانوني",
          intro: "معلومات عن الجهة التي تنشر هذا الموقع وتستضيفه.",
          sections: [
            {
              title: "ناشر الموقع",
              body: [
                `الاسم أو التسمية التجارية: ${seller}`,
                `الصفة القانونية: ${v(legal.status)}`,
                `رقم التعريف الموحد للمقاولة (ICE): ${v(legal.ice)}`,
                `العنوان: ${v(legal.address)}`,
                `الهاتف / واتساب: ${config.phoneDisplay}${legal.email ? ` · البريد الإلكتروني: ${legal.email}` : ""}`,
              ],
            },
            { title: "استضافة الموقع", body: [HOST_AR] },
            {
              title: "الملكية الفكرية",
              body: ["جميع النصوص والصور والشعار في هذا الموقع ملك لـ " + seller + "، ولا يجوز نسخها أو استعمالها دون إذن مسبق."],
            },
            {
              title: "المعطيات الشخصية",
              body: [
                "تتم معالجة معطياتكم وفقاً للقانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي. للمزيد، اطلعوا على سياسة الخصوصية.",
              ],
            },
          ],
        },
        cgv: {
          title: "شروط البيع العامة",
          intro: "تنظم هذه الشروط كل عملية شراء عبر هذا الموقع، طبقاً للقانون رقم 31-08 القاضي بتحديد تدابير لحماية المستهلك. إرسال الطلب يعني أنكم قرأتم هذه الشروط ووافقتم عليها.",
          sections: [
            { title: "1. البائع", body: [`${seller} — ${v(legal.address)} — ICE: ${v(legal.ice)}. للتواصل: ${contact}.`] },
            {
              title: "2. المنتجات",
              body: [
                "نصف كل منتج بأكبر قدر من الدقة (المصدر، الحجم، الطعم). الصور للتوضيح وقد يختلف شكل العلبة قليلاً.",
                "المعلومات الإلزامية (المكونات، تاريخ الصلاحية، رقم الدفعة، شروط الحفظ) مكتوبة على العلبة.",
              ],
            },
            {
              title: "3. الأسعار",
              body: [
                "الأسعار معروضة بالدرهم المغربي وتشمل جميع الرسوم.",
                config.deliveryFee
                  ? `مصاريف التوصيل: ${config.deliveryFee} درهم${config.freeDeliveryFrom ? `، والتوصيل مجاني ابتداءً من ${config.freeDeliveryFrom} درهم` : ""}. يظهر المبلغ الإجمالي قبل إرسال الطلب.`
                  : "مصاريف التوصيل تختلف حسب المدينة، ونخبركم بها مع المبلغ الإجمالي قبل تأكيد الطلب.",
              ],
            },
            {
              title: "4. الطلب والتأكيد",
              body: [
                "تختارون المنتجات وتملؤون معلومات التوصيل، ثم يُرسل الطلب في رسالة واتساب.",
                "نرسل لكم بعد ذلك تأكيداً مكتوباً على واتساب فيه تفاصيل الطلب والمبلغ الإجمالي وموعد التوصيل. لا يصبح الطلب نهائياً إلا بعد هذا التأكيد.",
              ],
            },
            { title: "5. الأداء", body: ["الأداء نقداً عند الاستلام، بعد التحقق من الطرد."] },
            {
              title: "6. التوصيل",
              body: [
                "نوصل إلى جميع مدن المغرب عبر شركة توصيل شريكة، عادة خلال 2 إلى 5 أيام عمل.",
                "في جميع الحالات لا تتجاوز مدة التوصيل 30 يوماً من تاريخ الطلب. إذا لم يكن المنتج متوفراً نخبركم فوراً ويمكنكم إلغاء الطلب.",
              ],
            },
            {
              title: "7. حق التراجع والإرجاع",
              body: [
                "لكم أجل 7 أيام ابتداءً من تاريخ الاستلام للتراجع عن الشراء دون ذكر السبب، ما عدا الحالات المستثناة قانوناً.",
                "لأسباب صحية، لا يمكن إرجاع المنتجات الغذائية التي فُتحت علبتها أو أُزيل غطاؤها المختوم.",
                "مصاريف الإرجاع على حساب الزبون، ونرد المبلغ المؤدى خلال 15 يوماً على الأكثر من تاريخ التراجع.",
              ],
            },
            {
              title: "8. الشكايات",
              body: [
                `المرجو فحص الطرد عند الاستلام. إذا كان المنتج تالفاً أو غير مطابق للطلب، أخبرونا خلال 48 ساعة مع صورة عبر ${contact}، وسنستبدله أو نرد المبلغ.`,
              ],
            },
            { title: "9. القانون المطبق", body: ["تخضع هذه الشروط للقانون المغربي، ولا سيما القانون رقم 31-08 المتعلق بحماية المستهلك."] },
          ],
        },
        privacy: {
          title: "سياسة الخصوصية",
          intro: "نحترم خصوصيتكم. نجمع فقط ما نحتاجه لتوصيل طلبكم، طبقاً للقانون رقم 09-08.",
          sections: [
            { title: "المسؤول عن المعالجة", body: [`${seller} — ${v(legal.address)}. للتواصل: ${contact}.`] },
            {
              title: "المعطيات التي نجمعها",
              body: ["الاسم، المدينة، العنوان، رقم الهاتف (عبر واتساب)، وأي ملاحظة تكتبونها مع الطلب."],
            },
            { title: "الغاية", body: ["معالجة الطلب وتأكيده، التوصيل، وخدمة ما بعد البيع. لا نبيع معطياتكم ولا نستعملها للإشهار دون موافقتكم."] },
            {
              title: "من يطّلع عليها",
              body: [
                "البائع، وشركة التوصيل (الاسم والعنوان والهاتف فقط).",
                "يمر الطلب عبر واتساب (شركة Meta) ويُستضاف الموقع لدى Vercel، وهما شركتان خارج المغرب. الموقع نفسه لا يحفظ معطياتكم على أي خادم: السلة ومعلوماتكم محفوظة في متصفحكم فقط.",
              ],
            },
            { title: "مدة الحفظ", body: ["نحتفظ بمعطيات الطلب طوال مدة العلاقة التجارية، وبالمدة التي يفرضها القانون بالنسبة للوثائق المحاسبية."] },
            {
              title: "حقوقكم",
              body: [
                `لكم الحق في الولوج إلى معطياتكم وتصحيحها والتعرض على معالجتها (المواد 7 و8 و9 من القانون 09-08). يكفي أن تراسلونا عبر ${contact}.`,
              ],
            },
            {
              title: "اللجنة الوطنية لمراقبة حماية المعطيات (CNDP)",
              body: [
                legal.cndp
                  ? `تم التصريح بهذه المعالجة لدى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي تحت رقم ${legal.cndp}.`
                  : "التصريح بهذه المعالجة لدى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي في طور الإنجاز.",
              ],
            },
            { title: "ملفات تعريف الارتباط (Cookies)", body: ["لا نستعمل أي cookies للتتبع أو الإشهار. نحفظ فقط اللغة والسلة في متصفحكم لتسهيل الطلب."] },
          ],
        },
      }
    : {
        mentions: {
          title: "Mentions légales",
          intro: "Informations sur l'éditeur et l'hébergeur de ce site.",
          sections: [
            {
              title: "Éditeur du site",
              body: [
                `Nom ou raison sociale : ${seller}`,
                `Statut juridique : ${v(legal.status)}`,
                `Identifiant commun de l'entreprise (ICE) : ${v(legal.ice)}`,
                `Adresse : ${v(legal.address)}`,
                `Téléphone / WhatsApp : ${config.phoneDisplay}${legal.email ? ` · E-mail : ${legal.email}` : ""}`,
              ],
            },
            { title: "Hébergement", body: [HOST_FR] },
            {
              title: "Propriété intellectuelle",
              body: [`Les textes, photos et le logo de ce site appartiennent à ${seller}. Toute reproduction sans autorisation préalable est interdite.`],
            },
            {
              title: "Données personnelles",
              body: [
                "Vos données sont traitées conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Voir la politique de confidentialité.",
              ],
            },
          ],
        },
        cgv: {
          title: "Conditions générales de vente",
          intro: "Ces conditions s'appliquent à tout achat sur ce site, conformément à la loi n° 31-08 édictant des mesures de protection du consommateur. Envoyer une commande vaut acceptation de ces conditions.",
          sections: [
            { title: "1. Vendeur", body: [`${seller} — ${v(legal.address)} — ICE : ${v(legal.ice)}. Contact : ${contact}.`] },
            {
              title: "2. Produits",
              body: [
                "Chaque produit est décrit le plus fidèlement possible (origine, format, goût). Les photos sont illustratives ; l'emballage peut légèrement varier.",
                "Les mentions obligatoires (ingrédients, date limite, numéro de lot, conservation) figurent sur l'emballage.",
              ],
            },
            {
              title: "3. Prix",
              body: [
                "Les prix sont indiqués en dirhams marocains, toutes taxes comprises.",
                config.deliveryFee
                  ? `Frais de livraison : ${config.deliveryFee} DH${config.freeDeliveryFrom ? `, offerts dès ${config.freeDeliveryFrom} DH d'achat` : ""}. Le total est affiché avant l'envoi de la commande.`
                  : "Les frais de livraison dépendent de la ville ; ils vous sont communiqués avec le total avant la confirmation.",
              ],
            },
            {
              title: "4. Commande et confirmation",
              body: [
                "Vous choisissez vos produits, indiquez vos informations de livraison, puis la commande est envoyée par message WhatsApp.",
                "Nous vous adressons ensuite une confirmation écrite sur WhatsApp reprenant le détail, le prix total et le délai de livraison. La commande n'est ferme qu'après cette confirmation.",
              ],
            },
            { title: "5. Paiement", body: ["Paiement en espèces à la livraison, après vérification du colis."] },
            {
              title: "6. Livraison",
              body: [
                "Livraison dans tout le Maroc par un transporteur partenaire, généralement sous 2 à 5 jours ouvrés.",
                "Le délai ne dépasse en aucun cas 30 jours à compter de la commande. Si un produit est indisponible, nous vous prévenons immédiatement et vous pouvez annuler.",
              ],
            },
            {
              title: "7. Droit de rétractation et retours",
              body: [
                "Vous disposez de 7 jours à compter de la réception pour vous rétracter sans avoir à vous justifier, sauf exceptions prévues par la loi.",
                "Pour des raisons d'hygiène, les produits alimentaires ouverts ou dont l'opercule a été retiré ne sont ni repris ni échangés.",
                "Les frais de retour sont à la charge du client. Le remboursement intervient au plus tard 15 jours après la rétractation.",
              ],
            },
            {
              title: "8. Réclamations",
              body: [
                `Merci de vérifier le colis à la réception. Produit abîmé ou non conforme : signalez-le sous 48 h avec une photo via ${contact}, nous le remplaçons ou vous remboursons.`,
              ],
            },
            { title: "9. Droit applicable", body: ["Les présentes conditions sont soumises au droit marocain, notamment à la loi n° 31-08 sur la protection du consommateur."] },
          ],
        },
        privacy: {
          title: "Politique de confidentialité",
          intro: "Nous respectons votre vie privée et ne collectons que ce qui est nécessaire pour livrer votre commande, conformément à la loi n° 09-08.",
          sections: [
            { title: "Responsable du traitement", body: [`${seller} — ${v(legal.address)}. Contact : ${contact}.`] },
            { title: "Données collectées", body: ["Nom, ville, adresse, numéro de téléphone (via WhatsApp) et la note éventuelle jointe à la commande."] },
            {
              title: "Finalité",
              body: ["Traiter et confirmer la commande, la livrer et assurer le service après-vente. Vos données ne sont ni vendues ni utilisées à des fins publicitaires sans votre accord."],
            },
            {
              title: "Destinataires",
              body: [
                "Le vendeur et le transporteur (nom, adresse et téléphone uniquement).",
                "La commande transite par WhatsApp (Meta) et le site est hébergé par Vercel, deux sociétés situées hors du Maroc. Le site lui-même n'enregistre vos données sur aucun serveur : le panier et vos informations restent dans votre navigateur.",
              ],
            },
            { title: "Durée de conservation", body: ["Les données de commande sont conservées pendant la relation commerciale, puis le temps imposé par la loi pour les pièces comptables."] },
            {
              title: "Vos droits",
              body: [`Vous disposez d'un droit d'accès, de rectification et d'opposition (articles 7, 8 et 9 de la loi 09-08). Il suffit de nous écrire via ${contact}.`],
            },
            {
              title: "CNDP",
              body: [
                legal.cndp
                  ? `Ce traitement a été déclaré auprès de la Commission nationale de contrôle de la protection des données à caractère personnel sous le n° ${legal.cndp}.`
                  : "La déclaration de ce traitement auprès de la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP) est en cours.",
              ],
            },
            { title: "Cookies", body: ["Aucun cookie de suivi ou de publicité. Seuls la langue et le panier sont mémorisés dans votre navigateur pour faciliter la commande."] },
          ],
        },
      };

  return pages[id];
}
