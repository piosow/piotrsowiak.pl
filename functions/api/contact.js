/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Wysyła wiadomość z formularza przez Resend (https://resend.com).
 *
 * Wymagane zmienne środowiskowe (Pages → Settings → Environment variables):
 *   RESEND_API_KEY  — klucz API z Resend (ustaw jako "Secret", nie plain text)
 *   MAIL_TO         — adres docelowy, np. kontakt@piotrsowiak.pl
 *   MAIL_FROM       — nadawca na zweryfikowanej domenie, np. formularz@piotrsowiak.pl
 *
 * Opcjonalnie (zalecane przy spamie):
 *   TURNSTILE_SECRET — jeśli ustawione, weryfikuje token Cloudflare Turnstile
 *
 * Uwaga: MAIL_FROM MUSI być na domenie zweryfikowanej w Resend. Skrzynka
 * odbiorcza (Zoho) pozostaje bez zmian — Resend służy tylko do wysyłki.
 */

const MAX = { name: 120, email: 200, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export async function onRequestPost({ request, env }) {
  // --- parsowanie ---------------------------------------------------------
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const company = String(data.company ?? "").trim(); // honeypot

  // --- honeypot: bot. Zwracamy 200, żeby nie uczyć go, co poszło nie tak ---
  if (company) return json(200, { ok: true });

  // --- walidacja ----------------------------------------------------------
  if (!name || !email || !message) return json(400, { error: "missing_fields" });
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message)
    return json(400, { error: "too_long" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });

  // --- Turnstile (opcjonalnie) -------------------------------------------
  if (env.TURNSTILE_SECRET) {
    const token = String(data.turnstileToken ?? "");
    if (!token) return json(400, { error: "captcha_required" });

    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? ""
      })
    }).then((r) => r.json()).catch(() => null);

    if (!verify?.success) return json(400, { error: "captcha_failed" });
  }

  // --- konfiguracja -------------------------------------------------------
  if (!env.RESEND_API_KEY || !env.MAIL_TO || !env.MAIL_FROM) {
    // Brak konfiguracji → 503. Frontend wykryje błąd i przełączy się na mailto.
    return json(503, { error: "not_configured" });
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "-";
  const country = request.headers.get("CF-IPCountry") ?? "-";

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
      <p><strong>Od:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
      <p style="white-space:pre-wrap">${esc(message)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
      <p style="color:#888;font-size:12px">piotrsowiak.pl · IP ${esc(ip)} · ${esc(country)}</p>
    </div>`;

  // --- wysyłka ------------------------------------------------------------
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `Formularz piotrsowiak.pl <${env.MAIL_FROM}>`,
      to: [env.MAIL_TO],
      reply_to: email,
      subject: `Kontakt ze strony — ${name}`,
      html,
      text: `Od: ${name} <${email}>\n\n${message}\n\n---\npiotrsowiak.pl · IP ${ip} · ${country}`
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    return json(502, { error: "send_failed" });
  }

  return json(200, { ok: true });
}

/* Eksportujemy wyłącznie onRequestPost — Pages samo zwróci 405 dla innych metod.
   Nie dodawaj tu onRequest: catch-all ma pierwszeństwo i musi zwrócić Response,
   więc łatwo o błąd 500 przy zwróceniu undefined. */
