#!/usr/bin/env node
/**
 * Generuje listę gier ze źródła data/games.json:
 *  - karty gier w public/games/index.html (EN) i public/games/pl/index.html (PL),
 *  - wpisy stron gier w public/sitemap.xml.
 * Podmienia tylko treść między znacznikami <!-- games:start --> i <!-- games:end -->,
 * reszta plików jest edytowana ręcznie. Wynik jest commitowany — na produkcji nic się
 * nie buduje, strona zostaje w 100% statyczna.
 *
 * Gra z "published": false to szkic: jest walidowana, ale nie trafia na listę ani do sitemap.
 * Gra z "page": false jest na liście, ale jej strona (/<slug>/) to jeszcze szkic: karta prowadzi
 * do webUrl (wersja w przeglądarce) albo nigdzie, bez press kitu, a strony gry nie idą do sitemap.
 *
 * Uruchomienie:
 *   node tools/build-games.js           zapisuje pliki
 *   node tools/build-games.js --check   tylko sprawdza, czy pliki są aktualne (exit 1, jeśli nie)
 */
const fs = require("fs");
const path = require("path");

const repo = path.resolve(__dirname, "..");
const pub = path.join(repo, "public");
const SITE = "https://piotrsowiak.pl";
const checkOnly = process.argv.includes("--check");

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const T = {
  en: {
    upcoming: (d) => (d ? `Coming ${d}` : "Coming soon"),
    released: "Out now",
    press: "Press kit",
    web: "Play in your browser",
    empty: "The first game is on its way. Check back soon.",
    date: (y, m, d) => `${d} ${MONTHS_EN[m - 1]} ${y}`,
  },
  pl: {
    upcoming: (d) => (d ? `Premiera ${d}` : "Wkrótce"),
    released: "Dostępna",
    press: "Press kit",
    web: "Zagraj w przeglądarce",
    empty: "Pierwsza gra jest w drodze. Zajrzyj tu wkrótce.",
    date: (y, m, d) => `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`,
  },
};

// --- Wczytanie i walidacja ---------------------------------------------------

const errors = [];
const data = JSON.parse(fs.readFileSync(path.join(repo, "data", "games.json"), "utf8"));
const games = data.games || [];
const exists = (urlPath) => fs.existsSync(path.join(pub, urlPath));
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

const seen = new Set();
for (const g of games) {
  const id = g.slug || "(brak slug)";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug || "")) errors.push(`${id}: slug musi być w formacie a-z0-9 z myślnikami`);
  if (seen.has(g.slug)) errors.push(`${id}: zduplikowany slug`);
  seen.add(g.slug);
  if (!g.name) errors.push(`${id}: brak name`);
  if (g.published != null && typeof g.published !== "boolean") errors.push(`${id}: published musi być true albo false`);
  if (g.page != null && typeof g.page !== "boolean") errors.push(`${id}: page musi być true albo false`);
  if (g.webUrl != null && !/^(https:\/\/|\/)/.test(g.webUrl)) errors.push(`${id}: webUrl musi zaczynać się od https:// albo /`);
  if (g.webUrl && g.webUrl.startsWith("/") && !exists(g.webUrl.replace(/\/?$/, "/index.html")))
    errors.push(`${id}: brak wersji w przeglądarce public${g.webUrl}`);
  if (!["upcoming", "released"].includes(g.status)) errors.push(`${id}: status musi być "upcoming" albo "released"`);
  if (g.releaseDate != null && !isDate(g.releaseDate)) errors.push(`${id}: releaseDate w formacie RRRR-MM-DD`);
  if (!isDate(g.updated)) errors.push(`${id}: updated (lastmod w sitemap) w formacie RRRR-MM-DD`);
  if (!Array.isArray(g.platforms) || !g.platforms.length) errors.push(`${id}: platforms musi być niepustą tablicą`);
  for (const lang of ["en", "pl"]) {
    for (const f of ["genre", "pitch", "coverAlt"]) {
      if (!g[lang] || !g[lang][f]) errors.push(`${id}: brak ${lang}.${f}`);
    }
  }
  if (!exists(`${g.slug}/index.html`)) errors.push(`${id}: brak strony gry public/${g.slug}/index.html`);
  g.cover = g.cover || `/${g.slug}/media/og.png`;
  if (!exists(g.cover)) errors.push(`${id}: brak okładki public${g.cover}`);
  g.hasPl = exists(`${g.slug}/pl/index.html`);
  g.hasPress = exists(`${g.slug}/press/index.html`);
  g.hasPage = g.page !== false;
}

if (errors.length) {
  console.log("✗ data/games.json:");
  for (const e of errors) console.log("  " + e);
  process.exit(1);
}

// --- Szablony ----------------------------------------------------------------

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function fmtDate(lang, iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return T[lang].date(y, m, d);
}

function card(g, lang, i) {
  const t = T[lang];
  // strona gry w szkicu: tytuł prowadzi do wersji w przeglądarce (albo jest bez linku)
  const href = !g.hasPage ? g.webUrl : lang === "pl" && g.hasPl ? `/${g.slug}/pl/` : `/${g.slug}/`;
  const hreflang = g.hasPage && lang === "pl" && !g.hasPl ? ' hreflang="en"' : "";
  const title = href ? `<a href="${esc(href)}"${hreflang}>${esc(g.name)}</a>` : esc(g.name);
  const badge =
    g.status === "released"
      ? `<span class="badge badge-out">${t.released}</span>`
      : `<span class="badge">${esc(t.upcoming(fmtDate(lang, g.releaseDate)))}</span>`;
  const links = [];
  if (g.webUrl) links.push(`<a href="${esc(g.webUrl)}">${t.web}</a>`);
  if (g.hasPage && g.hasPress) links.push(`<a href="/${g.slug}/press/">${t.press}</a>`);
  if (g.playUrl) links.push(`<a href="${esc(g.playUrl)}">Google Play</a>`);
  const loading = i >= 2 ? ' loading="lazy"' : "";

  return [
    `<article class="game">`,
    `  <div class="game-cover"><img src="${esc(g.cover)}" width="1200" height="630"${loading} alt="${esc(g[lang].coverAlt)}"></div>`,
    `  <div class="game-body">`,
    `    <p class="game-meta">${esc(g[lang].genre)} · ${esc(g.platforms.join(", "))}</p>`,
    `    <h2>${title}</h2>`,
    `    <p class="game-pitch">${esc(g[lang].pitch)}</p>`,
    `    <div class="game-footer">`,
    `      ${badge}`,
    links.length ? `      <span class="game-links">${links.join(" ")}</span>` : null,
    `    </div>`,
    `  </div>`,
    `</article>`,
  ].filter((l) => l !== null);
}

function sitemapEntries(g) {
  if (!g.hasPage) return [];
  const loc = (p) => `${SITE}${p}`;
  const alt = g.hasPl
    ? [
        `  <xhtml:link rel="alternate" hreflang="en" href="${loc(`/${g.slug}/`)}"/>`,
        `  <xhtml:link rel="alternate" hreflang="pl" href="${loc(`/${g.slug}/pl/`)}"/>`,
      ]
    : [];
  const url = (p, freq, prio, withAlt) => [
    `<url>`,
    `  <loc>${loc(p)}</loc>`,
    `  <lastmod>${g.updated}</lastmod>`,
    `  <changefreq>${freq}</changefreq>`,
    `  <priority>${prio}</priority>`,
    ...(withAlt ? alt : []),
    `</url>`,
  ];
  const out = [...url(`/${g.slug}/`, "weekly", "0.9", true)];
  if (g.hasPl) out.push(...url(`/${g.slug}/pl/`, "weekly", "0.8", true));
  if (g.hasPress) out.push(...url(`/${g.slug}/press/`, "monthly", "0.6", false));
  return out;
}

// --- Podmiana między znacznikami ---------------------------------------------

const START = "<!-- games:start -->";
const END = "<!-- games:end -->";

function inject(rel, lines) {
  const file = path.join(pub, rel);
  const original = fs.readFileSync(file, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n"; // Windows z autocrlf
  const src = original.replace(/\r\n/g, "\n");

  const s = src.indexOf(START);
  const e = src.indexOf(END);
  if (s < 0 || e < s) throw new Error(`public/${rel}: brak znaczników ${START} … ${END}`);

  const lineStart = src.lastIndexOf("\n", s) + 1;
  const indent = src.slice(lineStart, s);
  const body = lines.map((l) => (l ? indent + l + "\n" : "\n")).join("");
  const next = (src.slice(0, s + START.length) + "\n" + body + indent + src.slice(e)).replace(/\n/g, eol);

  if (next === original) return false;
  if (!checkOnly) fs.writeFileSync(file, next);
  return true;
}

const visible = games.filter((g) => g.published !== false);
const drafts = games.filter((g) => g.published === false).map((g) => g.slug);

const changed = [];
for (const [rel, lang] of [["games/index.html", "en"], ["games/pl/index.html", "pl"]]) {
  const lines = visible.length
    ? visible.flatMap((g, i) => card(g, lang, i))
    : [`<p class="games-empty">${T[lang].empty}</p>`];
  if (inject(rel, lines)) changed.push(rel);
}
if (inject("sitemap.xml", visible.flatMap(sitemapEntries))) changed.push("sitemap.xml");
if (drafts.length) console.log(`  szkice (published: false): ${drafts.join(", ")}`);

if (checkOnly) {
  if (changed.length) {
    console.log("✗ Nieaktualne względem data/games.json (uruchom: node tools/build-games.js):");
    for (const c of changed) console.log("  public/" + c);
    process.exit(1);
  }
  console.log(`✓ Lista gier aktualna (${visible.length} na liście)`);
} else {
  console.log(changed.length ? `✓ Zaktualizowano: ${changed.map((c) => "public/" + c).join(", ")}` : "✓ Bez zmian");
}
