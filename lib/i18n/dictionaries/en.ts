import type { Dictionary } from "@/lib/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "Doorsly | Property management software for landlords with 5–50 doors",
    description:
      "Keep leases, rent, maintenance and tenant messages in one place. Text Dora, the AI assistant, to get a demo account in 60 seconds. No signup or credit card required.",
    ogLocale: "en_CA",
    ogImageAlt: "Doorsly: try the property management demo in 60 seconds by text",
  },
  og: {
    headline: "Try Doorsly in 60 seconds. Just text.",
    subline: "Property management software for landlords with 5 to 50 doors",
  },
  header: { cta: "Early access", homeAria: "Doorsly home" },
  language: { switchTo: "Français", switchAria: "Voir ce site en français" },
  sms: {
    body: "Hi Dora",
    linkAria: "Text {phone} to try the Doorsly demo",
  },
  hero: {
    badge: "Now in early preview",
    titleLead: "Try Doorsly in 60 seconds.",
    titleAccent: "Just text.",
    subtitle:
      "Property management software designed for small and medium landlords with 5 to 50 doors.",
    demoEyebrow: "Instant demo account",
    demoPrompt: "Say hi to Dora at",
    noSignup: "No signup or credit card required.",
  },
  how: {
    title: "What happens when you text?",
    subtitle: "Try the platform right away, without jumping through hoops.",
    features: [
      {
        title: "Instant account",
        description:
          "We automatically create a secure demo environment tied to your phone number. Zero friction.",
      },
      {
        title: "Sample portfolio",
        description:
          "Log in to find sample properties, tenants and maintenance requests already filled in.",
      },
      {
        title: "Meet Dora",
        description:
          "Talk to Dora, the AI assistant built into Doorsly, by text message to see how she handles requests.",
      },
    ],
  },
  about: {
    title: "What Doorsly is",
    paragraphs: [
      "Doorsly is serious property management software. It gives you one central source of truth for your whole portfolio: leases, maintenance, communications and finances.",
      "Dora is the accelerator. She is the interface that makes working with your data as easy as sending a text message, bridging the gap between powerful software and everyday convenience.",
    ],
    whyTitle: "Why it exists",
    whyItems: [
      "Stop losing maintenance requests in text threads.",
      "Replace scattered spreadsheets and manual tracking of rent and Interac e-Transfers with one system.",
      "Keep tenant communication professional and on record.",
      "Spend less time on admin and more time growing your portfolio.",
    ],
  },
  fit: {
    title: "Who should try this?",
    subtitle: "We are building for a specific type of landlord.",
    goodTitle: "A great fit if…",
    goodItems: [
      "You manage 5 to 50 doors.",
      "You currently use spreadsheets, emails and personal texts.",
      "You want a modern, simple interface without enterprise bloat.",
    ],
    badTitle: "Not for you yet if…",
    badItems: [
      "You manage 500+ commercial units.",
      "You need complex, multi-tiered accounting software.",
      "You have a large staff with complex permission needs.",
    ],
  },
  waitlist: {
    title: "This is an early preview",
    body: "Doorsly is in active development. If you don’t want to try the demo today but want to hear when we officially launch, join the waitlist.",
    emailPlaceholder: "Enter your email address",
    emailLabel: "Email address",
    doorsLabel: "How many doors do you manage? (optional)",
    doorsPlaceholder: "How many doors do you manage? (optional)",
    doorsOptions: {
      "1-4": "1 to 4 doors",
      "5-20": "5 to 20 doors",
      "21-50": "21 to 50 doors",
      "50+": "More than 50 doors",
    },
    submit: "Join waitlist",
    privacyNote: "We only use your email to tell you when Doorsly launches.",
    privacyLinkLabel: "Privacy policy",
    errorInvalidEmail: "Please enter a valid email address.",
    errorGeneric: "Sorry, we couldn’t add you right now. Please try again.",
    errorRateLimited: "Too many attempts. Please try again in a few minutes.",
    successTitle: "You’re on the list",
    successBody: "We’ll email you as soon as we’re ready for you.",
  },
  mockup: {
    userMessage: "Hi Dora",
    doraMessage:
      "Hi, I’m Dora, your property management AI assistant. I can help you track properties, units, tenants, leases, rent and ledger balances, work orders, expenses, vendors, announcements and daily to-dos, all in one conversation.",
    inputPlaceholder: "Text message",
  },
  footer: {
    readyLabel: "Ready to try it right now?",
    textPrompt: "Text anything (try “Hi Dora”) to",
    rights: "All rights reserved.",
    legalNavAria: "Legal",
    privacyLabel: "Privacy policy",
  },
};
