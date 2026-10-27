import type { MetadataRoute } from "next";

import { LANGS } from "@/lib/i18n/config";
import { PATHS, SITE_URL } from "@/lib/site";

const PAGES = [PATHS.home, PATHS.privacy];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) => {
    const languages = Object.fromEntries(
      LANGS.map((lang) => [lang, `${SITE_URL}${path(lang)}`]),
    );
    return LANGS.map((lang) => ({
      url: `${SITE_URL}${path(lang)}`,
      alternates: { languages },
    }));
  });
}
