#!/usr/bin/env node
/**
 * Pulls the Hilal Figma file via the REST API and audits its tokens + components.
 *
 * Required env (in repo-root .env):
 *   FIGMA_TOKEN     personal access token (file_content:read scope is enough)
 *   FIGMA_FILE_KEY  the file key from the Figma URL
 *
 * Output:
 *   tools/figma-sync/api/raw/nodes-pages.json   raw dump (gitignored)
 *   tools/figma-sync/api/report/audit.json      structured audit (gitignored)
 *
 * Note: this script does NOT yet write to packages/tokens/src/. That's the next
 * step — once we lock down the schema mapping (Figma names → DTCG paths), it
 * will overwrite the JSON files there. For now it produces a report you can
 * eyeball and adjust by hand.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

// ---------- env ----------
async function loadEnv() {
  try {
    const text = await readFile(`${ROOT}/.env`, 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}
await loadEnv();

const TOKEN = process.env.FIGMA_TOKEN;
const KEY = process.env.FIGMA_FILE_KEY;
if (!TOKEN || !KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY in .env');
  process.exit(1);
}

// ---------- fetch ----------
async function figma(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { 'X-Figma-Token': TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${path}`);
  return res.json();
}

console.log('→ listing pages…');
const meta = await figma(`/files/${KEY}?depth=1`);
const pages = meta.document.children.map((p) => ({ id: p.id, name: p.name }));
console.log(pages.map((p) => `  ${p.id}\t${p.name}`).join('\n'));

const TARGET_PAGES = pages
  .filter((p) => /^(0[0-9]\s|0[0-9]$|01\b|02\b|03\b|04\b|05\b)/.test(p.name))
  .map((p) => p.id);

console.log(`→ pulling content for ${TARGET_PAGES.length} pages…`);
const dump = await figma(`/files/${KEY}/nodes?ids=${TARGET_PAGES.join(',')}`);

await mkdir(`${__dirname}/api/raw`, { recursive: true });
await writeFile(`${__dirname}/api/raw/nodes-pages.json`, JSON.stringify(dump));
console.log(`→ wrote api/raw/nodes-pages.json (${(JSON.stringify(dump).length / 1024 / 1024).toFixed(1)} MB)`);

console.log('done. Run the parser in api/parse.py for an audit, or wire this script up to packages/tokens/src/');
