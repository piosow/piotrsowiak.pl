# Karta gry: jedyne źródło faktów dla agentów

Agenci **nie wymyślają faktów o grze**. Biorą je tylko z tego pliku. Brakujące pole zostaje w szkicu
jako placeholder `{NAZWA_POLA}`, a agent dopisuje je do listy „Do uzupełnienia przez Piotra”.
Uzupełnij pola oznaczone `TODO` do **25.10.2026**.

## Podstawy

| Pole | Wartość |
|---|---|
| `NAZWA_GRY` | TODO (może być robocza) |
| `SLUG` | TODO, np. `nazwa-gry` (URL: `https://piotrsowiak.pl/<slug>/`) |
| `GATUNEK_EN` | arcade roguelite (falling-floor) |
| `GATUNEK_PL` | zręcznościowy roguelite (zapadająca się podłoga) |
| `PITCH_EN` (1 zdanie) | TODO, np. „Every step you take, the floor behind you falls away.” |
| `PITCH_PL` (1 zdanie) | TODO |
| `OPIS_EN` (3–4 zdania) | TODO |
| `OPIS_PL` (3–4 zdania) | TODO |
| `MECHANIKA_1..3` | TODO: trzy rzeczy, które wyróżniają grę (np. proceduralne plansze, power-upy, tryb dzienny) |
| `DLUGOSC_SESJI` | 30 s – 1 min (EN: „30 seconds to a minute”) |
| `STEROWANIE` | ruch o jedno pole w 4 kierunkach: przesunięcie palcem (dotyk, Android i przeglądarka mobilna), strzałki albo WASD (klawiatura). Mysz: brak |
| `JEZYKI` | EN, PL |

## Model i daty

| Pole | Wartość |
|---|---|
| `MODEL` | darmowa, jednorazowe odblokowanie pełnej wersji, **bez reklam** |
| `CENA` | 3,99 USD (ceny lokalne wg Google Play) |
| `CO_ODBLOKOWUJE` | darmowe: pierwsze światy/poziomy; pełna wersja: pozostałe. TODO: ile światów za darmo, ile w pełnej |
| `DATA_WEB` | sobota 28.11.2026 |
| `DATA_PREREJESTRACJA` | poniedziałek 16.11.2026 |
| `DATA_PLAY` | sobota 12.12.2026 |
| `NAGRODA_PREREJESTRACJA` | brak |

## Linki (uzupełniane w miarę powstawania)

| Pole | Wartość |
|---|---|
| `LINK_LANDING` | `https://piotrsowiak.pl/<slug>/` (od 8.11) |
| `LINK_PRESSKIT` | `https://piotrsowiak.pl/<slug>/press/` (od 22.11) |
| `LINK_ITCH` | TODO, `https://<konto>.itch.io/<slug>` (publiczny od 28.11) |
| `LINK_PLAY` | TODO, `https://play.google.com/store/apps/details?id=<package>` |
| `LINK_TRAILER` | TODO (YouTube, monetyzacja wyłączona) |
| `LINK_ZAPIS` | `https://piotrsowiak.pl/<slug>/#zapis` |
| `KONTAKT` | kontakt@piotrsowiak.pl |
| `BUTTONDOWN_USER` | TODO do 2.11: nazwa konta Buttondown (formularz zapisu na landingu). W ustawieniach wyłączyć śledzenie otwarć i kliknięć (polityka to obiecuje) |

## Materiały

| Pole | Wartość |
|---|---|
| `GIF_1` (mechanika w 5 s) | TODO: ścieżka albo URL |
| `GIF_2`, `GIF_3` | TODO |
| `ZRZUTY` | TODO (min. 3 × 1920×1080 albo 1080×1920) |
| `IKONA` | TODO (512×512) |
| `FEATURE_GRAPHIC` | TODO (1024×500) |

## Technologia i transparentność

| Pole | Wartość |
|---|---|
| `STACK` | TypeScript, HTML5 Canvas, Capacitor (jedna baza kodu: web + Android) |
| `CZAS_PRODUKCJI` | budowa od 19.10.2026, po godzinach (10–15 h tygodniowo) |
| `GENAI_W_GRZE` | **tak**: kod (asystent AI), grafika, dźwięk/muzyka/teksty. TODO: doprecyzować zakres (które grafiki, czy muzyka, czy efekty, czy teksty) do ujawnienia na itch.io i Reddicie |
| `ZESPOL` | 1 osoba: Piotr Sowiak (Łódź), programista .NET/JS |

## Prywatność (polityki w `public/privacy/` i `public/<slug>/privacy/`)

Pola potrzebne do polityk prywatności. Muszą się zgadzać z formularzem „Bezpieczeństwo danych”
w Play Console. Komentarze `{DO_POTWIERDZENIA_...}` w HTML-u polityk to założenia do sprawdzenia.

| Pole | Wartość |
|---|---|
| `PRIVACY_DATA` | dzień publikacji polityk (wstawić przy zdejmowaniu `noindex`), format: 10 November 2026 / 10 listopada 2026 |
| `ANALITYKA` | brak (bez analityki i raportów błędów; Data safety: brak zbieranych danych). Zapis postępu tylko lokalnie |
| `UPRAWNIENIA_ANDROID` | tylko `INTERNET` (domyślne w Capacitor). Sprawdzić w `AndroidManifest.xml` po pierwszym buildzie |
| `WIEK_MIN` | 13 (grupa docelowa w Play Console: 13+) |
| `OKRES_ZAKUPY` | do przedawnienia zobowiązań podatkowych (zwykle 5 lat od końca roku, w którym upłynął termin płatności podatku) |
| `LINK_ITCH_PRIVACY` | `https://itch.io/docs/legal/privacy-policy` |
| `BUTTONDOWN_TRANSFER` | EN: „the European Commission's Standard Contractual Clauses, included in Buttondown's data processing agreement” · PL: „standardowe klauzule umowne Komisji Europejskiej zawarte w umowie powierzenia Buttondown”. Źródło: https://buttondown.com/legal/data-processing-agreement (stan z marca 2026) |
| `ZOHO_REGION` | EU (zoho.eu) |
| `OKRES_EMAIL` | 2 lata od ostatniej wiadomości w korespondencji |
