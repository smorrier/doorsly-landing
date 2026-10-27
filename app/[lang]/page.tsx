import { notFound } from "next/navigation";

import { LandingPage } from "@/components/LandingPage";
import { isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  return <LandingPage lang={params.lang} dict={getDictionary(params.lang)} />;
}
