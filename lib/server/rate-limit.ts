/**
 * Per-IP cap on the waitlist endpoint. Fixed window, in memory, per server instance: enough to
 * stop a script from flooding Slack, Loops and Meta's Lead signal, without a database. On
 * serverless hosting each warm instance counts separately, so the real ceiling is a few times
 * the limit; use the host's firewall if you need a hard one.
 */
export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_PER_WINDOW = 8;
const MAX_TRACKED_IPS = 10_000;

export function createRateLimiter(max = MAX_PER_WINDOW, windowMs = WINDOW_MS) {
  const windows = new Map<string, { count: number; resetAt: number }>();

  return function allow(ip: string, now: number): boolean {
    const current = windows.get(ip);
    if (current && now < current.resetAt) {
      if (current.count >= max) return false;
      current.count += 1;
      return true;
    }
    if (windows.size >= MAX_TRACKED_IPS) {
      for (const [key, w] of windows) if (now >= w.resetAt) windows.delete(key);
      // Still full of live windows: evict the oldest insertion.
      if (windows.size >= MAX_TRACKED_IPS) windows.delete(windows.keys().next().value!);
    }
    windows.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  };
}
