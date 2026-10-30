import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

/** The privacy policy must name the person in charge of personal information (Law 25). */
const REQUIRED_AT_BUILD = [
  "NEXT_PUBLIC_PRIVACY_OFFICER_NAME",
  "NEXT_PUBLIC_PRIVACY_OFFICER_EMAIL",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The French site is retired for now; keep old links and ads working.
  async redirects() {
    return [
      { source: "/fr", destination: "/en", permanent: false },
      { source: "/fr/confidentialite", destination: "/en/privacy", permanent: false },
    ];
  },
};

export default function config(phase) {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const missing = REQUIRED_AT_BUILD.filter((name) => !process.env[name]?.trim());
    if (missing.length > 0) {
      throw new Error(
        `Missing environment variable(s) for the privacy policy: ${missing.join(", ")}`,
      );
    }
  }
  return nextConfig;
}
