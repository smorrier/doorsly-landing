import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { LandingPage } from "@/components/LandingPage";
import { isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PATHS, SITE_URL } from "@/lib/site";

type PageProps = { params: { lang: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isLang(params.lang)) notFound();
  const { meta } = getDictionary(params.lang);
  return pageMetadata({
    lang: params.lang,
    title: meta.title,
    description: meta.description,
    paths: { en: PATHS.home("en") },
  });
}

export default function Page({ params }: PageProps) {
  if (!isLang(params.lang)) notFound();
  const dict = getDictionary(params.lang);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dict.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Doorsly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: dict.meta.description,
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <LandingPage lang={params.lang} dict={dict} />
    </>
  );
}
