import type { Lang } from "@/lib/i18n/config";

export const SITE_URL = "https://getdoorsly.com";

/**
 * Person in charge of personal information (Québec Law 25), shown in the privacy policy. Set
 * NEXT_PUBLIC_PRIVACY_OFFICER_NAME and NEXT_PUBLIC_PRIVACY_OFFICER_EMAIL; a production build
 * fails without them (next.config.mjs), so the placeholders only appear in local work.
 */
export const PRIVACY_OFFICER = {
  name: process.env.NEXT_PUBLIC_PRIVACY_OFFICER_NAME || "TODO_PRIVACY_OFFICER_NAME",
  email: process.env.NEXT_PUBLIC_PRIVACY_OFFICER_EMAIL || "TODO_PRIVACY_EMAIL",
} as const;

/** Public contact address shown in the footer. Optional: with no value, no contact link is shown. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

/** Page paths per language. */
export const PATHS = {
  home: (lang: Lang) => `/${lang}`,
  privacy: (lang: Lang) => `/${lang}/privacy`,
} as const;
