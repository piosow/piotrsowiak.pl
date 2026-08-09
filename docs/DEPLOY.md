# Dokumentacja techniczna

## Struktura

```
public/                    ← build output directory (statyczne assety)
  index.html               cała treść (PL w HTML, EN podmieniane przez JS)
  assets/style.css         style + motyw jasny/ciemny (zmienne CSS)
  assets/i18n.js           słownik tłumaczeń PL/EN
  assets/app.js            motyw, język, menu, formularz
  _headers                 nagłówki bezpieczeństwa i cache
  favicon.svg, robots.txt, sitemap.xml

functions/api/contact.js   Cloudflare Pages Function — wysyłka formularza
tools/check-i18n.js        walidacja spójności tłumaczeń
```

> **Nie przenoś `functions/` do `public/`.** Dokumentacja Cloudflare wymaga, żeby katalog
> `functions` leżał w roocie projektu, **a nie w static roocie**. Jeśli build output directory
> wskazuje na katalog zawierający `functions/`, Pages nie zbuduje Workera i wszystkie
> endpointy `/api/*` zwrócą 404.

## Deploy

Podpięte pod Cloudflare Pages przez Git — każdy `git push` na `main` to deploy.

Ustawienia projektu w Pages (Settings → Builds & deployments):

| Pole | Wartość |
|---|---|
| Build command | *(puste)* |
| Build output directory | `public` |
| Root directory | `/` |

Deploy ręczny, z pominięciem Gita:

```bash
npx wrangler pages deploy public --project-name=piotrsowiak
```

Uwaga: **Direct Upload z dashboardu nie obsługuje Functions.** Formularz zadziała tylko
przy deployu z Gita albo przez Wranglera.

## Podgląd lokalny

```bash
npx serve public                  # sam frontend
npx wrangler pages dev public     # frontend + Pages Function
```

Przy `npx serve` formularz zwróci 404 na `/api/contact` i przejdzie na fallback `mailto:`
— to zachowanie poprawne.

## Diagnostyka Functions

Jeśli `/api/contact` zwraca 404:

1. Workers & Pages → projekt → **Deployments** → otwórz ostatni deploy → log powinien
   zawierać `Compiled Worker successfully` albo `Found Functions directory`.
   Brak tej linii = Pages w ogóle nie zobaczyło `functions/`.
2. Sprawdź, czy **Build output directory** nie wskazuje katalogu zawierającego `functions/`.
3. Sprawdź, czy w output roocie nie leży `_worker.js` — przejmuje cały routing
   i wtedy `functions/` jest ignorowane.

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

Podmień w `public/assets/app.js` URL `/api/contact` na endpoint [Web3Forms](https://web3forms.com)
lub [Formspree](https://formspree.io) i usuń folder `functions/`. Minus: treść wiadomości
przechodzi przez zewnętrznego dostawcę.

### Ochrona przed spamem

Zaimplementowany jest honeypot (ukryte pole `company`) — zatrzymuje większość prostych botów.
Jeśli zacznie przeciekać spam, dodaj Cloudflare Turnstile: widget na froncie, `TURNSTILE_SECRET`
w env, a Function sama zacznie weryfikować token (kod już to obsługuje).

## Edycja treści

- **Teksty PL** — bezpośrednio w `public/index.html` **oraz** w `public/assets/i18n.js`
  (sekcja `pl`). Muszą być zgodne, bo JS nadpisuje HTML przy pierwszym renderze.
- **Teksty EN** — tylko `public/assets/i18n.js`, sekcja `en`.
- **Nowy tag technologii** — dopisz `<li>` w odpowiedniej karcie w `public/index.html`.
  Nazwy własne (`.NET`, `Redis`) nie wymagają tłumaczenia; słowa jak „Mikroserwisy" mają
  `data-i18n` i wpis w słowniku.
- **Nowy projekt** — skopiuj `<article class="card card-project">` i dodaj klucze `p5.*`
  w obu językach.
- **Kolory** — zmienne na górze `public/assets/style.css` (`:root` = jasny,
  `[data-theme="dark"]` = ciemny).

Spójność słownika sprawdza skrypt:

```bash
node tools/check-i18n.js
```

## Do uzupełnienia

- [ ] `public/assets/og.png` (1200×630) — podgląd przy udostępnianiu na LinkedIn/Slack.
      Meta tag już czeka w `public/index.html`.
- [ ] Stack per projekt — tagi pod projektami warto zweryfikować przed publikacją.
