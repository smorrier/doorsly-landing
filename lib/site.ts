import type { Lang } from "@/lib/i18n/config";

export const SITE_URL = "https://getdoorsly.com";

/** The Doorsly app, where accounts are created. Set NEXT_PUBLIC_APP_URL to change it. */
const DEFAULT_APP_URL = "https://app.getdoorsly.com";

/** The origin from NEXT_PUBLIC_APP_URL (no path); the default if it is missing, malformed or not https. */
function appOrigin(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!value) return DEFAULT_APP_URL;
  try {
    const url = new URL(value);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    return url.protocol === "https:" || local ? url.origin : DEFAULT_APP_URL;
  } catch {
    return DEFAULT_APP_URL;
  }
}

export const APP_URL = appOrigin();

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
