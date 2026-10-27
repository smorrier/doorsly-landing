"use client";

import { useSyncExternalStore } from "react";

import { readCookie, writeCookie } from "@/lib/browser-cookies";
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  createConsent,
  isCurrentConsent,
  isGranted,
  parseConsent,
  serializeConsent,
  type ConsentCategory,
  type ConsentState,
  type OptionalConsentCategory,
} from "./consent";

/**
 * Browser consent store. Trackers ask `hasConsent(category)` before loading and use
 * `subscribeConsent` / `useConsentState` to start (or stop) when the visitor changes their choice.
 * The choice lives in the first-party `dl_consent` cookie so the server can read it too.
 */

type Listener = (consent: ConsentState | null) => void;

const listeners = new Set<Listener>();
let cached: { raw: string | undefined; consent: ConsentState | null } | null = null;

/** The visitor's choice under the current policy version, or null when they haven't been asked. */
export function getConsent(): ConsentState | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!cached || cached.raw !== raw) {
    const parsed = parseConsent(raw);
    cached = { raw, consent: isCurrentConsent(parsed) ? parsed : null };
  }
  return cached.consent;
}

/** Whether a tracker in this category may run now. Always false during server rendering. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  return isGranted(getConsent(), category);
}

/** The cookie value listeners last heard about; a different value means the choice changed. */
let notifiedRaw: string | undefined;
let channel: BroadcastChannel | null = null;
let watching = false;

function notifyListeners() {
  const consent = getConsent();
  notifiedRaw = readCookie(CONSENT_COOKIE);
  for (const listener of listeners) listener(consent);
}

function checkForOutsideChange() {
  if (readCookie(CONSENT_COOKIE) !== notifiedRaw) notifyListeners();
}

/**
 * A choice saved in another tab only changes the shared cookie, so trackers here would keep
 * running after a withdrawal. Other tabs announce saves on a BroadcastChannel; a tab that
 * becomes visible or focused also re-reads the cookie (no BroadcastChannel, or a missed message).
 */
function watchOtherTabs() {
  if (watching || typeof window === "undefined") return;
  watching = true;
  notifiedRaw = readCookie(CONSENT_COOKIE);
  if (typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CONSENT_COOKIE);
    channel.addEventListener("message", checkForOutsideChange);
  }
  document.addEventListener("visibilitychange", checkForOutsideChange);
  window.addEventListener("focus", checkForOutsideChange);
}

/** Calls `listener` whenever the choice changes, in this tab or another. Returns an unsubscribe function. */
export function subscribeConsent(listener: Listener): () => void {
  watchOtherTabs();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function saveConsent(choice: Record<OptionalConsentCategory, boolean>): ConsentState {
  const consent = createConsent(choice);
  writeCookie(CONSENT_COOKIE, serializeConsent(consent), CONSENT_MAX_AGE_SECONDS);
  notifyListeners();
  channel?.postMessage("changed");
  return consent;
}

export const acceptAllConsent = () => saveConsent({ analytics: true, advertising: true });
export const rejectAllConsent = () => saveConsent({ analytics: false, advertising: false });

const OPEN_PREFERENCES_EVENT = "consent:open-preferences";

/** Opens the preferences dialog (e.g. from a footer "Cookie preferences" link). */
export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function onOpenConsentPreferences(handler: () => void): () => void {
  window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
}

const subscribeStore = (onChange: () => void) => subscribeConsent(() => onChange());

/**
 * React view of the store. `undefined` while server rendering / hydrating (unknown), `null` when
 * the visitor hasn't chosen yet, otherwise their choice.
 */
export function useConsentState(): ConsentState | null | undefined {
  return useSyncExternalStore<ConsentState | null | undefined>(
    subscribeStore,
    getConsent,
    () => undefined,
  );
}
