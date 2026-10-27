"use client";

import { openConsentPreferences } from "@/lib/consent/client";
import { cn } from "@/lib/utils";

/** Reopens the cookie preferences dialog (footer link, privacy policy). */
export function ConsentPreferencesLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className={cn("underline underline-offset-4 hover:no-underline", className)}
    >
      {label}
    </button>
  );
}
