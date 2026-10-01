# piotrsowiak.pl — instrukcje dla Claude Code

Statyczna wizytówka (HTML/CSS/JS, bez build stepu) — Cloudflare Worker ze statycznymi plikami (`piotrsowiak-pl`), nie Pages.
Obecnie produkcja serwuje zaślepkę (`public/index.html`); pełna strona leży w `site/` — przywracanie w `docs/DEPLOY.md`.
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
3. Zmiana czegokolwiek w `site/assets/` → podbij `?v=N` przy obu `<script>` i `<link>` w `site/index.html` (zaślepka: `?v=N` przy `placeholder.css`).
4. Zmiana adresu email → wszystkie 4 miejsca (patrz `docs/DEPLOY.md`).

## Zasady

- Bez frameworków, bundlerów i backendu — strona ma zostać w 100% statyczna.
- Nie dodawaj długiego `max-age` dla `/assets/*` w `public/_headers` (powód w `docs/DEPLOY.md`).
- Podgląd lokalny: `npx serve public`
- Commity po polsku, krótko.
