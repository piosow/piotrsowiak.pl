# Research: nowa wizytówka z naciskiem na AI

Stan na: 2026-10-01. Cel: strona, która pozyskuje klientów na dorywcze projekty IT
i **sama jest dowodem umiejętności** (AI + .NET + systemy o wysokiej stawce).

Źródła na końcu. Część z nich to blogi/SEO-content — liczby z nich traktuj jako orientacyjne;
miejsca, których nie zweryfikowałem u źródła pierwotnego, są oznaczone **[niezweryfikowane]**.

---

## 1. TL;DR

1. **Sam chatbot „zapytaj o moje CV” to już commodity** — na GitHubie są dziesiątki takich
   portfolio (RAG + FAISS + LLM). Nie wyróżni, a źle zrobiony (halucynacje o Twoim doświadczeniu)
   szkodzi. Wyróżnia **inżynieria wokół AI**: groundowanie, cytowania, guardrails, limity kosztów,
   publiczne evale. To jest dokładnie to, co kupuje klient z „systemem, w którym błąd kosztuje”.
2. **Najmocniejsza konwersyjnie funkcja AI to nie czat o Tobie, tylko „generator briefu”** —
   klient opisuje problem po swojemu, AI zwraca ustrukturyzowany zakres (cel, dane, integracje,
   ryzyka, pytania otwarte, „czego nie obejmuje”) i wrzuca go do gotowego maila. Klient dostaje
   wartość od razu, Ty dostajesz lepszy lead.
3. **Pozycjonowanie**: „Senior .NET, który wdraża AI tam, gdzie błąd kosztuje” (finanse, płace,
   KSeF, obieg dokumentów). To odróżnia Cię od masy „AI automation” freelancerów na n8n/Make.
   Twoje obecne projekty (OCR kosztów, KSeF, przelewy) są gotowym materiałem.
4. **Decyzja architektoniczna do podjęcia**: każda funkcja z żywym LLM wymaga backendu, a
   `CLAUDE.md` mówi „bez backendu, 100% statycznie”. Rekomendacja: jeden mały endpoint
   `/api/*` w tym samym Workerze (Workers AI), reszta statyczna. Szczegóły w sekcji 5.
5. **AI Act art. 50 obowiązuje od 2.08.2026** (nie został odroczony Omnibusem) — czat na stronie
   musi wyraźnie mówić, że jest AI. Tani wymóg, ale obowiązkowy.

---

## 2. Rynek — po co AI na wizytówce

- Popyt na freelancing IT przesuwa się w stronę **integracji AI i ról „build-and-operate”**:
  wartość leży w zdefiniowaniu problemu, integracji ze środowiskiem klienta, kontroli ryzyka,
  jakości danych — mniej w samym kodzie (Useme, ITCompare).
- Małe firmy używają AI masowo, ale głównie „czatowo” (marketing). Luka: **AI wpięte w ich
  procesy i dane** — tu jest Twoja przewaga (.NET + MSSQL + integracje).
- **KSeF**: od 1.02.2026 wszyscy odbierają faktury z KSeF, od 1.04.2026 obowiązek wystawiania
  dla MŚP, najmniejsi do 1.01.2027. Faktury w XML (FA) = dane ustrukturyzowane → automatyzacja
  (kategoryzacja, dekretacja, wykrywanie anomalii, akceptacje) jest tania i realna. Masz już
  projekt KSeF w portfolio — to gotowa nisza.
- **Produktyzacja usług** działa lepiej niż „napisz, wycenię”: stała cena, jasny zakres i
  **jawna lista „czego nie obejmuje”** skracają decyzję klienta (Indie Hackers, Assembly, Wayfront).

### Propozycje ofert „produktowych” (do strony)

| Oferta | Forma | Dlaczego Ty |
|---|---|---|
| **Audyt AI procesu** | stała cena, 1–2 tyg., raport + rekomendacje + szacunek | bigger picture, analiza procesu |
| **PoC asystenta na danych firmy** (RAG na dokumentach/MSSQL) | stała cena, 2–3 tyg. | .NET, MSSQL, bezpieczeństwo danych |
| **Automatyzacja KSeF + AI** (pobieranie, kategoryzacja, ścieżki akceptacji) | zakres zamknięty | masz to już zrobione na produkcji |
| **AI w istniejącej aplikacji .NET** (`Microsoft.Extensions.AI` / Semantic Kernel) | godzinowo / etapami | stack klienta = Twój stack |
| **Code review / architektura „AI-ready”** | krótkie zlecenie | team lead, DDD/CQRS |

Ceny: nie znalazłem wiarygodnych danych dla rynku PL — nie podaję. Decyzja, czy publikować
widełki, jest Twoja (jawne widełki filtrują leady, ale zawężają).

---

## 3. Pomysły: strona jako demonstracja umiejętności

Oceniam: **W** = wpływ na pozyskanie klienta, **K** = koszt/wysiłek, **R** = ryzyko.

### A. Generator briefu projektu ⭐ (rekomendowane jako główna funkcja)
Klient wpisuje 2–3 zdania („mamy faktury w Excelu, księgowa ręcznie…”). AI zwraca:
cel biznesowy, zakres MVP, integracje, dane wejściowe, ryzyka, pytania do doprecyzowania,
**poza zakresem**, sugerowaną ofertę z sekcji 2. Przycisk „Wyślij do mnie” → `mailto:` z
wypełnionym tematem i treścią (bez backendu do maili, bez przechowywania danych).
- W: **wysoki** — konwertuje i kwalifikuje lead, pokazuje Twój sposób myślenia („zaczynam od procesu”).
- K: średni (prompt + structured output + 1 endpoint).
- R: średni — dane wpisywane przez klienta → informacja RODO, brak logowania treści.

### B. „Zapytaj o mnie” — ale z przezroczystością
Czat groundowany wyłącznie na treści strony (case studies, stack, oferta). Wyróżniki:
- **cytowania** — każda odpowiedź linkuje do sekcji, z której pochodzi;
- odmowa poza tematem („nie wiem / nie dotyczy — napisz do mnie”);
- panel **„pod maską”**: model, użyte fragmenty (retrieval), tokeny, czas, koszt zapytania.
  Klient techniczny widzi inżynierię, nietechniczny — że to nie magia.
- W: średni. K: średni. R: halucynacje o Twoim doświadczeniu → ograniczyć do retrievalu, mała
  temperatura, twarda odmowa przy braku kontekstu.

### C. Publiczna strona „Evale i bezpieczeństwo” ⭐ (tani, bardzo mocny sygnał)
Tabela testów, które przechodzi Twój czat/brief: próby prompt injection, wyciągnięcia system
promptu, pytania off-topic, pytania o rzeczy, których nie robiłeś. Wynik + data ostatniego
przebiegu. Uruchamiane skryptem w `tools/` (jak `check-i18n.js`).
- W: wysoki u klientów „finansowych” — to dokładnie język audytowalności, którego używasz.
- K: niski–średni. R: niski.

### D. Demo w Twojej niszy: „Faktura KSeF → AI wyjaśnia”
Gotowe **przykładowe** XML-e FA (bez uploadu prawdziwych danych): parsowanie w przeglądarce,
AI kategoryzuje koszt, wykrywa anomalie (np. inny rachunek bankowy niż zwykle), proponuje
ścieżkę akceptacji. Pokazuje: domenę + AI + deterministyczną walidację obok LLM.
- W: wysoki dla księgowości/MŚP. K: wysoki. R: niski przy samych przykładach; upload prawdziwych
  faktur = dane kontrahentów → nie rób.
- Kandydat na fazę 2.

### E. Strona czytelna dla agentów AI
- `llms.txt` + pełny JSON-LD (`Person`, `ProfessionalService`, `Offer`) — tanio. Uczciwie: wg
  danych z 2026 (Ahrefs, Google) `llms.txt` **nie poprawia** widoczności w AI Search; czytają go
  głównie agenci kodujący. Sens tu: spójność przekazu „rozumiem, jak działają agenci”, nie SEO.
- **WebMCP** (W3C Web ML CG, `navigator.modelContext`, rejestracja narzędzi z JSON Schema;
  origin trial w Chrome) — strona może wystawić narzędzia typu `get_offers`, `draft_inquiry`.
  Bardzo „na czasie”, ale niszowy odbiorca. **[niezweryfikowane]** dokładny status wsparcia w
  przeglądarkach — źródła to blogi, strona Chrome była niedostępna z tego środowiska. Sprawdzić
  przed wdrożeniem.
- Osobny **serwer MCP** (np. `mcp.piotrsowiak.pl`) — ciekawostka dla developerów, dla klienta
  biznesowego zerowa wartość. Pominąłbym.

### F. „Jak powstała ta strona” ⭐ (niemal zerowy koszt)
Krótki build log: strona budowana z Claude Code, `CLAUDE.md` jako kontrakt z agentem,
checklista, walidator i18n, deploy przez Workers Builds. Repo publiczne (lub wybrane pliki).
To pokazuje **workflow AI-assisted development**, który klient faktycznie kupuje razem z Tobą.
Obecna zaślepka w stylu terminala Claude Code już to sygnalizuje — warto rozwinąć motyw.

### Czego nie robić
- Awatar/głos AI „udający” Ciebie — ryzyko wizerunkowe, AI Act, słaby stosunek W/K.
- Generatywne efekty wizualne „dla efektu” — nie pokazują umiejętności, które sprzedajesz.
- Czat jako **jedyna** droga do informacji — klient ma przeczytać ofertę w 30 s bez AI.
  AI ma być warstwą nad zwykłą, szybką, statyczną stroną.

---

## 4. Treść i UX (niezależnie od AI)

- Hero: konkretna obietnica + dla kogo („firmy, które chcą AI w procesach finansowych/dokumentowych”)
  zamiast samego „Senior .NET Developer”.
- **Case studies w formacie problem → rozwiązanie → wynik → rola**. Obecne opisy projektów są dobre,
  brakuje wyniku biznesowego (oszczędzony czas, liczba błędów, skala).
- Sekcja ofert produktowych (sekcja 2) z „co dostajesz / czego nie obejmuje / ile trwa”.
- „Jak pracuję z AI”: zasady (dane klienta nie trafiają do modeli bez zgody, LLM nigdy nie
  podejmuje decyzji finansowej bez walidacji deterministycznej i człowieka, ślad audytowy).
  To odpowiada na główny lęk klienta i jest zgodne z Twoim doświadczeniem.
- CTA: generator briefu + `mailto:` jako fallback. Brak formularza = brak backendu do maili.
- PL/EN zostają (istniejący mechanizm i18n jest OK).

---

## 5. Architektura i koszty

### Obecny stan
Cloudflare Worker ze statycznymi plikami (`[assets] directory = "./public"`), bez skryptu,
deploy z Gita. `CLAUDE.md`: „bez frameworków, bundlerów i backendu”.

### Opcje

| | Opcja | Co daje | Wady |
|---|---|---|---|
| 1 | **Tylko statycznie** | A–D niemożliwe na żywo; zostaje C (bez live), E, F, „nagrane” odpowiedzi | AI tylko deklaratywnie — słaby dowód umiejętności |
| 2 ⭐ | **Statyka + jeden Worker `/api/*`** (Workers AI) | A, B, C, D na żywo; ten sam Worker, ten sam deploy | łamie regułę „bez backendu” → zaktualizować `CLAUDE.md`/`DEPLOY.md`; trzeba zabezpieczyć |
| 3 | Statyka + Worker + zewnętrzny LLM (Claude/OpenAI) przez AI Gateway | lepsza jakość po polsku, lepsze structured output | klucz API w sekretach, koszt per token, ryzyko „denial of wallet” |
| 4 | Framework (Next/Astro) + backend | — | sprzeczne z założeniami projektu, nie daje nic potrzebnego |

**Rekomendacja: opcja 2, z możliwością przełączenia modelu na 3** (AI Gateway jako jeden
punkt wymiany modelu). Strona dalej jest statyczna — Worker obsługuje tylko `/api/*`
(`run_worker_first = ["/api/*"]` w sekcji `[assets]`), wszystko inne serwują assety jak dziś.
Bez bundlera: pojedynczy plik `src/worker.js`.

Uwaga zespołowa (do wytłumaczenia): „backend” tu to ~100–200 linii bez stanu, bez bazy, bez
maili — padnięcie endpointu nie psuje strony, tylko wyłącza funkcje AI (graceful degradation).

### Koszty (Workers AI)
- Free: **10 000 neuronów/dzień** (reset 00:00 UTC), bez karty. Szacunki z blogów: ~1 300 odpowiedzi
  LLM lub ~12 500 embeddingów dziennie — zależy mocno od modelu **[niezweryfikowane]**.
- Paid: 5 USD/mies. (Workers Paid), potem 0,011 USD / 1 000 neuronów.
- Na wizytówkę ruch to dziesiątki zapytań dziennie → realnie **0 zł** na planie Free.
- Na planie Free przekroczenie limitu kończy się błędem, nie rachunkiem — to naturalny hard cap
  kosztów. **[do potwierdzenia w dokumentacji Cloudflare]**
- RAG: treść strony jest mała (kilka–kilkanaście KB) → **nie potrzebujesz Vectorize ani AI Search**.
  Wystarczy wkleić całą bazę wiedzy do kontekstu (long-context) albo prosty retrieval po
  sekcjach w pamięci Workera. Mniej elementów = mniej awarii. Embeddingi wielojęzyczne
  (`@cf/baai/bge-m3`) dopiero, gdy treści urosną.
- Jakość po polsku: małe modele open-weight bywają słabsze w PL. Przed wyborem modelu zrób
  krótki eval na 20–30 pytaniach PL/EN (patrz C). Jeśli słabo → opcja 3.

### Bezpieczeństwo endpointu (obowiązkowe przy opcji 2/3)
- **Cloudflare Turnstile** przed pierwszym zapytaniem (bot ≠ klient).
- Rate limit per IP (Workers Rate Limiting binding / reguła WAF) **i** limit długości wejścia
  oraz `max_tokens` na wyjściu — sam licznik zapytań nie chroni przed drogimi zapytaniami.
- Dzienny budżet globalny (licznik w KV/Durable Object lub poleganie na limicie planu Free).
- System prompt traktuj jako jawny („zero-trust”): nie wkładaj tam niczego, czego nie
  pokazałbyś publicznie. Model nie ma żadnych narzędzi z efektami ubocznymi (wysyłka maila
  robi przeglądarka przez `mailto:`).
- Structured output + walidacja schematu po stronie Workera dla generatora briefu.
- Nie loguj treści zapytań (lub loguj zanonimizowane, z informacją na stronie) — RODO.
- Referencja: OWASP LLM Prompt Injection Prevention Cheat Sheet.

### Prawo
- **AI Act art. 50(1)** — od 2.08.2026: użytkownik musi wiedzieć, że rozmawia z AI, i to
  **w samej interakcji** (nie w regulaminie). Etykieta przy czacie/generatorze wystarczy.
  Kary do 15 mln EUR / 3% obrotu — dla jednoosobowej działalności teoretyczne, ale wymóg prosty.
- **RODO** — generator briefu przyjmuje opis firmy klienta: krótka klauzula „co się dzieje z
  tym tekstem” (przetwarzany przez model X na infrastrukturze Cloudflare, nie zapisywany).

---

## 6. Proponowany plan (fazy)

| Faza | Zakres | Backend? |
|---|---|---|
| **0** | Nowe pozycjonowanie + oferty produktowe + case studies (problem→wynik) + „Jak pracuję z AI” + „Jak powstała ta strona” + `llms.txt` + JSON-LD | nie |
| **1** | Worker `/api/brief` — generator briefu (A) + Turnstile + limity + etykieta AI Act | tak (1 endpoint) |
| **2** | Publiczne evale (C) + czat z cytowaniami i panelem „pod maską” (B) | ten sam |
| **3** | Demo KSeF na przykładowych fakturach (D); ewentualnie WebMCP po sprawdzeniu statusu | ten sam |

Faza 0 sama w sobie poprawia konwersję i jest zgodna z obecnymi zasadami repo. Fazy 1+ wymagają
Twojej decyzji co do reguły „bez backendu”.

## 7. Otwarte decyzje (dla Ciebie)

1. Czy dopuszczasz minimalny Worker `/api/*` (zmiana reguły w `CLAUDE.md`)?
2. Model: Workers AI (0 zł, słabszy PL) vs. Claude/OpenAI przez AI Gateway (lepszy PL, koszt, klucz).
3. Czy publikować widełki cenowe ofert?
4. Czy repo strony ma być publiczne (wzmacnia F i C)?
5. Na ile mocno iść w niszę KSeF/finanse vs. ogólne „AI dla MŚP”?

---

## Źródła

- Rynek: [Useme — Small business trends 2026](https://useme.com/en/blog/small-business-trends-in-2026/),
  [ITCompare — freelance IT market](https://itcompare.pl/en-us/articles/100/the-freelance-it-market-under-scrutiny),
  [ITCompare — in-demand technologies](https://itcompare.pl/en-us/articles/63/the-most-indemand-it-technologies-in-poland-brop20252026brcl)
- Produktyzacja: [Indie Hackers — productized services](https://www.indiehackers.com/post/services/a-primer-on-productized-services-ghPE2maKn2m7PA6GtPZ3),
  [Assembly — guide 2026](https://assembly.com/blog/productized-services),
  [Wayfront — examples](https://wayfront.com/blog/productized-services-examples)
- Portfolio z czatem (commodity): [dennisglouki/Chatbot_CV](https://github.com/dennisglouki/Chatbot_CV),
  [kareenazaman/ai-portfolio](https://github.com/kareenazaman/ai-portfolio),
  [AbhijithReddie/AI-Powered-Portfolio-Assistant](https://github.com/AbhijithReddie/AI-Powered-Portfolio-Assistant)
- KSeF: [mBank — harmonogram](https://www.mbank.pl/artykuly/ksef-harmonogram/),
  [wprowadzamy.ai — automatyzacja KSeF](https://wprowadzamy.ai/baza-wiedzy/automatyzacja-fakturowania-ksef)
- Cloudflare: [AI Gateway docs](https://developers.cloudflare.com/ai-gateway/),
  [AI Gateway pricing](https://developers.cloudflare.com/ai-gateway/reference/pricing/),
  [Changelog — nowe modele Workers AI](https://developers.cloudflare.com/changelog/post/2026-04-09-new-workers-ai-models/),
  [Workers AI free tier (blog)](https://aicreditmart.com/ai-credits-providers/cloudflare-workers-ai-free-tier-10k-neurons-day-guide-2026/),
  [Workers AI pricing (blog)](https://mecanik.dev/en/posts/cloudflare-workers-ai-run-ai-models-at-the-edge-in-2026/)
- llms.txt: [aisaasradar — adoption data 2026](https://aisaasradar.com/article/llms-txt-adoption-data-2026),
  [limy.ai — guide](https://limy.ai/blog/llms-txt-in-2026-the-full-guide)
- WebMCP **[blogi, niezweryfikowane]**: [nohacks — What is WebMCP](https://nohacks.co/blog/what-is-webmcp),
  [buildmvpfast — developer guide](https://www.buildmvpfast.com/blog/webmcp-browser-standard-ai-agents-2026)
- Bezpieczeństwo: [OWASP LLM Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html),
  [prompt.security — Denial of Wallet](https://prompt.security/blog/denial-of-wallet-on-genai-apps-ddow),
  [renatoworks/ai-security](https://github.com/renatoworks/ai-security)
- AI Act: [praxikon — art. 50 tekst](https://www.praxikon.com/en/ai-act/artikel/50),
  [CSA — Article 50 takes effect](https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-article-50-transparency-20260729/)
