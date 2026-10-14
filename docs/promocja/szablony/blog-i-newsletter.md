# Blog piotrsowiak.pl i newsletter: szablony na premierę webową (sob. 28.11)

Blog to statyczny HTML w `public/blog/` (agent `devlog`, tryb wdrożenia). Push na `main` = deploy,
więc **najpierw diff do akceptacji**. Najlepiej wypchnąć go w piątek 27.11 wieczorem, a w sobotę
rano tylko podlinkować.

---

## Wpis PL

**Meta**
- `title`: `{NAZWA_GRY} – moja pierwsza gra, do zagrania w przeglądarce` (≤60 znaków, skróć, jeśli trzeba)
- `description`: `Zręcznościowy roguelite, w którym podłoga zapada się za tobą. Darmowa wersja webowa już jest, Android 12 grudnia.`
- `og:image`: `/blog/img/{SLUG}-premiera-og.png` (1200×630)
- slug: `2026-11-28-{SLUG}-premiera`

**Treść**
```
# {NAZWA_GRY} już działa w przeglądarce

[GIF z rozgrywki — alt: "..."]

Sześć tygodni temu, 19 października, usiadłem wieczorem do pierwszej linijki kodu gry.
Dziś {NAZWA_GRY} jest do zagrania za darmo, w przeglądarce, bez zakładania konta:
**[Zagraj na itch.io]({LINK_ITCH})**

## O co chodzi
{OPIS_PL}

## Co dalej
- **12 grudnia** gra trafi do Google Play: za darmo, z jednorazowym odblokowaniem
  pełnej wersji i bez reklam. Pre-rejestracja już działa: [Google Play]({LINK_PLAY}).
- Przez najbliższy tydzień zbieram uwagi i poprawiam to, co zgłosicie.

## Jedna rzecz, której się nauczyłem
{LEKCJA_1_PL, 2–3 zdania}

Jeśli chcesz wiedzieć, kiedy wyjdzie wersja na Androida i kolejne gry,
[zapisz się na listę]({LINK_ZAPIS}). Piszę rzadko.
```

## Wpis EN (`public/blog/en/…`)
Tłumaczenie wpisu PL z tymi samymi sekcjami. Tytuł: `{NAZWA_GRY} is playable in your browser`.

---

## Newsletter · 28.11, 09:30

**Temat A:** `{NAZWA_GRY} już działa – zagraj w przeglądarce`
**Temat B:** `Moja pierwsza gra jest gotowa (prawie)`
```
Cześć!

Dziękuję, że zapisałeś/zapisałaś się na listę. Mam dziś pierwszą konkretną wiadomość:

{NAZWA_GRY} jest do zagrania za darmo w przeglądarce:
→ {LINK_ITCH}?utm_source=newsletter&utm_medium=email&utm_campaign=web-launch

{PITCH_PL}

12 grudnia gra wychodzi na Androida. Jeśli chcesz, żeby zainstalowała się sama w dniu
premiery, zarejestruj się w Google Play: {LINK_PLAY}

Odpisz na tego maila, jeśli coś nie działa albo masz pomysł. Czytam wszystko.

Piotr
piotrsowiak.pl

---
Nie chcesz więcej maili? {LINK_WYPISANIA}
```
Wersja EN dla subskrybentów spoza Polski: ta sama struktura, opcjonalnie jako osobny segment.
