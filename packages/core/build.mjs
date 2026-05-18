/**
 * @hilal-ds/core build script
 * Compiles src/index.css → dist/hilal.css with PostCSS.
 * Plugins:
 *   - postcss-import     bundle @import statements
 *   - postcss-nested     allow nested rules
 *   - postcss-logical    rewrite physical props (margin-left) to logical (margin-inline-start) — RTL by default
 *   - cssnano            minify production output
 */
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssLogical from 'postcss-logical';
import cssnano from 'cssnano';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname);

await mkdir(`${ROOT}/dist`, { recursive: true });

const src = await readFile(`${ROOT}/src/index.css`, 'utf8');

const result = await postcss([
  postcssImport(),
  postcssNested(),
  postcssLogical({ inlineDirection: 'left-to-right' }),
  cssnano({ preset: 'default' }),
]).process(src, { from: `${ROOT}/src/index.css`, to: `${ROOT}/dist/hilal.css` });

await writeFile(`${ROOT}/dist/hilal.css`, result.css, 'utf8');
if (result.map) await writeFile(`${ROOT}/dist/hilal.css.map`, result.map.toString(), 'utf8');

console.log(`✔ core css built (${(result.css.length / 1024).toFixed(1)} KB)`);
