# Reddit: szablony na premierę webową

**Zanim cokolwiek wkleisz:**
1. Otwórz `https://old.reddit.com/r/<sub>/about/rules` i porównaj z notką przy szablonie (stan: VII–VIII 2026).
2. **Przepisz tekst własnymi słowami.** Szablon to szkielet, a nie gotowy tekst do wklejenia.
   r/indiegames i r/androiddev usuwają treści wyglądające na wygenerowane.
3. Każdy sub dostaje **inny** tytuł i inne media. Nie crosspostuj.
4. Po publikacji zostań w wątku 2–3 godziny.

---

## r/WebGames · sob. 28.11, 15:00
> Zasady: konto ≥7 dni i ≥10 karmy z komentarzy · **tytuł zaczyna się od nazwy gry** · link bezpośrednio do gry ·
> gra nie może wymagać smartfona (musi działać z klawiaturą i myszą) · bez rejestracji · repost dopiero po 3 mies.

**Typ:** link → `{LINK_ITCH}` · **Flair:** wybierz pasujący (np. Arcade / Action)

**Tytuł A:** `{NAZWA_GRY} – every step you take, the floor behind you collapses`
**Tytuł B:** `{NAZWA_GRY} – a short arcade roguelite where the floor keeps falling away`

**Pierwszy komentarz (od razu po publikacji):**
```
Hi! I'm the solo dev. {PITCH_EN}

Controls: {STEROWANIE}. A run takes about {DLUGOSC_SESJI}, no sign-up, runs in the browser.

I built it in TypeScript + plain Canvas, so it should load fast. If something stutters
or breaks on your browser, I'd really like to know which one.
```

---

## r/playmygame · sob. 28.11, 15:30
> Zasady: gra **darmowa do zagrania teraz** · opis gry · **link do gry jako pierwszy**, sociale dopiero po nim ·
> 1 post na miesiąc · bez gier w pełni generowanych AI · gry płatne tylko we wtorek z `[TRAILER TUESDAY]`
> (wersja webowa jest darmowa, więc ten wymóg nas nie dotyczy).

**Flair:** `[Mobile] (Web)` albo `[Web]` (zależnie od listy flairów)

**Tytuł A:** `{NAZWA_GRY} – a falling-floor roguelite you can play in your browser (free, no sign-up)`
**Tytuł B:** `I made a tiny arcade roguelite where the floor collapses behind you – free web version`

**Treść:**
```
Play here: {LINK_ITCH}

{OPIS_EN}

What's in it:
- {MECHANIKA_1}
- {MECHANIKA_2}
- {MECHANIKA_3}

It's free in the browser. An Android version comes out on Dec 12 (free with a one-time
unlock, no ads).

I'm a solo dev making this after my day job, so feedback is gold. I'm especially curious
whether the first 30 seconds make sense without a tutorial.

(Optional, after the game link: devlog {LINK_LANDING})
```
**GenAI:** jeśli `{GENAI_W_GRZE}` = tak, dodaj zdanie, do czego AI zostało użyte.

---

## r/IndieDev · sob. 28.11, 16:00
> Zasady: luźne („use common sense”) · GIF-y i obrazy mają pierwszeństwo przed linkami · porównania kapsuł tylko w środy.

**Typ:** wideo albo GIF `{GIF_1}` (upload natywny)

**Tytuł A:** `After 6 weeks of evenings, my first game is playable in the browser today`
**Tytuł B:** `The core mechanic of my first game: the floor falls away right behind you`

**Treść:**
```
Day job: .NET developer. Evenings since Oct 19: this.

{PITCH_EN} It's TypeScript + Canvas, wrapped with Capacitor for Android, so the web build
and the Android build are the same code.

Things I learned so far:
- {LEKCJA_1}  (np. "tuning how fast tiles fall mattered more than any visual effect")
- {LEKCJA_2}

The web version went live today (free): {LINK_ITCH}
Happy to answer anything about the Capacitor side.
```
**Na co zwrócić uwagę, przepisując:** lekcje muszą być prawdziwe i Twoje. Bez nich to zwykła reklama.

---

## r/indiegames · nd. 29.11 (≤2 posty w tygodniu)
> Zasady: **obowiązkowe wideo/GIF z rozgrywki** · **ZERO linków** do sklepu, sociali i stron · **bez pytań w tytule** ·
> bez treści deweloperskich (devlog, technikalia) · bez GenAI · automoderator pilnuje mediów.

**Typ:** wideo (natywny upload, 10–20 s)

**Tytuł A:** `{NAZWA_GRY}: run, jump, and don't look back – the floor won't be there`
**Tytuł B:** `In {NAZWA_GRY} every tile you step on is gone a second later`

**Treść (krótko, o grze, bez linków):**
```
{OPIS_EN}
Short runs ({DLUGOSC_SESJI}), {MECHANIKA_1}, and one rule: keep moving.
```
Linku nie dodawaj. Jeśli ktoś zapyta w komentarzu, gdzie zagrać, odpowiedz nazwą gry i „it's on itch.io”.
Zanim dodasz w komentarzu link, sprawdź aktualny regulamin.

---

## r/SoloDevelopment · pon. 30.11 (≤2 posty w tygodniu)
> Zasady: tylko twórcy solo · nie spamować · kontekst albo wnioski.

**Tytuł:** `Solo, evenings only: what I'd do differently in the 6 weeks before my first web launch`
**Treść:**
```
{3–4 krótkie punkty: co poszło dobrze, co źle, ile godzin}
GIF of the core mechanic below. Web version: {LINK_ITCH}
```

---

## r/gamedevscreens · dowolny dzień tygodnia premiery
> Zasady: tylko zrzuty i szkice z własnej gry · link w komentarzu.

**Typ:** obraz/GIF · **Tytuł:** `Debug view of the collapsing floor – red tiles are the ones about to fall`
**Komentarz:** `It's {NAZWA_GRY}, free in the browser: {LINK_ITCH}`

---

## r/roguelites · T7 (wt.–czw. po premierze)
> Zasady: brak spisanych reguł (wolne zasady, zakazany tylko spam i NSFW) · nasza zasada: maks. 1 post w miesiącu.
> **Nie publikuj na r/roguelikes** (tylko tradycyjne roguelike'i, roguelity są usuwane).

**Typ:** wideo
**Tytuł:** `Designing a roguelite where the map destroys itself – does forced movement kill strategy?`
```
In {NAZWA_GRY} the floor collapses behind you, so you can never go back. I'm torn between
{OPCJA_A} and {OPCJA_B} for between-run upgrades. How do you feel about roguelites that
force constant movement?

(Free web build if you want to try the current version: {LINK_ITCH})
```
Pytanie w treści jest tu w porządku: r/roguelites nie zakazuje pytań, a dyskusja to cel posta.

---

## r/IndieGaming · T7 albo T8 (1 zgłoszenie na 2 tyg.)
> Zasady: konto ≥1 tydz. z historią · **1 zgłoszenie na 2 tygodnie** · bez stron sklepów, skracaczy i linków mobilnych ·
> **obowiązkowe ujawnienie GenAI**, jeśli użyte.

**Typ:** link do trailera na YouTube `{LINK_TRAILER}`
**Tytuł:** `{NAZWA_GRY} – trailer for my falling-floor arcade roguelite (web now, Android Dec 12)`

---

## r/AndroidGaming · **sob. 12.12, 15:00** (NIE na 28.11)
> Zasady: konto ≥1 mies., **≥50 karmy społeczności**, stała aktywność poza autopromocją · **1 post na 30 dni**, ≤10% aktywności ·
> **`[DEV]` na początku tytułu** · **link do Google Play** (wymagany) · komentarz z przedstawieniem się · bądź w wątku ≥3 h.
> Jeśli warunki konta nie są spełnione, przesuń post na styczeń.

**Typ:** link do `{LINK_PLAY}` albo wideo z linkiem do Play w treści (zależnie od tego, na co pozwala sub)
**Tytuł A:** `[DEV] {NAZWA_GRY} – arcade roguelite where the floor collapses behind you. Free, no ads, one-time unlock`
**Tytuł B:** `[DEV] I made {NAZWA_GRY}, a no-ads falling-floor roguelite – out today on Google Play`

**Komentarz twórcy (natychmiast):**
```
Hi r/AndroidGaming, I'm Piotr, a solo dev from Poland. {NAZWA_GRY} is my first game.

{OPIS_EN}

Pricing, plainly: free to download, {CO_ODBLOKOWUJE} unlocks with a single $3.99 purchase.
No ads, no energy, no timers.

It's built with TypeScript + Canvas and wrapped with Capacitor. If it runs badly on your
phone, tell me the model and I'll look into it.

I'll be here for the next few hours answering questions.
```
