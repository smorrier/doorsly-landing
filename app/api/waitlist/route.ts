import { NextResponse, type NextRequest } from "next/server";

import { clientIpFromHeaders } from "@/lib/server/client-ip";
import { upsertLoopsContact } from "@/lib/server/loops";
import { hasAdvertisingConsent, sendLead } from "@/lib/server/meta-capi";
import { createRateLimiter } from "@/lib/server/rate-limit";
import { notifySlack } from "@/lib/server/slack";
import { parseWaitlistBody } from "@/lib/waitlist";

const MAX_BODY_BYTES = 10_000;
const allowRequest = createRateLimiter();

/**
 * Waitlist signup. The signup is kept if either Slack or Loops accepts it; the Meta Lead is sent
 * only after that, and only with Advertising consent (see lib/server/meta-capi.ts).
 */
export async function POST(request: NextRequest) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  const loopsApiKey = process.env.LOOPS_API_KEY;
  if (!slackWebhookUrl && !loopsApiKey) {
    console.error("[waitlist] Neither SLACK_WEBHOOK_URL nor LOOPS_API_KEY is set");
    return NextResponse.json({ error: "Waitlist is not configured." }, { status: 500 });
  }

  // No IP header (not behind a proxy) means no limit rather than one bucket shared by everyone.
  const ip = clientIpFromHeaders(request.headers);
  if (ip && !allowRequest(ip, Date.now())) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseWaitlistBody(body);
  if (!parsed.ok) {
    const message = parsed.error === "invalid_email" ? "Invalid email address." : "Invalid request body.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const { signup } = parsed;

  // Bots fill the hidden field. Answer like a success so they learn nothing, and store nothing.
  if (signup.honeypot) return NextResponse.json({ ok: true }, { status: 200 });

  // Independent destinations: one failing must not lose the signup if the other succeeded.
  const [slack, loops] = await Promise.all([
    slackWebhookUrl ? notifySlack(slackWebhookUrl, signup) : Promise.resolve(false),
    loopsApiKey ? upsertLoopsContact(loopsApiKey, signup) : Promise.resolve(false),
  ]);
  if (!slack && !loops) {
    return NextResponse.json({ error: "Failed to save the signup." }, { status: 502 });
  }

  // Server-side Lead, same event_id as the browser Pixel's. Awaited (4 s cap) because serverless
  // hosts can stop work that outlives the response; its outcome never changes the response.
  if (signup.eventId && hasAdvertisingConsent(request.cookies)) {
    await sendLead({
      signup,
      eventId: signup.eventId,
      ip,
      userAgent: request.headers.get("user-agent"),
      cookies: request.cookies,
      requestOrigin: request.headers.get("origin"),
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
