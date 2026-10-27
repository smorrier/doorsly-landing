/**
 * Google tag ids and the Consent Mode defaults. Plain module (no "use client") so the server
 * layout can read it.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GOOGLE_TAG_IDS: readonly string[] = [GA_ID, ADS_ID].filter(Boolean);

export function consentModeFlags(analytics: boolean, advertising: boolean) {
  const flag = (on: boolean) => (on ? "granted" : "denied");
  return {
    analytics_storage: flag(analytics),
    ad_storage: flag(advertising),
    ad_user_data: flag(advertising),
    ad_personalization: flag(advertising),
  };
}

/**
 * Inline script for <head>: defines gtag and sets Consent Mode v2 to denied for everything.
 * It makes no network request and sets no cookie; gtag.js is not requested until opt-in.
 */
export const GOOGLE_CONSENT_DEFAULT_SNIPPET = `window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag("consent","default",${JSON.stringify(
  consentModeFlags(false, false),
)});window.gtag("set","ads_data_redaction",true);`;
