import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, main, config, cname] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../src/main.js", import.meta.url), "utf8"),
  readFile(new URL("../vite.config.js", import.meta.url), "utf8"),
  readFile(new URL("../CNAME", import.meta.url), "utf8")
]);

test("HTML loads the stylesheet and app entry from relative paths", () => {
  assert.match(html, /href="\.\/src\/styles\.css"/);
  assert.match(html, /src="\.\/src\/main\.js"/);
  assert.match(html, /href="\.\/manifest\.webmanifest"/);
  assert.match(html, /href="\.\/icon\.svg"/);
  assert.doesNotMatch(main, /import\s*["']\.\/styles\.css["']/);
});

test("Vite uses the root base configured for the custom domain", () => {
  assert.match(config, /base:\s*["']\/["']/);
  assert.equal(cname.trim(), "sticker-ios.erikraft.com");
});
