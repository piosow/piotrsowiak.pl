# Dokumentacja techniczna

## Struktura

```
index.html                 cała treść (PL w HTML, EN podmieniane przez JS)
assets/style.css           style + motyw jasny/ciemny (zmienne CSS)
assets/i18n.js             słownik tłumaczeń PL/EN
assets/app.js              motyw, język, menu, formularz
functions/api/contact.js   Cloudflare Pages Function — wysyłka formularza
_headers                   nagłówki bezpieczeństwa i cache
favicon.svg, robots.txt, sitemap.xml
```

## Deploy

Podpięte pod Cloudflare Pages przez Git — każdy `git push` na `main` to deploy.

Ustawienia projektu w Pages: build command **puste**, output directory **`/`** (root).

Deploy ręczny, z pominięciem Gita:

```bash
npx wrangler pages deploy . --project-name=piotrsowiak
```

## Podgląd lokalny

```bash
npx serve .                # sam frontend
npx wrangler pages dev .    # frontend + Pages Function
```

Przy `npx serve` formularz zwróci 404 na `/api/contact` i przejdzie na fallback `mailto:`
— to zachowanie poprawne.

## Formularz kontaktowy

Frontend POST-uje JSON na `/api/contact`. Jeśli endpoint zwróci błąd (np. brak konfiguracji),
JS pokazuje komunikat i otwiera klienta pocztowego z gotowym mailem — formularz nigdy nie
jest ślepym zaułkiem, nawet bez działającego backendu.

Zmienne środowiskowe (Pages → Settings → Environment variables):

| Zmienna | Wartość | Typ |
|---|---|---|
| `RESEND_API_KEY` | klucz z [resend.com](https://resend.com) | **Secret** |
| `MAIL_TO` | `kontakt@piotrsowiak.pl` | Plain text |
| `MAIL_FROM` | `formularz@piotrsowiak.pl` | Plain text |
| `TURNSTILE_SECRET` | *(opcjonalnie)* klucz Turnstile | Secret |

### Resend + Zoho — konfiguracja DNS

Zoho obsługuje **odbiór** poczty, Resend tylko **wysyłkę** formularza. Żeby się nie pogryzły:

- W Resend zweryfikuj domenę. Resend poda rekordy DKIM (`resend._domainkey`) i rekord MX
  dla subdomeny bounce'ów — dodaj je w Cloudflare DNS **jako DNS only (szara chmurka)**.
- **Nie ruszaj istniejących rekordów MX Zoho.** Resend prosi o MX tylko na swojej subdomenie
  (np. `send.piotrsowiak.pl`) — to nie koliduje z MX domeny głównej.
- SPF: jeśli istnieje już `v=spf1 include:zoho.eu ~all`, dopisz include Resenda do **tego samego**
  rekordu TXT. Jedna domena = jeden rekord SPF; dwa osobne rekordy oznaczają SPF fail dla
  całej domeny, łącznie ze zwykłą pocztą.
- Darmowy plan Resend: 3 000 maili/mies., 100/dzień.

### Alternatywa bez Resenda

Podmień w `assets/app.js` URL `/api/contact` na endpoint [Web3Forms](https://web3forms.com)
lub [Formspree](https://formspree.io) i usuń folder `functions/`. Minus: treść wiadomości
przechodzi przez zewnętrznego dostawcę.

### Ochrona przed spamem

Zaimplementowany jest honeypot (ukryte pole `company`) — zatrzymuje większość prostych botów.
Jeśli zacznie przeciekać spam, dodaj Cloudflare Turnstile: widget na froncie, `TURNSTILE_SECRET`
w env, a Function sama zacznie weryfikować token (kod już to obsługuje).

## Edycja treści

- **Teksty PL** — bezpośrednio w `index.html` **oraz** w `assets/i18n.js` (sekcja `pl`).
  Muszą być zgodne, bo JS nadpisuje HTML przy pierwszym renderze.
- **Teksty EN** — tylko `assets/i18n.js`, sekcja `en`.
- **Nowy tag technologii** — dopisz `<li>` w odpowiedniej karcie w `index.html`.
  Nazwy własne (`.NET`, `Redis`) nie wymagają tłumaczenia; słowa jak „Mikroserwisy" mają
  `data-i18n` i wpis w słowniku.
- **Nowy projekt** — skopiuj `<article class="card card-project">` i dodaj klucze `p5.*`
  w obu językach.
- **Kolory** — zmienne na górze `style.css` (`:root` = jasny, `[data-theme="dark"]` = ciemny).

Spójność słownika sprawdza skrypt:

```bash
node tools/check-i18n.js
```

## Do uzupełnienia

- [ ] `assets/og.png` (1200×630) — podgląd przy udostępnianiu na LinkedIn/Slack.
      Meta tag już czeka w `index.html`.
- [ ] Stack per projekt — tagi pod projektami warto zweryfikować przed publikacją.
