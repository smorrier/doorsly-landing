"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquareText,
  Smartphone,
  XCircle,
  Zap,
} from "lucide-react";

import { ConsentPreferencesLink } from "@/components/consent/ConsentPreferencesLink";
import { DemoSmsLink } from "@/components/DemoSmsLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PhoneMockup } from "@/components/PhoneMockup";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { otherLang, type Lang } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { DEMO_SMS_NUMBER, PATHS, formatDemoNumber, smsHref } from "@/lib/site";

const FEATURE_ICONS = [Zap, LayoutDashboard, MessageSquareText];

type LandingPageProps = {
  lang: Lang;
  dict: Dictionary;
};

export function LandingPage({ lang, dict }: LandingPageProps) {
  const demoPhone = formatDemoNumber(DEMO_SMS_NUMBER);
  const demoSmsLink = smsHref(dict.sms.body);
  const demoSmsAria = dict.sms.linkAria.replace("{phone}", demoPhone);
  const otherLanguage = otherLang(lang);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background selection:bg-primary/20">
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
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher
              href={PATHS.home(otherLanguage)}
              targetLang={otherLanguage}
              label={dict.language.switchTo}
              ariaLabel={dict.language.switchAria}
            />
            <Button
              variant="ghost"
              className="rounded-full px-4 text-sm font-medium hover:bg-slate-100 sm:px-6"
              onClick={scrollToWaitlist}
            >
              {dict.header.cta}
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <section className="relative overflow-hidden pb-24 pt-16 lg:pb-32 lg:pt-32">
          <div className="bg-grid-pattern absolute inset-0 -z-10 opacity-[0.03]" />
          <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[800px] w-[800px] translate-x-1/3 -translate-y-12 opacity-20">
            <div className="absolute inset-0 rounded-full bg-primary blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                  <span className="mr-2 flex h-2 w-2 rounded-full bg-primary"></span>
                  {dict.hero.badge}
                </div>

                <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-7xl">
                  {dict.hero.titleLead}{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    {dict.hero.titleAccent}
                  </span>
                </h1>

                <p className="mb-8 max-w-lg text-xl leading-relaxed text-muted-foreground">
                  {dict.hero.subtitle}
                </p>

                <div className="relative max-w-md overflow-hidden rounded-2xl border bg-white p-6 shadow-sm lg:p-8">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    {dict.hero.demoEyebrow}
                  </p>
                  <p className="mb-4 text-2xl font-bold text-foreground">
                    {dict.hero.demoPrompt}
                  </p>
                  <div className="mb-4 font-mono text-4xl font-black tracking-tighter text-slate-800 lg:text-5xl">
                    <DemoSmsLink
                      lang={lang}
                      location="hero"
                      href={demoSmsLink}
                      aria-label={demoSmsAria}
                      className="transition-colors hover:text-primary"
                    >
                      {demoPhone}
                    </DemoSmsLink>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    {dict.hero.noSignup}
                  </p>
                </div>
              </motion.div>

              <div className="relative flex items-center justify-center lg:h-[600px] lg:justify-end">
                <PhoneMockup dict={dict.mockup} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-y border-slate-100 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">{dict.how.title}</h2>
              <p className="text-lg text-muted-foreground">{dict.how.subtitle}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {dict.how.features.map((feature, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                  {dict.about.title}
                </h2>
                {dict.about.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-6 text-lg leading-relaxed text-muted-foreground last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white lg:p-12"
              >
                <div className="absolute right-0 top-0 p-8 opacity-10">
                  <FileSpreadsheet className="h-32 w-32" />
                </div>
                <h3 className="relative z-10 mb-6 text-2xl font-bold">
                  {dict.about.whyTitle}
                </h3>
                <ul className="relative z-10 space-y-6">
                  {dict.about.whyItems.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="mr-4 h-6 w-6 shrink-0 text-blue-400" />
                      <span className="leading-relaxed text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold">{dict.fit.title}</h2>
              <p className="text-lg text-muted-foreground">{dict.fit.subtitle}</p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-8 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-green-500" />
                <h3 className="mb-6 flex items-center text-xl font-bold">
                  <CheckCircle2 className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                  {dict.fit.goodTitle}
                </h3>
                <ul className="space-y-4">
                  {dict.fit.goodItems.map((item) => (
                    <li key={item} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-slate-300" />
                <h3 className="mb-6 flex items-center text-xl font-bold">
                  <XCircle className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                  {dict.fit.badTitle}
                </h3>
                <ul className="space-y-4">
                  {dict.fit.badItems.map((item) => (
                    <li key={item} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="relative overflow-hidden py-24">
          <div className="absolute inset-0 -z-20 bg-primary" />
          <div className="bg-doors-pattern absolute inset-0 -z-10" />

          <div className="mx-auto max-w-3xl px-4 text-center text-primary-foreground sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              {dict.waitlist.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg">{dict.waitlist.body}</p>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
              <WaitlistForm lang={lang} dict={dict.waitlist} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-12 text-center">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <span
              className="text-lg font-bold tracking-tight text-muted-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Doorsly
            </span>
          </div>

          <div className="mb-8 inline-flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row">
            <span className="mb-2 mr-0 text-sm font-medium text-slate-600 sm:mb-0 sm:mr-4">
              {dict.footer.readyLabel}
            </span>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Smartphone className="mr-2 h-4 w-4 shrink-0 text-primary" />
              <span className="font-mono font-bold text-slate-800">
                {dict.footer.textPrompt}{" "}
                <DemoSmsLink
                  lang={lang}
                  location="footer"
                  href={demoSmsLink}
                  aria-label={demoSmsAria}
                  className="whitespace-nowrap transition-colors hover:text-primary"
                >
                  {demoPhone}
                </DemoSmsLink>
              </span>
            </div>
          </div>

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
            <ConsentPreferencesLink label={dict.consent.preferencesLink} />
          </nav>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Doorsly. {dict.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
