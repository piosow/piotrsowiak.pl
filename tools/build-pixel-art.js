#!/usr/bin/env node
/**
 * Generator pikselowych grafik strony studia (public/media/pixel/):
 *   bg.svg        kafel tła (sprite'y rozrzucone po 320×320, przezroczystość ustawia studio.css)
 *   icon-*.svg    ikony: logo w menu i ikony bloków „Czego się spodziewać”
 *
 * Sprite = tablica wierszy, '#' = piksel, '.' = pusto. Po zmianie: node tools/build-pixel-art.js
 * i podbij ?v=N przy studio.css (CLAUDE.md, punkt 6), bo przeglądarki mogą trzymać stary obrazek.
 */
const fs = require("fs");
const path = require("path");

const SPRITES = {
  invader: [
    "..#.....#..",
    "...#...#...",
    "..#######..",
    ".##.###.##.",
    "###########",
    "#.#######.#",
    "#.#.....#.#",
    "...##.##...",
  ],
  heart: [
    ".##.##.",
    "#######",
    "#######",
    ".#####.",
    "..###..",
    "...#...",
  ],
  coin: [
    "..####..",
    ".#....#.",
    "#..##..#",
    "#.###..#",
    "#..##..#",
    "#..##..#",
    ".#....#.",
    "..####..",
  ],
  star: [
    "...#...",
    "...#...",
    "#######",
    ".#####.",
    "..###..",
    ".##.##.",
    "##...##",
  ],
  ghost: [
    "..####..",
    ".######.",
    "#..##..#",
    "#..##..#",
    "########",
    "########",
    "########",
    "#.##.##.",
  ],
  gamepad: [
    "..#########..",
    ".###########.",
    "##.#####.#.##",
    "#...###.#.#.#",
    "##.#####.#.##",
    "#############",
    "###.......###",
  ],
  sword: [
    "......##",
    ".....###",
    "....###.",
    "#..###..",
    ".####...",
    "..##....",
    ".#.##...",
    "#...#...",
  ],
  prompt: [
    "#.......",
    ".#......",
    "..#.....",
    ".#......",
    "#..#####",
  ],
  braces: [
    ".##...##.",
    ".#.....#.",
    ".#.....#.",
    "#.......#",
    ".#.....#.",
    ".#.....#.",
    ".##...##.",
  ],
  tetrisT: [
    "######",
    "######",
    "..##..",
    "..##..",
  ],
  tetrisL: [
    "##..",
    "##..",
    "##..",
    "##..",
    "####",
    "####",
  ],
  hourglass: [
    "#######",
    ".#####.",
    "..###..",
    "...#...",
    "..#.#..",
    ".#.#.#.",
    "#######",
  ],
};

const C = {
  blue: "#8ab4ff",
  green: "#6fdc9b",
  pink: "#ff8aa8",
  gold: "#ffd166",
  white: "#f2f2f4",
};

// Sprite → ścieżka SVG (jeden <path>, każdy piksel to kwadrat 1×1).
function toPath(rows) {
  let d = "";
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "#") d += `M${x} ${y}h1v1h-1z`;
    }
  });
  return d;
}

function size(rows) {
  return { w: Math.max(...rows.map((r) => r.length)), h: rows.length };
}

// Kafel tła: x, y w px, s = rozmiar piksela. Rozrzut ręczny, żeby powtórzenie kafla nie było oczywiste.
const BG_TILE = 320;
const BG = [
  ["invader", 18, 22, 3, C.blue],
  ["heart", 150, 12, 3, C.pink],
  ["prompt", 248, 52, 3, C.green],
  ["coin", 92, 96, 3, C.gold],
  ["tetrisT", 214, 118, 3, C.blue],
  ["ghost", 22, 168, 3, C.white],
  ["braces", 136, 190, 3, C.green],
  ["star", 270, 196, 3, C.gold],
  ["sword", 78, 262, 3, C.white],
  ["gamepad", 196, 270, 3, C.blue],
  ["tetrisL", 296, 114, 2, C.pink],
];

function bgSvg() {
  const parts = BG.map(([name, x, y, s, fill]) =>
    `  <path transform="translate(${x} ${y}) scale(${s})" fill="${fill}" d="${toPath(SPRITES[name])}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BG_TILE}" height="${BG_TILE}" viewBox="0 0 ${BG_TILE} ${BG_TILE}" shape-rendering="crispEdges">
  <!-- Wygenerowane przez tools/build-pixel-art.js — nie edytuj ręcznie. -->
${parts.join("\n")}
</svg>
`;
}

// Ikona: sprite wyśrodkowany w kwadracie (żeby ikony o różnych proporcjach miały ten sam rozmiar).
function iconSvg(name, fill) {
  const rows = SPRITES[name];
  const { w, h } = size(rows);
  const side = Math.max(w, h);
  const dx = (side - w) / 2;
  const dy = (side - h) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" shape-rendering="crispEdges">
  <!-- Wygenerowane przez tools/build-pixel-art.js — nie edytuj ręcznie. -->
  <path transform="translate(${dx} ${dy})" fill="${fill}" d="${toPath(rows)}"/>
</svg>
`;
}

const ICONS = {
  "icon-brand.svg": ["invader", C.blue],
  "icon-polish.svg": ["star", C.blue],
  "icon-time.svg": ["hourglass", C.gold],
  "icon-platforms.svg": ["gamepad", C.green],
};

const outDir = path.join(__dirname, "..", "public", "media", "pixel");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "bg.svg"), bgSvg());
for (const [file, [name, fill]] of Object.entries(ICONS)) {
  fs.writeFileSync(path.join(outDir, file), iconSvg(name, fill));
}
console.log(`✓ ${1 + Object.keys(ICONS).length} plików w public/media/pixel/`);
