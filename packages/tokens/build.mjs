/**
 * @hilal/tokens build script
 * Reads src/*.tokens.json (W3C DTCG format) and produces:
 *   dist/css/tokens.css
 *   dist/scss/tokens.scss
 *   dist/js/tokens.{mjs,cjs,d.ts}
 *   dist/json/tokens.json
 *   dist/tailwind/preset.cjs
 *
 * We use Style Dictionary 4 with the new ESM API.
 */
import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname);

const sd = new StyleDictionary({
  source: [`${ROOT}/src/**/*.tokens.json`],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'hilal',
      buildPath: `${ROOT}/dist/css/`,
      files: [{ destination: 'tokens.css', format: 'css/variables' }],
    },
    scss: {
      transformGroup: 'scss',
      prefix: 'hilal',
      buildPath: `${ROOT}/dist/scss/`,
      files: [{ destination: 'tokens.scss', format: 'scss/variables' }],
    },
    js: {
      transformGroup: 'js',
      buildPath: `${ROOT}/dist/js/`,
      files: [
        { destination: 'tokens.mjs', format: 'javascript/es6' },
        { destination: 'tokens.cjs', format: 'javascript/module' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: `${ROOT}/dist/json/`,
      files: [{ destination: 'tokens.json', format: 'json/nested' }],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

// copy hand-written theme files (dark, density, motion) into dist/themes/
import { readdir, copyFile, mkdir } from 'node:fs/promises';
const THEME_SRC = `${ROOT}/src/themes`;
const THEME_DST = `${ROOT}/dist/themes`;
await mkdir(THEME_DST, { recursive: true });
for (const f of await readdir(THEME_SRC)) {
  if (f.endsWith('.css')) await copyFile(`${THEME_SRC}/${f}`, `${THEME_DST}/${f}`);
}

console.log('✔ tokens + themes built');
