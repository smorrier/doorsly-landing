import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/site";

/** French privacy policy: /fr/confidentialite. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "fr" }];
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (params.lang !== "fr") notFound();
  const { privacy } = getDictionary("fr");
  return pageMetadata({
    lang: "fr",
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    paths: { fr: PATHS.privacy("fr"), en: PATHS.privacy("en") },
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== "fr") notFound();
  return <PrivacyPolicy lang="fr" dict={getDictionary("fr")} />;
}
