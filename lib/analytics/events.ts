import type { Lang } from "@/lib/i18n/config";
import { fbqTrack } from "./meta";
import { trackGoogleEvent } from "./google";

/**
 * A waitlist signup succeeded. `eventId` is the id the form sent to /api/waitlist, which sends
 * the same Lead to Meta's Conversions API, so Meta counts the signup once.
 */
export function trackLead(eventId: string, lang: Lang): void {
  fbqTrack("Lead", { content_name: "waitlist" }, eventId);
  trackGoogleEvent("generate_lead", { lead_source: "waitlist", language: lang });
}

/** The "text Dora" link was clicked. Only the click is tracked, not whether the text was sent. */
export function trackDemoSmsClick(lang: Lang, location: "hero" | "footer"): void {
  fbqTrack("Contact", { content_name: "demo_sms" });
  trackGoogleEvent("demo_sms_click", { link_location: location, language: lang });
}
