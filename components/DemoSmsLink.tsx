"use client";

import type { AnchorHTMLAttributes } from "react";

import { trackDemoSmsClick } from "@/lib/analytics/events";
import type { Lang } from "@/lib/i18n/config";

type DemoSmsLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  lang: Lang;
  location: "hero" | "footer";
};

/** The "text Dora" link. Records the click (with consent); the link itself works without any tracker. */
export function DemoSmsLink({ lang, location, ...props }: DemoSmsLinkProps) {
  return <a {...props} onClick={() => trackDemoSmsClick(lang, location)} />;
}
