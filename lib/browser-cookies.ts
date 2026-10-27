/**
 * First-party cookie helpers for browser code (consent, tracker cleanup).
 * All no-ops during server rendering.
 */

export function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const prefix = `${name}=`;
  return document.cookie
    .split("; ")
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
}

/** Path=/, SameSite=Lax, Secure on https. `maxAgeSeconds` 0 deletes. */
export function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

/** Names of the cookies visible to this page that match `test`. */
export function cookieNames(test: (name: string) => boolean): string[] {
  if (typeof document === "undefined" || !document.cookie) return [];
  return document.cookie
    .split("; ")
    .map((part) => part.slice(0, part.indexOf("=") === -1 ? undefined : part.indexOf("=")))
    .filter(test);
}

/**
 * Deletes a cookie on this host and on each parent domain: third-party scripts (Meta, Google) set
 * theirs on the site's root domain, which a host-only delete doesn't reach.
 */
export function deleteCookieEverywhere(name: string): void {
  if (typeof document === "undefined") return;
  const labels = window.location.hostname.split(".");
  document.cookie = `${name}=; Path=/; Max-Age=0`;
  for (let i = 0; i < labels.length - 1; i++) {
    document.cookie = `${name}=; Path=/; Max-Age=0; Domain=.${labels.slice(i).join(".")}`;
  }
}

/** Deletes every visible cookie matching `test` (see `deleteCookieEverywhere`). Returns how many. */
export function deleteCookiesMatching(test: (name: string) => boolean): number {
  const names = cookieNames(test);
  for (const name of names) deleteCookieEverywhere(name);
  return names.length;
}
