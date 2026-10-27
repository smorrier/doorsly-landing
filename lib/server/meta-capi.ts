import { createHash } from "node:crypto";

import { CONSENT_COOKIE, isGranted, parseConsent } from "@/lib/consent/consent";
import { SITE_URL } from "@/lib/site";
import type { WaitlistSignup } from "@/lib/waitlist";

/**
 * Meta Conversions API, server side. The waitlist Lead is sent here with the same event_id as the
 * browser Pixel's Lead, so Meta counts it once. Sends only with Advertising consent, and only when
 * `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_ACCESS_TOKEN` are set. Set `META_CAPI_TEST_EVENT_CODE`
 * to see events under Events Manager > Test events instead of in production data.
 */
const GRAPH_API_VERSION = "v23.0";

const FBP_PATTERN = /^fb\.\d\.\d{10,16}\.\d{1,20}$/;
const FBC_PATTERN = /^fb\.\d\.\d{10,16}\.[A-Za-z0-9_-]{1,200}$/;
const FBCLID_PATTERN = /^[A-Za-z0-9_-]{1,200}$/;

interface CookieReader {
  get(name: string): { value: string } | undefined;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** True when this request's consent cookie opts in to Advertising. */
export function hasAdvertisingConsent(cookies: CookieReader): boolean {
  return isGranted(parseConsent(cookies.get(CONSENT_COOKIE)?.value), "advertising");
}

/** `pageUrl` only when it is on this site (or the request's own origin); the hash is dropped. */
export function eventSourceUrl(
  pageUrl: string | undefined,
  requestOrigin: string | null,
  language: string,
): string {
  const fallback = `${SITE_URL}/${language}`;
  if (!pageUrl) return fallback;
  try {
    const url = new URL(pageUrl);
    const allowed = new Set([new URL(SITE_URL).origin]);
    if (requestOrigin) allowed.add(requestOrigin);
    if (!allowed.has(url.origin)) return fallback;
    url.hash = "";
    return url.toString().slice(0, 1000);
  } catch {
    return fallback;
  }
}

export interface LeadContext {
  signup: WaitlistSignup;
  eventId: string;
  ip?: string;
  userAgent?: string | null;
  cookies: CookieReader;
  requestOrigin: string | null;
  now?: Date;
}

/** One `data[]` entry in Meta's format. Exported for tests. */
export function buildLeadEvent(context: LeadContext) {
  const { signup, cookies } = context;
  const userData: Record<string, string | string[]> = {
    em: [sha256(signup.email.trim().toLowerCase())],
  };
  if (context.ip) userData.client_ip_address = context.ip;
  if (context.userAgent) userData.client_user_agent = context.userAgent;

  const fbp = cookies.get("_fbp")?.value;
  if (fbp && FBP_PATTERN.test(fbp)) userData.fbp = fbp;

  const now = context.now ?? new Date();
  const fbcCookie = cookies.get("_fbc")?.value;
  const fbclid = signup.attribution.fbclid;
  if (fbcCookie && FBC_PATTERN.test(fbcCookie)) {
    userData.fbc = fbcCookie;
  } else if (fbclid && FBCLID_PATTERN.test(fbclid)) {
    // The Pixel normally sets _fbc itself; this is Meta's documented format for when it did not.
    userData.fbc = `fb.1.${now.getTime()}.${fbclid}`;
  }

  return {
    event_name: "Lead",
    event_time: Math.floor(now.getTime() / 1000),
    event_id: context.eventId,
    action_source: "website",
    event_source_url: eventSourceUrl(signup.pageUrl, context.requestOrigin, signup.language),
    user_data: userData,
    custom_data: { content_name: "waitlist" },
  };
}

/** Sends the Lead. Never throws: tracking must not break a signup. Returns true when Meta accepted it. */
export async function sendLead(context: LeadContext): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return false;
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE || undefined;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [buildLeadEvent(context)],
          access_token: accessToken,
          ...(testEventCode ? { test_event_code: testEventCode } : {}),
        }),
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!response.ok) {
      console.error("[meta-capi] Lead", response.status, (await response.text().catch(() => "")).slice(0, 300));
    }
    return response.ok;
  } catch (error) {
    console.error("[meta-capi] Lead", error instanceof Error ? error.message : error);
    return false;
  }
}
