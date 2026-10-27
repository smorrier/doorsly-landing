"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { PATHS } from "@/lib/site";

type WaitlistFormProps = {
  lang: Lang;
  dict: Dictionary["waitlist"];
};

export function WaitlistForm({ lang, dict }: WaitlistFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!isValidEmail) {
      setError(dict.errorInvalidEmail);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, language: lang }),
      });

      if (!response.ok) {
        setError(
          response.status === 429 ? dict.errorRateLimited : dict.errorGeneric,
        );
        return;
      }

      setIsSubmitted(true);
      setEmail("");
    } catch {
      setError(dict.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="relative flex items-center">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={dict.emailPlaceholder}
                  aria-label={dict.emailLabel}
                  autoComplete="email"
                  className="h-14 rounded-full border-muted-foreground/20 bg-white/50 pl-5 pr-32 shadow-sm backdrop-blur-sm focus-visible:ring-primary"
                  aria-invalid={Boolean(error)}
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="absolute right-1.5 h-11 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {dict.submit}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              {error ? <p className="ml-4 text-sm text-red-200">{error}</p> : null}
              <p className="px-4 text-xs text-primary-foreground/80">
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
