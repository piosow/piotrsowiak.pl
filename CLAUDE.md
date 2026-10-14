# piotrsowiak.pl — instrukcje dla Claude Code

Statyczna strona studia gier (HTML/CSS, bez build stepu) — Cloudflare Worker ze statycznymi plikami (`piotrsowiak-pl`), nie Pages.
`/` strona studia → menu → `/games/` lista gier na Androida → `/<slug>/` strona gry. Dawna wizytówka programisty leży nieopublikowana w `site/`.
Szczegóły: `docs/DEPLOY.md`.

## Publikacja

- `git push` na `main` = deploy produkcyjny (Workers Builds podpięte pod GitHub, deploy ~30 s po pushu).
- Przed pushem pokaż użytkownikowi diff i poczekaj na potwierdzenie.
- Status deployu: `npx.cmd wrangler deployments list` (Wrangler jest zalogowany)
- Publikowany jest tylko `public/` (ustawione w `wrangler.toml`); reszta repo nie trafia na stronę.
- Deploy ręczny z pominięciem Gita tylko na wyraźną prośbę:
  `npx.cmd wrangler deploy` (najpierw `--dry-run`, żeby zobaczyć listę plików)
- Po deployu sprawdź https://piotrsowiak.pl (np. czy serwuje nowe `?v=N`).

## Checklista przed commitem

1. Zmiana tekstu PL → popraw `site/index.html` **i** sekcję `pl` w `site/assets/i18n.js`; EN tylko w `i18n.js`.
2. `node tools/check-i18n.js` musi przejść.
3. Zmiana czegokolwiek w `site/assets/` → podbij `?v=N` przy obu `<script>` i `<link>` w `site/index.html`.
4. Zmiana adresu email → wszystkie wystąpienia w `public/` (`grep -rn kontakt@ public/`) plus 4 miejsca w `site/` (patrz `docs/DEPLOY.md`).
5. Strona gry (`public/tilefall/`): zmiana `game.css` → podbij `?v=N` w trzech HTML-ach; przed mergem na `main` musi przejść `node tools/check-placeholders.js` (pomija szkice z `noindex`).
6. Strona studia: tekst zmieniasz w wersji EN i PL (osobne pliki); zmiana `studio.css` → podbij `?v=N` we wszystkich HTML-ach, które go ładują (`grep -rl studio.css public`).
7. Lista gier: edytuj tylko `data/games.json`, potem `node tools/build-games.js`; `node tools/build-games.js --check` musi przejść. Nowy tytuł: `docs/DEPLOY.md`, sekcja „Lista gier”.
8. Szkice (`noindex`: dziś `tilefall/` i `privacy/`) nie mogą być linkowane z opublikowanych stron; publikacja szkicu: `docs/DEPLOY.md`, sekcja „Szkice”.

## Zasady

- Bez frameworków, bundlerów i backendu — strona ma zostać w 100% statyczna.
- Nie dodawaj długiego `max-age` dla `/assets/*` w `public/_headers` (powód w `docs/DEPLOY.md`).
- Podgląd lokalny: `npx serve public`
- Commity po polsku, krótko.
