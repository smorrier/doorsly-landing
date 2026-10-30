import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/site";

/** English privacy policy: /en/privacy. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (params.lang !== "en") notFound();
  const { privacy } = getDictionary("en");
  return pageMetadata({
    lang: "en",
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    paths: { en: PATHS.privacy("en") },
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== "en") notFound();
  return <PrivacyPolicy lang="en" dict={getDictionary("en")} />;
}
