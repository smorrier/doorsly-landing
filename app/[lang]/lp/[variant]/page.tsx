import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/LandingPage";
import { LANGS, isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/site";
import { VARIANTS, getVariant } from "@/lib/variants";

type PageProps = { params: { lang: string; variant: string } };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => VARIANTS.map((v) => ({ lang, variant: v.slug })));
}

/** Ad landing pages: same content as the home page's hero, a shorter page, kept out of search. */
export function generateMetadata({ params }: PageProps): Metadata {
  if (!isLang(params.lang) || !getVariant(params.variant)) notFound();
  const { meta } = getDictionary(params.lang);
  return {
    ...pageMetadata({
      lang: params.lang,
      title: meta.title,
      description: meta.description,
      paths: { en: PATHS.home("en") },
    }),
    robots: { index: false, follow: false },
  };
}

export default function Page({ params }: PageProps) {
  const variant = getVariant(params.variant);
  if (!isLang(params.lang) || !variant) notFound();
  const dict = getDictionary(params.lang);
  return (
    <LandingPage lang={params.lang} dict={{ ...dict, hero: { ...dict.hero, ...variant.hero } }} short />
  );
}
