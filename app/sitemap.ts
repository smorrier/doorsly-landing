import type { MetadataRoute } from "next";

import { LANGS } from "@/lib/i18n/config";
import { PATHS, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LANGS.map((lang) => [lang, `${SITE_URL}${PATHS.home(lang)}`]),
  );
  return LANGS.map((lang) => ({
    url: `${SITE_URL}${PATHS.home(lang)}`,
    alternates: { languages },
  }));
}
