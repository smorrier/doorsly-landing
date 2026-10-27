"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import { ADS_ID, GA_ID, consentModeFlags } from "@/lib/analytics/google-config";
import {
  clearGoogleQueue,
  configured,
  flushGoogleEvents,
  granted,
  type Gtag,
} from "@/lib/analytics/google";
import { deleteCookiesMatching } from "@/lib/browser-cookies";
import { useConsentState } from "@/lib/consent/client";
import { isGranted } from "@/lib/consent/consent";

/** The standard gtag stub, with everything denied, for when the inline <head> snippet did not run. */
function ensureGtag(): Gtag {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the `arguments` object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", consentModeFlags(false, false));
    window.gtag("set", "ads_data_redaction", true);
  }
  return window.gtag;
}

/** Google Analytics cookies (`_ga`, `_ga_<id>`, `_gid`). */
const isAnalyticsCookie = (name: string) =>
  name === "_ga" || name.startsWith("_ga_") || name === "_gid";
/** Google Ads conversion-linker cookies (`_gcl_au`, `_gcl_aw`, `_gcl_dc`, ...). */
const isAdsCookie = (name: string) => name.startsWith("_gcl_");

function setTagDisabled(id: string, disabled: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = disabled;
}

/**
 * Google Analytics (Analytics consent) and Google Ads (Advertising consent). gtag.js is not
 * requested until the visitor opts in to a category whose tag is configured, and each tag is
 * configured only once its own category is granted: a configured tag with consent denied would
 * still send cookieless pings. A withdrawal sets Consent Mode back to denied and sets
 * `ga-disable-<id>`, which gtag.js checks before each hit.
 */
export function GoogleTags() {
  const pathname = usePathname();
  const consent = useConsentState();
  const analytics = isGranted(consent, "analytics") && !!GA_ID;
  const advertising = isGranted(consent, "advertising") && !!ADS_ID;
  /** One stable loader id, so opting in to the second category later doesn't load gtag.js twice. */
  const loaderId = analytics || advertising ? GA_ID || ADS_ID : "";

  // A category that isn't granted keeps none of its cookies, including ones from an earlier visit.
  useEffect(() => {
    if (consent === undefined) return; // not hydrated yet
    if (!isGranted(consent, "analytics")) deleteCookiesMatching(isAnalyticsCookie);
    if (!isGranted(consent, "advertising")) deleteCookiesMatching(isAdsCookie);
    if (!isGranted(consent, "analytics") && !isGranted(consent, "advertising")) {
      clearGoogleQueue();
    }
  }, [consent]);

  useEffect(() => {
    if (!loaderId && !window.gtag) return;
    const gtag = ensureGtag();
    gtag("consent", "update", consentModeFlags(analytics, advertising));
    if (GA_ID) {
      granted[GA_ID] = analytics;
      setTagDisabled(GA_ID, !analytics);
    }
    if (ADS_ID) {
      granted[ADS_ID] = advertising;
      setTagDisabled(ADS_ID, !advertising);
    }
    if (!loaderId) return;
    if (configured.size === 0) gtag("js", new Date());
    for (const id of [GA_ID, ADS_ID]) {
      if (id && granted[id] && !configured.has(id)) {
        configured.add(id);
        gtag("config", id, {
          page_location: window.location.href,
          page_referrer: document.referrer,
        });
      }
    }
    // Events fired before a tag was configured.
    flushGoogleEvents();
  }, [loaderId, analytics, advertising, pathname]);

  if (!loaderId) return null;
  // The loader only fetches the library; nothing is sent for a tag until it is configured above.
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
      strategy="afterInteractive"
    />
  );
}
