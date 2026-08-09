# Dokumentacja techniczna

## Struktura

```
index.html                 cała treść (PL w HTML, EN podmieniane przez JS)
assets/style.css           style + motyw jasny/ciemny (zmienne CSS)
assets/i18n.js             słownik tłumaczeń PL/EN
assets/app.js              motyw, język, menu, kopiowanie adresu
_headers                   nagłówki bezpieczeństwa i cache
tools/check-i18n.js        walidacja spójności tłumaczeń
favicon.svg, robots.txt, sitemap.xml
```

Strona jest w 100% statyczna — **żadnych Workers, Functions ani zmiennych środowiskowych.**
Kontakt działa przez `mailto:`, więc nie ma backendu, który mógłby paść.

## Deploy

Podpięte pod Cloudflare Pages przez Git — każdy `git push` na `main` to deploy.

Ustawienia projektu w Pages (Settings → Builds & deployments):

| Pole | Wartość |
|---|---|
| Build command | *(puste)* |
| Build output directory | `/` |
| Root directory | `/` |

Deploy ręczny, z pominięciem Gita:

```bash
npx wrangler pages deploy . --project-name=piotrsowiak
```

## Podgląd lokalny

```bash
npx serve .            # albo: python -m http.server 8000
```

Otwarcie `index.html` bezpośrednio z dysku (`file://`) też działa, z jednym wyjątkiem:
przycisk „Kopiuj adres" użyje starszego `document.execCommand` zamiast Clipboard API,
bo to ostatnie wymaga secure context (`https://` albo `localhost`).

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
- **Adres email** — składany w JS w `assets/app.js` (stała `EMAIL`), żeby nie leżał gotowy
  w źródle HTML dla scraperów. Zmiana adresu = zmiana w dwóch miejscach: `EMAIL` w `app.js`
  oraz widoczny tekst w `index.html`.

Po każdej edycji tekstów:

```bash
node tools/check-i18n.js
```

Skrypt łapie najczęstszy błąd w tej architekturze — poprawisz PL w `index.html`, zapomnisz
w `i18n.js`, a JS nadpisze zmianę przy pierwszym renderze.

## Dlaczego nie ma formularza kontaktowego

Rozważane i odrzucone:

- **Cloudflare Pages Function + Resend / ZeptoMail** — Workers runtime nie potrafi SMTP
  (brak Node'owego `net`/`tls`, port 25 zablokowany), więc każdy formularz wymaga
  zewnętrznego API po HTTP: dodatkowe konto, klucz w sekretach, rekordy DKIM/SPF w DNS
  obok istniejącej konfiguracji Zoho. Nieproporcjonalne do kilku wiadomości miesięcznie.
- **Web3Forms / Formspree** — zero konfiguracji, ale treść wiadomości przechodzi przez
  serwer zewnętrznego dostawcy.

Gdyby kiedyś wróciła potrzeba formularza: `functions/` **musi** leżeć w roocie projektu,
poza katalogiem wskazanym jako build output directory. Inaczej Pages nie zbuduje Workera
i `/api/*` zwróci 404 (objaw poboczny: dashboard nie pozwala dodać zmiennych środowiskowych,
bo widzi projekt jako „Worker that only has static assets").

## Do uzupełnienia

- [ ] `assets/og.png` (1200×630) — podgląd przy udostępnianiu na LinkedIn/Slack.
      Meta tag już czeka w `index.html`.
- [ ] Stack per projekt — tagi pod projektami warto zweryfikować przed publikacją.
