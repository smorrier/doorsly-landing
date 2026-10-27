import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { GoogleTags } from "@/components/analytics/GoogleTags";
import { MetaTracking } from "@/components/analytics/MetaTracking";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { GOOGLE_CONSENT_DEFAULT_SNIPPET, GOOGLE_TAG_IDS } from "@/lib/analytics/google-config";
import { LANGS, isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PATHS, SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  if (!isLang(params.lang)) notFound();
  const dict = getDictionary(params.lang);

  return (
    <html
      lang={params.lang}
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      {GOOGLE_TAG_IDS.length > 0 ? (
        <head>
          {/* Consent Mode v2, everything denied. No request, no cookie: gtag.js loads after opt-in. */}
          <script dangerouslySetInnerHTML={{ __html: GOOGLE_CONSENT_DEFAULT_SNIPPET }} />
        </head>
      ) : null}
      <body>
        {children}
        <MetaTracking />
        <GoogleTags />
        <ConsentBanner
          dict={dict.consent}
          privacyHref={PATHS.privacy(params.lang)}
          privacyLabel={dict.footer.privacyLabel}
        />
      </body>
    </html>
  );
}
