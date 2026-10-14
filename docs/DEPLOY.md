# Dokumentacja techniczna

## Struktura

```
public/                    jedyny publikowany katalog
  index.html               ZAŚLEPKA „strona w budowie” (styl terminala)
  placeholder.css          style zaślepki
  _headers                 nagłówki bezpieczeństwa i cache
  favicon.svg, robots.txt, sitemap.xml
  nazwa-gry/               strona pierwszej gry (slug roboczy, patrz „Strona gry”)
    index.html, pl/        landing EN (domyślny) i PL
    press/                 press kit w układzie presskit() + ZIP z materiałami
    media/, game.css       og.png, logo, placeholder hero, wspólne style
site/                      pełna wizytówka — odłożona, NIE publikowana
  index.html               cała treść (PL w HTML, EN podmieniane przez JS)
  assets/style.css         style + motyw jasny/ciemny (zmienne CSS)
  assets/i18n.js           słownik tłumaczeń PL/EN
  assets/app.js            motyw, język, menu, kopiowanie adresu
wrangler.toml              konfiguracja Workera (statyczne pliki = public/)
tools/check-i18n.js        walidacja spójności tłumaczeń (sprawdza site/)
tools/check-placeholders.js  placeholdery z karty gry i poprawność JSON-LD w public/
tools/og-image.ps1         generator og:image 1200×630 strony gry
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

Strona to **Cloudflare Worker ze statycznymi plikami** (`piotrsowiak-pl`), nie projekt Pages.
Repo jest podpięte przez Workers Builds — każdy `git push` na `main` uruchamia `wrangler deploy`
(deploy pojawia się ok. 30 s po pushu).

`wrangler.toml` ustawia nazwę Workera i `[assets] directory = "./public"`. Bez tego pliku
Wrangler publikował cały root repo, łącznie z `README.md` i `docs/`. Nazwa w `wrangler.toml`
musi się zgadzać z nazwą Workera w dashboardzie, inaczej build się wywali.

Status i deploy ręczny (z pominięciem Gita):

```bash
npx wrangler deployments list     # historia deployów
npx wrangler deploy --dry-run     # sprawdza, co pójdzie na stronę
npx wrangler deploy               # deploy ręczny
```

W PowerShellu z zablokowanymi skryptami używaj `npx.cmd` zamiast `npx`.

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

## Strona gry

Landing pierwszej gry leży w `public/nazwa-gry/`: EN pod `/nazwa-gry/`, PL pod `/nazwa-gry/pl/`,
press kit pod `/nazwa-gry/press/`. Strony są bez JS i bez `noindex`, z wpisami w `sitemap.xml`.
Fakty pochodzą z `docs/promocja/karta-gry.md`, a brakujące pola stoją w HTML jako `{NAZWA_POLA}`.

**Przed mergem na `main`** (merge = publikacja) musi przejść:

```bash
node tools/check-placeholders.js
```

Gdy znane będą nazwa i slug:

1. `git mv public/nazwa-gry public/<slug>`, potem zamiana `nazwa-gry` na `<slug>` w plikach
   `public/<slug>/` i w `public/sitemap.xml` (ścieżki, canonical, hreflang, og:url, JSON-LD, nazwa ZIP-a).
2. Placeholdery z karty gry. Hero: zamiast `media/hero-placeholder.svg` GIF albo wideo (`GIF_1`).
   Logo: `media/logo.svg`. Zrzuty i ikona: pliki w `media/` i wpisy w galerii press kitu.
3. Nowy og:image: `powershell -ExecutionPolicy Bypass -File tools/og-image.ps1 -Name "Nazwa" -Slug <slug>`.
   Skrypt musi zostać w UTF-8 z BOM, inaczej PowerShell 5.1 przeczyta go jako ANSI.
4. Nowy ZIP press kitu (wszystko, co ma trafić do prasy):
   `Compress-Archive -Path public/<slug>/media/* -DestinationPath public/<slug>/press/<slug>-presskit.zip -Force`
5. Po zmianie `game.css` podbij `?v=N` we wszystkich trzech HTML-ach gry.

**Lista mailingowa: Buttondown.** Formularz to zwykły `POST` na
`https://buttondown.com/api/emails/embed-subscribe/<konto>` (pole `email`, ukryte `embed=1`
i `tag=en|pl`). Po wysłaniu przeglądarka przechodzi na stronę Buttondown (potwierdzenie, czasem CAPTCHA).
Dlatego CSP w `_headers` ma `form-action https://buttondown.com` w regule globalnej: dwie reguły
dla różnych ścieżek dałyby dwie polityki CSP, a przeglądarka stosuje obie (wygrywa ostrzejsza).
W Buttondown zostaw włączone **double opt-in**, bo strona obiecuje mail z potwierdzeniem.
Gdyby wybór padł na MailerLite: jego standardowy embed opiera się na JS (endpoint odpowiada JSON-em),
więc oprócz `form-action` trzeba by sprawdzić i pewnie otworzyć `script-src` i `connect-src`.

## Dlaczego nie ma formularza kontaktowego

Rozważane i odrzucone:

- **Kod Workera + Resend / ZeptoMail** — Workers runtime nie potrafi SMTP
  (brak Node'owego `net`/`tls`, port 25 zablokowany), więc każdy formularz wymaga
  zewnętrznego API po HTTP: dodatkowe konto, klucz w sekretach, rekordy DKIM/SPF w DNS
  obok istniejącej konfiguracji Zoho. Nieproporcjonalne do kilku wiadomości miesięcznie.
- **Web3Forms / Formspree** — zero konfiguracji, ale treść wiadomości przechodzi przez
  serwer zewnętrznego dostawcy.

Gdyby kiedyś wróciła potrzeba formularza: to Worker, nie Pages, więc katalog `functions/`
nic nie da (stąd wcześniej 404 na `/api/*` i komunikat „Worker that only has static assets").
Trzeba dodać w `wrangler.toml` `main = "src/worker.js"` z obsługą `/api/*`, a resztę
przekazywać do `env.ASSETS` (binding `[assets] binding = "ASSETS"`).

## Do uzupełnienia

- [ ] `assets/og.png` (1200×630) — podgląd przy udostępnianiu na LinkedIn/Slack.
      Meta tag już czeka w `index.html`.
- [ ] Stack per projekt — tagi pod projektami warto zweryfikować przed publikacją.
