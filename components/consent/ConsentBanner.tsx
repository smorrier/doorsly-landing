"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  acceptAllConsent,
  getConsent,
  onOpenConsentPreferences,
  rejectAllConsent,
  saveConsent,
  useConsentState,
} from "@/lib/consent/client";
import type { ConsentCategory, OptionalConsentCategory } from "@/lib/consent/consent";
import type { Dictionary } from "@/lib/i18n/types";

type Choice = Record<OptionalConsentCategory, boolean>;

const CATEGORIES: readonly ConsentCategory[] = ["necessary", "analytics", "advertising"];

function currentChoice(): Choice {
  const consent = getConsent();
  return { analytics: consent?.analytics ?? false, advertising: consent?.advertising ?? false };
}

type ConsentBannerProps = {
  dict: Dictionary["consent"];
  /** Privacy policy page in this language. */
  privacyHref: string;
  privacyLabel: string;
};

/**
 * Opt-in consent: a bottom banner until the visitor chooses (Accept all and Reject all look the
 * same), plus the preferences dialog that `openConsentPreferences()` reopens from the footer.
 * Mounted once in the language layout.
 */
export function ConsentBanner({ dict, privacyHref, privacyLabel }: ConsentBannerProps) {
  const consent = useConsentState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: false, advertising: false });
  const dialogRef = useRef<HTMLDivElement>(null);

  const openDialog = () => {
    setChoice(currentChoice());
    setDialogOpen(true);
  };

  useEffect(() => onOpenConsentPreferences(openDialog), []);

  useEffect(() => {
    if (!dialogOpen) return;
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen]);

  const finish = (save: () => void) => {
    save();
    setDialogOpen(false);
  };

  // `undefined` = not hydrated yet; render nothing until the cookie has been read.
  const showBanner = consent === null && !dialogOpen;

  return (
    <>
      {showBanner && (
        <div
          role="region"
          aria-label={dict.bannerTitle}
          className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-lg md:flex-row md:items-end md:gap-6">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold">{dict.bannerTitle}</p>
              <p className="text-sm text-muted-foreground">
                {dict.bannerBody}{" "}
                <a
                  href={privacyHref}
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {privacyLabel}
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="ghost" size="sm" onClick={openDialog}>
                {dict.customize}
              </Button>
              <Button variant="outline" size="sm" className="min-w-28" onClick={rejectAllConsent}>
                {dict.rejectAll}
              </Button>
              <Button variant="outline" size="sm" className="min-w-28" onClick={acceptAllConsent}>
                {dict.acceptAll}
              </Button>
            </div>
          </div>
        </div>
      )}

      {dialogOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-3 sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDialogOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-dialog-title"
            aria-describedby="consent-dialog-description"
            tabIndex={-1}
            className="w-full max-w-md space-y-5 rounded-2xl border bg-card p-6 text-card-foreground shadow-xl focus:outline-none"
          >
            <div className="space-y-1.5">
              <h2 id="consent-dialog-title" className="text-lg font-semibold">
                {dict.dialogTitle}
              </h2>
              <p id="consent-dialog-description" className="text-sm text-muted-foreground">
                {dict.dialogDescription}{" "}
                <a
                  href={privacyHref}
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {privacyLabel}
                </a>
              </p>
            </div>
            <ul className="space-y-4">
              {CATEGORIES.map((category) => {
                const id = `consent-${category}`;
                const locked = category === "necessary";
                const copy = dict.categories[category];
                return (
                  <li key={category} className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <label htmlFor={id} className="text-sm font-medium">
                        {copy.title}
                      </label>
                      <p id={`${id}-desc`} className="text-xs text-muted-foreground">
                        {copy.description}
                      </p>
                      {locked && (
                        <p className="text-xs font-medium text-muted-foreground">
                          {dict.alwaysOn}
                        </p>
                      )}
                    </div>
                    <Switch
                      id={id}
                      aria-describedby={`${id}-desc`}
                      className="mt-0.5"
                      checked={locked || choice[category as OptionalConsentCategory]}
                      disabled={locked}
                      onCheckedChange={(checked) =>
                        setChoice((prev) => ({ ...prev, [category]: checked }))
                      }
                    />
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => finish(rejectAllConsent)}>
                  {dict.rejectAll}
                </Button>
                <Button variant="outline" size="sm" onClick={() => finish(acceptAllConsent)}>
                  {dict.acceptAll}
                </Button>
              </div>
              <Button size="sm" onClick={() => finish(() => saveConsent(choice))}>
                {dict.save}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
