# Dokumentacja techniczna

## Struktura

```
public/                    jedyny publikowany katalog
  index.html, pl/          strona główna studia: EN (domyślna) i PL
  games/, games/pl/        lista gier na Androida EN i PL (karty generowane, patrz „Lista gier”)
  privacy/, privacy/pl/    polityka prywatności studia (strona, newsletter, email)
  studio.css               style strony studia, listy gier i polityk prywatności
  _headers                 nagłówki bezpieczeństwa i cache
  favicon.svg, robots.txt, sitemap.xml
  nazwa-gry/               strona pierwszej gry (slug roboczy, patrz „Strona gry”)
    index.html, pl/        landing EN (domyślny) i PL
    press/                 press kit w układzie presskit() + ZIP z materiałami
    privacy/, privacy/pl/  polityka prywatności gry (URL do Google Play Console)
    media/, game.css       og.png, logo, placeholder hero, wspólne style
site/                      pełna wizytówka — odłożona, NIE publikowana
  index.html               cała treść (PL w HTML, EN podmieniane przez JS)
  assets/style.css         style + motyw jasny/ciemny (zmienne CSS)
  assets/i18n.js           słownik tłumaczeń PL/EN
  assets/app.js            motyw, język, menu, kopiowanie adresu
wrangler.toml              konfiguracja Workera (statyczne pliki = public/)
data/games.json            źródło listy gier (karty na /games/ + wpisy w sitemap.xml)
tools/build-games.js       generator listy gier z data/games.json (--check = tylko sprawdzenie)
tools/check-i18n.js        walidacja spójności tłumaczeń (sprawdza site/)
tools/check-placeholders.js  placeholdery z karty gry i poprawność JSON-LD w public/
tools/og-image.ps1         generator og:image 1200×630 strony gry
docs/, README.md, CLAUDE.md
```

Wszystko poza `public/` (pełna strona w `site/`, dokumentacja, narzędzia) nie jest publikowane.

## Strona studia

`/` to strona główna studia (EN, PL pod `/pl/`): krótko o studiu, o autorze i kontakt.
Menu prowadzi do listy gier na Androida (`/games/`, PL `/games/pl/`), a dopiero stamtąd
do stron poszczególnych gier (`/<slug>/`). Strona główna celowo nie linkuje do konkretnych gier,
więc dodanie tytułu nie wymaga jej edycji.

Strony studia są bez JS, zawsze w ciemnym motywie. Wersje EN i PL to osobne pliki HTML
(bez słownika i18n), więc tekst zmieniasz w obu plikach. Po zmianie `studio.css` podbij `?v=N`
we wszystkich czterech HTML-ach (`index.html`, `pl/`, `games/`, `games/pl/`).

Dawna wizytówka programisty czeka w `site/` (nieopublikowana, PL z EN przez JS). Jej przywrócenie
pod `/` kolidowałoby ze stroną studia, więc gdyby wracała, to pod osobną ścieżką
(np. `/cv/`, razem z poprawką ścieżek do `assets/` i `canonical`).
Podgląd lokalny: `npx serve site` (favicon w tym trybie się nie załaduje).

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

## Edycja treści wizytówki (`site/`, nieopublikowana)

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
   `public/<slug>/` (ścieżki, canonical, hreflang, og:url, JSON-LD, nazwa ZIP-a) i w `data/games.json`
   (`slug`, `name`, `pitch`), na koniec `node tools/build-games.js` (lista gier i sitemap).
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

## Polityki prywatności

Dwie warstwy, żeby kolejne gry nie powielały tego samego tekstu:

- `/privacy/` (PL `/privacy/pl/`) — studio: strona (Cloudflare), newsletter (Buttondown),
  korespondencja (Zoho), prawa z RODO. Link w stopkach strony studia i w notce pod formularzem zapisu.
- `/<slug>/privacy/` (PL `/<slug>/privacy/pl/`) — gra: dane na urządzeniu, zakupy przez Google Play,
  oceny w aplikacji, uprawnienia, analityka, wersja webowa, dzieci. Ten URL podajesz w Play Console
  (Zasady aplikacji → Polityka prywatności). Prawa i administratora skrótowo, z linkiem do `/privacy/#rights`.

Obie strony używają `studio.css` i są szkieletami: brakujące fakty stoją jako `{NAZWA_POLA}`
(lista w `docs/promocja/karta-gry.md`, sekcja „Prywatność”), a założenia do sprawdzenia
jako komentarze `<!-- {DO_POTWIERDZENIA_...} -->`. `check-placeholders.js` czyta też komentarze,
więc nic nie trafi na `main`, dopóki ich nie usuniesz. Treść polityki gry musi się zgadzać
z formularzem „Bezpieczeństwo danych” w Play Console — zmiana w grze (np. nowa analityka)
to zmiana w obu miejscach. Szkielet nie jest poradą prawną.

## Lista gier

Karty na `/games/` i `/games/pl/` oraz wpisy stron gier w `sitemap.xml` generuje
`tools/build-games.js` z `data/games.json`. Skrypt podmienia tylko treść między
`<!-- games:start -->` i `<!-- games:end -->`, resztę tych plików edytujesz ręcznie.
Wynik jest commitowany — na produkcji nic się nie buduje, strona zostaje statyczna.
Skrypt zachowuje końce linii pliku (CRLF z `autocrlf` na Windowsie nie daje fałszywych różnic).

```bash
node tools/build-games.js           # zapisuje pliki
node tools/build-games.js --check   # exit 1, jeśli pliki są nieaktualne albo JSON ma błędy
```

### Nowy tytuł

1. Strona gry w `public/<slug>/`: skopiuj katalog istniejącej gry i przejdź kroki z sekcji
   „Strona gry” (treść, media, og:image, ZIP press kitu). Wymagany jest `public/<slug>/index.html`
   i okładka (domyślnie `public/<slug>/media/og.png`, 1200×630). `pl/` i `press/` są opcjonalne —
   skrypt sam wykrywa, czy istnieją, i dobiera linki oraz wpisy w sitemap.
   Polityka prywatności: skopiuj `privacy/` z istniejącej gry i dostosuj sekcje do nowej gry
   (sekcja „Polityki prywatności”).
2. Wpis w `data/games.json` — na początku tablicy `games` (kolejność = kolejność na stronie):

   ```json
   {
     "slug": "druga-gra",
     "name": "Druga Gra",
     "status": "upcoming",
     "releaseDate": "2027-05-01",
     "platforms": ["Android"],
     "updated": "2027-03-10",
     "playUrl": "https://play.google.com/store/apps/details?id=pl.piotrsowiak.drugagra",
     "en": { "genre": "Puzzle", "pitch": "One sentence.", "coverAlt": "Opis okładki EN" },
     "pl": { "genre": "Logiczna", "pitch": "Jedno zdanie.", "coverAlt": "Opis okładki PL" }
   }
   ```

   | Pole | Znaczenie |
   |---|---|
   | `status` | `upcoming` (plakietka „Coming 1 May 2027” / „Premiera 01.05.2027”, bez daty: „Coming soon” / „Wkrótce”) albo `released` („Out now” / „Dostępna”) |
   | `releaseDate` | opcjonalne, `RRRR-MM-DD`; premiera w Google Play |
   | `updated` | `lastmod` stron gry w sitemap; podbij przy większej zmianie strony gry |
   | `playUrl` | opcjonalne; dodaje link „Google Play” na karcie |
   | `cover` | opcjonalne; ścieżka okładki, domyślnie `/<slug>/media/og.png` |

3. `node tools/build-games.js`, potem `node tools/build-games.js --check` i
   `node tools/check-placeholders.js` — oba muszą przejść przed mergem na `main`.

Strona główna i menu się nie zmieniają. Po premierze zmień `status` na `released` i dopisz `playUrl`.

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

- [ ] og:image strony studia (1200×630) dla `/` i `/games/` — dziś `twitter:card` = `summary`, bez obrazka.
- [ ] Polityki prywatności: uzupełnić placeholdery (sekcja „Prywatność” w `docs/promocja/karta-gry.md`)
      i sprawdzić założenia z komentarzy `{DO_POTWIERDZENIA_...}`.
- [ ] (wizytówka `site/`) `assets/og.png` (1200×630) — meta tag już czeka w `site/index.html`.
- [ ] Stack per projekt — tagi pod projektami warto zweryfikować przed publikacją.
