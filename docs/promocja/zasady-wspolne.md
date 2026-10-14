# Zasady wspólne dla wszystkich agentów promocji

Każdy agent czyta ten plik **przed rozpoczęciem pracy**, a potem:
[`karta-gry.md`](karta-gry.md) (fakty), [`plan-dzialania.md`](plan-dzialania.md) (kalendarz i granice
autopromocji), [`research.md`](research.md) (zasady kanałów i źródła) oraz
[`kolejka/TABLICA.md`](kolejka/TABLICA.md) (co już jest w kolejce).

## 1. Agent nie publikuje
- Agent **tworzy szkice i kolejki**. Niczego nie publikuje, nie wysyła maili, nie loguje się na żadne konto
  i nie wywołuje API platform.
- Publikację zatwierdza i wykonuje Piotr. Wyjątek: posty z trybem `auto-po-zatwierdzeniu` (Bluesky, Mastodon,
  LinkedIn, Threads). Te platformy wprost dopuszczają publikowanie z własnego konta przez API. Po zatwierdzeniu
  trafiają do kolejki Buffera, a publikuje je Buffer, nie agent.
- Na Reddicie, HN, Wykopie, Discordzie i w grupach FB zawsze obowiązuje tryb `ręcznie`.

## 2. Zero manipulacji
Zakazane: fałszywe konta, „znajomi, dajcie upvote”, zwoływanie wykopów, kupowanie głosów, opinii i obserwujących,
nagrody za oceny, ukrywanie, że autor jest twórcą gry, ten sam tekst w wielu subredditach, automatyczne
komentarze, obchodzenie automoderatora i limitów (np. kasowanie i ponowne wrzucanie posta).
Gdy agent nie jest pewny, czy coś jest zgodne z regułami, **nie robi tego** i pisze pytanie do Piotra w sekcji „Ryzyka”.

## 3. Fakty tylko z karty gry
Nie wymyślaj nazw, liczb, funkcji, nagród, cytatów, recenzji ani dat. Brak danych → placeholder
`{NAZWA_POLA}` i wpis w „Do uzupełnienia przez Piotra”. Liczby (ruch, sprzedaż) bierz tylko z `kpi.md`.

## 4. Regulaminy się zmieniają
Przed szkicem na kanał z regułami (Reddit, itch.io, HN, Wykop, Discord, grupy) **sprawdź aktualny regulamin**
(WebFetch). Gdy strona blokuje pobieranie (np. Reddit), **wpisz w szkicu link do `/about/rules`, który
Piotr ma otworzyć przed publikacją**, i datę snapshotu z `research.md`. Rozbieżność z `research.md` →
sekcja „Ryzyka” i propozycja poprawki w `research.md`.

## 5. Głos Piotra
- Pierwsza osoba liczby pojedynczej („zrobiłem”, „I made”). To jedna osoba, nie „we”.
- Konkretnie i skromnie, bez marketingowego nadęcia, bez „game-changer”, „revolutionary” i „epic”, bez emoji-ciągów
  (najwyżej 1 emoji na post w social media, 0 na Reddicie, HN i w prasie).
- Kanały anglojęzyczne po angielsku, polskie po polsku.
- **Reddit i HN**: szkic to punkt wyjścia. r/androiddev (reguła 5) i r/indiegames (reguła 12) usuwają treści
  wyglądające na wygenerowane. Szkic ma być prosty, rzeczowy i krótki. Piotr przepisuje go własnymi słowami
  przed publikacją, a agent zostawia mu w tym celu sekcję „Na co zwrócić uwagę, przepisując”.

## 6. Format pliku szkicu
Plik: `docs/promocja/kolejka/RRRR-MM-DD_<kanal>_<krotki-slug>.md` (kanał bez `r/`, np. `reddit-webgames`, `bluesky`).

```markdown
---
kanal: r/WebGames
data_publikacji: 2026-11-28 15:00 (Europe/Warsaw)
tryb: ręcznie            # albo: auto-po-zatwierdzeniu
status: szkic
agent: reddit-android
regulamin_sprawdzony: 2026-11-20, https://old.reddit.com/r/WebGames/about/rules (ręcznie przez Piotra)
utm: brak               # albo: ?utm_source=bluesky&utm_medium=social&utm_campaign=web-launch
---

## Tytuł
## Treść
## Media (plik + tekst alternatywny)
## Pierwszy komentarz / odpowiedzi przygotowane
## Granica autopromocji na tym kanale
## Checklista przed publikacją
- [ ] ...
## Ryzyka
## Do uzupełnienia przez Piotra
## Wynik (po publikacji: link, statystyki po 48 h)
```

Po utworzeniu pliku dopisz wiersz do `kolejka/TABLICA.md` (status `szkic`).

## 7. Czego agent nie rusza
- Kodu i plików strony w `public/` i `site/`. Wyjątek: agent `devlog` w trybie wdrożenia, opisany w jego definicji.
- `git push`. Deploy na `main` to produkcja i wymaga akceptacji diffu przez Piotra (`CLAUDE.md`).
