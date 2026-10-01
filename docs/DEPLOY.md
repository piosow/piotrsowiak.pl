# Dokumentacja techniczna

## Struktura

```
public/                    jedyny publikowany katalog
  index.html               ZAŚLEPKA „strona w budowie” (styl terminala)
  placeholder.css          style zaślepki
  _headers                 nagłówki bezpieczeństwa i cache
  favicon.svg, robots.txt, sitemap.xml
site/                      pełna wizytówka — odłożona, NIE publikowana
  index.html               cała treść (PL w HTML, EN podmieniane przez JS)
  assets/style.css         style + motyw jasny/ciemny (zmienne CSS)
  assets/i18n.js           słownik tłumaczeń PL/EN
  assets/app.js            motyw, język, menu, kopiowanie adresu
wrangler.toml              konfiguracja Pages (katalog wyjściowy = public/)
tools/check-i18n.js        walidacja spójności tłumaczeń (sprawdza site/)
docs/, README.md, CLAUDE.md
```

Wszystko poza `public/` (pełna strona w `site/`, dokumentacja, narzędzia) nie jest publikowane.

## Zaślepka

Na razie produkcja serwuje zaślepkę z `public/index.html`. Pełna wizytówka czeka w `site/`.
Przywrócenie:

```bash
git rm public/index.html public/placeholder.css
git mv site/index.html public/index.html
git mv site/assets public/assets
```

Potem w `tools/check-i18n.js` zmień `"site"` z powrotem na `"public"`. Podgląd pełnej strony
lokalnie, bez przywracania: `npx serve site` (favicon w tym trybie się nie załaduje).

Strona jest w 100% statyczna — **żadnych Workers, Functions ani zmiennych środowiskowych.**
Kontakt działa przez `mailto:`, więc nie ma backendu, który mógłby paść.

## Deploy

Podpięte pod Cloudflare Pages przez Git — każdy `git push` na `main` to deploy.

Katalog wyjściowy ustawia `wrangler.toml` (`pages_build_output_dir = "./public"`) —
przy buildzie z Gita ma pierwszeństwo przed polem *Build output directory* w dashboardzie.
Build command zostaje pusty, root directory `/`.

Deploy ręczny, z pominięciem Gita (katalog bierze z `wrangler.toml`):

```bash
npx wrangler pages deploy
```

## Podgląd lokalny

```bash
npx serve public       # albo: python -m http.server 8000 -d public
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
- **Adres email** występuje w czterech miejscach i wszystkie trzeba zmienić razem:
  `href` + tekst linku `#email-link`, `href` przycisku `#email-write`, stopka,
  oraz stała `EMAIL` w `assets/app.js` (używana już tylko przez „Kopiuj adres").
- **Po każdej zmianie w `assets/` podbij `?v=N`** przy obu `<script>` i przy `<link>`
  ze stylem w `index.html`. Bez tego wracający użytkownicy dostaną starą wersję z cache.

Po każdej edycji tekstów:

```bash
node tools/check-i18n.js
```

Skrypt łapie najczęstszy błąd w tej architekturze — poprawisz PL w `index.html`, zapomnisz
w `i18n.js`, a JS nadpisze zmianę przy pierwszym renderze.

## Cache — na co uważać

`_headers` celowo nie ustawia długiego `max-age` na `/assets/*`. Pierwotnie było tam
7 dni i skończyło się tak, że po deployu nowej wersji przeglądarki wracających
użytkowników nadal wykonywały stary `app.js` — przycisk kontaktu przestawał działać,
mimo że produkcja serwowała poprawny plik.

Kluczowa pułapka: **zmiana nagłówka nie unieważnia tego, co już leży w cache przeglądarki.**
Plik pobrany z `max-age=604800` zostanie tam przez 7 dni niezależnie od tego, co teraz
wysyła serwer. Dlatego oprócz nagłówków linki do assetów mają `?v=N` — podbicie numeru
to jedyny sposób, żeby wymusić pobranie u kogoś, kto już był na stronie.

Diagnostyka: jeśli coś działa po `Ctrl+Shift+R`, a nie działa po zwykłym odświeżeniu,
to zawsze cache.

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
