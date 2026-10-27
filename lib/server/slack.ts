import type { WaitlistSignup } from "@/lib/waitlist";

/** Slack treats & < > as markup (<!channel>, links), so user-supplied text is escaped. */
export function escapeSlack(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildSlackText(signup: WaitlistSignup): string {
  const lines = [`New Doorsly waitlist signup: ${escapeSlack(signup.email)}`];
  lines.push(`• Language: ${signup.language}`);
  lines.push(`• Doors: ${signup.doors ?? "not given"}`);
  const entries = Object.entries(signup.attribution);
  if (entries.length === 0) {
    lines.push("• Source: direct (no campaign parameters)");
  } else {
    for (const [key, value] of entries) lines.push(`• ${key}: ${escapeSlack(value)}`);
  }
  return lines.join("\n");
}

/** Posts the signup to the Slack incoming webhook. Returns true only on a 2xx response. */
export async function notifySlack(webhookUrl: string, signup: WaitlistSignup): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: buildSlackText(signup) }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.error("[waitlist] Slack responded", response.status);
    return response.ok;
  } catch (error) {
    console.error("[waitlist] Slack request failed", error instanceof Error ? error.message : error);
    return false;
  }
}
