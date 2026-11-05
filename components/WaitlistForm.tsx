"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackLead } from "@/lib/analytics/events";
import { appSignupUrl } from "@/lib/app-signup";
import { newMetaEventId } from "@/lib/analytics/meta";
import type { Lang } from "@/lib/i18n/config";
import { DOORS_VALUES, type Dictionary } from "@/lib/i18n/types";
import { PATHS } from "@/lib/site";
import { attributionFromSearch, EMAIL_PATTERN, isDoorsValue } from "@/lib/waitlist";

type WaitlistFormProps = {
  lang: Lang;
  dict: Dictionary["waitlist"];
  /** "dark" for the blue section (white text), "light" for white or pale backgrounds. */
  tone?: "dark" | "light";
};

export function WaitlistForm({ lang, dict, tone = "dark" }: WaitlistFormProps) {
  const light = tone === "light";
  const errorId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [doors, setDoors] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Coming back with the Back button restores this page from the cache mid-redirect
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      setIsSubmitted(false);
      setIsSubmitting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError(dict.errorInvalidEmail);
      return;
    }

    // Honeypot: a filled hidden field means a bot. Look like a success, send and track nothing.
    const honeypot = new FormData(event.currentTarget).get("website");
    if (typeof honeypot === "string" && honeypot.trim()) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    // Shared with the server so Meta counts the Pixel Lead and the Conversions API Lead once.
    const eventId = newMetaEventId();
    // Read from the address bar now, so no attribution cookie is needed.
    const attribution = attributionFromSearch(window.location.search);
    let leadEventId: string | undefined;

    // Recording the lead is best effort: the visitor goes on to create an account either way.
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // A slow lead record must not keep the visitor from the app
        signal: AbortSignal.timeout(6000),
        body: JSON.stringify({
          email: trimmedEmail,
          language: lang,
          doors: isDoorsValue(doors) ? doors : undefined,
          ...attribution,
          eventId,
          pageUrl: window.location.href.split("#")[0],
        }),
      });
      if (response.ok) {
        trackLead(eventId, lang);
        leadEventId = eventId;
      }
    } catch (error) {
      // Carry on to the app. If the browser gave up waiting, the server may still send its
      // Lead, so send the Pixel's too: the shared event id lets Meta count it once.
      if (error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError")) {
        trackLead(eventId, lang);
        leadEventId = eventId;
      }
    }

    setIsSubmitted(true);
    // A beat for the Pixel to send the Lead before the page unloads
    window.setTimeout(() => {
      window.location.assign(appSignupUrl({ email: trimmedEmail, attribution, eventId: leadEventId }));
    }, 400);
  };

  // Two copies, one shown per breakpoint, so the tab order matches the layout: from sm up the
  // button sits inside the email field, below that it comes last.
  const submitButton = (className: string) => (
    <Button
      type="submit"
      size="sm"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={`rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90 ${className}`}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          <span className="sr-only">{dict.submit}</span>
        </>
      ) : (
        <>
          {dict.submit}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </>
      )}
    </Button>
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="status"
            className="flex flex-col items-center justify-center space-y-3 rounded-2xl border border-primary/10 bg-white p-6 text-center text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.successTitle}
            </h3>
            <p className="text-sm text-muted-foreground">
              {dict.successBody}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form onSubmit={onSubmit} noValidate className="relative space-y-3">
              <div className="relative flex items-center">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={dict.emailPlaceholder}
                  aria-label={dict.emailLabel}
                  autoComplete="email"
                  className="h-14 rounded-full border-muted-foreground/20 bg-white pl-5 pr-5 shadow-sm backdrop-blur-sm sm:pr-44 focus-visible:ring-primary"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  required
                />
                {submitButton("hidden h-11 sm:absolute sm:right-1.5 sm:flex")}
              </div>
              {error ? (
                <p id={errorId} role="alert" className={`ml-4 text-sm ${light ? "text-red-600" : "text-red-200"}`}>
                  {error}
                </p>
              ) : null}
              <select
                value={doors}
                onChange={(event) => setDoors(event.target.value)}
                aria-label={dict.doorsLabel}
                className={`h-12 w-full rounded-full border border-muted-foreground/20 bg-white px-5 text-base shadow-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  doors ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <option value="">{dict.doorsPlaceholder}</option>
                {DOORS_VALUES.map((value) => (
                  <option key={value} value={value} className="text-foreground">
                    {dict.doorsOptions[value]}
                  </option>
                ))}
              </select>
              {submitButton("h-12 w-full sm:hidden")}
              {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <p
                className={`px-4 text-xs ${light ? "text-muted-foreground" : "text-primary-foreground/80"}`}
              >
                {dict.privacyNote}{" "}
                <a
                  href={PATHS.privacy(lang)}
                  className="underline underline-offset-4 hover:no-underline"
                >
                  {dict.privacyLinkLabel}
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
