# Plan działania: promocja studia piotrsowiak.pl i pierwszej gry

Okres: **14.10.2026 – 31.01.2027**. Kluczowe daty: **sob. 28.11.2026**, premiera webowa,
i **sob. 12.12.2026**, premiera w Google Play.
Fakty i źródła są w [`research.md`](research.md). Dane gry (nazwa, linki, mechaniki) trzymamy w
jednym miejscu: [`karta-gry.md`](karta-gry.md). Agenci biorą fakty wyłącznie stamtąd.

---

## 1. Strategia i pozycjonowanie

### Studio
**piotrsowiak.pl to jednoosobowe studio, które robi małe, dopracowane gry bez reklam: płacisz raz
albo grasz za darmo.** Za studiem stoi programista .NET/JS, który robi gry po godzinach. To nie jest
słabość, tylko historia: autentyczna, łatwa do opowiedzenia i dobrze przyjmowana w r/IndieDev,
r/SoloDevelopment, na HN, LinkedInie i Wykopie.

Trzy filary komunikacji (każdy wpis wspiera co najmniej jeden):
1. **Mechanika w 5 sekund**: pętla GIF/wideo, w której podłoga zapada się tuż za graczem. To
   podstawowy materiał na wszystkie kanały wizualne.
2. **Uczciwy model**: darmowa gra, jednorazowe odblokowanie za 3,99 USD, **zero reklam**. Ten argument
   dobrze działa na r/AndroidGaming i w mediach mobilnych, bo gracze mają dość reklam w grach mobilnych.
3. **Solo dev i technologia**: TypeScript, Canvas i Capacitor, jedna baza kodu dla webu i Androida.
   To materiał na HN, LinkedIn, devlog i Mastodon gamedev.place.

### Gra
- **Grupa docelowa 1 (gracze)**: Android, sesje 1–5 min, fani roguelite'ów i gier zręcznościowych
  w stylu „jeszcze jedna próba”, osoby szukające gier bez reklam.
- **Grupa docelowa 2 (twórcy)**: indie devs i programiści. Rzadziej kupują, ale udostępniają dalej,
  wpisują się na listę mailingową i komentują (Reddit, HN, Bluesky).
- **Grupa 3 (PL)**: Wykop, polskie media i grupy gamedev. Działa tu argument „polska gra od jednej osoby”.
- **Nazewnictwo**: na Reddicie i w sklepie gra to **roguelite / arcade roguelite**, a nie „roguelike”.
  r/roguelikes usuwa roguelity, a słowo „roguelike” przyciąga puristów.

### Zasada etyczna
Bez fałszywych kont, kupowania głosów, zwoływania upvote'ów, nagród za oceny i powielania tego
samego posta w wielu subredditach. Każdy post na Reddicie Piotr publikuje ręcznie, własnymi słowami,
i zostaje w wątku, żeby odpowiadać.

---

## 2. Lejek

```
  Kanały (Reddit, itch.io, social, prasa, HN, Wykop)
        │  link z UTM
        ▼
  ① Strona gry  piotrsowiak.pl/<slug>/   ← landing + press kit + devlog
        │  „Zagraj w przeglądarce” (od 28.11)      „Zapisz się” (od 2.11)
        ▼                                            ▼
  ② Wersja webowa (itch.io + landing)  ──►  ③ Lista mailingowa
        │  ekran końca biegu: „Wersja na Androida → pre-rejestracja”
        ▼
  ④ Pre-rejestracja w Google Play (16.11 – 12.12)
        │  push + auto-instalacja 12.12
        ▼
  ⑤ Instalacja  ──►  ⑥ Odblokowanie 3,99 USD  ──►  ⑦ Ocena (In-App Review)
```

| Etap | Co musi istnieć | Do kiedy | Pomiar |
|---|---|---|---|
| ① Strona gry | Landing `public/<slug>/index.html`, OG 1200×630, JSON-LD, bez `noindex` | **8.11** | Cloudflare Web Analytics albo statystyki Workera |
| ① Press kit | `public/<slug>/press/` w układzie presskit() i ZIP z materiałami | **22.11** | liczba pobrań ZIP-a (statystyki Workera) |
| ② Wersja webowa | Strona na itch.io (Draft → Public 28.11), build HTML5 obsługujący **klawiaturę i mysz** (wymóg r/WebGames) | **27.11** | itch.io Analytics: views, plays |
| ③ Lista mailingowa | Formularz `POST` (Buttondown albo MailerLite), zmiana CSP `form-action`, double opt-in | **2.11** | liczba subskrybentów |
| ④ Pre-rejestracja | Karta sklepu, ocena treści, Data safety, AAB na torze pre-rejestracji | **start 16.11** | Play Console → Pre-registration → Statistics |
| ⑤ Instalacja | Produkcja 12.12, linki do Play z `&referrer=utm_source%3D<kanał>` | **12.12** | Play Console: instalacje i raport pozyskania (UTM) |
| ⑥ Odblokowanie | Produkt jednorazowy 3,99 USD | **12.12** | Play Console → przychody i zamówienia |
| ⑦ Ocena | In-App Review po wartościowym momencie (np. 3. ukończony bieg), bez pytania „czy ci się podoba?” | **12.12** | średnia ocen i liczba recenzji |

**UTM-y**: `utm_source=<kanał>&utm_medium=<social|reddit|email|press>&utm_campaign=<web-launch|play-launch>`.
Na Reddicie i HN linki **bez** parametrów, bo tam wyglądają podejrzanie. Kanał rozpoznamy po referrerze.

---

## 3. Granice autopromocji na każdym kanale

| Kanał | Wolno | Granica: czego NIE robimy |
|---|---|---|
| r/WebGames | 1 post z grą webową (tytuł zaczyna się od nazwy gry) | Repost przed upływem 3 miesięcy, link do katalogu, gra wymagająca smartfona |
| r/playmygame | 1 post na miesiąc z darmową wersją i linkiem bezpośrednim | Post bez darmowej wersji, sociale przed linkiem do gry, płatna wersja poza wtorkiem |
| r/indiegames | ≤2 posty w tygodniu z wideo lub GIF-em | Linki do sklepu i sociali, pytania w tytule („would you play this?”), treści deweloperskie |
| r/IndieDev | Posty z GIF-ami i historią dewelopera | Porównania kapsuł poza środą, same linki |
| r/SoloDevelopment | ≤2 posty w tygodniu z kontekstem | Spam bez wniosków |
| r/gamedevscreens | Zrzut lub GIF, link w komentarzu | Zrzuty nie z własnej gry |
| r/IndieGaming | 1 zgłoszenie na 2 tygodnie | Strony sklepów, brak ujawnienia GenAI |
| r/roguelites | Wideo i rozmowa o mechanice | Częściej niż raz w miesiącu |
| r/roguelikes | — | **Nie publikujemy** (roguelity są usuwane) |
| r/AndroidGaming | `[DEV]` raz na 30 dni, link do Play, komentarz twórcy, ≥3 h w wątku | Post z konta młodszego niż miesiąc albo z karmą społeczności poniżej 50, autopromocja powyżej 10% aktywności |
| r/Android | Tylko komentarz w sobotnim wątku APPreciation, jeśli konto ma ≥3 miesiące historii na r/Android | Osobny post o grze |
| r/androiddev | Ewentualnie artykuł techniczny bez linku do gry (styczeń) | Jakakolwiek promocja aplikacji, rekrutacja testerów, tekst wyglądający na LLM |
| r/gamedev | Post-mortem z liczbami i wnioskami (styczeń) | Pokazywanie projektu, posty składające się z samego linku (ban) |
| r/MobileGaming | Post po otrzymaniu flairu Game Developer | Post bez flairu |
| itch.io | Strona, devlogi, tablica *Release announcements* | Reklamy w komentarzach innych gier, niepowiązane tagi |
| Show HN | 1 post z grywalną wersją webową, autor w wątku | Proszenie kogokolwiek o upvote'y, link do landingu zamiast gry |
| Product Hunt | (pomijamy) | Proszenie o upvote'y, konto firmowe |
| XDA | (pomijamy, płatne odblokowanie = szara strefa) | Wątek sprzedażowy |
| Discordy | Tylko kanały #showcase / #self-promo | Posty z linkiem na kanałach ogólnych, DM-y do obcych |
| Bluesky / Mastodon | Posty z własnego konta, także planowane przez API | Masowe obserwowanie lub lajkowanie, automatyczne odpowiedzi, posty poza tematem gamedevu na gamedev.place |
| X / Threads / LinkedIn | Posty z własnego konta | Hashtagowy spam, oznaczanie ludzi bez powodu |
| Wykop | Wpis na mikroblogu w formie historii twórcy, znalezisko z bloga **bez charakteru reklamowego** | Kampania reklamowa „na własną rękę”, zwoływanie wykopów, login z adresem strony |
| Grupy FB i Discordy PL | Zgodnie z regulaminem grupy (często osobny wątek lub dzień) | Wrzucanie tego samego posta do wielu grup jednego dnia |
| Prasa | 1 mail z press kitem i 1 przypomnienie po 5–7 dniach | Seryjne maile, załączniki >10 MB, mail do wielu redakcji w polu „Do” |
| Google Play | In-App Review po dobrym momencie, odpowiedzi na recenzje | Nagrody za oceny, prośby o wyższą ocenę w odpowiedziach na recenzje |

---

## 4. Kalendarz tydzień po tygodniu

Legenda: 🤖 = szkic przygotowuje agent, 👤 = robi Piotr, ⏱ = szacowany czas Piotra w tygodniu.
Agenci wyprodukują szkice dla każdego tygodnia w `docs/promocja/kolejka/`. Koordynator pilnuje,
żeby były gotowe **do poniedziałku** danego tygodnia.

### T0 · 14–18.10 · Fundamenty i konta · ⏱ 2 h (jednorazowo)
- 👤 Konto Reddit: jeśli już jest, używaj starego. Jeśli nie, załóż je **dziś**, bo r/AndroidGaming
  wymaga ≥1 miesiąca i 50 punktów karmy. Od teraz 3× w tygodniu po kilka **szczerych komentarzy**
  na r/AndroidGaming, r/IndieDev i r/roguelites (pomoc, opinie o grach, bez linków).
- 👤 Załóż konta: Bluesky, **mastodon.gamedev.place** (rejestracja z akceptacją, w powodzie napisz,
  że robisz grę), itch.io, Buffer (Free: Bluesky, Mastodon, LinkedIn).
- 👤 Uzupełnij [`karta-gry.md`](karta-gry.md): nazwa (choćby robocza), slug, jedno zdanie pitchu.
- 🤖 `koordynator`: pierwsza tablica zadań i kolejka na T1–T2.

### T1 · 19–25.10 · Start budowy · ⏱ 1 h
- 🤖 `devlog`: wpis #1 „Robię grę po godzinach: dlaczego TypeScript + Canvas + Capacitor” (blog i itch.io jako draft).
- 🤖 `social-media`: post startowy (Bluesky, Mastodon, LinkedIn) „zaczynam budowę” z pierwszym prototypem/GIF-em.
- 👤 Pierwszy GIF z prototypu, choćby z kwadratów.
- 👤 Zgłoś się po **flair Game Developer na r/MobileGaming** (przypięty post), do 31.10.

### T2 · 26.10–1.11 · Strona gry, część 1 · ⏱ 1,5 h
- 🤖 `devlog`: szkic landingu gry (HTML w stylu istniejącego `site/`), sekcje: hero GIF, 3 cechy, zapis, FAQ.
- 🤖 `aso-google-play`: pierwsze warianty tytułu, krótkiego opisu i pełnego opisu (EN/PL).
- 👤 Wybierz dostawcę listy (rekomendacja: **Buttondown**, bo przyjmuje zwykły `POST` bez JS) i załóż konto.
- 🤖 `social-media`: #ScreenshotSaturday (sob. 31.10).

### T3 · 2–8.11 · Strona gry online i lista mailingowa · ⏱ 2 h
- 👤 Wdrożenie landingu: `public/<slug>/`, zmiana CSP (`form-action` dla dostawcy listy), OG image,
  wpis w `sitemap.xml`. Diff do akceptacji przed pushem na `main`.
- 🤖 `devlog`: wpis #2 o mechanice zapadającej się podłogi (GIF, decyzje projektowe).
- 🤖 `reddit-android`: pierwszy post **bez linku** na r/IndieDev albo r/SoloDevelopment (proces i GIF).
- 🤖 `social-media`: tygodniowy pakiet (3 posty).
- **Cel tygodnia**: landing online do 8.11, pierwsze 20 osób na liście.

### T4 · 9–15.11 · Karta Google Play i press kit · ⏱ 2 h
- 🤖 `aso-google-play`: finalna karta sklepu EN i PL, plan 6 zrzutów z podpisami, scenariusz wideo 30 s.
- 👤 Play Console: karta sklepu, ocena treści, Data safety, produkt jednorazowy, AAB na tor pre-rejestracji.
- 🤖 `prasa`: press kit (treść) i lista mediów z adresami do weryfikacji.
- 🤖 `reddit-android`: r/gamedevscreens (GIF), komentarze-szkice do wątków, w których Piotr i tak się udziela.

### T5 · 16–22.11 · **Start pre-rejestracji (pon. 16.11)** · ⏱ 2 h
- 👤 **Start pre-rejestracji** w Google Play (maks. 90 dni, starczy z zapasem).
- 👤 Strona na itch.io jako **Draft**: build HTML5, okładka 630×500, 3–5 zrzutów, poprawne platformy i tagi.
- 🤖 `social-media`: ogłoszenie pre-rejestracji (wszystkie kanały, link z UTM).
- 🤖 `devlog`: wpis #3 „Od webu do Androida w Capacitorze: co się zepsuło” (dobry materiał na HN i LinkedIn).
- 🤖 `polski-rynek`: wpis na mikroblogu Wykopu (#tworzeniegier, #gamedev) jako historia twórcy, link do landingu na końcu.
- 👤 Nagranie trailera 30–45 s (rozgrywka od pierwszej sekundy) i 3 pętli GIF.

### T6 · 23–29.11 · **PREMIERA WEBOWA (sob. 28.11)** · ⏱ 1 h w tygodniu + **4 h w sobotę**
- **wt. 24.11** 👤 Maile do prasy z wersją webową i datą 12.12 (Pocket Gamer news@, Droid Gamers editor@)
  ze szkiców `prasa`, każdy osobno.
- **pt. 27.11** 👤 Ostatni test buildu webowego na desktopie (klawiatura i mysz) i na telefonie.
  *Uwaga: 27.11 to Black Friday, więc media mają mało miejsca na indie, a w social media jest dużo szumu.*
- **sob. 28.11, dzień premiery** (szablony w [`szablony/`](szablony/)):
  - 09:00 👤 itch.io Draft → Public, devlog premierowy (🤖 `devlog`), post na *Release announcements*.
  - 09:30 Blog piotrsowiak.pl i newsletter do listy (🤖 `devlog`).
  - 10:00 Bluesky, Mastodon, LinkedIn (Buffer, zatwierdzone wcześniej) i #ScreenshotSaturday na X (👤 ręcznie).
  - 15:00 👤 **r/WebGames** (wtedy jest ranek w USA).
  - 15:30 👤 **r/playmygame** (flair `[Mobile] (Web)`).
  - 16:00 👤 **r/IndieDev** (GIF i historia).
  - 15:00–19:00 👤 Odpowiadanie w wątkach (🤖 `community` przygotowuje szkice odpowiedzi na typowe pytania).
- **nd. 29.11** 👤 r/indiegames (wideo, bez linków), Wykop mikroblog (🤖 `polski-rynek`).

### T7 · 30.11–6.12 · Fala po premierze webowej · ⏱ 2,5 h
- **wt. 1.12, 15:00** 👤 **Show HN** z wersją webową (pierwszy komentarz o stacku TS, Canvas i Capacitor). 2 h w wątku.
- 🤖 `devlog`: „Tydzień po premierze webowej: liczby” (ruch, ile osób zagrało, zapisy).
- 🤖 `community`: zbiór uwag graczy → lista poprawek przed 12.12.
- 🤖 `prasa`: przypomnienie do redakcji (jedno), maile PL (GRYOnline, PPE) z datą 12.12.
- 🤖 `reddit-android`: r/roguelites (wideo i pytanie o mechanikę), r/SoloDevelopment.
- 👤 Kody promocyjne Google Play dla redakcji i APK/AAB do testów, jeśli ktoś prosi.

### T8 · 7–13.12 · **PREMIERA GOOGLE PLAY (sob. 12.12)** · ⏱ 1 h w tygodniu + **4 h w sobotę**
- **wt. 8.12** 👤 Maile prasowe „launch on 12.12” z kodem promocyjnym (Pocket Gamer reviews@, Droid Gamers editor@,
  formularz Android Police, GamingonPhone). Polskie: GRYOnline, PPE.
- **czw. 10.12** 👤 Test produkcyjnego wydania na torze wewnętrznym, sprawdzenie In-App Review i zakupu.
- **sob. 12.12, dzień premiery**:
  - 09:00 👤 Publikacja w produkcji (pre-rejestrowani dostają push i auto-instalację).
  - 10:00 Buffer: Bluesky, Mastodon, LinkedIn i #ScreenshotSaturday na X i Threads (👤).
  - 10:00 Newsletter „Już w Google Play” (🤖 `devlog`).
  - 15:00 👤 **r/AndroidGaming `[DEV]`** z linkiem do Play i natychmiast komentarz z przedstawieniem się.
    **Trzeba być w wątku ≥3 h** (wymóg z wiki). Warunek: konto ≥1 mies. i ≥50 karmy społeczności.
    Jeśli warunek nie jest spełniony, przesuń post na styczeń.
  - 16:00 👤 r/MobileGaming (jeśli jest flair), r/playmygame (aktualizacja: wersja na Androida).
  - 👤 Jeśli konto ma ≥3 mies. historii na r/Android: komentarz w sobotnim wątku APPreciation.
- **nd. 13.12** 👤 Wykop mikroblog, ewentualnie znalezisko z wpisu na blogu (🤖 `polski-rynek`).

### T9 · 14–20.12 · Recenzje i pierwsze dane · ⏱ 2 h
- 🤖 `community`: szkice odpowiedzi na wszystkie recenzje w Play (cel: odpowiedź w ciągu 48 h).
- 🤖 `aso-google-play`: analiza konwersji karty (odwiedziny → instalacje), propozycja pierwszego eksperymentu.
- 👤 **Decyzja o Reddit Ads** (200 zł): uruchom tylko, jeśli organiczny post na r/AndroidGaming miał
  ≥50 upvote'ów albo CTR karty Play jest powyżej mediany kategorii. Wtedy 5 dni × 5 USD na najlepszą kreację.
- 🤖 `social-media`: pakiet tygodniowy, w tym pierwsze cytaty z recenzji (wyłącznie z podaniem źródła).

### T10 · 21–27.12 · Święta (lekki tydzień) · ⏱ 0,5 h
- 🤖 Posty zaplanowane w Bufferze z wyprzedzeniem (np. „wesołych świąt” z zimowym GIF-em), bez Reddita.
- 👤 Tylko odpowiedzi na recenzje (szkice od `community`).

### T11 · 28.12–3.01 · Podsumowanie roku · ⏱ 1 h
- 🤖 `devlog`: „Pierwsza gra studia: od pomysłu do sklepu w 8 tygodni”. Szkic posta na LinkedIn w wersji B2B.
- 🤖 `koordynator`: raport KPI za okres 14.10–31.12 i rekomendacje na styczeń.

### T12 · 4–10.01 · Pierwsza aktualizacja · ⏱ 2 h
- 👤 Aktualizacja gry z poprawkami z feedbacku.
- 🤖 `aso-google-play`: zgłoszenie **Promotional content** (wydarzenie albo „Major update”) **≥14 dni przed startem**,
  czyli start ok. 22.01. Start eksperymentu ikony.
- 🤖 `devlog`: changelog, devlog na itch.io i newsletter.

### T13 · 11–17.01 · Drugi rzut Reddita · ⏱ 2 h
- 👤 r/AndroidGaming `[DEV]`, jeśli 12.12 nie było posta (albo minęło już 30 dni): post o aktualizacji.
- 🤖 `reddit-android`: r/playmygame (miesiąc od poprzedniego posta), r/IndieGaming (trailer).
- 🤖 `polski-rynek`: ewentualnie post w grupie FB gamedev PL (zgodnie z regulaminem grupy).

### T14 · 18–24.01 · Post-mortem · ⏱ 2 h
- 🤖 `devlog`: **post-mortem z liczbami** (ruch, konwersje, sprzedaż, co zadziałało).
- 👤 r/gamedev: post-mortem jako tekst z wnioskami. Reguła 4 dopuszcza linki, gdy dzielimy się analityką.
- 👤 Wykop: znalezisko z post-mortemu (treść informacyjna, nie reklamowa).
- 🤖 `social-media`: wątek z liczbami (Bluesky, Mastodon, LinkedIn).
- Wydarzenie LiveOps rusza ok. 22.01.

### T15 · 25–31.01 · Retrospektywa i plan na luty · ⏱ 1 h
- 🤖 `koordynator`: retrospektywa KPI, które kanały zostają, a które wypadają, plan lutego (np. drugi
  eksperyment karty, kolejna gra albo aktualizacja).

---

## 5. Budżet (do 500 zł)

Kurs przyjęty orientacyjnie na ok. 3,8 zł/USD. Przed wydatkiem sprawdź aktualny.

| Pozycja | Kwota | Kiedy | Uwagi |
|---|---|---|---|
| Hosting, domena, mail | 0 zł | — | Już są (Cloudflare Worker, Zoho) |
| itch.io, Bluesky, Mastodon, Buffer Free, Buttondown/MailerLite Free | 0 zł | od T0 | Limity: Buffer 3 kanały × 10 postów, Buttondown 100 subskrybentów, MailerLite 250 |
| Kody promocyjne Google Play dla prasy | 0 zł | T7–T8 | Darmowe kody na produkt jednorazowy |
| Muzyka i SFX do trailera (licencja) | 0–60 zł | T5 | Najpierw CC0, płatna licencja tylko gdy trzeba |
| Buffer Essentials: 2 dodatkowe kanały (X, Threads) na grudzień | 40 zł | T8 | Opcjonalne, alternatywa to ręczne posty |
| **Reddit Ads: test przy premierze Play** | **200 zł** | T9 | Tylko jeśli spełniony warunek z T9. 5 dni × 5 USD, cel: instalacje, targetowanie po zainteresowaniach i społecznościach mobilnych |
| Rezerwa | 200 zł | T12–T15 | Druga tura Reddit Ads na aktualizację albo przedłużenie Buttondown/MailerLite po przekroczeniu limitu |
| **Razem** | **≤ 500 zł** | | |

Poza budżetem: jeśli lista przekroczy darmowy limit, przejście na płatny plan to koszt stały.
Decyzja w T15.

---

## 6. KPI i pomiar

Cele to **hipotezy startowe** (brak danych historycznych studia). Kalibrujemy je w T7 i T11.

| KPI | Cel | Termin | Źródło pomiaru |
|---|---|---|---|
| Unikalni odwiedzający landing | 2000 | 28.11–6.12 | Cloudflare Web Analytics albo statystyki Workera |
| Uruchomienia wersji webowej | 3000 | do 12.12 | itch.io → Analytics (plays) |
| Subskrybenci listy | 150 / 300 | 12.12 / 31.01 | panel dostawcy listy |
| Pre-rejestracje | 300 | 12.12 | Play Console → Pre-registration → Statistics |
| Konwersja pre-rejestracja → instalacja (14 dni) | ≥35% | 26.12 | Play Console → Pre-registration → Conversions |
| Instalacje | 1500 | 31.01 | Play Console → Statistics |
| Konwersja na odblokowanie | ≥3% instalacji | 31.01 | Play Console → zamówienia / instalacje |
| Średnia ocena / liczba recenzji | ≥4,3 / ≥30 | 31.01 | Play Console → Ratings |
| Czas odpowiedzi na recenzję | ≤48 h | stale | Play Console → Reviews |
| Posty usunięte przez moderację | 0 | stale | ręcznie (status w `kolejka/TABLICA.md`) |
| Publikacje prasowe | ≥3 (w tym 1 PL) | 31.01 | ręcznie |
| Czas Piotra | ≤2 h tygodniowo (poza sobotami premier) | stale | ręcznie w `kpi.md` |

**Rytuał pomiarowy (10 min, poniedziałek)**: Piotr wkleja liczby do [`kpi.md`](kpi.md)
(itch.io, lista, Play Console, Cloudflare), a `koordynator` liczy trendy i wskazuje kanał tygodnia.
Skuteczność każdego posta: upvote'y i komentarze (Reddit), reakcje (social) i kliknięcia z UTM.
Wpis trafia do pliku posta w `kolejka/`.

---

## 7. Czas Piotra

| Czynność | Tygodniowo | Uwagi |
|---|---|---|
| Przegląd planu tygodnia od `koordynatora` | 10 min | poniedziałek |
| Zatwierdzanie szkiców (czytanie, poprawki, status `zatwierdzony`) | 30 min | jedna sesja |
| Wklejenie zatwierdzonych postów do Buffera | 10 min | Bluesky, Mastodon, LinkedIn |
| Ręczna publikacja (Reddit, X, TikTok) | 20 min | posty na Reddicie najpierw przepisać na własny tekst |
| Odpowiedzi na komentarze i recenzje | 20–30 min | szkice przygotowuje `community` |
| Pomiar KPI | 10 min | poniedziałek |
| **Razem** | **~1,5–2 h** | |
| Soboty premier (28.11, 12.12) | +4 h | wymóg obecności w wątku (r/AndroidGaming ≥3 h) |
| Jednorazowe przygotowanie (konta, landing, karta Play, trailer) | ~8–10 h łącznie w T0–T5 | rozłożone na tygodnie, częściowo nakłada się z pracą nad grą |

---

## 8. Rzeczy, które Piotr musi zrobić sam (z terminami)

| # | Zadanie | Termin | Dlaczego nie agent |
|---|---|---|---|
| 1 | Konto Reddit (albo użycie istniejącego) i szczere komentarze 3× w tygodniu na r/AndroidGaming, r/IndieDev i r/roguelites | **start 16.10**, warunek do 12.12: ≥1 mies. i ≥50 karmy w r/AndroidGaming | Wymóg autentycznej aktywności. Automatyzacja łamie Reddit Rules |
| 2 | Konta Bluesky, mastodon.gamedev.place (z akceptacją), itch.io, Buffer | **18.10** | Rejestracja i weryfikacja wymagają człowieka |
| 3 | Zgłoszenie po flair Game Developer na r/MobileGaming | **31.10** | Ręczna procedura moderatorów |
| 4 | Uzupełnienie `karta-gry.md` (nazwa, slug, pitch, mechaniki, informacja o GenAI) | **25.10** | Tylko Piotr zna grę |
| 5 | Konto dostawcy listy mailingowej, formularz, zmiana CSP i wdrożenie landingu | **8.11** | Deploy na produkcję i dane kont |
| 6 | Play Console: karta sklepu, ocena treści, Data safety, produkt 3,99 USD, AAB, **start pre-rejestracji** | **16.11** | Konto organizacji, dane prawne |
| 7 | Trailer 30–45 s i 3 pętle GIF | **22.11** | Nagranie z gry |
| 8 | Strona na itch.io (Draft), build HTML5 z obsługą klawiatury i myszy | **22.11** (Public 28.11) | Upload buildu |
| 9 | Wysyłka maili prasowych (ze szkiców) | **24.11** i **8.12** | Mail z adresu studia, osobno do każdej redakcji |
| 10 | Konto HN (jeśli brak) i obecność w wątku Show HN 1.12 przez 2 h | **1.12** | Autentyczność |
| 11 | Publikacje na Reddicie w dni premier i obecność w wątkach | **28.11**, **12.12** | Zakaz automatyzacji |
| 12 | Kody promocyjne Google Play dla redakcji | **7.12** | Play Console |
| 13 | Decyzja o Reddit Ads i konfiguracja kampanii | **16.12** | Płatność |
| 14 | Zgłoszenie Promotional content w Play Console | **8.01** | Play Console |
