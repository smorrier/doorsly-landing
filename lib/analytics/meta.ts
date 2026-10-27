import { hasConsent } from "@/lib/consent/client";

/**
 * Meta (Facebook/Instagram) browser Pixel. The Pixel script is not requested until the visitor
 * has opted in to Advertising, and nothing is sent without it.
 *
 * | Event     | Fired when                                  | Browser | Server (CAPI)             |
 * |-----------|---------------------------------------------|---------|---------------------------|
 * | PageView  | each page view (path change)                | yes     |                           |
 * | Lead      | a waitlist signup succeeds                  | yes     | yes, same event_id        |
 * | Contact   | the "text Dora" SMS link is clicked         | yes     |                           |
 */
export type MetaEventName = "PageView" | "Lead" | "Contact";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

/** Meta's base snippet: a queueing `fbq` stub plus the async `fbevents.js` loader. */
export function installMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || window.fbq) return;
  if (!hasConsent("advertising")) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq ??= fbq;
  // MetaTracking sends PageView per path; the Pixel's own history listener would double-count it
  // (and keep firing after consent is withdrawn).
  fbq.disablePushState = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Only the events we send on purpose: no automatic button-click / form-field matching.
  fbq("set", "autoConfig", false, pixelId);
  fbq("init", pixelId);
}

export function newMetaEventId(): string {
  return crypto.randomUUID();
}

/** Browser Pixel event; the event id lets Meta drop the matching Conversions API copy. */
export function fbqTrack(
  name: MetaEventName,
  params?: Record<string, string | number>,
  eventId?: string,
): void {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;
  if (!hasConsent("advertising")) return;
  // Installs on first use, so events fired before MetaTracking's effect aren't dropped.
  installMetaPixel(META_PIXEL_ID);
  if (!window.fbq) return;
  if (eventId) window.fbq("track", name, params ?? {}, { eventID: eventId });
  else window.fbq("track", name, params ?? {});
}
