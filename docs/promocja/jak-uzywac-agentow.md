# Jak używać agentów promocji

Agenci to subagenci Claude Code zdefiniowani w `.claude/agents/`. Działają w sesji Claude Code
otwartej w tym repo. **Piszą tylko szkice. Publikujesz Ty.**

| Agent | Do czego |
|---|---|
| `koordynator` | Plan tygodnia, zlecenia dla pozostałych agentów, tablica i KPI |
| `reddit-android` | Posty i odpowiedzi na subredditach i Discordach |
| `social-media` | Bluesky, Mastodon, LinkedIn, X, Threads, scenariusze Shorts/TikTok |
| `devlog` | Blog, devlog itch.io, newsletter, treść landingu i press kitu; wdrożenie wpisu do `public/blog/` |
| `prasa` | Lista mediów i maile do redakcji |
| `aso-google-play` | Karta sklepu, eksperymenty, LiveOps, In-App Review |
| `community` | Odpowiedzi na komentarze i recenzje, lista poprawek |
| `polski-rynek` | Wykop, grupy FB, Discordy PL, polskie media |

## Raz na start (T0, ok. 20 min)
1. Uzupełnij [`karta-gry.md`](karta-gry.md). Bez nazwy i pitchu szkice będą pełne placeholderów.
2. Załóż konta z listy w [`plan-dzialania.md` §8](plan-dzialania.md#8-rzeczy-które-piotr-musi-zrobić-sam-z-terminami).
3. Buffer Free: podłącz Bluesky, Mastodon (mastodon.gamedev.place) i LinkedIn.

## Co tydzień (poniedziałek, ~1–1,5 h w sumie)

**1. Pomiar (10 min).** Wpisz liczby do [`kpi.md`](kpi.md).

**2. Plan i szkice (Ty: 2 min, agenci pracują).** W sesji Claude Code napisz:
```
Użyj agenta koordynator, żeby przygotował plan bieżącego tygodnia.
Potem uruchom agentów ze zleceń z planu (każdego z jego zadaniem) i na końcu
pokaż mi listę szkiców w docs/promocja/kolejka/ czekających na zatwierdzenie.
```
Subagent nie może sam uruchomić innego subagenta, więc koordynator zwraca listę zleceń, a główna
sesja odpala według niej pozostałych agentów.

**3. Zatwierdzanie (30 min).** Otwórz szkice z kolejki. Dla każdego:
- popraw tekst albo napisz w sesji, co zmienić („w szkicu X skróć tytuł, dodaj lekcję o…”),
- uzupełnij sekcję „Do uzupełnienia przez Piotra”,
- zatwierdź: zmień w pliku `status: szkic` na `status: zatwierdzony` albo napisz
  „zatwierdzam szkice 2026-11-28_bluesky…, …”. Główna sesja zmieni statusy i zaktualizuje `TABLICA.md`.

**4. Publikacja (20–30 min).**
- **Bluesky, Mastodon, LinkedIn** (`auto-po-zatwierdzeniu`): wklej zatwierdzone posty do kolejki Buffera
  z datą z pliku. Dalej publikuje Buffer. Na tych platformach publikacja z własnego konta przez API
  jest wprost dozwolona.
- **Reddit, HN, Wykop, Discord, grupy FB, X, TikTok/Shorts** (`ręcznie`):
  1. otwórz `/about/rules` (Reddit) albo regulamin kanału, porównaj z checklistą w szkicu,
  2. **przepisz post własnymi słowami** (Reddit i HN: obowiązkowo),
  3. opublikuj i zostań na 2–3 h w wątku (w dni premier),
  4. wklej link do sekcji „Wynik” w pliku i ustaw `status: opublikowany`.
- **Prasa**: wyślij mail ze swojej skrzynki (kontakt@piotrsowiak.pl), każdy osobno. Dopisz do `prasa-log.md`.
- **Blog**: napisz „wdroż zatwierdzony wpis X”. Agent `devlog` wygeneruje HTML w `public/blog/`,
  Claude pokaże diff, a **push na `main` (= deploy) robisz dopiero po akceptacji**.

**5. Komentarze i recenzje (20–30 min).** Wklej komentarze albo recenzje do sesji:
```
Użyj agenta community. Oto nowe recenzje z Google Play i komentarze z r/playmygame: <wklej>.
Przygotuj odpowiedzi.
```
Przejrzyj, popraw i opublikuj sam. W Google Play odpowiadaj w ciągu 48 h.

## Pojedyncze zadania (na żądanie)
```
Użyj agenta aso-google-play: 3 warianty krótkiego opisu po polsku, licznik znaków.
Użyj agenta prasa: szkic maila do Droid Gamers na 8.12 z kodem promocyjnym.
Użyj agenta reddit-android: post na r/roguelites o dylemacie {OPCJA_A}/{OPCJA_B}.
Użyj agenta devlog: wpis „Tydzień po premierze webowej” na podstawie kpi.md.
```

## Zasady bezpieczeństwa
- Agenci nie mają dostępu do kont, haseł ani tokenów API. Nie dawaj im ich.
- Agenci nie wykonują `git push`. Deploy strony zawsze idzie przez Twoją akceptację diffu (`CLAUDE.md`).
- Gdy szkic wygląda na łamanie zasad kanału (zbyt częsty post, link tam, gdzie nie wolno), **nie publikuj**:
  napisz „sprawdź zgodność z regulaminem” i agent przeanalizuje go jeszcze raz.
- Repo jest **publiczne**: plany i szkice w `docs/promocja/` widzi każdy. Nie trzymaj tu danych
  wrażliwych (kodów promocyjnych, prywatnych maili od dziennikarzy, haseł). Trzymaj je poza repo.

## Skąd agenci biorą wiedzę
- Fakty o grze: [`karta-gry.md`](karta-gry.md)
- Zasady kanałów i źródła: [`research.md`](research.md)
- Kalendarz, granice autopromocji, budżet i KPI: [`plan-dzialania.md`](plan-dzialania.md)
- Wspólne reguły i format szkicu: [`zasady-wspolne.md`](zasady-wspolne.md)
- Gotowe teksty na 28.11: [`szablony/`](szablony/)
