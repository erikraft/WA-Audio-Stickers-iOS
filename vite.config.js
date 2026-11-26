import { defineConfig } from "vite";

// The repository has a custom domain (CNAME), so the app is deployed at the
// domain root rather than under GitHub Pages' /<repository>/ path.
export default defineConfig({
  base: "/",
  build: { outDir: "dist", emptyOutDir: true, sourcemap: false },
  server: { host: "0.0.0.0" }
});
