/** Values the waitlist API accepts for "how many doors". Same in both languages. */
export const DOORS_VALUES = ["1-4", "5-20", "21-50", "50+"] as const;
export type DoorsValue = (typeof DOORS_VALUES)[number];

type Feature = { title: string; description: string };

/**
 * Every visible string, one object per language. Plain data only: it is passed from server
 * components to client components, so no functions. `{phone}` style tokens are replaced at render.
 */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
    /** Open Graph locale, e.g. fr_CA */
    ogLocale: string;
    ogImageAlt: string;
  };
  og: { headline: string; subline: string };
  header: { cta: string; homeAria: string };
  language: { switchTo: string; switchAria: string };
  sms: {
    /** Text typed into the message when the SMS link opens. */
    body: string;
    linkAria: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    demoEyebrow: string;
    demoPrompt: string;
    noSignup: string;
  };
  how: { title: string; subtitle: string; features: Feature[] };
  about: {
    title: string;
    paragraphs: string[];
    whyTitle: string;
    whyItems: string[];
  };
  fit: {
    title: string;
    subtitle: string;
    goodTitle: string;
    goodItems: string[];
    badTitle: string;
    badItems: string[];
  };
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
  mockup: { userMessage: string; doraMessage: string; inputPlaceholder: string };
  footer: {
    readyLabel: string;
    textPrompt: string;
    rights: string;
    legalNavAria: string;
    privacyLabel: string;
  };
};
