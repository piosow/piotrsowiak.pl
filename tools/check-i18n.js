#!/usr/bin/env node
/**
 * Sprawdza spójność tłumaczeń:
 *  1. każdy klucz data-i18n z index.html istnieje w obu językach,
 *  2. słowniki PL i EN mają ten sam zestaw kluczy,
 *  3. nie ma martwych kluczy w słowniku,
 *  4. tekst PL w index.html zgadza się ze słownikiem (inaczej treść „skacze"
 *     po pierwszym renderze JS),
 *  5. wszystkie kotwice href="#..." mają odpowiadające id.
 *
 * Uruchomienie:  node tools/check-i18n.js
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "public");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const i18nSrc = fs.readFileSync(path.join(root, "assets/i18n.js"), "utf8");

global.window = {};
eval(i18nSrc);
const D = global.window.I18N;

const problems = [];
const report = (label, list) => {
  if (list.length) problems.push(`${label}: ${list.join(", ")}`);
  console.log(`${list.length ? "✗" : "✓"} ${label}${list.length ? " → " + list.join(", ") : ""}`);
};

const used = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]))];

report("klucze z HTML brakujące w PL", used.filter((k) => !(k in D.pl)));
report("klucze z HTML brakujące w EN", used.filter((k) => !(k in D.en)));
report("klucze tylko w PL", Object.keys(D.pl).filter((k) => !(k in D.en)));
report("klucze tylko w EN", Object.keys(D.en).filter((k) => !(k in D.pl)));
report(
  "klucze w słowniku nieużywane w HTML",
  Object.keys(D.pl).filter((k) => !used.includes(k) && !/^meta\.|^contact\.(copied|copyErr)$/.test(k))
);

// rozjazd między tekstem w HTML a słownikiem PL
const mismatch = [];
for (const k of used) {
  const esc = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = html.match(new RegExp(`data-i18n="${esc}"[^>]*>([\\s\\S]*?)<\\/`));
  if (!m) continue;
  const inHtml = m[1].replace(/\s+/g, " ").trim();
  const inDict = String(D.pl[k]).replace(/\s+/g, " ").trim();
  if (inHtml !== inDict) mismatch.push(k);
}
report("rozjazd HTML vs słownik PL", mismatch);

// martwe kotwice
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const anchors = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
report("martwe kotwice", anchors.filter((a) => !ids.has(a)));

console.log(`\nKluczy w HTML: ${used.length} · w słowniku: ${Object.keys(D.pl).length}`);

if (problems.length) {
  console.error(`\nZnaleziono ${problems.length} problem(ów).`);
  process.exit(1);
}
console.log("Wszystko spójne.");
