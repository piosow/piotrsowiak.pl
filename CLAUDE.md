# piotrsowiak.pl — instrukcje dla Claude Code

Statyczna wizytówka (HTML/CSS/JS, bez build stepu) na Cloudflare Pages.
Szczegóły: `docs/DEPLOY.md`.

## Publikacja

- `git push` na `main` = deploy produkcyjny (Cloudflare Pages podpięte pod GitHub).
- Przed pushem pokaż użytkownikowi diff i poczekaj na potwierdzenie.
- Status deployu: `npx wrangler pages deployment list --project-name=piotrsowiak`
  (wymaga wcześniejszego `npx wrangler login` przez użytkownika).
- Deploy ręczny z pominięciem Gita tylko na wyraźną prośbę:
  `npx wrangler pages deploy . --project-name=piotrsowiak`
- Po deployu sprawdź https://piotrsowiak.pl (np. czy serwuje nowe `?v=N`).

## Checklista przed commitem

1. Zmiana tekstu PL → popraw `index.html` **i** sekcję `pl` w `assets/i18n.js`; EN tylko w `i18n.js`.
2. `node tools/check-i18n.js` musi przejść.
3. Zmiana czegokolwiek w `assets/` → podbij `?v=N` przy obu `<script>` i `<link>` w `index.html`.
4. Zmiana adresu email → wszystkie 4 miejsca (patrz `docs/DEPLOY.md`).

## Zasady

- Bez frameworków, bundlerów i backendu — strona ma zostać w 100% statyczna.
- Nie dodawaj długiego `max-age` dla `/assets/*` w `_headers` (powód w `docs/DEPLOY.md`).
- Podgląd lokalny: `npx serve .`
- Commity po polsku, krótko.
