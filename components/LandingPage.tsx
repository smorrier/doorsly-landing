import Image from "next/image";
import { Building2, CheckCircle2, XCircle } from "lucide-react";

import { ConsentPreferencesLink } from "@/components/consent/ConsentPreferencesLink";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { CONTACT_EMAIL, PATHS } from "@/lib/site";

type LandingPageProps = {
  lang: Lang;
  dict: Dictionary;
};

type MediaProps = NonNullable<Dictionary["hero"]["media"]>;

function Media({ media, priority = false }: { media: MediaProps; priority?: boolean }) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      priority={priority}
      className="h-auto w-full rounded-2xl border shadow-sm"
    />
  );
}

/** Server component: no client JavaScript except the forms and the cookie link. */
export function LandingPage({ lang, dict }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <header className="glass fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href={PATHS.home(lang)}
            aria-label={dict.header.homeAria}
            className="flex items-center space-x-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Doorsly
            </span>
          </a>
          <Button asChild className="rounded-full px-5 text-sm font-medium">
            <a href="#waitlist">{dict.header.cta}</a>
          </Button>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
          <div className="bg-grid-pattern absolute inset-0 -z-10 opacity-[0.03]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid items-center gap-10 lg:gap-12 ${
                dict.hero.media ? "lg:grid-cols-2" : ""
              }`}
            >
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                  <span className="mr-2 flex h-2 w-2 rounded-full bg-primary" />
                  {dict.hero.badge}
                </div>
                <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {dict.hero.titleLead}{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    {dict.hero.titleAccent}
                  </span>
                </h1>
                <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {dict.hero.subtitle}
                </p>
                <div id="waitlist" className="max-w-md scroll-mt-24 rounded-2xl border bg-slate-50 p-5 sm:p-6">
                  <WaitlistForm lang={lang} dict={dict.waitlist} tone="light" />
                </div>
              </div>
              {dict.hero.media ? (
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                  <Media media={dict.hero.media} priority />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              {dict.pain.title}
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {dict.pain.items.map((item) => (
                <li key={item.title} className="rounded-2xl border bg-white p-6">
                  <h3 className="mb-2 text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 lg:py-24" aria-labelledby="app-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="app-heading"
              className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl"
            >
              {dict.app.title}
            </h2>
            <div className="divide-y divide-slate-100">
              {dict.app.features.map((feature, index) => (
                <section
                  key={feature.id}
                  id={feature.id}
                  aria-labelledby={`${feature.id}-heading`}
                  className={`grid items-center gap-8 py-10 ${
                    feature.media ? "lg:grid-cols-2 lg:gap-14" : ""
                  }`}
                >
                  <div className={`max-w-2xl ${index % 2 === 1 && feature.media ? "lg:order-2" : ""}`}>
                    <h3
                      id={`${feature.id}-heading`}
                      className="mb-3 text-2xl font-semibold tracking-tight"
                    >
                      {feature.title}
                    </h3>
                    <p className="mb-3 text-lg font-semibold leading-relaxed text-foreground">
                      {feature.answer}
                    </p>
                    <details className="group">
                      <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary">
                        {dict.app.moreLabel}
                      </summary>
                      <div className="mt-2 space-y-3 text-muted-foreground">
                        {feature.more.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  </div>
                  {feature.media ? (
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <Media media={feature.media} />
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border bg-slate-50 p-6">
              <h3 className="mb-3 text-lg font-semibold">{dict.app.alsoTitle}</h3>
              <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                {dict.app.alsoItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              {dict.fit.title}
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-green-100 bg-white p-7 shadow-sm">
                <h3 className="mb-3 flex items-center text-xl font-bold">
                  <CheckCircle2 className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                  {dict.fit.forTitle}
                </h3>
                <p className="text-muted-foreground">{dict.fit.forBody}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="mb-3 flex items-center text-xl font-bold">
                  <XCircle className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                  {dict.fit.notTitle}
                </h3>
                <p className="text-muted-foreground">{dict.fit.notBody}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">{dict.beta.title}</h2>
            <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
              {dict.beta.steps.map((step) => (
                <li key={step.title}>
                  <strong className="text-foreground">{step.title}</strong> {step.body}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-slate-100 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">{dict.faq.title}</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {dict.faq.items.map((item) => (
                <details key={item.question} className="group py-1">
                  <summary className="flex min-h-11 cursor-pointer items-center py-2 font-semibold">
                    {item.question}
                  </summary>
                  <p className="pb-4 text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden py-20">
          <div className="absolute inset-0 -z-20 bg-primary" />
          <div className="bg-doors-pattern absolute inset-0 -z-10" />
          <div className="mx-auto max-w-3xl px-4 text-center text-primary-foreground sm:px-6 lg:px-8">
            <h2 className="mb-3 text-3xl font-bold lg:text-4xl">{dict.waitlist.title}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">{dict.waitlist.body}</p>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-8">
              <WaitlistForm lang={lang} dict={dict.waitlist} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-10 text-center">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
          <nav
            aria-label={dict.footer.legalNavAria}
            className="mb-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <a
              href={PATHS.privacy(lang)}
              className="underline underline-offset-4 hover:no-underline"
            >
              {dict.footer.privacyLabel}
            </a>
            {CONTACT_EMAIL ? (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-4 hover:no-underline"
              >
                {dict.footer.contactLabel}
              </a>
            ) : null}
            <ConsentPreferencesLink label={dict.consent.preferencesLink} />
          </nav>
          <p className="text-sm text-muted-foreground">
            Doorsly. {dict.footer.tagline} &copy; {new Date().getFullYear()}{" "}
            {dict.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
