import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LANG } from "@/lib/i18n/config";

/** "/" goes to /en. The query string is kept so utm_*, fbclid and gclid survive the redirect. */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/"],
};
