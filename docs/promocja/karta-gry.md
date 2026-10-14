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
| `DLUGOSC_SESJI` | TODO, np. 1–3 min |
| `STEROWANIE` | TODO: web (klawiatura i mysz, dotyk), Android (dotyk) |
| `JEZYKI` | TODO, np. EN, PL |

## Model i daty

| Pole | Wartość |
|---|---|
| `MODEL` | darmowa, jednorazowe odblokowanie pełnej wersji, **bez reklam** |
| `CENA` | 3,99 USD (ceny lokalne wg Google Play) |
| `CO_ODBLOKOWUJE` | TODO: co jest w darmowej części, a co w pełnej wersji |
| `DATA_WEB` | sobota 28.11.2026 |
| `DATA_PREREJESTRACJA` | poniedziałek 16.11.2026 |
| `DATA_PLAY` | sobota 12.12.2026 |
| `NAGRODA_PREREJESTRACJA` | TODO: brak albo kosmetyczna (nie da się jej później edytować) |

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
| `BUTTONDOWN_USER` | TODO: nazwa konta Buttondown (formularz zapisu na landingu) |

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
| `GENAI_W_GRZE` | TODO: **tak/nie, do czego** (wymagane przez itch.io, r/IndieGaming, r/indiegames, r/playmygame) |
| `ZESPOL` | 1 osoba: Piotr Sowiak (Łódź), programista .NET/JS |
