// Copied into the generated package as scripts/finalize-dist.mjs by
// bin/postprocess-typescript.sh, and run as the last step of `npm run build`.
//
// WHY THIS EXISTS
//   `tsc` emits `.js` for both builds, and Node decides whether a `.js` file is
//   CommonJS or ESM from the NEAREST package.json's `type` field — not from the
//   `exports` condition that resolved it. Without a per-directory marker,
//   Node reads the root package.json (`"type": "commonjs"`) and parses
//   dist/esm/index.js as CommonJS, which dies on the first `import` statement
//   with "Cannot use import statement outside a module".
//
//   TypeScript resolves the bundled `.d.ts` the same way: under
//   `moduleResolution: node16|nodenext|bundler` the marker is what tells it
//   dist/esm/*.d.ts describes an ES module and dist/cjs/*.d.ts a CommonJS one.
//
//   The alternative — emitting `.mjs`/`.cjs` extensions — means rewriting every
//   relative specifier in the emitted output. Two three-line package.json files
//   do the same job with nothing to get out of sync.
import { mkdirSync, writeFileSync } from 'node:fs';

const markers = {
  'dist/cjs': 'commonjs',
  'dist/esm': 'module',
};

for (const [dir, type] of Object.entries(markers)) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/package.json`, `${JSON.stringify({ type }, null, 2)}\n`);
  console.log(`  wrote ${dir}/package.json ({"type":"${type}"})`);
}
