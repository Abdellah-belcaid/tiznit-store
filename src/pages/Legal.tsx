import { NavLink } from "react-router-dom";
import { useLang } from "../lib/i18n";
import { getLegalPage, LEGAL_UPDATED, legalPaths, type LegalId } from "../data/legal";

export default function Legal({ id }: { id: LegalId }) {
  const { lang, t } = useLang();
  const page = getLegalPage(id, lang);
  const updated = new Date(LEGAL_UPDATED).toLocaleDateString(lang === "ar" ? "ar-MA" : "fr-MA", { dateStyle: "long" });

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <nav className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 text-sm font-semibold">
        {(Object.keys(legalPaths) as LegalId[]).map((key) => (
          <NavLink
            key={key}
            to={legalPaths[key]}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-4 py-2 transition ${isActive ? "bg-plum-800 text-cream-50" : "bg-plum-900/5 text-plum-800 hover:bg-plum-900/10"}`
            }
          >
            {t.legal[key]}
          </NavLink>
        ))}
      </nav>

      <h1 className="font-display mt-8 text-4xl font-semibold sm:text-5xl">{page.title}</h1>
      <p className="mt-2 text-sm text-plum-600/70">
        {t.legal.updated} : {updated}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-plum-700">{page.intro}</p>

      <div className="mt-10 space-y-8">
        {page.sections.map((s) => (
          <section key={s.title} className="rounded-3xl bg-white p-6 ring-1 ring-plum-900/5">
            <h2 className="font-display text-xl font-semibold text-plum-900">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-plum-700">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
