import type { PrivacyDoc } from "@/lib/i18n/types";

export const privacyEn: PrivacyDoc = {
  metaTitle: "Privacy policy | Doorsly",
  metaDescription:
    "What personal information the Doorsly website collects, why, which cookies it uses, how long data is kept and how to exercise your rights.",
  title: "Privacy policy",
  updatedLabel: "Last updated",
  updated: "October 26, 2026",
  backLabel: "Back to Doorsly",
  sections: [
    {
      id: "about",
      title: "Who we are",
      blocks: [
        "Doorsly is property management software for landlords with 5 to 50 doors. This website, getdoorsly.com, presents Doorsly and lets you join a waitlist.",
        "The person in charge of protecting personal information is {officerName}, reachable at {officerEmail}.",
        "This policy follows Québec’s Act respecting the protection of personal information in the private sector (Law 25) and Canada’s PIPEDA. It covers this website only.",
      ],
    },
    {
      id: "collect",
      title: "What we collect",
      blocks: [
        "We collect only what is listed here.",
        [
          "When you join the waitlist: your email address and, if you choose, how many doors you manage (1–4, 5–20, 21–50 or 50+).",
          "Sent with the signup form: the language of the page and, if you came from an ad, the parameters in the page address (utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid and gclid). They tell us which campaign brought you.",
          "Technical details of your request, such as your IP address and browser. We use the IP address briefly to limit repeated submissions and do not store it with your signup.",
          "If you accept cookies: the identifiers and events described in the Cookies and trackers section, for example that you viewed the page, joined the waitlist or tapped the text-message link.",
        ],
        "We do not ask for your name, payment details or anything else on this website. We do not sell personal information.",
      ],
    },
    {
      id: "purposes",
      title: "Why we use it",
      blocks: [
        [
          "Waitlist details: to email you when Doorsly launches, and to understand which kinds of landlords and which campaigns are generating interest.",
          "Analytics (only with your consent): to measure how many people visit the page, join the waitlist or tap the text-message link.",
          "Advertising (only with your consent): to measure and improve our ads on Meta (Facebook and Instagram) and Google, including matching a signup to the ad that led to it.",
          "Technical details: to protect the form from abuse.",
        ],
      ],
    },
    {
      id: "consent",
      title: "Your consent and choices",
      blocks: [
        "Analytics and advertising cookies are off until you choose. The banner offers two separate choices, Analytics and Advertising, and Reject all is as easy as Accept all. Until you opt in, nothing is loaded from Google or Meta and nothing is sent to them.",
        "You can change your choice at any time with the “Cookie preferences” link at the bottom of every page: {cookiePrefs}. Withdrawing stops the trackers and removes their cookies from this site.",
        "By submitting the waitlist form, you agree that we email you about Doorsly’s launch. Every email will include a way to unsubscribe, and you can also write to us at {officerEmail}.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and trackers",
      blocks: [
        "We use one cookie of our own that is always on, and cookies from Google and Meta only if you opt in.",
        "Google Analytics, Google Ads and Meta can also receive your IP address and browser details when they load, which happens only after you opt in. Our Google tags run in Consent Mode with all storage denied until you opt in.",
      ],
      table: {
        head: ["Name", "Provider", "Category", "Purpose", "Duration"],
        rows: [
          ["dl_consent", "Doorsly", "Necessary", "Remembers your cookie choices", "13 months"],
          ["_ga, _ga_*", "Google Analytics", "Analytics", "Audience measurement", "2 years"],
          ["_gcl_au, _gcl_aw", "Google Ads", "Advertising", "Ad conversion measurement", "90 days"],
          ["_fbp", "Meta", "Advertising", "Identifies your browser for ad measurement", "90 days"],
          ["_fbc", "Meta", "Advertising", "Keeps the ad click identifier (fbclid)", "90 days"],
        ],
      },
    },
    {
      id: "sharing",
      title: "Who receives your information",
      blocks: [
        [
          "Slack: each waitlist signup (email, doors range, language and campaign parameters) is posted to our private team channel.",
          "Loops: our email service provider stores your waitlist contact and sends our launch emails.",
          "Meta (Facebook and Instagram), only if you accepted Advertising: the Meta Pixel in your browser and our server send events such as page view and waitlist signup. For a signup, our server also sends a hashed (one-way encrypted) email address, your IP address, your browser and ad identifiers, so Meta can count the signup once and match it to the ad.",
          "Google, only if you accepted Analytics or Advertising: Google Analytics and the Google Ads tag receive page views and the event generate_lead.",
          "Our website hosting provider processes requests to the site on our behalf.",
        ],
        "These providers may process data outside Québec and Canada, including in the United States, where privacy laws may differ. We send them only what is described here, and we do not sell personal information.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      blocks: [
        [
          "Waitlist contact (Loops) and Slack notification: until you unsubscribe or ask us to delete them, and no more than 24 months after you joined, unless you start using Doorsly.",
          "Cookies: for the durations in the table above. Your consent choice is kept for 13 months, then we ask again.",
          "Google Analytics data: 14 months.",
          "Data held by Meta and Google follows their own retention policies.",
          "Your IP address, for limiting form submissions: a few minutes, in server memory only.",
        ],
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        "You can, at any time:",
        [
          "access the personal information we hold about you",
          "have it corrected",
          "withdraw your consent (cookies, emails)",
          "ask us to delete it or stop using it",
          "get a copy in a structured, commonly used format (portability)",
          "ask how it was used. No decision about you is made solely by automated processing.",
        ],
        "Write to {officerName} at {officerEmail}. We reply within 30 days. We may ask you to confirm your identity, for example by writing from the address you used to sign up.",
        "If our answer does not satisfy you, you can file a complaint with the Commission d’accès à l’information du Québec (cai.gouv.qc.ca) or the Office of the Privacy Commissioner of Canada (priv.gc.ca).",
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        "Pages are served over HTTPS, access to waitlist details is limited to the people who need it, and email addresses are hashed before they are sent to Meta. If a confidentiality incident presents a risk of serious injury, we will notify you and the Commission d’accès à l’information as the law requires.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        "We may update this policy. The date at the top shows the latest version. If a change affects your cookie choices, we will ask for your consent again.",
      ],
    },
  ],
};
