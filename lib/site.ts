import type { Lang } from "@/lib/i18n/config";

export const SITE_URL = "https://getdoorsly.com";

/** Number people text to start a demo (E.164). Override per environment. */
export const DEMO_SMS_NUMBER = process.env.NEXT_PUBLIC_DEMO_SMS_NUMBER || "+14385333509";

/** "+14385333509" -> "(438) 533-3509"; anything else is shown as given. */
export function formatDemoNumber(e164: string): string {
  const match = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : e164;
}

/** Link that opens the messaging app with the greeting already typed. `?&body=` works on iOS and Android. */
export function smsHref(body: string): string {
  return `sms:${DEMO_SMS_NUMBER}?&body=${encodeURIComponent(body)}`;
}

/** Person in charge of personal information (Québec Law 25). Fill in before the ads go live. */
export const PRIVACY_OFFICER = {
  name: "TODO_PRIVACY_OFFICER_NAME",
  email: "TODO_PRIVACY_EMAIL",
} as const;

/** Language-specific page paths (the privacy page has a different slug per language). */
export const PATHS = {
  home: (lang: Lang) => `/${lang}`,
  privacy: (lang: Lang) => (lang === "fr" ? "/fr/confidentialite" : "/en/privacy"),
} as const;
