import { NextResponse, type NextRequest } from "next/server";

import { pickLang } from "@/lib/i18n/config";

/**
 * "/" sends visitors to /fr or /en from Accept-Language (French when neither matches). The query
 * string is kept so utm_*, fbclid and gclid survive the redirect.
 */
export function middleware(request: NextRequest) {
  const lang = pickLang(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: ["/"],
};
