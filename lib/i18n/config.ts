/** English only for now. The French site and policy are in git history (main before content/whole-app-en). */
export const LANGS = ["en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
