import type { Dictionary } from "@/lib/i18n/types";

/** Hero overrides for one ad. The ad's link is /en/lp/<slug>?utm_content=<slug>. */
export type Variant = {
  slug: string;
  hero: Pick<Dictionary["hero"], "titleLead" | "titleAccent" | "subtitle">;
};

export const VARIANTS: Variant[] = [
  {
    slug: "etransfers",
    hero: {
      titleLead: "An e-transfer lands.",
      titleAccent: "Know whose it is.",
      subtitle:
        "Connect your Gmail or Outlook and Doorsly lists your Interac e-transfer notifications as suggested payments, each with a suggested tenant. You confirm or dismiss it.",
    },
  },
  {
    slug: "rent-owed",
    hero: {
      titleLead: "Who’s behind on rent?",
      titleAccent: "One page, one answer.",
      subtitle:
        "See what is charged, collected and owed across your active leases, with every lease’s payment history one click away.",
    },
  },
  {
    slug: "leases",
    hero: {
      titleLead: "Stop printing leases.",
      titleAccent: "Send them to sign.",
      subtitle:
        "Keep each lease with its property and unit, send it out for e-signature, and watch it go from Awaiting signature to Signed.",
    },
  },
];

export function getVariant(slug: string): Variant | undefined {
  return VARIANTS.find((v) => v.slug === slug);
}
