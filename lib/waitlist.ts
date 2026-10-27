import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n/config";
import { DOORS_VALUES, type DoorsValue } from "@/lib/i18n/types";

/** Ad parameters read from the page address when the form is submitted (no attribution cookie). */
export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;
export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_EMAIL_LENGTH = 254;
const MAX_VALUE_LENGTH = 200;

/** Trims, drops control characters (no newlines in Slack or Loops fields) and caps the length. */
export function cleanValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  // eslint-disable-next-line no-control-regex
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return cleaned ? cleaned.slice(0, MAX_VALUE_LENGTH) : undefined;
}

export function isDoorsValue(value: unknown): value is DoorsValue {
  return typeof value === "string" && (DOORS_VALUES as readonly string[]).includes(value);
}

/** The ad parameters present in a query string (`window.location.search`). */
export function attributionFromSearch(search: string): Attribution {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = cleanValue(params.get(key));
    if (value) found[key] = value;
  }
  return found;
}

/** Event ids are generated in the browser (UUIDs); anything else is dropped. */
const EVENT_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

export type WaitlistSignup = {
  email: string;
  language: Lang;
  doors?: DoorsValue;
  attribution: Attribution;
  /** Id the browser's Meta Pixel Lead uses, so the server copy deduplicates against it. */
  eventId?: string;
  /** Page the form was on, for Meta's event_source_url. Checked against the origin before use. */
  pageUrl?: string;
  /** Honeypot: real visitors never fill it. */
  honeypot: string;
};

export type ParsedSignup =
  | { ok: true; signup: WaitlistSignup }
  | { ok: false; error: "invalid_body" | "invalid_email" };

/** Validates the JSON body of POST /api/waitlist. Unknown or malformed optional fields are dropped. */
export function parseWaitlistBody(body: unknown): ParsedSignup {
  if (!body || typeof body !== "object") return { ok: false, error: "invalid_body" };
  const record = body as Record<string, unknown>;

  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "invalid_email" };
  }

  const attribution: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = cleanValue(record[key]);
    if (value) attribution[key] = value;
  }

  const eventId =
    typeof record.eventId === "string" && EVENT_ID_PATTERN.test(record.eventId)
      ? record.eventId
      : undefined;

  return {
    ok: true,
    signup: {
      email,
      language: isLang(record.language) ? record.language : DEFAULT_LANG,
      doors: isDoorsValue(record.doors) ? record.doors : undefined,
      attribution,
      eventId,
      pageUrl: typeof record.pageUrl === "string" ? record.pageUrl.slice(0, 1000) : undefined,
      honeypot: typeof record.website === "string" ? record.website.trim() : "",
    },
  };
}
