"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquareText,
  Smartphone,
  XCircle,
  Zap,
} from "lucide-react";

import { PhoneMockup } from "@/components/PhoneMockup";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";

const DEMO_PHONE = "(438) 533-3509";
const DEMO_PHONE_SMS_LINK = "sms:+14385333509";

export function LandingPage() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background selection:bg-primary/20">
      <header className="glass fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Doorsly
            </span>
          </div>
          <Button
            variant="ghost"
            className="rounded-full px-6 text-sm font-medium hover:bg-slate-100"
            onClick={scrollToWaitlist}
          >
            Early Access
          </Button>
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
                  Now in Early Preview
                </div>

                <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-7xl">
                  Try Doorsly in 60 Seconds{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    - Just Text.
                  </span>
                </h1>

                <p className="mb-8 max-w-lg text-xl leading-relaxed text-muted-foreground">
                  A new breed of property management software designed
                  specifically for small and medium landlords.
                </p>

                <div className="relative max-w-md overflow-hidden rounded-2xl border bg-white p-6 shadow-sm lg:p-8">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    Instant Demo Account
                  </p>
                  <p className="mb-4 text-2xl font-bold text-foreground">
                    Say hi to Dora at
                  </p>
                  <div className="mb-4 font-mono text-4xl font-black tracking-tighter text-slate-800 lg:text-5xl">
                    <a
                      href={DEMO_PHONE_SMS_LINK}
                      aria-label={`Text ${DEMO_PHONE}`}
                      className="transition-colors hover:text-primary"
                    >
                      {DEMO_PHONE}
                    </a>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    No signup or credit card required.
                  </p>
                </div>
              </motion.div>

              <div className="relative flex items-center justify-center lg:h-[600px] lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-y border-slate-100 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">What Happens When You Text?</h2>
              <p className="text-lg text-muted-foreground">
                Experience the platform immediately without jumping through hoops.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Instant Account",
                  description:
                    "We automatically create a secure demo environment tied to your phone number. Zero friction.",
                },
                {
                  icon: LayoutDashboard,
                  title: "Sample Portfolio",
                  description:
                    "Log in to find sample properties, tenants, and maintenance requests already populated.",
                },
                {
                  icon: MessageSquareText,
                  title: "Meet Dora",
                  description:
                    "Talk to Dora, the AI assistant built into Doorsly, via SMS to see how she handles requests.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
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
                <h2 className="mb-6 text-3xl font-bold lg:text-4xl">What Doorsly Is</h2>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  Doorsly is serious property management software. It provides a
                  central source of truth for your entire portfolio-leases,
                  maintenance, communications, and finances.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Dora is the accelerator. She&apos;s the interface that makes
                  interacting with your data as easy as sending a text message,
                  bridging the gap between powerful software and everyday
                  convenience.
                </p>
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
                  Why It Exists
                </h3>
                <ul className="relative z-10 space-y-6">
                  {[
                    "Stop losing track of maintenance requests in text threads.",
                    "Replace fragmented Excel spreadsheets with a unified system.",
                    "Keep tenant communication professional and recorded.",
                    "Spend less time on admin, more time growing your portfolio.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
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
              <h2 className="mb-4 text-3xl font-bold">Who Should Try This?</h2>
              <p className="text-lg text-muted-foreground">
                We&apos;re building for a specific type of landlord.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-8 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-green-500" />
                <h3 className="mb-6 flex items-center text-xl font-bold">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />A Great
                  Fit If...
                </h3>
                <ul className="space-y-4">
                  <li className="text-muted-foreground">You manage 5 to 50 doors.</li>
                  <li className="text-muted-foreground">
                    You currently use spreadsheets, emails, and personal texts.
                  </li>
                  <li className="text-muted-foreground">
                    You want a modern, simple interface without enterprise bloat.
                  </li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-slate-300" />
                <h3 className="mb-6 flex items-center text-xl font-bold">
                  <XCircle className="mr-2 h-5 w-5 text-slate-400" />
                  Not For You Yet If...
                </h3>
                <ul className="space-y-4">
                  <li className="text-muted-foreground">
                    You manage 500+ commercial units.
                  </li>
                  <li className="text-muted-foreground">
                    You require complex multi-tiered accounting software.
                  </li>
                  <li className="text-muted-foreground">
                    You have a large staff with complex permissions needs.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="relative overflow-hidden py-24">
          <div className="absolute inset-0 -z-20 bg-primary" />
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              This Is an Early Preview
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg">
              Doorsly is currently in active development. If you don&apos;t want to
              try the demo today but want to be notified when we officially
              launch, join the waitlist.
            </p>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
              <WaitlistForm />
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
              Ready to try it right now?
            </span>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Smartphone className="mr-2 h-4 w-4 text-primary" />
              <span className="font-mono font-bold text-slate-800">
                Text anything (try "Hi Dora") to{" "}
                <a
                  href={DEMO_PHONE_SMS_LINK}
                  aria-label={`Text ${DEMO_PHONE}`}
                  className="transition-colors hover:text-primary"
                >
                  {DEMO_PHONE}
                </a>
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Doorsly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
