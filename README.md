# Doorsly landing page

getdoorsly.com: Next.js 14 (App Router), Tailwind, framer-motion. Property management software
for small-to-medium Canadian landlords, covering the whole app. English only for now. The one call to
action is the waitlist.

```bash
npm install
npm run check   # tsc --noEmit
npm run build
```

## Pages

| Path | What |
|---|---|
| `/` | Redirects to `/en`. The query string is kept. |
| `/en` | The landing page. Point ads here directly. |
| `/fr`, `/fr/confidentialite` | Temporary redirects to `/en` and `/en/privacy`. The French site is retired for now; it is in git history (main before `content/whole-app-en`). |
| `/en/privacy` | Privacy policy (Québec Law 25 and PIPEDA). |
| `/api/waitlist` | Waitlist signup (POST). |

All copy lives in `lib/i18n/dictionaries/en.ts` (the policy in `privacy.en.ts`), typed by
`lib/i18n/types.ts`. Adding a key to the type makes the build fail until both languages have it.

## Environment variables

See `.env.example`. `NEXT_PUBLIC_*` values are inlined at build time, so redeploy after changing one.

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel and the Conversions API dataset |
| `META_CAPI_ACCESS_TOKEN` | Server-side Lead to Meta (secret) |
| `META_CAPI_TEST_EVENT_CODE` | Sends server events to Events Manager > Test events (remove after testing) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag (optional; without it only GA4 runs) |
| `LOOPS_API_KEY` | Creates or updates a Loops contact per signup (secret) |
| `SLACK_WEBHOOK_URL` | Slack notification per signup (secret) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address behind the footer's Contact link (optional; without it the link is hidden) |
| `NEXT_PUBLIC_PRIVACY_OFFICER_NAME`, `NEXT_PUBLIC_PRIVACY_OFFICER_EMAIL` | Person in charge of personal information, shown in the privacy policy. Required: `next build` fails without them |

Every tracker variable is optional, each on its own: with one unset, that tracker never loads and
the others are unaffected (for example GA4 without the Ads tag). A Google event is only sent when a
configured tag's own category is granted: GA4 needs Analytics, the Ads tag needs Advertising. The waitlist needs at
least one of `LOOPS_API_KEY` and `SLACK_WEBHOOK_URL`.

## Before the ads go live

- Set `NEXT_PUBLIC_PRIVACY_OFFICER_NAME` and `NEXT_PUBLIC_PRIVACY_OFFICER_EMAIL` (the person in
  charge of personal information; the policy shows both). The build fails if either is missing.
- Read the policy's retention periods (`privacy.en.ts`, section "How long we keep it") and
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

Meta deduplicates the Pixel and server `Lead` on `event_id` + event name. The server event carries
a SHA-256 hash of the lowercased email, `fbp`/`fbc` (cookies, or built from `fbclid`), the client
IP (`x-real-ip`, else the last `X-Forwarded-For` hop; never the first), the user agent and the page
URL. There is no public relay endpoint.

## Ads Manager URL parameters

Link ads straight to `https://getdoorsly.com/en` and set, in the
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
   enter the site URL, accept Advertising, then join the waitlist. Expect
   `PageView` and `Lead` from Browser, and `Lead` from Server, marked as deduplicated
   (one `Lead`, "Browser and Server"). Check the match-quality fields (email, IP, user agent,
   `fbp`/`fbc`). Then remove `META_CAPI_TEST_EVENT_CODE` and redeploy.
3. **GA4 DebugView.** Connect the site in Tag Assistant (tagassistant.google.com), accept
   Analytics, then check Admin > DebugView for `page_view` and `generate_lead`.
   With only Advertising accepted, GA4 must show nothing.
4. **Signup storage.** Join with a test address from `/en?utm_source=meta&utm_medium=paid_social&utm_campaign=test&utm_content=ad1`:
   Slack shows the language, doors and UTM lines; the Loops contact has source `waitlist` and the
   properties filled in.
5. **Withdrawal.** Footer > Cookie preferences > turn both off > save: `_ga*`, `_gcl_*`, `_fbp`,
   `_fbc` are deleted and further clicks send nothing.
6. **Previews.** Share `/en` in the Meta Sharing Debugger and check the title,
   description and the 1200x630 image; check `hreflang` with a search-console URL inspection.

## Screenshots and video

The page ships text-only. Each feature block and the hero accept an optional `media`
(`{ src, alt, width, height }`) in `lib/i18n/dictionaries/en.ts`; add one and the block lays out
with the image beside the text. Put images in `public/` (no mp4s in git: host video elsewhere).
Screens the copy was written for: the Suggested payments card on the rents page (`etransfers`), the
rents page with Charged, Collected and Owed and the unpaid-only filter (`owed`), a unit's documents
folder with the Send for signature dialog (`leases`), the inbox with email and text threads
(`inbox`), the calendar week view (`work-orders`), the unit listing tab's ad generator
(`listings`), and the ep1 e-Transfer poster for the hero.

## Not on the page yet

Pricing (no FAQ or beta cost line until decided) and a founder byline. The contact link appears once `NEXT_PUBLIC_CONTACT_EMAIL` is set.
