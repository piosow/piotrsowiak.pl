/* ==========================================================================
   Słownik tłumaczeń PL / EN.
   Klucze odpowiadają atrybutom data-i18n w index.html.
   Polski jest wersją domyślną (zapisaną wprost w HTML) — dzięki temu strona
   ma sensowną treść także bez JS i to ona jest indeksowana przez Google.
   ========================================================================== */
window.I18N = {

  pl: {
    "meta.title": "Piotr Sowiak — Senior .NET Developer",
    "meta.desc": "Senior .NET Developer z Łodzi, 11 lat doświadczenia. Projektowanie i budowa systemów biznesowych: .NET, Blazor WASM, MSSQL, DDD/CQRS. Otwarty na side projecty.",

    "skip": "Przejdź do treści",

    "nav.stack": "Stack",
    "nav.projects": "Projekty",
    "nav.approach": "Jak pracuję",
    "nav.contact": "Kontakt",

    "hero.eyebrow": "Senior .NET Developer",
    "hero.lead": "Od 2015 projektuję, buduję, wdrażam i utrzymuję systemy biznesowe — takie, w których reguły są skomplikowane, a błąd kosztuje. Rozliczenia, obieg dokumentów, integracje z zewnętrznymi API.",
    "hero.availStrong": "Szukam ciekawych side projectów.",
    "hero.avail": "Nie jestem zainteresowany etatem — interesują mnie zamknięte zakresy, współpraca po godzinach i projekty, w których mogę wziąć odpowiedzialność za całość rozwiązania.",
    "hero.factExp": "Doświadczenie",
    "hero.factExpV": "od 2015 · 11 lat",
    "hero.factLoc": "Lokalizacja",
    "hero.factLocV": "Łódź / remote",
    "hero.factAvail": "Dostępność",
    "hero.factAvailV": "Side projects · po godzinach",
    "hero.ctaContact": "Opowiedz mi o projekcie",

    "stack.title": "Stack",
    "stack.sub": "Technologie, w których pracuję na co dzień.",
    "stack.backend": "Backend",
    "stack.frontend": "Frontend",
    "stack.data": "Bazy danych",
    "stack.arch": "Architektura",
    "stack.devops": "DevOps",
    "stack.tools": "Narzędzia",
    "t.micro": "Mikroserwisy",
    "t.mono": "Monolit",

    "projects.title": "Projekty",
    "projects.sub": "Wybrane systemy, które zaprojektowałem i zbudowałem.",

    "p1.title": "System rozliczania czasu pracy i dodatków płacowych",
    "p1.role": "Projekt · Implementacja",
    "p1.desc": "Rozliczanie składników wynagrodzenia zgodnie z Kodeksem pracy: ponadwymiar, nadgodziny, przesunięcia i odbiory, dni ustawowo wolne, zwolnienia chorobowe, praca w weekendy i święta. Reguły wyliczeń wymagały odwzorowania realnych, złożonych przypadków brzegowych i pełnej audytowalności wyniku.",
    "p1.m1": "sklepów",
    "p1.m2": "pracowników centrali",

    "p2.title": "Platforma obiegu i rozliczania kosztów",
    "p2.role": "Projekt · Team lead (3 os.) · Implementacja",
    "p2.desc": "Pełna ścieżka dokumentu kosztowego: od wpływu do systemu, przez digitalizację z OCR, po zlecenie płatności. Sercem systemu jest silnik agregujący koszty powstałe w organizacji i wiążący je z dokumentami od kontrahentów — wraz z walidacją, wykrywaniem duplikatów i generowaniem plików bankowych do importu przez księgowość.",
    "p2.m1": "dokumentów dziennie",
    "p2.m2": "osobowy zespół",

    "p3.title": "Obieg akceptacji dokumentów KSeF",
    "p3.role": "Projekt · Implementacja",
    "p3.desc": "System wewnętrznej akceptacji dokumentów pobieranych z KSeF przez osoby upoważnione. W ramach projektu powstał model hierarchii pracowników — stanowiska, kompetencje i wynikające z nich ścieżki akceptacji — sterujący tym, kto i na jakim etapie może zatwierdzić lub odrzucić dokument.",

    "p4.title": "System zleceń przelewów z integracją bankową",
    "p4.role": "Projekt · Implementacja",
    "p4.desc": "Wewnętrzne narzędzie do zlecania przelewów, zintegrowane bezpośrednio z API banku (SOAP oraz HTTP). Obsługa uwierzytelniania, podpisu zleceń i zwrotnych statusów transakcji, z naciskiem na niezawodność i pełny ślad audytowy operacji finansowych.",

    "how.title": "Jak pracuję",
    "how.sub": "Rola, którą zwykle biorę na siebie w projekcie — niezależnie od tego, po czyjej stronie powstaje.",
    "how.1t": "Od procesu do produkcji",
    "how.1d": "Zaczynam od rozmowy o procesie, nie od listy ekranów. Model domeny, decyzje architektoniczne, implementacja, wdrożenie i utrzymanie — całą ścieżkę prowadzę end-to-end i biorę za nią odpowiedzialność.",
    "how.2t": "Bigger picture",
    "how.2d": "Potrafię wyjść ponad zgłoszoną potrzebę: spojrzeć na proces z dystansu, dostrzec zależności, których wcześniej nie widziano, i zaproponować rozwiązanie, które usuwa problem u źródła zamiast go obsługiwać.",
    "how.3t": "Systemy o wysokiej stawce",
    "how.3d": "Rozliczenia płacowe, dokumenty kosztowe, zlecenia przelewów, integracje z API bankowym i KSeF. Obszary, w których błąd ma konsekwencje finansowe i prawne, więc walidacja, audytowalność i przypadki brzegowe to nie dodatek.",
    "how.4t": "Prowadzenie małego zespołu",
    "how.4d": "Prowadziłem kilkuosobowe zespoły developerskie: decyzje architektoniczne, code review, mentoring, podział i planowanie prac. Nadal koduję — leading jest u mnie dodatkiem do wytwarzania, nie zamiast niego.",

    "contact.title": "Kontakt",
    "contact.sub": "Masz pomysł na projekt w .NET i szukasz kogoś, kto weźmie go od strony technicznej? Napisz — najbardziej interesują mnie rzeczy z jasno określonym zakresem. Odpowiadam zwykle w ciągu 1–2 dni roboczych.",
    "contact.emailLabel": "Napisz na",
    "contact.write": "Napisz wiadomość",
    "contact.copy": "Kopiuj adres",
    "contact.copied": "Skopiowano do schowka.",
    "contact.copyErr": "Nie udało się skopiować — zaznacz adres ręcznie."
  },

  en: {
    "meta.title": "Piotr Sowiak — Senior .NET Developer",
    "meta.desc": "Senior .NET Developer based in Łódź, Poland, 11 years of experience. Designing and building business systems: .NET, Blazor WASM, MSSQL, DDD/CQRS. Open to side projects.",

    "skip": "Skip to content",

    "nav.stack": "Stack",
    "nav.projects": "Projects",
    "nav.approach": "How I work",
    "nav.contact": "Contact",

    "hero.eyebrow": "Senior .NET Developer",
    "hero.lead": "Since 2015 I've been designing, building, deploying and maintaining business systems — the kind where the rules are complicated and mistakes are expensive. Settlements, document workflows, integrations with external APIs.",
    "hero.availStrong": "Looking for interesting side projects.",
    "hero.avail": "I'm not looking for full-time employment — what interests me is well-defined scope, after-hours collaboration, and projects where I can own the whole solution.",
    "hero.factExp": "Experience",
    "hero.factExpV": "since 2015 · 11 years",
    "hero.factLoc": "Location",
    "hero.factLocV": "Łódź, Poland / remote",
    "hero.factAvail": "Availability",
    "hero.factAvailV": "Side projects · after hours",
    "hero.ctaContact": "Tell me about your project",

    "stack.title": "Stack",
    "stack.sub": "Technologies I work with day to day.",
    "stack.backend": "Backend",
    "stack.frontend": "Frontend",
    "stack.data": "Databases",
    "stack.arch": "Architecture",
    "stack.devops": "DevOps",
    "stack.tools": "Tools",
    "t.micro": "Microservices",
    "t.mono": "Monolith",

    "projects.title": "Projects",
    "projects.sub": "Selected systems I designed and built.",

    "p1.title": "Working time & pay supplements settlement system",
    "p1.role": "Design · Implementation",
    "p1.desc": "Calculating salary components in line with the Polish Labour Code: excess hours, overtime, shift changes and time off in lieu, public holidays, sick leave, weekend and holiday work. The rules had to model genuinely complex real-world edge cases while keeping every result fully auditable.",
    "p1.m1": "stores",
    "p1.m2": "head-office employees",

    "p2.title": "Cost document workflow & settlement platform",
    "p2.role": "Design · Team lead (3 people) · Implementation",
    "p2.desc": "The full lifecycle of a cost document: from intake, through OCR-based digitisation, to issuing payment. At its core is an engine that aggregates costs incurred across the organisation and matches them against supplier documents — with validation, duplicate detection and generation of bank files for the finance team to import.",
    "p2.m1": "documents per day",
    "p2.m2": "person team",

    "p3.title": "KSeF document approval workflow",
    "p3.role": "Design · Implementation",
    "p3.desc": "An internal approval system for documents retrieved from KSeF (the Polish national e-invoicing system), handled by authorised staff. The project included a model of the employee hierarchy — positions, competencies and the approval paths derived from them — driving who may approve or reject a document at each stage.",

    "p4.title": "Payment ordering system with bank API integration",
    "p4.role": "Design · Implementation",
    "p4.desc": "An internal tool for ordering bank transfers, integrated directly with the bank's API (SOAP and HTTP). Handles authentication, order signing and transaction status callbacks, with the emphasis on reliability and a complete audit trail for financial operations.",

    "how.title": "How I work",
    "how.sub": "The role I typically take on in a project — regardless of whose side it's built on.",
    "how.1t": "From process to production",
    "how.1d": "I start with a conversation about the process, not a list of screens. Domain model, architectural decisions, implementation, deployment and maintenance — I run the whole path end-to-end and own the outcome.",
    "how.2t": "Bigger picture",
    "how.2d": "I look beyond the requirement as stated: stepping back to see the whole process, spotting dependencies nobody had noticed, and proposing a solution that removes the problem at its source rather than handling it.",
    "how.3t": "High-stakes systems",
    "how.3d": "Payroll settlements, cost documents, payment orders, integrations with banking APIs and KSeF. Domains where a mistake has financial and legal consequences — so validation, auditability and edge cases aren't an afterthought.",
    "how.4t": "Leading a small team",
    "how.4d": "I've led small development teams: architectural decisions, code review, mentoring, splitting and planning work. I still write code — leading is something I do in addition to building, not instead of it.",

    "contact.title": "Contact",
    "contact.sub": "Got an idea for a .NET project and need someone to own the technical side? Get in touch — what interests me most is work with a clearly defined scope. I usually reply within 1–2 business days.",
    "contact.emailLabel": "Write to",
    "contact.write": "Write a message",
    "contact.copy": "Copy address",
    "contact.copied": "Copied to clipboard.",
    "contact.copyErr": "Couldn't copy — please select the address manually."
  }
};
