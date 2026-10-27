/**
 * The visitor's IP. The first X-Forwarded-For entry is client-supplied, so it is never used: the
 * platform's real-IP header or the last hop (appended by our proxy) is.
 */
export function clientIpFromHeaders(headers: Headers): string | undefined {
  const forwarded = headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
  return headers.get("x-real-ip")?.trim() || forwarded?.[forwarded.length - 1] || undefined;
}
