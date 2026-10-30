import type { Metadata } from "next";

import { LANGS, type Lang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";

type PageSeo = {
  lang: Lang;
  title: string;
  description: string;
  /** Path of this page in each language (they differ for the privacy page). */
  paths: Record<Lang, string>;
};

/** Title, description, canonical, hreflang and social tags for one language of a page. */
export function pageMetadata({ lang, title, description, paths }: PageSeo): Metadata {
  const dict = getDictionary(lang);
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = paths[l];
  languages["x-default"] = "/";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: paths[lang], languages },
    openGraph: {
      type: "website",
      siteName: "Doorsly",
      url: `${SITE_URL}${paths[lang]}`,
      title,
      description,
      locale: dict.meta.ogLocale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
