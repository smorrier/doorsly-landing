"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { deleteCookiesMatching } from "@/lib/browser-cookies";
import { fbqTrack, META_PIXEL_ID } from "@/lib/analytics/meta";
import { useConsentState } from "@/lib/consent/client";
import { isGranted } from "@/lib/consent/consent";

/** Meta's browser and click-id cookies. */
const META_COOKIES = new Set(["_fbp", "_fbc"]);

/**
 * Meta Pixel. Runs only when `NEXT_PUBLIC_META_PIXEL_ID` is set and the visitor has opted in to
 * Advertising. Whenever Advertising is not granted (declined, withdrawn, or not asked yet) the
 * Pixel is revoked and Meta's cookies are cleared, including ones left from an earlier visit.
 */
export function MetaTracking() {
  const pathname = usePathname();
  const consent = useConsentState();
  const advertisingAllowed = isGranted(consent, "advertising");
  /** Path of the last PageView sent; withdrawing and re-granting on one page doesn't count it twice. */
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    if (consent === undefined) return; // not hydrated yet: the cookie hasn't been read
    if (advertisingAllowed) {
      window.fbq?.("consent", "grant");
      return;
    }
    window.fbq?.("consent", "revoke");
    deleteCookiesMatching((name) => META_COOKIES.has(name));
  }, [consent, advertisingAllowed]);

  // Keyed on the path only. Also re-runs when consent is granted, so the page the visitor
  // accepted on counts.
  useEffect(() => {
    if (!advertisingAllowed || !META_PIXEL_ID || lastPageView.current === pathname) return;
    lastPageView.current = pathname;
    fbqTrack("PageView");
  }, [pathname, advertisingAllowed]);

  return null;
}
