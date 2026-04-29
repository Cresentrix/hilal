#!/usr/bin/env node
/**
 * Walks the cached Figma file dump (tools/figma-sync/api/raw/nodes-pages.json)
 * and extracts every token-shaped value pair from the "01 Foundations" page.
 *
 * Strategy: group nodes by their nearest ancestor "row" frame. A row is any
 * frame whose direct text children include both a token-name string and a
 * value (hex, rgba shadow, dimension). For colors we ALSO read the actual
 * fill of the row's "color box" child as a cross-check on the text hex.
 *
 * Output:
 *   tools/figma-sync/extracted/_summary.json
 *   tools/figma-sync/extracted/colors.json
 *   tools/figma-sync/extracted/elevation.json
 *   tools/figma-sync/extracted/typography.json
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DUMP = resolve(__dirname, 'api/raw/nodes-pages.json');
const OUT = resolve(__dirname, 'extracted');

const data = JSON.parse(await readFile(DUMP, 'utf8'));
const FOUNDATIONS = data.nodes['0:1'].document;

function* walk(n) {
  yield n;
  for (const c of n.children ?? []) yield* walk(c);
}

function rgbaToHex({ r, g, b, a = 1 }) {
  const to = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  const hex = `#${to(r)}${to(g)}${to(b)}`;
  return a < 1 ? `${hex}${to(a)}` : hex;
}

const tokenNamePat = /^(base|semantic|brand|fg|bg|color|surface|elevation|radius|spacing|motion)\/[a-z0-9_./-]+$/i;
const hexPat = /^#[0-9a-f]{3,8}$/i;
const shadowPat = /^[\d.]+px\s+[\d.]+px\s+[\d.]+px(\s+[\d.]+px)?\s+rgba/i;

// ---------- collect all "candidate row" frames ----------
// A row is any frame that contains BOTH a token-name text and a value text.
const rows = [];

function findChildren(node) {
  const items = [];
  function rec(n) {
    items.push(n);
    for (const c of n.children ?? []) rec(c);
  }
  rec(node);
  return items;
}

for (const n of walk(FOUNDATIONS)) {
  if (n.type !== 'FRAME') continue;
  const desc = findChildren(n);
  let name = null;
  let valueHex = null;
  let valueShadow = null;
  let fillHex = null;
  for (const c of desc) {
    if (c.type === 'TEXT' && c.characters) {
      const t = c.characters.trim();
      if (!name && tokenNamePat.test(t)) name = t;
      else if (!valueHex && hexPat.test(t)) valueHex = t.toLowerCase();
      else if (!valueShadow && shadowPat.test(t)) valueShadow = t;
    }
    if (!fillHex && c.type === 'FRAME' && c.name === 'color box') {
      const f = c.fills?.[0];
      if (f?.type === 'SOLID') fillHex = rgbaToHex(f.color);
    }
  }
  if (name && (valueHex || valueShadow || fillHex)) {
    rows.push({ frameId: n.id, frameName: n.name, name, valueHex, valueShadow, fillHex });
  }
}

// ---------- de-dup: keep the smallest containing row for each token name ----------
// (Outer frames will also match — pick the deepest/smallest match by descendant count.)
const byName = new Map();
for (const r of rows) {
  const prev = byName.get(r.name);
  if (!prev) {
    byName.set(r.name, r);
    continue;
  }
  // prefer the row that has fillHex (more authoritative) and fewer descendants
  if (!prev.fillHex && r.fillHex) byName.set(r.name, r);
}

// ---------- categorize ----------
const colors = {};
const elevation = {};

for (const [name, row] of byName) {
  if (name.startsWith('elevation/')) {
    if (row.valueShadow) elevation[name] = row.valueShadow;
    continue;
  }
  // pick fillHex over text hex — fills are the actual painted color
  const value = row.fillHex ?? row.valueHex;
  if (value && /^[a-z]+\//i.test(name)) {
    colors[name] = value;
  }
}

// ---------- typography (font family + size + weight + leading) ----------
const typography = {};
for (const n of walk(FOUNDATIONS)) {
  if (n.type !== 'TEXT' || !n.style || !n.style.fontFamily) continue;
  // skip the integer-safe ones first; we'll keep only "round" sizes (real tokens)
  const size = Math.round(n.style.fontSize * 100) / 100;
  if (size % 1 !== 0) continue; // skip fractional (those are accidental)
  const key = `${n.style.fontFamily}__${n.style.fontWeight}__${size}`;
  if (!typography[key]) {
    typography[key] = {
      family: n.style.fontFamily,
      weight: n.style.fontWeight,
      size,
      lineHeightPx: n.style.lineHeightPx ?? null,
      letterSpacing: n.style.letterSpacing ?? 0,
    };
  }
}

// ---------- write outputs ----------
await mkdir(OUT, { recursive: true });

const summary = {
  source: 'tools/figma-sync/api/raw/nodes-pages.json',
  fileLastModified: data.lastModified,
  counts: {
    candidateRowFrames: rows.length,
    uniqueTokenNames: byName.size,
    extractedColors: Object.keys(colors).length,
    extractedElevation: Object.keys(elevation).length,
    distinctTypographyStyles: Object.keys(typography).length,
  },
};

await writeFile(`${OUT}/_summary.json`, JSON.stringify(summary, null, 2));
await writeFile(`${OUT}/colors.json`, JSON.stringify(colors, null, 2));
await writeFile(`${OUT}/elevation.json`, JSON.stringify(elevation, null, 2));
await writeFile(`${OUT}/typography.json`, JSON.stringify(typography, null, 2));

console.log(JSON.stringify(summary, null, 2));
console.log(`\n✔ extracted to ${OUT}/`);
