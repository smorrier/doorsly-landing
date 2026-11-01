import type { Dictionary } from "@/lib/i18n/types";

/** Hero overrides for one ad. The ad's link is /en/lp/<slug>?utm_content=<slug>. */
export type Variant = {
  slug: string;
  hero: Pick<Dictionary["hero"], "titleLead" | "titleAccent" | "subtitle" | "media">;
};

export const VARIANTS: Variant[] = [
  {
    slug: "etransfers",
    hero: {
      titleLead: "An e-transfer lands.",
      titleAccent: "Know whose it is.",
      subtitle:
        "Doorsly turns the Interac e-transfer notifications in your inbox into suggested payments, each with a tenant already matched. You confirm it.",
      media: {
        src: "/screens/etransfers.png",
        alt: "Doorsly rents page: a Suggested payments list showing each e-transfer sender, the amount, and a suggested tenant with a Confirm button.",
        width: 668,
        height: 245,
      },
    },
  },
  {
    slug: "rent-owed",
    hero: {
      titleLead: "Who’s behind on rent?",
      titleAccent: "One page, one answer.",
      subtitle:
        "See what is charged, collected and owed across your active leases, with every lease’s payment history one click away.",
      media: {
        src: "/screens/owed-unpaid.png",
        alt: "Doorsly rents page filtered to unpaid leases, listing each property and unit with the tenant, the monthly rent, and the amount owed.",
        width: 668,
        height: 295,
      },
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
