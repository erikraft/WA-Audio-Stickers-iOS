import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("Vite HTML entry points resolve from the project root", () => {
  assert.match(html, /href="\/src\/styles\.css"/);
  assert.match(html, /src="\/src\/main\.js"/);
  assert.match(html, /href="\/manifest\.webmanifest"/);
  assert.match(html, /href="\/icon\.svg"/);
  assert.doesNotMatch(html, /\/WA-Audio-Stickers-iOS\/src\//);
});

test("GitHub Pages project prefix remains configured in Vite base", async () => {
  const config = await readFile(new URL("../vite.config.js", import.meta.url), "utf8");
  assert.match(config, /base:\s*["']\/WA-Audio-Stickers-iOS\/["']/);
});
