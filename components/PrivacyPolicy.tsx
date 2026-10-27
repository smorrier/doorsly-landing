import { Fragment, type ReactNode } from "react";
import { ArrowLeft, Building2 } from "lucide-react";

import { ConsentPreferencesLink } from "@/components/consent/ConsentPreferencesLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { otherLang, type Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { PATHS, PRIVACY_OFFICER } from "@/lib/site";

type PrivacyPolicyProps = {
  lang: Lang;
  dict: Dictionary;
};

/** Replaces {officerName}, {officerEmail} and {cookiePrefs} in a policy string. */
function renderText(text: string, dict: Dictionary): ReactNode {
  return text.split(/(\{officerEmail\}|\{cookiePrefs\}|\{officerName\})/).map((part, i) => {
    switch (part) {
      case "{officerName}":
        return <Fragment key={i}>{PRIVACY_OFFICER.name}</Fragment>;
      case "{officerEmail}":
        return (
          <a
            key={i}
            href={`mailto:${PRIVACY_OFFICER.email}`}
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            {PRIVACY_OFFICER.email}
          </a>
        );
      case "{cookiePrefs}":
        return (
          <ConsentPreferencesLink
            key={i}
            label={dict.consent.preferencesLink}
            className="font-medium text-primary"
          />
        );
      default:
        return <Fragment key={i}>{part}</Fragment>;
    }
  });
}

export function PrivacyPolicy({ lang, dict }: PrivacyPolicyProps) {
  const doc = dict.privacy;
  const otherLanguage = otherLang(lang);

  return (
    <div className="min-h-screen bg-background">
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <a
            href={PATHS.home(lang)}
            aria-label={dict.header.homeAria}
            className="flex items-center space-x-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Doorsly
            </span>
          </a>
          <LanguageSwitcher
            href={PATHS.privacy(otherLanguage)}
            targetLang={otherLanguage}
            label={dict.language.switchTo}
            ariaLabel={dict.language.switchAria}
          />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <a
          href={PATHS.home(lang)}
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
          {doc.backLabel}
        </a>

        <h1 className="mb-2 text-4xl font-bold">{doc.title}</h1>
        <p className="mb-12 text-sm text-muted-foreground">
          {doc.updatedLabel}
          {lang === "fr" ? " " : ""}: {doc.updated}
        </p>

        <div className="space-y-10">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
              <div className="space-y-4 leading-relaxed text-slate-700">
                {section.blocks.map((block, i) =>
                  typeof block === "string" ? (
                    <p key={i}>{renderText(block, dict)}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-2 pl-6">
                      {block.map((item) => (
                        <li key={item}>{renderText(item, dict)}</li>
                      ))}
                    </ul>
                  ),
                )}
                {section.table ? (
                  <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full min-w-[34rem] text-left text-sm">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          {section.table.head.map((cell) => (
                            <th key={cell} scope="col" className="px-3 py-2 font-medium">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {section.table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td
                                key={i}
                                className={i === 0 ? "px-3 py-2 font-mono text-xs" : "px-3 py-2"}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <nav aria-label={dict.footer.legalNavAria} className="mb-3">
          <ConsentPreferencesLink label={dict.consent.preferencesLink} />
        </nav>
        <p>
          &copy; {new Date().getFullYear()} Doorsly. {dict.footer.rights}
        </p>
      </footer>
    </div>
  );
}
