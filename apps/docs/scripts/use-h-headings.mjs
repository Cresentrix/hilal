#!/usr/bin/env node
/**
 * Convert plain `<h2>X</h2>` / `<h3>X</h3>` JSX elements to `<H2>` / `<H3>`
 * across docs pages, and add the import. Skips content inside backtick
 * template strings (those are usually code snippets shown to readers).
 *
 * Heuristic for skipping templates: we only rewrite headings on lines whose
 * leading whitespace places them inside JSX (i.e. exactly 6 spaces — the
 * indentation level used by section headings inside `return ( ... )`).
 * This avoids most code-snippet false positives.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'app', 'docs');

const PAGES = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.isFile() && ent.name === 'page.tsx') PAGES.push(p);
  }
}
walk(ROOT);

function rewrite(src) {
  // Only rewrite lines that start with exactly 6 spaces of indent — the JSX
  // section level. Template strings are inside backticks at column 8+ in our
  // codebase and won't match this leading-whitespace constraint.
  const out = src
    .split('\n')
    .map((line) => {
      const m = line.match(/^(      )<(h[23])>([^<]+)<\/\2>(.*)$/);
      if (!m) return line;
      const [, indent, tag, content, rest] = m;
      const Comp = tag === 'h2' ? 'H2' : 'H3';
      return `${indent}<${Comp}>${content}</${Comp}>${rest}`;
    })
    .join('\n');
  return out;
}

let touched = 0;
for (const file of PAGES) {
  const src = fs.readFileSync(file, 'utf8');
  if (!/^      <h[23]>/m.test(src)) continue;
  let next = rewrite(src);
  if (next === src) continue;
  // Add import if not already present.
  if (!/from '.*\/_components\/Heading'/.test(next)) {
    // Pick the right relative depth.
    const rel = path.relative(path.dirname(file), path.join(__dirname, '..', 'app', '_components', 'Heading'))
      .split(path.sep).join('/');
    const importLine = `import { H2, H3 } from '${rel}';`;
    // Insert after the last existing `import` line.
    const lines = next.split('\n');
    let lastImport = -1;
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].startsWith('import ')) lastImport = i;
      else if (lastImport >= 0 && lines[i].trim() === '') break;
    }
    if (lastImport >= 0) {
      lines.splice(lastImport + 1, 0, importLine);
      next = lines.join('\n');
    }
  }
  fs.writeFileSync(file, next, 'utf8');
  touched += 1;
  console.log(path.relative(ROOT, file));
}
console.log(`\n${touched} files updated`);
