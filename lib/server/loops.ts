import type { WaitlistSignup } from "@/lib/waitlist";

/**
 * Loops "Update a contact" (PUT /v1/contacts/update), which also creates the contact when the
 * email is new: https://loops.so/docs/api-reference/update-contact
 *
 * Custom contact properties must exist in Loops first (Settings > Contact properties), as text:
 * language, doors, utmSource, utmMedium, utmCampaign, utmContent, utmTerm.
 */
const LOOPS_UPDATE_URL = "https://app.loops.so/api/v1/contacts/update";

export function buildLoopsContact(signup: WaitlistSignup): Record<string, string> {
  const { attribution } = signup;
  const contact: Record<string, string> = {
    email: signup.email,
    source: "waitlist",
    language: signup.language,
  };
  // Only fields we have: a repeat signup without UTMs must not blank out the first one's.
  const optional: Record<string, string | undefined> = {
    doors: signup.doors,
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
    utmContent: attribution.utm_content,
    utmTerm: attribution.utm_term,
  };
  for (const [key, value] of Object.entries(optional)) if (value) contact[key] = value;
  return contact;
}

async function putContact(apiKey: string, contact: Record<string, string>): Promise<Response> {
  return fetch(LOOPS_UPDATE_URL, {
    method: "PUT",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(contact),
    signal: AbortSignal.timeout(5000),
  });
}

/**
 * Creates or updates the waitlist contact. Returns true when Loops accepted it. If Loops rejects
 * the full contact (usually a custom property that was not created yet), the contact is saved
 * again with just email, source and language so the signup is not lost; the failure is logged.
 */
export async function upsertLoopsContact(
  apiKey: string,
  signup: WaitlistSignup,
): Promise<boolean> {
  try {
    const contact = buildLoopsContact(signup);
    const response = await putContact(apiKey, contact);
    if (response.ok) return true;

    const detail = await response.text().catch(() => "");
    console.error("[waitlist] Loops rejected the contact", response.status, detail.slice(0, 300));
    if (response.status !== 400) return false;

    const minimal = { email: contact.email, source: contact.source, language: contact.language };
    const retry = await putContact(apiKey, minimal);
    if (!retry.ok) console.error("[waitlist] Loops rejected the minimal contact", retry.status);
    return retry.ok;
  } catch (error) {
    console.error("[waitlist] Loops request failed", error instanceof Error ? error.message : error);
    return false;
  }
}
