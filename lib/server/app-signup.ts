import type { NextRequest } from "next/server";

import { hasAdvertisingConsent } from "@/lib/server/meta-capi";
import type { WaitlistSignup } from "@/lib/waitlist";

const REQUEST_TIMEOUT_MS = 8000;

/**
 * Asks the Doorsly backend to record this signup and email the visitor a link to create their
 * account (`POST /auth/signups`). The backend, not this site, owns accounts: this only forwards
 * the email, language and where the visitor came from. Authenticated with the same service key
 * the app's own server uses (`FRONTEND_SERVICE_API_KEY`), so it must never reach a browser.
 * Meta identifiers go along only with Advertising consent, and the backend keeps the IP and user
 * agent only in that case too. Returns true when the backend accepted the request.
 */
export async function requestAppSignup(
  signup: WaitlistSignup,
  request: NextRequest,
  ip: string | undefined,
): Promise<boolean> {
  const baseUrl = process.env.BACKEND_API_URL?.trim().replace(/\/+$/, "");
  const serviceKey = process.env.FRONTEND_SERVICE_API_KEY;
  if (!baseUrl || !serviceKey) {
    console.error("[signup] BACKEND_API_URL or FRONTEND_SERVICE_API_KEY is not set");
    return false;
  }

  const consent = hasAdvertisingConsent(request.cookies);
  const { attribution } = signup;
  const body = {
    email: signup.email,
    locale: signup.language,
    attribution: {
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
      ...(consent && {
        fbclid: attribution.fbclid,
        // Cookies are the visitor's to set: cap them to the backend's limit so one can't fail a signup
        fbp: request.cookies.get("_fbp")?.value.slice(0, 200),
        fbc: request.cookies.get("_fbc")?.value.slice(0, 200),
        eventId: signup.eventId,
        // The address bar can carry fbclid and gclid, so the page address is advertising data too
        pageUrl: signup.pageUrl,
        advertisingConsent: true,
      }),
    },
    // Only Meta's server event uses these
    ...(consent && { ipAddress: ip?.slice(0, 100), userAgent: request.headers.get("user-agent")?.slice(0, 500) }),
  };

  try {
    const response = await fetch(`${baseUrl}/auth/signups`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Service-Api-Key": serviceKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) console.error("[signup] backend responded", response.status);
    return response.ok;
  } catch (error) {
    console.error("[signup] backend request failed", error instanceof Error ? error.message : error);
    return false;
  }
}
