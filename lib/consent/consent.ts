/**
 * Cookie and tracking consent (Québec Law 25 / PIPEDA): analytics and advertising run only after
 * the visitor opts in. Shared by the browser and the server; no DOM or Next imports here.
 *
 * `necessary` is always on (the consent cookie itself). `analytics` gates Google Analytics;
 * `advertising` gates the Meta Pixel / Conversions API and the Google Ads tag.
 */

export type ConsentCategory = "necessary" | "analytics" | "advertising";
export type OptionalConsentCategory = Exclude<ConsentCategory, "necessary">;

export const OPTIONAL_CONSENT_CATEGORIES: readonly OptionalConsentCategory[] = [
  "analytics",
  "advertising",
];

/** Bump when the policy or the categories change: older choices are ignored and the banner asks again. */
export const CONSENT_VERSION = 1;

export const CONSENT_COOKIE = "dl_consent";
/** About 13 months, the usual ceiling for a consent cookie. */
export const CONSENT_MAX_AGE_SECONDS = 395 * 24 * 60 * 60;

export interface ConsentState {
  version: number;
  analytics: boolean;
  advertising: boolean;
  /** When the choice was made (ms since epoch). */
  updatedAt: number;
}

export function createConsent(
  choice: Record<OptionalConsentCategory, boolean>,
  now: number = Date.now(),
): ConsentState {
  return {
    version: CONSENT_VERSION,
    analytics: choice.analytics,
    advertising: choice.advertising,
    updatedAt: now,
  };
}

/** Cookie value: `<version>.<analytics 0|1>.<advertising 0|1>.<unix seconds>`, e.g. `1.1.0.1761234567`. */
export function serializeConsent(consent: ConsentState): string {
  return [
    consent.version,
    consent.analytics ? 1 : 0,
    consent.advertising ? 1 : 0,
    Math.floor(consent.updatedAt / 1000),
  ].join(".");
}

function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Lenient parse of the cookie value; anything malformed becomes null ("not asked yet"). */
export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  const match = /^(\d{1,4})\.([01])\.([01])\.(\d{1,12})$/.exec(
    decodeURIComponentSafe(raw).trim(),
  );
  if (!match) return null;
  return {
    version: Number(match[1]),
    analytics: match[2] === "1",
    advertising: match[3] === "1",
    updatedAt: Number(match[4]) * 1000,
  };
}

/** A choice made under the current policy version; older versions must be asked again. */
export function isCurrentConsent(
  consent: ConsentState | null | undefined,
): consent is ConsentState {
  return !!consent && consent.version === CONSENT_VERSION;
}

/** True only for an explicit opt-in under the current version. `necessary` is always granted. */
export function isGranted(
  consent: ConsentState | null | undefined,
  category: ConsentCategory,
): boolean {
  if (category === "necessary") return true;
  return isCurrentConsent(consent) && consent[category];
}
