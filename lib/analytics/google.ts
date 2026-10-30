import { hasConsent } from "@/lib/consent/client";

import { ADS_ID, GA_ID } from "./google-config";

/**
 * GA4 and Google Ads through one gtag.js (components/analytics/GoogleTags.tsx). In GA4 mark
 * `generate_lead` as a key event and import it into Google Ads (Goals > Conversions > Import >
 * Google Analytics 4); no Ads conversion labels live in code.
 *
 * | Event           | Fired when                          | Params                |
 * |-----------------|-------------------------------------|-----------------------|
 * | generate_lead   | a waitlist signup succeeds          | lead_source, language |
 *
 * Each tag is configured only once its own category is granted: GA4 needs Analytics, the Ads tag
 * needs Advertising. Consent Mode v2 starts with all four signals denied.
 */
export type GoogleEventName = "generate_lead";

export type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Consent per tag id, as last applied by `GoogleTags`. */
export const granted: Record<string, boolean> = {};

/** Tag ids already sent a `config` this page load (gtag has no "unconfigure"). */
export const configured = new Set<string>();

type QueuedEvent = [GoogleEventName, Record<string, unknown>];

/** Events fired before a tag was configured (first page load, consent just granted). */
const queue: QueuedEvent[] = [];

/**
 * Sends a GA4 event to every configured Google tag. Without Analytics or Advertising consent
 * nothing is sent. Events fired before a tag is configured wait for `flushGoogleEvents`, since
 * gtag drops events that reach it before a `config`.
 */
export function trackGoogleEvent(
  name: GoogleEventName,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  // Some tag that is set up here must be allowed to receive it: GA4 needs Analytics, the Ads
  // tag needs Advertising. Either ID may be unset. Otherwise the event would wait in the queue
  // and be sent later, if the visitor consents to the other category.
  const hasReceiver =
    (!!GA_ID && hasConsent("analytics")) || (!!ADS_ID && hasConsent("advertising"));
  if (!hasReceiver) return;
  if (window.gtag && configured.size > 0) window.gtag("event", name, params);
  else queue.push([name, params]);
}

/** Called by `GoogleTags` once a tag is configured. */
export function flushGoogleEvents(): void {
  if (!window.gtag || configured.size === 0) return;
  for (const [name, params] of queue.splice(0)) window.gtag("event", name, params);
}

/** Drops anything still queued, e.g. after consent is withdrawn. */
export function clearGoogleQueue(): void {
  queue.length = 0;
}
