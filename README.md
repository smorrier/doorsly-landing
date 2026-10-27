# Doorsly landing page

getdoorsly.com: Next.js 14 (App Router), Tailwind, framer-motion. Property management software
for landlords with 5 to 50 doors. The main call to action is texting Dora to get a demo account;
the second is the waitlist.

```bash
npm install
npm run check   # tsc --noEmit
npm run build
```

## Pages

| Path | What |
|---|---|
| `/` | Redirects to `/fr` or `/en` from `Accept-Language` (French when neither matches). The query string is kept. |
| `/fr`, `/en` | The landing page. Point ads here directly. |
| `/fr/confidentialite`, `/en/privacy` | Privacy policy (Québec Law 25). |
| `/api/waitlist` | Waitlist signup (POST). |

All copy lives in `lib/i18n/dictionaries/{fr,en}.ts` (the policy in `privacy.{fr,en}.ts`), typed by
`lib/i18n/types.ts`. Adding a key to the type makes the build fail until both languages have it.

## Environment variables

See `.env.example`. `NEXT_PUBLIC_*` values are inlined at build time, so redeploy after changing one.

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel and the Conversions API dataset |
| `META_CAPI_ACCESS_TOKEN` | Server-side Lead to Meta (secret) |
| `META_CAPI_TEST_EVENT_CODE` | Sends server events to Events Manager > Test events (remove after testing) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag |
| `LOOPS_API_KEY` | Creates or updates a Loops contact per signup (secret) |
| `SLACK_WEBHOOK_URL` | Slack notification per signup (secret) |
| `NEXT_PUBLIC_DEMO_SMS_NUMBER` | Number behind the "text Dora" link (defaults to +14385333509) |

Every tracker variable is optional: with it unset, that tracker never loads. The waitlist needs at
least one of `LOOPS_API_KEY` and `SLACK_WEBHOOK_URL`.

## Before the ads go live

- Replace `TODO_PRIVACY_OFFICER_NAME` and `TODO_PRIVACY_EMAIL` in `lib/site.ts` (the person in
  charge of personal information; the policy shows both).
- Read the policy's retention periods (`privacy.{fr,en}.ts`, section "How long we keep it") and
  make them true: waitlist data deleted within 24 months; Google Analytics data retention set to
  14 months (GA4 > Admin > Data collection and modification > Data retention).
- In Loops, create these contact properties (type: string) before the first signup:
  `language`, `doors`, `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`. If one is
  missing, Loops rejects the full contact and the route saves just email, source and language
  (and logs `[waitlist] Loops rejected the contact`).
- In GA4, mark `generate_lead` as a key event, then import it into Google Ads (Goals >
  Conversions > Import > Google Analytics 4). No Ads conversion label is needed in code.

## Consent and trackers

Consent is opt-in, with separate Analytics and Advertising choices, saved in the first-party
`dl_consent` cookie (13 months). The footer's "Cookie preferences" link reopens the dialog.

- Nothing from Meta or Google is requested before the matching opt-in: `fbevents.js` needs
  Advertising; `gtag.js` needs Analytics (GA4) or Advertising (Ads tag).
- Google Consent Mode v2 starts with `analytics_storage`, `ad_storage`, `ad_user_data` and
  `ad_personalization` all `denied` (inline `<head>` snippet: no request, no cookie), and is
  updated on opt-in or withdrawal.
- Withdrawing revokes the Pixel, disables the Google tags and deletes `_fbp`, `_fbc`, `_ga*`,
  `_gcl_*`.
- The server sends Lead to Meta only when the request's `dl_consent` cookie grants Advertising.

## Events

| Event | Fired when | Meta Pixel (browser) | Meta CAPI (server) | Google (gtag) |
|---|---|---|---|---|
| Page view | each page load | `PageView` | | GA4 automatic `page_view` |
| Waitlist signup succeeds | `/api/waitlist` returns OK | `Lead` + `eventID` | `Lead`, same `event_id` | `generate_lead` (`lead_source`, `language`) |
| "Text Dora" link clicked | click on either SMS link | `Contact` | | `demo_sms_click` (`link_location`, `language`) |

Only the click is tracked. Whether the text was actually sent, and which ad it came from, is not.

Meta deduplicates the Pixel and server `Lead` on `event_id` + event name. The server event carries
a SHA-256 hash of the lowercased email, `fbp`/`fbc` (cookies, or built from `fbclid`), the client
IP (`x-real-ip`, else the last `X-Forwarded-For` hop; never the first), the user agent and the page
URL. There is no public relay endpoint.

## Ads Manager URL parameters

Link ads straight to `https://getdoorsly.com/fr` or `https://getdoorsly.com/en` and set, in the
ad's URL parameters:

```
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

The form reads `utm_*`, `fbclid` and `gclid` from the address bar at submit time and sends them
with the signup, so no attribution cookie is used. The language switcher keeps the query string.
For Google Ads, turn on auto-tagging (adds `gclid`); UTMs are optional, for example
`utm_source=google&utm_medium=cpc&utm_campaign={campaignid}`.

## Waitlist route

`POST /api/waitlist` takes `email`, `language`, optional `doors` (`1-4`, `5-20`, `21-50`, `50+`),
the ad parameters, `eventId`, `pageUrl` and the hidden `website` honeypot.

- Posts to Slack and upserts the Loops contact (`PUT https://app.loops.so/api/v1/contacts/update`,
  `source: "waitlist"`). The signup counts as saved if either succeeds; only both failing returns 502.
- Limit: 8 requests per IP per 10 minutes (`429`), counted in memory per server instance. On
  serverless hosting each warm instance counts separately; add a firewall rule if you need a
  hard cap.
- A filled honeypot gets a normal success response and nothing is stored or tracked.

## After deploying

1. **No tracker before consent.** Open the site in a private window with DevTools > Network. Before
   answering the banner there must be no request to `facebook.com`, `facebook.net`,
   `googletagmanager.com`, `google-analytics.com` or `doubleclick.net`, and only `dl_consent` may be
   set after you answer. "Reject all" must keep it that way.
2. **Meta Test events.** Set `META_CAPI_TEST_EVENT_CODE`, redeploy, open Events Manager > Test events,
   enter the site URL, accept Advertising, click the SMS link, then join the waitlist. Expect
   `PageView`, `Contact` and `Lead` from Browser, and `Lead` from Server, marked as deduplicated
   (one `Lead`, "Browser and Server"). Check the match-quality fields (email, IP, user agent,
   `fbp`/`fbc`). Then remove `META_CAPI_TEST_EVENT_CODE` and redeploy.
3. **GA4 DebugView.** Connect the site in Tag Assistant (tagassistant.google.com), accept
   Analytics, then check Admin > DebugView for `page_view`, `demo_sms_click` and `generate_lead`.
   With only Advertising accepted, GA4 must show nothing.
4. **Signup storage.** Join with a test address from `/fr?utm_source=meta&utm_medium=paid_social&utm_campaign=test&utm_content=ad1`:
   Slack shows the language, doors and UTM lines; the Loops contact has source `waitlist` and the
   properties filled in.
5. **Withdrawal.** Footer > Cookie preferences > turn both off > save: `_ga*`, `_gcl_*`, `_fbp`,
   `_fbc` are deleted and further clicks send nothing.
6. **Previews.** Share `/fr` and `/en` in the Meta Sharing Debugger and check the title,
   description and the 1200x630 image; check `hreflang` with a search-console URL inspection.
