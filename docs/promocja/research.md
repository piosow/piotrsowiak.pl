# Research: kanały promocji gry na Androida i studia piotrsowiak.pl

Stan na **15.10.2026**. Wszystkie linki sprawdzono tego dnia, chyba że podano inaczej.

**Jak czytać źródła.** Reddit blokuje automatyczne pobieranie stron (HTTP 403), więc regulaminy
subredditów pochodzą z kopii w Wayback Machine (snapshoty z lipca–sierpnia 2026, data przy każdym linku).
Zasady na Reddicie zmieniają się często, dlatego agent `reddit-android` przed każdym szkicem
ma kazać Piotrowi otworzyć aktualną stronę `/about/rules`. Rzeczy, których nie dało się potwierdzić
w źródle pierwotnym, są oznaczone **[niezweryfikowane]**.

---

## 1. Najważniejsze wnioski

1. **Reddit to główny darmowy kanał, ale wymaga konta z historią.** r/AndroidGaming wymaga konta
   starszego niż miesiąc, 50 punktów karmy w społeczności, regularnej aktywności poza autopromocją
   i taga `[DEV]`. r/Android wymaga konta starszego niż 3 miesiące. Konto trzeba „rozgrzewać” od razu,
   czyli od 16.10.2026, zwykłą aktywnością w komentarzach.
2. **Wersja webowa otwiera kanały, do których aplikacja z Google Play nie ma wstępu**: r/WebGames,
   r/playmygame (gra musi być darmowa *teraz*), itch.io i Show HN (trzeba dać coś, co można od razu
   uruchomić). Premiera webowa 28.11 to dlatego najlepszy moment na Reddit i HN, a 12.12 to moment na
   r/AndroidGaming, media mobilne i pre-rejestrację.
3. **r/gamedev nie ma już Screenshot Saturday.** Obecna reguła 3 zabrania pokazywania projektów i
   odsyła do r/indiegames, r/playmygame i r/gamedevscreens. Hashtag `#ScreenshotSaturday` działa dalej
   na X, Bluesky i Mastodonie. 28.11 i 12.12 wypadają w **soboty**.
4. **r/roguelikes przyjmuje tylko tradycyjne roguelike'i.** Posty o „rogueli*t*ach” są usuwane, a
   autopromocja jest dozwolona raz na 3 miesiące. Gra zręcznościowa z zapadającą się podłogą trafia do
   **r/roguelites**, nie do r/roguelikes.
5. **Kilka subredditów zakazuje treści pisanych przez AI.** r/androiddev (reguła 5) usuwa treści
   wyglądające na wygenerowane przez LLM. r/indiegames (reguła 12) zakazuje „generative AI posts”.
   r/IndieGaming wymaga ujawnienia użycia GenAI. Dlatego **szkic od agenta to punkt wyjścia, a na
   Reddit trafia tekst przepisany własnymi słowami Piotra** (patrz `jak-uzywac-agentow.md`).
6. **Pełna automatyzacja jest zgodna z regulaminem tylko na części platform.** Bluesky i Mastodon są
   darmowe i pozwalają publikować z własnego konta przez API. Threads, LinkedIn (profil osobisty) i
   Instagram też mają API publikacji. X kosztuje 0,015 USD za post bez linku i **0,20 USD za post z
   linkiem**. Reddit wymaga zatwierdzenia dostępu do API i zakazuje botów promocyjnych. TikTok z
   niezaudytowanej aplikacji publikuje wyłącznie prywatnie.
7. **Google Play**: pre-rejestracja trwa maksymalnie **90 dni** i działa dla maksymalnie 2 aplikacji naraz.
   Promotional content (LiveOps) jest dostępny **dla wszystkich gier**, a zgłoszenie trzeba złożyć
   co najmniej 4 dni przed wydarzeniem (zalecane 14). Tytuł ma limit 30 znaków, krótki opis 80, pełny
   opis 4000. W tytule nie wolno używać emoji, „#1”, „best” ani „free”.
8. **TouchArcade zakończył działalność we wrześniu 2024.** Aktywne serwisy mobilne przyjmujące
   zgłoszenia mailowo to Pocket Gamer (news@ i reviews@) oraz Droid Gamers (editor@). Android Police
   i Android Authority publikują przeglądy „najlepsze nowe gry”, ale nie mają publicznego adresu do
   zgłoszeń.

---

## 2. Tabela kanałów

Priorytet: **A** robimy na pewno, **B** robimy, jeśli starczy czasu, **C** pomijamy albo zostawiamy na później.
Ryzyko bana: **niskie**, **średnie** (łatwo o usunięcie posta), **wysokie** (łatwo o ban konta albo domeny).

### 2.1 Reddit

| Kanał | Zasady autopromocji (źródło pierwotne) | Najlepszy format | Częstotliwość | Prio | Ryzyko |
|---|---|---|---|---|---|
| r/WebGames | Konto ≥7 dni i ≥10 punktów karmy z komentarzy. Tytuł **zaczyna się od nazwy gry**. Link bezpośrednio do gry, bez rejestracji. Gra nie może wymagać smartfona. Ponowny post po 3 miesiącach albo po dużej aktualizacji. | Link do gry (itch.io albo strona) i flair | 1× na 3 mies. | **A** (28.11) | średnie: ban za złamanie reguły, odbanowanie za „narysowanego dinozaura” |
| r/playmygame | Gra **darmowa do zagrania teraz** (wystarczy darmowy build). Krótki opis i bezpośredni link do gry, linki do sociali dopiero po nim. Bez gier w pełni wygenerowanych przez AI. 1 post na miesiąc. Gry płatne tylko we wtorki z `[TRAILER TUESDAY]`. | Tekst, GIF/wideo, link, flair `[Mobile] (Web)` / `(Android)` | 1× w mies. | **A** (28.11, potem 12.12+) | niskie |
| r/indiegames | Obowiązkowy obraz, GIF albo wideo z rozgrywki. **Zero treści deweloperskich**. **Bez linków do sklepu, sociali i stron.** Bez pytań w tytule. Maks. 2 posty w tygodniu. Bez GenAI. | Natywne wideo/GIF i chwytliwy tytuł, link najwyżej w komentarzu, jeśli moderacja pozwala | ≤2× w tyg. | **A** | średnie (automoderator) |
| r/IndieDev | Prawie bez sztywnych reguł („use common sense”). Porównania kapsuł tylko w środy. Preferowane GIF-y i obrazy, bo „linki do Steama/YouTube nie przyciągają uwagi”. | GIF i krótka historia dewelopera | 1× w tyg. | **A** | niskie |
| r/SoloDevelopment | Tylko twórcy solo. Maks. 2 posty w tygodniu, z kontekstem albo wnioskami. | Devlog z wnioskiem i GIF | 1× w tyg. | **B** | niskie |
| r/gamedevscreens | Wyłącznie zrzuty i szkice z produkcji własnej gry. Link do gry w komentarzu. | Zrzut ekranu / GIF | 1× w tyg. | **B** | niskie |
| r/IndieGaming | Konto ≥1 tydzień z historią. **1 zgłoszenie na 2 tygodnie.** Bez stron sklepów, skracaczy linków i linków mobilnych. Obowiązkowe ujawnienie GenAI. | Trailer/GIF z oryginalnego źródła | 1× na 2 tyg. | **B** | średnie |
| r/roguelites | Brak spisanych reguł („free speech”, tylko spam i NSFW zakazane). | Wideo z rozgrywki i pytanie do graczy o mechanikę | 1× w mies. | **B** | niskie |
| r/roguelikes | Autopromocja **raz na 3 miesiące i tylko tradycyjne roguelike'i**, roguelity są usuwane. | — | — | **C** (nie pasuje) | wysokie: post zostanie usunięty |
| r/AndroidGaming | Konto ≥1 mies., **50 punktów karmy w społeczności**, stała aktywność poza autopromocją. **1 post na 30 dni**, autopromocja ≤10% aktywności, prefiks `[DEV]`, wymagany link do Google Play. Wiki (2025) dodaje: komentarz z przedstawieniem się i obecność w wątku przez ≥3 h. | `[DEV] Nazwa – opis` z wideo, linkiem do Play i komentarzem twórcy | 1× w mies. | **A** (12.12) | **wysokie**: ban za brak `[DEV]` albo za mało aktywności |
| r/Android | Własna aplikacja tylko jako self-post ze szczegółowym opisem. Konto **≥3 mies.** z „rozsądną historią” na r/Android. Twórca musi odpowiadać w wątku. Sobotni wątek „APPreciation”. | Komentarz w sobotnim wątku APPreciation | wyjątkowo | **C/B** (zależy od wieku konta) | wysokie |
| r/androiddev | **Zakaz promocji aplikacji i rekrutacji testerów.** Tylko natywny Android, posty o rozwiązaniach cross-platform wyłącznie w części dotyczącej Androida. Treści wyglądające na LLM są usuwane. | Ewentualnie artykuł techniczny (np. WebView/Capacitor a wydajność Canvas na Androidzie) **bez linku do gry** | wyjątkowo | **C** | wysokie |
| r/MobileGaming | Twórca musi **najpierw dostać flair Game Developer** (zgłoszenie w przypiętym poście). Bez próśb o lajki. | Post z flairem dewelopera | 1× w mies. | **B** (zgłoszenie po flair do 31.10.2026) | średnie |
| r/androidapps | Autopromocja zakazana, odsyła do r/droidappshowcase. | — | — | **C** | wysokie |
| r/freegames | Gra musi być „darmowa na zawsze”, bez triali. Model z płatnym odblokowaniem to szara strefa. | — | — | **C** | średnie |
| r/gamedev | **Reguła 3: zakaz pokazywania projektów. Reguła 4: sam link = ban.** Linki dozwolone, gdy służą feedbackowi, post-mortemowi, analityce albo nauce. | Post-mortem z liczbami po premierze (styczeń), bez CTA | 1× (post-mortem) | **B** (styczeń) | wysokie przy złym formacie |
| r/AndroidGames | **[niezweryfikowane]**: brak snapshotu regulaminu w archiwum, subreddit prawdopodobnie mały albo nieaktywny. Przed użyciem sprawdzić ręcznie. | — | — | **C** | ? |

Reguły ogólne Reddita, obowiązujące niezależnie od subredditu:
- *Reddit Rules*, reguła 2: „Participate authentically in communities where you have a personal
  interest, and do not spam or engage in disruptive behaviors (including content manipulation)”.
- Strona *Spam* (aktualizacja 19.05.2026): spam to powtarzalne albo niezamówione działania,
  ręczne i automatyczne. Zakazane są m.in. multikonta do pompowania subskrypcji i boty promujące
  produkty. Gdy aktywność to głównie linki do własnego biznesu, Reddit każe uważać na częstotliwość
  albo kupić reklamę.
- *Responsible Builder Policy*: dostęp do API wymaga **zatwierdzenia**. Aplikacje nie mogą spamować
  automatycznymi postami ani publikować „identical or substantially similar content across subreddits”.
  **Wniosek: na Reddicie nie ma żadnej automatyzacji publikacji, każdy post Piotr wkleja ręcznie i
  każdy jest inny** (inny tytuł, inne media i inny akcent pod daną społeczność).

### 2.2 Pozostałe społeczności i serwisy

| Kanał | Zasady (źródło) | Format | Częstotliwość | Prio | Ryzyko |
|---|---|---|---|---|---|
| **itch.io: strona gry** | Strona trafia do „Most Recent” w chwili publikacji, więc publikować dopiero gotową. Za błędne metadane (np. platformy, na których gra nie działa), niepowiązane tagi i duplikaty strona wypada z indeksu. GenAI trzeba otagować. ZIP z `index.html`, ≤1000 plików, ≤500 MB. Flaga „Mobile friendly” włącza pełny ekran na telefonach. | Gra HTML5 w przeglądarce, okładka 630×500, 3–5 zrzutów, GIF | publikacja 28.11 | **A** | niskie |
| **itch.io: devlog i forum** | Własne projekty ogłasza się na tablicy *Release announcements*. Autoreklama na innych tablicach kończy się przeniesieniem albo zamknięciem wątku. Reklamy w komentarzach innych projektów są zakazane. | Devlog: wpis z GIF-em i wnioskiem | 1× na 1–2 tyg. | **A** | niskie |
| **Show HN** (Hacker News) | Projekt, który **można od razu wypróbować**, zbudowany przez autora, który odpowiada w wątku. Bez landing page'y i stron z zapisem. **Zakaz proszenia znajomych o upvote'y.** Najlepiej bez rejestracji. | `Show HN: <Nazwa> – <co to jest>` i link do grywalnej wersji webowej, pierwszy komentarz z historią techniczną | 1× | **A** (wt. 1.12) | niskie przy uczciwym poście |
| **Product Hunt** | Tylko konto osobiste (konta firmowe zakazane). **Nie wolno prosić wprost o upvote'y.** Start o 0:01 PT. Ponowny launch przy „istotnej iteracji”. | Launch z GIF-em | 1× | **C** (gry słabo tam działają, duży nakład) | niskie |
| **IndieDB** | **[niezweryfikowane]**: strona zwraca 403 dla automatów. Profil gry jest darmowy, newsy przechodzą moderację. Działa głównie jako katalog i trwały backlink. | Profil gry, 2–3 newsy (premiery) | przy premierach | **B** | niskie |
| **XDA Forums** | Forum „Android Apps and Games” przyjmuje aplikacje i gry tworzone przez członków XDA, ale **„no commercial apps or games”**. Zasady deweloperskie: produkty płatne tylko po feedback, betę albo darmową wersję, nie po sprzedaż. Autopromocja (blogi, social media) zakazana. | Wątek feedbackowy z wersją darmową, bez sprzedaży | — | **C** (płatne odblokowanie = szara strefa, regulamin z 2012–2019 r.) | średnie |
| **Discord: r/gamedev, r/playmygame, r/AndroidGaming, r/roguelites** | Linki do serwerów są w sidebarach subredditów. Każdy serwer ma własny kanał w stylu #showcase albo #self-promo i tylko tam wolno się promować. | Krótki post na kanale showcase i udział w rozmowie | 1× w tyg. na serwer, tylko wyznaczone kanały | **B** | średnie (ban za post poza kanałem promo) |

### 2.3 Media

| Medium | Jak zgłosić (źródło) | Co wysłać | Prio |
|---|---|---|---|
| **Pocket Gamer** (UK, mobile) | `news@pocketgamer.co.uk` (gry przed recenzją), `reviews@pocketgamer.co.uk` (recenzje). „We can't review every game we're sent”. | Info, trailer, zrzuty, **plik APK albo kod promocyjny przed premierą**, link do wcześniejszych publikacji | **A** |
| **Droid Gamers** | `editor@droidgamers.com`. Embargo honorowane, recenzja od dnia premiery. Prośba: „Don't ask whether we want [an APK] – just send it”. | APK, trailer, zrzuty, wcześniejsze publikacje | **A** |
| **Android Police** | Cotygodniowy przegląd gier. Formularz „News Tip?” prowadzi tylko do ogólnego kontaktu, bez adresu do zgłoszeń gier. | Krótka wiadomość przez formularz i link do press kitu | **B** |
| **Android Authority** | Comiesięczna lista „best Android apps & games”. Strona kontaktu blokuje automaty (403) **[niezweryfikowane]**. | Jak wyżej | **B** |
| **GamingonPhone** | Aktywny serwis (wpisy z października 2026), adres na stronie kontaktowej jest zaciemniony **[niezweryfikowane]**. | Mail z press kitem | **B** |
| **TouchArcade** | **Zamknięty we wrześniu 2024**, archiwum działa, nowych treści brak. | — | pominąć |
| **GRYOnline.pl** | Strona pomocy ma pozycję „Redakcja – Publikacja: bezpośredni kontakt do redakcji w sprawie publikacji” (adres w linku na stronie). Odpowiedź w ciągu 2 dni roboczych. | Krótka informacja prasowa PL | **B** |
| **PPE.pl** | Strona redakcji bez adresu dla deweloperów **[niezweryfikowane]**. Kontakt przez redaktorów od działu gier albo z formularza. | Informacja prasowa PL | **B** |
| **Wykop** | Zobacz sekcję 2.4. | — | **B** |

### 2.4 Polskie kanały

| Kanał | Zasady (źródło) | Format | Prio | Ryzyko |
|---|---|---|---|---|
| **Wykop: Mikroblog** (#gamedev, #tworzeniegier, #android, #gry, #programowanie) | Standardy moderacji: za spam uznaje się „publikowanie materiałów o charakterze reklamowym w celu osiągnięcia korzyści majątkowych”, ale **„dopuszczamy możliwość publikowania artykułów pochodzących z własnego bloga lub kanału, pod warunkiem, że treści (...) nie mają charakteru reklamowego”**. *Dobre praktyki*: nie prowadzić kampanii na własną rękę, nie zakładać loginu z adresem strony. Zakaz zwoływania się na głosowanie (wyjątek: mirkolisty). | Wpis na mikroblogu w formie historii twórcy z GIF-em, link na końcu | **A** (PL) | średnie |
| **Wykop: Znalezisko** | Jak wyżej. Znalezisko z własnego bloga jest dozwolone, jeśli nie ma charakteru reklamowego. | Link do wpisu na blogu (np. post-mortem z liczbami), nie do sklepu | **B** | średnie |
| **r/Polska** | Snapshot regulaminu z VII 2026 nie został przeanalizowany pod kątem autopromocji **[niezweryfikowane]**. | Raczej komentarze, nie posty | **C** | ? |
| **Grupy FB „gamedev PL”** | **[niezweryfikowane]**: grupy prywatne, regulaminy widoczne tylko po dołączeniu. Typowo osobne wątki albo dni na autopromocję. | Zgodnie z regulaminem grupy | **B** | średnie |
| **Discordy PL** | Dev Strefa (~2,2 tys. osób, kanał do pokazywania projektów), PSD i Game Dev 2055 to głównie Roblox **[liczby z katalogu Discorda, niezweryfikowane]**. | Kanał showcase | **C/B** | niskie |
| **GRYOnline, PPE** | Patrz 2.3. | Informacja prasowa | **B** | niskie |

---

## 3. Media społecznościowe

| Platforma | Co działa dla gier indie | Hashtagi / tagi | Prio |
|---|---|---|---|
| **Bluesky** | Duża i aktywna społeczność gamedev, która przeniosła się z X. Krótkie wideo z rozgrywki i odpowiadanie innym twórcom. Feedy tematyczne wyszukuje się w aplikacji. | `#gamedev #indiedev #screenshotsaturday #indiegame` (2–3 na post) | **A** |
| **Mastodon (mastodon.gamedev.place)** | Instancja tylko dla twórców gier, ok. **4,3 tys. aktywnych użytkowników miesięcznie**. **Rejestracja wymaga zatwierdzenia i podania powodu.** Posty do 500 znaków, 4 media. CoC: zostań przy tematach gamedevu („if all you ever write about is beer... might be considered off-topic”). Kultura: tekst alternatywny (alt) obowiązkowy, hashtagi w CamelCase. | `#GameDev #IndieDev #ScreenshotSaturday #MadeWithCapacitor #TypeScript` | **A** |
| **X** | Hashtag `#ScreenshotSaturday` ciągle żyje, ale zasięgi linków są niskie. Publikacja przez API jest płatna. | `#indiedev #gamedev #screenshotsaturday #androidgames` | **B** |
| **Threads** | Topic tags: **jeden tag na post** (stan z premiery funkcji, mogło się zmienić). Publikacja przez API dozwolona (250 postów na dobę). | 1 tag: „Indie Games” albo „Game Dev” | **B** |
| **LinkedIn** | Wizerunek studia i B2B: nauka z tworzenia gry po godzinach, stack TS, Canvas i Capacitor, liczby. Bez gamingowego języka. | 3–5 tagów: `#gamedev #typescript #android #indiedev #solopreneur` | **A** (wizerunek, sieć kontaktów .NET) |
| **TikTok** | Krótkie klipy z rozgrywki, hook w ciągu 1–2 s. Content Posting API bez audytu publikuje **tylko prywatnie**, więc posty idą ręcznie albo przez Buffera. | `#indiegame #gamedev #mobilegame #roguelite` | **B** |
| **YouTube Shorts** | Te same klipy co na TikToku. API `videos.insert` ma limit 100 wywołań dziennie. Trailer potrzebny też do Google Play (YouTube bez reklam, publiczny albo niepubliczny). | tytuł z nazwą gry i `#shorts` | **A** (trailer) / **B** (Shorts) |
| **Instagram Reels** | Klipy jak wyżej. Publikacja przez API wymaga konta profesjonalnego. | jak TikTok | **C** |

Format, który działa wszędzie: **pętla GIF/wideo 5–15 s pokazująca jedną mechanikę** (np. moment,
gdy podłoga zapada się tuż za graczem). Do tego jedno zdanie kontekstu i, tam gdzie wolno, jeden link.

---

## 4. Automatyzacja i API

| Platforma | Publikacja przez API | Koszt | Limity | Zgodność z regulaminem | Decyzja w planie |
|---|---|---|---|---|---|
| **Bluesky** | Tak (AT Protocol, własne konto) | 0 zł | 5000 pkt/h i 35 000 pkt/dzień, CREATE = 3 pkt | Zakazane jest masowe lub automatyczne obserwowanie, lajkowanie i generowanie interakcji. Posty z własnego konta są OK. | **Auto po zatwierdzeniu** (przez Buffera) |
| **Mastodon** | Tak (REST, natywne `scheduled_at`) | 0 zł | zależne od instancji | Reguły instancji i CoC gamedev.place | **Auto po zatwierdzeniu** |
| **Threads** | Tak (`threads_content_publish`) | 0 zł | 250 postów na 24 h | Wymaga aplikacji Meta | Przez Buffera po zatwierdzeniu |
| **LinkedIn (profil osobisty)** | Tak, samoobsługowy „Share on LinkedIn” (`w_member_social`), wg dostawców; strona firmowa wymaga zatwierdzenia Community Management API **[częściowo niezweryfikowane]** | 0 zł | token ważny 60 dni (wg dostawców) | OK dla własnych postów | Przez Buffera po zatwierdzeniu |
| **X** | Tak, ale płatne | **0,015 USD za post, 0,20 USD za post z linkiem**, bez darmowego planu dla nowych kont (od 6.02.2026) | brak minimum | OK | **Nie przez API.** Ręcznie albo przez Buffera |
| **Reddit** | Wymaga zatwierdzenia (Responsible Builder Policy) | 0 zł | — | **Zakaz** automatycznych i powielanych postów promocyjnych | **Tylko ręcznie** |
| **TikTok** | Content Posting API | 0 zł | bez audytu wszystko prywatne | Audyt dla aplikacji, nie dla jednej osoby | Ręcznie albo przez Buffera |
| **YouTube** | Data API v3 | 0 zł | 100 × `videos.insert` dziennie | OK | Ręcznie (kilka filmów) |
| **Instagram** | Graph API (konto profesjonalne) | 0 zł | 100 postów na 24 h (różne wartości w dokumentacji) | OK | pominięty |

**Planery:**
- **Buffer Free**: **3 kanały, 10 zaplanowanych postów na kanał**. Obsługuje X, Bluesky, Mastodon,
  Threads, LinkedIn, TikTok, YouTube i Instagram. Plan Essentials kosztuje **5 USD miesięcznie za
  kanał**. → **Wybór: Buffer Free na Bluesky, Mastodon i LinkedIn.** X i Threads Piotr publikuje ręcznie
  (2 minuty) albo dokupuje kanał na okres premier (2 × 5 USD).
- **Typefully**: obsługuje X, LinkedIn i Threads. Limitów darmowego planu nie udało się potwierdzić
  **[niezweryfikowane]**, więc w planie go nie ma.

---

## 5. ASO w Google Play

**Konto organizacji jest zwolnione z wymogu testów zamkniętych.** Testy zamknięte (12 testerów przez
14 dni) dotyczą wyłącznie kont osobistych założonych po 13.11.2023. Mimo to warto zrobić krótki test
wewnętrzny.

| Element | Zasady (źródło) | Rekomendacja |
|---|---|---|
| **Tytuł** | Maks. **30 znaków**. Bez emoji, wersalików (poza nazwą marki), „#1”, „best”, „free”, cen i promocji. | `<Nazwa>: <gatunek>`, np. „<Nazwa>: Falling Floor Roguelite”, jeśli się mieści |
| **Krótki opis** | **80 znaków**. Bez upychania słów kluczowych. | Jedno zdanie z mechaniką i słowami kluczowymi „roguelite”, „arcade”, „no ads” |
| **Pełny opis** | **4000 znaków**. Bez nadmiernej długości, powtórzeń, niepowiązanych słów kluczowych i anonimowych opinii użytkowników. | Krótkie akapity: pitch → mechaniki → model „free, one-time unlock, **no ads**” → kontakt |
| **Ikona** | PNG 512×512, maks. 1024 KB, bez odznak, rankingów i cen | Postać albo symbol rozpadającej się płytki, czytelny w 48 px |
| **Feature graphic** | 1024×500, bez kanału alfa | Wymagana do featuringu, kluczowe elementy z dala od krawędzi |
| **Zrzuty ekranu** | 2–8 na typ urządzenia. **Gry: min. 3 zrzuty 16:9 (1920×1080) albo 9:16 (1080×1920)** z rozgrywki, żeby kwalifikować się do dużych formatów promocji. | 4–6 zrzutów w orientacji gry, 1 zdanie podpisu na każdym |
| **Wideo** | URL z YouTube, monetyzacja wyłączona, publiczne albo niepubliczne, bez ograniczenia wiekowego. **Autoodtwarzane jest tylko pierwsze 30 s.** | 30–45 s: rozgrywka od pierwszej sekundy, napisy |
| **Pre-rejestracja** | Maks. **90 dni**. Maks. 2 aplikacje naraz. Push przy premierze. Automatyczna instalacja dla chętnych (≤200 MB także przez sieć komórkową). Opcjonalna nagroda: jednorazowy produkt, którego nie da się później edytować; brak dostarczenia nagrody grozi zawieszeniem. Statystyki „Pre-registered users” i „Conversions” (instalacje w ciągu 14 dni). | Start **16.11.2026**, nagroda tylko kosmetyczna albo pominięta |
| **Promotional content (LiveOps)** | Dostępny dla **wszystkich gier**. Zgłoszenie do 60 dni przed startem, akceptacja trwa do 4 dni. Jedno wydarzenie „very high priority” na kwartał. Bez przycisku i tekstu CTA („Buy now”). | Styczeń: wydarzenie (np. zimowe wyzwanie) albo „major update” |
| **Store listing experiments** | Jeden eksperyment graficzny albo do 5 lokalizowanych naraz. Wyłączają się po 6 miesiącach. | Od stycznia: test ikony, potem pierwszego zrzutu |
| **Oceny i recenzje** | In-App Review API: pytać po wartościowym doświadczeniu. **Bez pytań przed kartą** w stylu „podoba ci się?”, bez przycisku wywołującego kartę. Limit wyświetleń jest nieujawniony. Polityka: **zakaz nagród za oceny**, w odpowiedziach na recenzje nie wolno prosić o wyższą ocenę. | Karta po np. 3. udanym biegu albo po pierwszym rekordzie. Odpowiedzi na recenzje w ciągu 48 h (agent `community`) |
| **Kontakt** | Mail wymagany, strona WWW „strongly recommended” | `kontakt@piotrsowiak.pl` i URL landingu gry |

---

## 6. Strona studia (piotrsowiak.pl)

**Stan repo (15.10.2026)**: statyczny Cloudflare Worker, publikowany jest tylko `public/`.
Na produkcji stoi **zaślepka z `noindex`**, a pełna wizytówka czeka w `site/`. CSP w `public/_headers`
ma `connect-src 'none'`, `form-action 'none'` i `img-src 'self' data:`, `og.png` jeszcze nie istnieje.

Wnioski do planu (bez frameworków i backendu, zgodnie z `CLAUDE.md`):

| Element | Jak zrobić w obecnej technologii |
|---|---|
| **Landing gry** | Statyczna strona `public/<slug>/index.html` z GIF-em/wideo, przyciskiem „Zagraj w przeglądarce” (itch.io albo `public/<slug>/play/`), przyciskiem Google Play (od pre-rejestracji) i formularzem zapisu. **Bez `noindex`** i z wpisem w `sitemap.xml`. |
| **Press kit** | presskit() (dopresskit.com) to skrypt PHP, a Worker serwuje tylko pliki statyczne, więc **press kit trzeba zrobić ręcznie jako statyczny HTML w układzie presskit()**: factsheet, opis, historia, funkcje, wideo, zrzuty, logo, nagrody i cytaty, zespół, kontakt, ZIP z materiałami. |
| **Lista mailingowa** | Formularz HTML z `POST` do dostawcy, bez JS. Wymaga zmiany CSP: `form-action https://<dostawca>`. **Buttondown**: darmowy do **100 subskrybentów**. **MailerLite Free**: **250 subskrybentów i 2500 maili miesięcznie**, 3 formularze. |
| **SEO** | Własne `title`/`description` dla landingu, `VideoGame` + `SoftwareApplication` w JSON-LD, dwa języki (PL/EN) przez osobne strony albo istniejący mechanizm `i18n.js`. |
| **Open Graph** | `og:image` 1200×630 dla landingu i każdego wpisu devlogu. Obecny meta tag w `site/index.html` wskazuje na nieistniejący jeszcze `assets/og.png`. |
| **Devlog/blog** | Statyczne pliki `public/blog/<data>-<slug>.html` z jednego szablonu i ręcznie utrzymywany `public/blog/feed.xml` (RSS). Agent `devlog` generuje oba. RSS pozwala zrobić RSS-to-email i crossposty. |
| **Analityka** | Cloudflare Web Analytics (bez ciasteczek) wymaga dopisania beacona do CSP (`script-src`/`connect-src` dla `static.cloudflareinsights.com` i `cloudflareinsights.com`). Alternatywa bez zmian w kodzie: statystyki Workera w dashboardzie. Linki do Google Play z `&referrer=utm_source%3D...` trafiają do raportów pozyskania w Play Console. |

---

## 7. Źródła (dostęp 15.10.2026)

### Reddit: regulaminy (Wayback Machine, data snapshotu w nawiasie)
- r/androiddev: https://old.reddit.com/r/androiddev/about/rules, kopia: https://web.archive.org/web/20260802214600/https://old.reddit.com/r/androiddev/about/rules (2.08.2026)
- r/AndroidGaming: https://old.reddit.com/r/AndroidGaming/about/rules, kopia: https://web.archive.org/web/20260809105215/https://old.reddit.com/r/AndroidGaming/about/rules (9.08.2026); wiki: https://web.archive.org/web/20250724090807/https://old.reddit.com/r/AndroidGaming/wiki/rules (24.07.2025)
- r/Android: https://web.archive.org/web/20260802214400/https://old.reddit.com/r/Android/about/rules (2.08.2026)
- r/indiegames: https://web.archive.org/web/20260801190603/https://old.reddit.com/r/indiegames/about/rules (1.08.2026)
- r/IndieDev: https://web.archive.org/web/20260728012524/https://old.reddit.com/r/IndieDev/about/rules/ (28.07.2026)
- r/IndieGaming: https://web.archive.org/web/20260724215142/https://old.reddit.com/r/IndieGaming/about/rules (24.07.2026)
- r/roguelikes: https://web.archive.org/web/20260728011940/https://old.reddit.com/r/roguelikes/about/rules/ (28.07.2026)
- r/roguelites: https://web.archive.org/web/20260728012210/https://old.reddit.com/r/roguelites/about/rules/ (28.07.2026)
- r/playmygame: https://web.archive.org/web/20260801190300/https://old.reddit.com/r/playmygame/about/rules (1.08.2026)
- r/gamedev: https://web.archive.org/web/20260801185358/https://old.reddit.com/r/gamedev/about/rules (1.08.2026); strona główna bez wątku Screenshot Saturday: https://web.archive.org/web/20260802153205/https://old.reddit.com/r/gamedev/ (2.08.2026)
- r/gamedevscreens: https://web.archive.org/web/20260728012505/https://old.reddit.com/r/gamedevscreens/about/rules/ (28.07.2026)
- r/WebGames: https://web.archive.org/web/20260801185231/https://old.reddit.com/r/WebGames/about/rules (1.08.2026)
- r/SoloDevelopment: https://web.archive.org/web/20260807114451/https://old.reddit.com/r/SoloDevelopment/about/rules/ (7.08.2026)
- r/MobileGaming: https://web.archive.org/web/20260803194142/https://old.reddit.com/r/mobilegaming/about/rules/ (3.08.2026)
- r/androidapps: https://web.archive.org/web/20260824181512/https://old.reddit.com/r/androidapps/about/rules/ (24.08.2026)
- r/freegames: https://web.archive.org/web/20260724213816/https://old.reddit.com/r/FreeGames/about/rules (24.07.2026)

### Reddit: zasady ogólne
- Reddit Rules: https://redditinc.com/policies/reddit-rules (kopia 13.10.2026)
- Spam: https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam (kopia 30.08.2026)
- Responsible Builder Policy: https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy (kopia 28.08.2026)

### Platformy i API
- Bluesky, limity: https://docs.bsky.app/docs/advanced-guides/rate-limits (przekierowanie na bsky.network/docs/rate-limits)
- Bluesky, wytyczne dla deweloperów: https://bsky.network/docs/developer-guidelines
- Mastodon gamedev.place: https://mastodon.gamedev.place/api/v1/instance/rules, https://mastodon.gamedev.place/api/v2/instance, https://gamedev.place/mastodon-coc.html
- X API, cennik: https://docs.x.com/x-api/getting-started/pricing
- Threads API: https://developers.facebook.com/docs/threads/overview
- Instagram, publikacja treści: https://developers.facebook.com/docs/instagram-platform/content-publishing
- TikTok Content Posting API: https://developers.tiktok.com/doc/content-posting-api-get-started
- YouTube `videos.insert`: https://developers.google.com/youtube/v3/docs/videos/insert
- LinkedIn (strony dostawców; oficjalne uprawnienia do potwierdzenia w Developer Portal): https://learn.microsoft.com/de-de/linkedin/marketing/increasing-access?view=li-lms-2024-06, https://postproxy.dev/blog/linkedin-api-automate-company-page-publishing/
- Buffer, cennik: https://buffer.com/pricing
- Show HN: https://news.ycombinator.com/showhn.html
- Product Hunt: https://www.producthunt.com/launch, https://help.producthunt.com/en/articles/479557-how-to-post-a-product
- itch.io: https://itch.io/docs/creators/quality-guidelines, https://itch.io/docs/creators/html5, https://itch.io/docs/creators/getting-started
- XDA (forum i stare reguły): https://xdaforums.com/f/android-apps-and-games.530/, https://xdaforums.com/t/xda-developers-forum-rules.4200559/, https://forum.xda-developers.com/t/read-first-forum-section-rules-updated-9th-september-2012.1633868/

### Google Play
- Pre-rejestracja: https://support.google.com/googleplay/android-developer/answer/9084187
- Polityka metadanych: https://support.google.com/googleplay/android-developer/answer/9898842
- Zasoby graficzne: https://support.google.com/googleplay/android-developer/answer/9866151
- Konfiguracja karty sklepu (limity znaków): https://support.google.com/googleplay/android-developer/answer/9859152
- Eksperymenty karty: https://support.google.com/googleplay/android-developer/answer/6227309
- Promotional content: https://support.google.com/googleplay/android-developer/answer/12932229, wytyczne: https://services.google.com/fh/files/helpcenter/google_play_promotional_content_guidelines.pdf
- Testy zamknięte dla kont osobistych: https://support.google.com/googleplay/android-developer/answer/14151465
- In-App Review API: https://developer.android.com/guide/playcore/in-app-review
- Polityka ocen i recenzji: https://support.google.com/googleplay/android-developer/answer/9898684

### Media
- Pocket Gamer, kontakt: https://www.pocketgamer.com/pages/contact-us/
- Droid Gamers, kontakt: https://www.droidgamers.com/contact-us/
- Android Police, przegląd gier: https://www.androidpolice.com/best-new-android-games/
- Android Authority, lista miesięczna (przykład): https://www.androidauthority.com/best-android-apps-games-march-2026-3645917
- TouchArcade, zamknięcie: https://toucharcade.com/2024/09/24/toucharcade-is-shutting-down/
- GamingonPhone: https://www.gamingonphone.com/contact-us/
- GRYOnline, pomoc i kontakt: https://www.gry-online.pl/pomoc/
- PPE, redakcja: https://www.ppe.pl/redakcja.html

### Polskie
- Wykop, regulamin (obowiązuje od 11.05.2026): https://wykop.pl/regulamin
- Wykop, standardy moderacji: https://wykop.pl/standardy-moderacji
- Wykop, dobre praktyki: https://wykop.pl/dobre-praktyki
- Discord, katalog (Dev Strefa, PSD): https://discord.com/servers/dev-strefa-1321570259161059329, https://discord.com/servers/psd-polska-spolecznosc-deweloperow-1302995655832109157

### Strona i lista mailingowa
- presskit(): https://dopresskit.com/
- MailerLite, cennik: https://www.mailerlite.com/pricing
- Buttondown, cennik: https://buttondown.com/pricing

### Inne
- Reddit Ads: minimalny budżet dzienny 5 USD według serwisów zewnętrznych **[niezweryfikowane w Ads Manager]**: https://stackmatix.com/blog/reddit-ads-cost-guide-2026
- Google Play Indie Games Festival: ostatnia edycja europejska z Polską wśród krajów w 2021 r., o edycji 2027 brak informacji: https://g.co/play/igf21
