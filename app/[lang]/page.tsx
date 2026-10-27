import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/LandingPage";
import { isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/site";

type PageProps = { params: { lang: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isLang(params.lang)) notFound();
  const { meta } = getDictionary(params.lang);
  return pageMetadata({
    lang: params.lang,
    title: meta.title,
    description: meta.description,
    paths: { fr: PATHS.home("fr"), en: PATHS.home("en") },
  });
}

export default function Page({ params }: PageProps) {
  if (!isLang(params.lang)) notFound();
  return <LandingPage lang={params.lang} dict={getDictionary(params.lang)} />;
}
