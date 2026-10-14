#!/usr/bin/env node
/**
 * Sprawdza publikowany katalog public/ przed wdrożeniem strony gry:
 *  1. nie zostały placeholdery w klamrach (np. {NAZWA_GRY}) z docs/promocja/karta-gry.md,
 *  2. każdy blok JSON-LD da się sparsować.
 *
 * og.png i ZIP-a skrypt nie przeczyta — po zmianie nazwy gry wygeneruj je
 * ponownie (docs/DEPLOY.md, sekcja „Strona gry”).
 *
 * Uruchomienie:  node tools/check-placeholders.js
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "public");
const TEXT = /\.(html|svg|xml|txt|css)$/;

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (TEXT.test(e.name)) files.push(p);
  }
})(root);

const problems = [];
for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const src = fs.readFileSync(file, "utf8");

  const found = [...new Set([...src.matchAll(/\{[A-Z][A-Z0-9_]*\}/g)].map((m) => m[0]))];
  if (found.length) problems.push(`${rel}: ${found.join(", ")}`);

  for (const m of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); }
    catch (e) { problems.push(`${rel}: niepoprawny JSON-LD (${e.message})`); }
  }
}

if (problems.length) {
  console.log("✗ Do uzupełnienia przed publikacją:");
  for (const p of problems) console.log("  " + p);
  process.exit(1);
}
console.log(`✓ ${files.length} plików bez placeholderów, JSON-LD poprawny`);
