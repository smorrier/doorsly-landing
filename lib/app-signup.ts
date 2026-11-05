import { hasConsent } from "@/lib/consent/client";
import { APP_URL } from "@/lib/site";
import type { Attribution } from "@/lib/waitlist";

/** Campaign tags the app's signup page reads. gclid and utm_term stay on this site. */
const FORWARDED_ATTRIBUTION = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

function cookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * The app's signup page, with the email already typed and where the visitor came from. The
 * Meta identifiers (`fbclid`, `fbp`, `fbc`) and the Lead's event id travel only with Advertising
 * consent (`ac=1`). The app emails the visitor a link, so this is the
 * first of its steps.
 */
export function appSignupUrl(input: { email: string; attribution: Attribution; eventId?: string }): string {
  const url = new URL("/signup", APP_URL);
  url.searchParams.set("email", input.email);
  for (const key of FORWARDED_ATTRIBUTION) {
    const value = input.attribution[key];
    if (value) url.searchParams.set(key, value);
  }
  if (hasConsent("advertising")) {
    // fbclid is an advertising identifier, so it travels only with consent
    if (input.attribution.fbclid) url.searchParams.set("fbclid", input.attribution.fbclid);
    url.searchParams.set("ac", "1");
    if (input.eventId) url.searchParams.set("eid", input.eventId);
    const fbp = cookieValue("_fbp");
    const fbc = cookieValue("_fbc");
    if (fbp) url.searchParams.set("fbp", fbp);
    if (fbc) url.searchParams.set("fbc", fbc);
  }
  return url.toString();
}
