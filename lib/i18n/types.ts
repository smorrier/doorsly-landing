/** Values the waitlist API accepts for "how many doors". Same in both languages. */
export const DOORS_VALUES = ["1-4", "5-20", "21-50", "50+"] as const;
export type DoorsValue = (typeof DOORS_VALUES)[number];

/**
 * Every visible string, one object per language. Plain data only: it is passed from server
 * components to client components, so no functions.
 */
/** A paragraph (string) or a bullet list (string[]). Tokens: {officerName}, {officerEmail}, {cookiePrefs}. */
export type PolicyBlock = string | string[];
export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
  table?: { head: string[]; rows: string[][] };
};
export type PrivacyDoc = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updatedLabel: string;
  /** Human-readable date of the last change to the policy. */
  updated: string;
  backLabel: string;
  sections: PolicySection[];
};

type ConsentCategoryCopy = { title: string; description: string };

type Media = { src: string; alt: string; width: number; height: number };

export type FeatureBlock = {
  id: string;
  title: string;
  /** Direct answer, 40 to 60 words, shown in bold. */
  answer: string;
  /** Extra paragraphs, folded behind "More detail". */
  more: string[];
  /** Product screenshot. Leave out until a real one exists: the block then renders text only. */
  media?: Media;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    /** Open Graph locale, e.g. en_CA */
    ogLocale: string;
    ogImageAlt: string;
  };
  og: { headline: string; subline: string };
  header: { cta: string; homeAria: string };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    /** Poster or video still. Leave out until it exists. */
    media?: Media;
  };
  pain: { title: string; items: { title: string; body: string }[] };
  app: {
    title: string;
    features: FeatureBlock[];
    alsoTitle: string;
    alsoItems: string[];
    moreLabel: string;
  };
  fit: {
    title: string;
    forTitle: string;
    forBody: string;
    notTitle: string;
    notBody: string;
  };
  beta: { title: string; steps: { title: string; body: string }[] };
  faq: { title: string; items: { question: string; answer: string }[] };
  waitlist: {
    title: string;
    body: string;
    emailPlaceholder: string;
    emailLabel: string;
    doorsLabel: string;
    doorsPlaceholder: string;
    doorsOptions: Record<DoorsValue, string>;
    submit: string;
    privacyNote: string;
    privacyLinkLabel: string;
    errorInvalidEmail: string;
    errorGeneric: string;
    errorRateLimited: string;
    successTitle: string;
    successBody: string;
  };
  footer: {
    tagline: string;
    rights: string;
    legalNavAria: string;
    privacyLabel: string;
    contactLabel: string;
  };
  consent: {
    bannerTitle: string;
    bannerBody: string;
    customize: string;
    rejectAll: string;
    acceptAll: string;
    dialogTitle: string;
    dialogDescription: string;
    save: string;
    alwaysOn: string;
    close: string;
    /** Footer link that reopens the preferences dialog. */
    preferencesLink: string;
    categories: {
      necessary: ConsentCategoryCopy;
      analytics: ConsentCategoryCopy;
      advertising: ConsentCategoryCopy;
    };
  };
  privacy: PrivacyDoc;
};
