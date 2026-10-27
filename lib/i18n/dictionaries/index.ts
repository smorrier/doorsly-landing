import type { Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { en } from "./en";
import { fr } from "./fr";

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
