"use client";

import type { MouseEvent } from "react";
import { Languages } from "lucide-react";

import type { Lang } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  /** Path of the same page in the other language. */
  href: string;
  /** Code of the language the link switches to (also sets the link's lang). */
  targetLang: Lang;
  label: string;
  ariaLabel: string;
};

/**
 * A plain link (full page load, so <html lang> and the dictionary change together). On click it
 * carries the current query string over, so utm_*, fbclid and gclid are not lost by switching.
 */
export function LanguageSwitcher({
  href,
  targetLang,
  label,
  ariaLabel,
}: LanguageSwitcherProps) {
  const keepQuery = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = `${href}${window.location.search}`;
  };

  return (
    <a
      href={href}
      lang={targetLang}
      hrefLang={targetLang}
      aria-label={ariaLabel}
      onClick={keepQuery}
      className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
    >
      <Languages className="mr-1.5 h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
