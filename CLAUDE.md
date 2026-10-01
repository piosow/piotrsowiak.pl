# piotrsowiak.pl — instrukcje dla Claude Code

Statyczna wizytówka (HTML/CSS/JS, bez build stepu) na Cloudflare Pages.
Obecnie produkcja serwuje zaślepkę (`public/index.html`); pełna strona leży w `site/` — przywracanie w `docs/DEPLOY.md`.
Szczegóły: `docs/DEPLOY.md`.

## Publikacja

- `git push` na `main` = deploy produkcyjny (Cloudflare Pages podpięte pod GitHub).
- Przed pushem pokaż użytkownikowi diff i poczekaj na potwierdzenie.
- Status deployu: `npx wrangler pages deployment list --project-name=piotrsowiak`
  (wymaga wcześniejszego `npx wrangler login` przez użytkownika).
- Publikowany jest tylko `public/` (ustawione w `wrangler.toml`); reszta repo nie trafia na stronę.
- Deploy ręczny z pominięciem Gita tylko na wyraźną prośbę:
  `npx wrangler pages deploy`
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
