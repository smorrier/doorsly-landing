export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** Used when Accept-Language names neither language. */
export const DEFAULT_LANG: Lang = "fr";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

export function otherLang(lang: Lang): Lang {
  return lang === "fr" ? "en" : "fr";
}

/**
 * Picks the supported language with the highest quality value in an Accept-Language header
 * (`fr-CA,fr;q=0.9,en;q=0.8`). Ties go to the one listed first; no match falls back to French.
 */
export function pickLang(acceptLanguage: string | null | undefined): Lang {
  if (!acceptLanguage) return DEFAULT_LANG;
  let best: { lang: Lang; q: number } | null = null;
  for (const part of acceptLanguage.split(",")) {
    const [tag, ...params] = part.trim().split(";");
    const primary = tag.trim().toLowerCase().split("-")[0];
    if (!isLang(primary)) continue;
    const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const q = qParam ? Number(qParam.slice(2)) : 1;
    if (!Number.isFinite(q) || q <= 0) continue;
    if (!best || q > best.q) best = { lang: primary, q };
  }
  return best?.lang ?? DEFAULT_LANG;
}
