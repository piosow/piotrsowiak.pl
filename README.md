# piotrsowiak.pl

Statyczna wizytówka. Zero zależności, zero build stepu — czysty HTML/CSS/JS.

```
index.html                 cała treść (PL w HTML, EN podmieniane przez JS)
assets/style.css           style + motyw jasny/ciemny (zmienne CSS)
assets/i18n.js             słownik tłumaczeń PL/EN
assets/app.js              motyw, język, menu, formularz
functions/api/contact.js   Cloudflare Pages Function — wysyłka formularza
_headers                   nagłówki bezpieczeństwa i cache
favicon.svg, robots.txt, sitemap.xml
```

## Deploy na Cloudflare Pages

**Wariant A — Git (zalecany)**

1. Wypchnij repo na GitHub/GitLab.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: **puste**. Build output directory: **`/`** (root).
4. Custom domains → dodaj `piotrsowiak.pl` i `www.piotrsowiak.pl`.

**Wariant B — bez Gita**

Spakuj zawartość folderu do ZIP i wrzuć w Pages → Upload assets. Uwaga: przy uploadzie
ręcznym `functions/` też jest obsługiwane, ale wygodniej użyć Wranglera:

```bash
npx wrangler pages deploy . --project-name=piotrsowiak
```

## Formularz kontaktowy

Frontend POST-uje JSON na `/api/contact`. Jeśli endpoint zwróci błąd (np. brak konfiguracji),
JS pokazuje komunikat i **otwiera klienta pocztowego z gotowym mailem** — więc formularz
nigdy nie jest ślepym zaułkiem, nawet bez backendu.

Żeby wysyłka działała serwerowo, ustaw w Pages → Settings → Environment variables:

| Zmienna | Wartość | Typ |
|---|---|---|
| `RESEND_API_KEY` | klucz z [resend.com](https://resend.com) | **Secret** |
| `MAIL_TO` | `kontakt@piotrsowiak.pl` | Plain text |
| `MAIL_FROM` | `formularz@piotrsowiak.pl` | Plain text |
| `TURNSTILE_SECRET` | *(opcjonalnie)* klucz Turnstile | Secret |

### Konfiguracja Resend + Zoho — ważne

Zoho obsługuje **odbiór** poczty, Resend tylko **wysyłkę** formularza. Żeby się nie pogryzły:

- W Resend zweryfikuj domenę `piotrsowiak.pl`. Resend poda rekordy DKIM (`resend._domainkey`)
  i rekord MX dla subdomeny bounce'ów — dodaj je w Cloudflare DNS **jako DNS only (szara chmurka)**.
- **Nie ruszaj istniejących rekordów MX Zoho.** Resend prosi o MX tylko na swojej subdomenie
  (np. `send.piotrsowiak.pl`) — to nie koliduje z MX domeny głównej.
- SPF: jeśli masz już `v=spf1 include:zoho.eu ~all`, dopisz include Resenda do **tego samego**
  rekordu TXT (jedna domena = jeden rekord SPF, dwa rekordy = SPF fails).
- Darmowy plan Resend: 3 000 maili/mies., 100/dzień. Dla wizytówki z zapasem.

### Alternatywa bez Resenda

Jeśli nie chcesz kolejnego konta: podmień w `assets/app.js` URL `/api/contact` na endpoint
[Web3Forms](https://web3forms.com) lub [Formspree](https://formspree.io) i usuń folder
`functions/`. Minus: treść wiadomości przechodzi przez zewnętrznego dostawcę.

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

## Do uzupełnienia

- [ ] **Nazwy firm** w sekcji Doświadczenie (`exp.c1`, `exp.c2` + `index.html`) — teraz „Firma 1/2".
      Jeśli nie możesz ich podać, zamień na branżę, np. „Retail · 1000+ sklepów".
- [ ] **Stack per projekt** — tagi pod każdym projektem wpisałem na podstawie Twojego ogólnego
      stacku, nie wiedzy o konkretnym projekcie. **Zweryfikuj przed publikacją.**
- [ ] **GitHub** — nie podałeś, więc go nie ma. Dodaj link w hero i w sekcji Kontakt, jeśli chcesz.
- [ ] **`assets/og.png`** (1200×630) — podgląd przy udostępnianiu na LinkedIn/Slack.
      Bez niego link wygląda ubogo. Meta tag już czeka w `index.html`.
- [ ] **Daty w timeline** — założyłem 2015–2022 i 2022–obecnie na podstawie „7 lat / 4 lata".
      Popraw, jeśli granica jest gdzie indziej.

## Podgląd lokalny

```bash
npx serve .            # albo: python -m http.server 8000
```

Formularz lokalnie zwróci 404 na `/api/contact` i przejdzie na fallback `mailto:` — to
zachowanie poprawne. Żeby przetestować Function lokalnie: `npx wrangler pages dev .`
