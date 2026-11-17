"use server";

import { schemas, type FormKind, type FormState } from "@/lib/forms/schemas";

const successCopy: Record<FormKind, string> = {
  newsletter: "You’re in. Look out for news from the Glory Tent.",
  salvation: "Welcome to the family! Someone from our team will reach out to you shortly.",
  prayer: "Your request has been received. We are standing in agreement with you.",
  testimony: "Thank you for sharing what God has done. Your story will build someone’s faith.",
  serve: "Thank you for answering the call! A unit leader will contact you soon.",
  pastoral: "Request received. The pastoral office will contact you to confirm details.",
  training: "You’re on the list. We’ll notify you as soon as the next session opens.",
};

/** Converts FormData into the shape zod expects (checkbox "on" → boolean). */
function toObject(formData: FormData) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of formData.entries()) {
    if (k.startsWith("$") || k === "company") continue; // React internals + honeypot
    out[k] = v === "on" ? true : v;
  }
  return out;
}

/**
 * One action for every form on the site. Validates, then forwards to
 * FORMS_WEBHOOK_URL (Zapier / Make / Google Apps Script / your API) if set.
 */
export async function submitForm(kind: FormKind, _prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: bots fill hidden fields, humans don't.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", message: successCopy[kind] };
  }

  const raw = toObject(formData);
  // Unchecked checkboxes are absent from FormData.
  if (kind === "prayer") raw.confidential = raw.confidential === true;
  if (kind === "testimony") raw.consent = raw.consent === true;

  const parsed = schemas[kind].safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const payload = { form: kind, submittedAt: new Date().toISOString(), data: parsed.data };
  const hook = process.env.FORMS_WEBHOOK_URL;

  try {
    if (hook) {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      console.info("[forms] FORMS_WEBHOOK_URL not set — submission logged only:", payload);
    }
  } catch (err) {
    console.error("[forms] delivery failed", err);
    return { status: "error", message: "Something went wrong on our side. Please try again in a moment." };
  }

  return { status: "success", message: successCopy[kind] };
}
