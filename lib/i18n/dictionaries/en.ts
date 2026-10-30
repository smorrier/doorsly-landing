import type { Dictionary } from "@/lib/i18n/types";

import { privacyEn } from "./privacy.en";

export const en: Dictionary = {
  meta: {
    title: "Doorsly: property management software for Canadian landlords",
    description:
      "Rent, e-transfers, leases, work orders, documents and tenant messages in one place, built for small Canadian landlords. Join the Doorsly closed beta waitlist.",
    ogLocale: "en_CA",
    ogImageAlt: "Doorsly: property management without the spreadsheets, for Canadian landlords",
  },
  og: {
    headline: "Property management without the spreadsheets",
    subline: "For small-to-medium Canadian landlords. Join the closed beta waitlist.",
  },
  header: { cta: "Join the waitlist", homeAria: "Doorsly home" },
  hero: {
    badge: "Closed beta",
    titleLead: "Property management for Canadian landlords,",
    titleAccent: "without the spreadsheets",
    subtitle: "Rent, tenants, leases, work orders, documents and your inbox, in one place.",
  },
  pain: {
    title: "Sound familiar?",
    items: [
      {
        title: "A deposit lands and you can’t tell whose it is.",
        body: "An Interac e-transfer arrives with no name you recognize, and you go digging through your tenants.",
      },
      {
        title: "Who is behind on rent?",
        body: "The answer lives in a spreadsheet, a bank app and your memory.",
      },
      {
        title: "Still printing leases to sign?",
        body: "Print, sign, scan, email, file. Then find it again next year.",
      },
    ],
  },
  app: {
    title: "Everything for your rentals, in one place",
    moreLabel: "More detail",
    features: [
      {
        id: "etransfers",
        media: {
          src: "/screens/etransfers.png",
          alt: "Doorsly rents page: a Suggested payments list showing each e-transfer sender, the amount, and a suggested tenant with a Confirm button.",
          width: 668,
          height: 245,
        },
        title: "Match e-transfers to the right tenant",
        answer:
          "Doorsly lists the Interac e-transfer notifications from the inbox you connect as suggested payments. Each one shows the sender, the amount and a suggested tenant. You confirm it to record the rent payment on that lease, or dismiss it if it isn’t rent. Doorsly suggests; you decide.",
        more: [
          "You connect the Gmail or Outlook inbox that receives your notifications. Once a payment is confirmed it is added to the lease’s payment history as a credit, and a lease with nothing owing shows Paid up.",
          "Active leases are billed every month. If the connection to your inbox drops, Doorsly tells you that new e-transfers may be missing, so you know to reconnect. Your payment history stays the record of what was charged and what was paid.",
        ],
      },
      {
        id: "owed",
        media: {
          src: "/screens/owed-unpaid.png",
          alt: "Doorsly rents page filtered to unpaid leases, listing each property and unit with the tenant, the monthly rent, and the amount owed.",
          width: 668,
          height: 295,
        },
        title: "See who owes rent at a glance",
        answer:
          "The rents page shows Charged, Collected and Owed totals for your active leases. Leases with a balance are listed first, and a lease with nothing owing shows Paid up. Open any lease to see its payment history (the ledger), entry by entry, so you can check how a balance got there.",
        more: [
          "You can filter the list to unpaid leases only, so the question of who is behind has one answer in one place. Each charge, payment and credit is listed in the lease’s payment history, with the payment method recorded when you log a payment.",
          "The totals are across your active leases, not a single month, and the page says so. When a payment arrives some other way than an e-transfer, use Record payment to add it to the lease yourself.",
        ],
      },
      {
        id: "leases",
        title: "Leases, e-signature and documents",
        answer:
          "Keep each lease in the folder for its property and unit, then send it out for e-signature to the tenants on it. Signers are the lease’s tenants who have an email address, preselected for you. The file shows Awaiting signature, then Signed. No printing, no scanning.",
        more: [
          "Every file for your properties, units and leases sits in one place. Search across every property at once, or filter by tag, so a lease or an inspection report is one search away instead of a hunt through email attachments.",
          "Draft leases are not billed until they start, so you can set up next year’s renewal early. Renewing creates a new lease from the previous one with dates shifted by a year, and you can edit anything before saving. Ended leases stop charging rent.",
        ],
      },
      {
        id: "inbox",
        media: {
          src: "/screens/inbox.png",
          alt: "Doorsly communications page: one inbox of email and text conversations with tenants, with filters for email, SMS and unread.",
          width: 800,
          height: 462,
        },
        title: "One inbox for email and text",
        answer:
          "Emails and texts with tenants and vendors show up in one inbox, and each contact has a timeline. Texts to tenants go out from your Doorsly messaging number, so you can reply to a tenant by text without giving out your personal cell.",
        more: [
          "Reply to a tenant by text from the inbox, or send email from your own Gmail or Outlook address once it is connected. Each contact’s timeline gathers their emails, texts, calls and announcements.",
          "Need to tell a whole building something? Send an announcement to everyone, a property or a unit by email, and also by text if you choose. Tenants and vendors each get their own conversation, so a plumber’s quote isn’t buried under a tenant’s rent question.",
        ],
      },
      {
        id: "work-orders",
        media: {
          src: "/screens/calendar.png",
          alt: "Doorsly calendar in week view, showing work orders, tasks and events together, colour-coded.",
          width: 800,
          height: 462,
        },
        title: "Work orders, tasks and one calendar",
        answer:
          "Log maintenance requests as work orders, assign a vendor, and track each one to completion. Tasks sit on their own board for everything that isn’t a repair. The calendar shows your work orders, tasks and events, such as showings and inspections, together in one view.",
        more: [
          "A work order records its property and unit, a category, a priority from low to emergency, and the vendor you picked. Move it through its statuses until it’s completed, and keep the follow-up in view rather than in your head.",
          "Tasks have their own board with columns you can reorder, and they can repeat. Events cover inspections, showings, meetings and reminders. Switch the calendar between month, week and day, and see what is coming up at the unit before you head over.",
        ],
      },
      {
        id: "listings",
        media: {
          src: "/screens/listings.png",
          alt: "Doorsly unit page, Listing ad tab: listing details such as bedrooms, bathrooms, square footage and asking rent, used to generate a rental ad.",
          width: 800,
          height: 462,
        },
        title: "Write rental ads from the unit’s details",
        answer:
          "Doorsly turns a unit’s listing details into rental ad text in English or French, ready to edit and copy. You pick one language for each generation. Doorsly writes the ad text for you to review; it does not post the ad anywhere on your behalf.",
        more: [
          "Choose the length, the tone and how much of the address to show. You can add custom instructions, and let Doorsly use selected photos of the unit to enrich the ad.",
          "Doorsly asks for the listing details it still needs before it generates, such as a move-in date. Need the same unit in the other language? Generate again with the other language selected. The ad is only as good as the details you give it, so check it before you use it.",
        ],
      },
    ],
    alsoTitle: "Also inside",
    alsoItems: [
      "Announcements to a property, a unit or everyone, by email and optionally by text",
      "Reusable email templates that fill in each tenant’s name and details",
      "Expenses, with receipt photos you can upload",
      "Revenue reports built from your payment records",
      "Dora, an assistant that looks things up and drafts messages for you to review",
    ],
  },
  fit: {
    title: "Who Doorsly is for",
    forTitle: "Built for",
    forBody:
      "Small-to-medium landlords across Canada who manage their own rentals and want rent, tenants, leases, work orders and messages in one place, instead of spread across spreadsheets, email and text threads.",
    notTitle: "Not built for",
    notBody:
      "Large property management companies, or commercial portfolios. Doorsly is made for residential landlords who manage their own units.",
  },
  beta: {
    title: "How the closed beta works",
    steps: [
      {
        title: "Join the waitlist.",
        body: "Leave your email, and tell us roughly how many doors you manage if you like.",
      },
      {
        title: "Get invited.",
        body: "When there’s room, we’ll email you an invitation.",
      },
      {
        title: "Create your account.",
        body: "When your invitation arrives, you can sign up and set up your properties.",
      },
    ],
  },
  faq: {
    title: "Questions landlords ask",
    items: [
      {
        question: "What is Doorsly?",
        answer:
          "Doorsly is property management software for small-to-medium Canadian landlords. It keeps rent, tenants, leases, work orders, documents and email and text conversations in one place. It is currently in closed beta, so access is by invitation.",
      },
      {
        question: "How does Doorsly handle Interac e-transfers?",
        answer:
          "You connect the Gmail or Outlook inbox that receives your Interac e-transfer notifications. Doorsly shows each notification as a suggested payment with a suggested tenant. You allocate it as a rent payment or dismiss it.",
      },
      {
        question: "What can Doorsly see when I connect my email?",
        answer:
          "When you connect Gmail or Outlook, you give Doorsly permission to read and send email from that account. Doorsly looks at new mail for two things: Interac e-transfer notifications, which become suggested payments, and messages from your tenants and vendors, which appear in your inbox. Other mail isn’t added to Doorsly.",
      },
      {
        question: "Whose number do my texts to tenants come from?",
        answer:
          "Texts to tenants and vendors go out from your Doorsly messaging number, not from your personal cell. Emails go out from your own Gmail or Outlook address once it is connected.",
      },
      {
        question: "Can tenants sign leases electronically?",
        answer:
          "Yes. You send a lease for e-signature from its folder. The tenants on that lease who have an email address are preselected as signers, you place the signature fields, and the file shows Awaiting signature and then Signed.",
      },
      {
        question: "Does Doorsly post my rental ads?",
        answer:
          "No. Doorsly writes the ad text from a unit’s listing details, in English or French, one language per generation. You edit it and copy it to wherever you advertise. Doorsly does not post it for you.",
      },
    ],
  },
  waitlist: {
    title: "Join the Doorsly waitlist",
    body: "Closed beta for Canadian landlords. We’ll email you when there’s room.",
    emailPlaceholder: "you@example.com",
    emailLabel: "Email address",
    doorsLabel: "How many doors do you manage? (optional)",
    doorsPlaceholder: "How many doors do you manage? (optional)",
    doorsOptions: {
      "1-4": "1 to 4 doors",
      "5-20": "5 to 20 doors",
      "21-50": "21 to 50 doors",
      "50+": "More than 50 doors",
    },
    submit: "Join the waitlist",
    privacyNote: "We only use your email to tell you when there’s room in the closed beta.",
    privacyLinkLabel: "Privacy policy",
    errorInvalidEmail: "Please enter a valid email address.",
    errorGeneric: "Sorry, we couldn’t add you right now. Please try again.",
    errorRateLimited: "Too many attempts. Please try again in a few minutes.",
    successTitle: "You’re on the list",
    successBody: "We’ll email you as soon as we’re ready for you.",
  },
  footer: {
    tagline: "Property management without the spreadsheets.",
    rights: "All rights reserved.",
    legalNavAria: "Legal",
    privacyLabel: "Privacy policy",
    contactLabel: "Contact",
  },
  consent: {
    bannerTitle: "Your privacy choices",
    bannerBody:
      "We’d like to use analytics and advertising cookies (Google and Meta) to measure how this page and our ads perform. They stay off unless you accept.",
    customize: "Customize",
    rejectAll: "Reject all",
    acceptAll: "Accept all",
    dialogTitle: "Cookie preferences",
    dialogDescription:
      "Choose which cookies Doorsly may use. You can change this at any time from the footer.",
    save: "Save choices",
    alwaysOn: "Always on",
    close: "Close",
    preferencesLink: "Cookie preferences",
    categories: {
      necessary: {
        title: "Necessary",
        description: "Remembers your cookie choices. Nothing else.",
      },
      analytics: {
        title: "Analytics",
        description:
          "Google Analytics measures visits, waitlist signups and taps on the text-message link.",
      },
      advertising: {
        title: "Advertising",
        description:
          "Meta and Google Ads measure how our ads perform and match signups to the ad that led to them.",
      },
    },
  },
  privacy: privacyEn,
};
