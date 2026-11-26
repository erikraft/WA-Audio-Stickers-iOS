import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const [html, entry, viteConfig, serviceWorker] = await Promise.all([
  read("../index.html"),
  read("../src/main.js"),
  read("../vite.config.js"),
  read("../public/sw.js")
]);

test("the app shell loads CSS as a stylesheet and JavaScript as a module", () => {
  assert.match(html, /<link rel="stylesheet" href="\.\/src\/styles\.css">/);
  assert.match(html, /<script type="module" src="\.\/src\/main\.js">/);
  assert.doesNotMatch(entry, /import\s*["']\.\/styles\.css["']/);
});

test("Vite emits root-relative assets for the configured custom domain", () => {
  assert.match(viteConfig, /base:\s*["']\/["']/);
  assert.match(html, /href="\.\/manifest\.webmanifest"/);
  assert.match(html, /href="\.\/icon\.svg"/);
});

test("a deployment bumps this app's cache and preserves unrelated caches", () => {
  assert.match(serviceWorker, /CACHE_NAME\s*=\s*`\$\{CACHE_PREFIX\}v3`/);
  assert.match(serviceWorker, /key\.startsWith\(CACHE_PREFIX\)\s*&&\s*key !== CACHE_NAME/);
});
