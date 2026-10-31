// Builds self-contained single-file HTML pages (all JS and CSS inlined) into ./preview.
// Used for the hosted preview; the production site uses the normal `npm run build`.
import { build } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outRoot = join(root, "preview");
rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

for (const page of ["index", "privacy", "terms"]) {
  const outDir = join(root, ".preview-tmp", page);
  await build({
    root,
    configFile: false,
    logLevel: "warn",
    plugins: [react()],
    build: {
      outDir,
      emptyOutDir: true,
      modulePreload: false,
      cssCodeSplit: false,
      rollupOptions: { input: join(root, `${page}.html`), output: { inlineDynamicImports: true } },
    },
  });
  let html = readFileSync(join(outDir, `${page}.html`), "utf8");
  const assets = join(outDir, "assets");
  for (const f of readdirSync(assets)) {
    const code = readFileSync(join(assets, f), "utf8");
    if (f.endsWith(".js")) {
      html = html.replace(new RegExp(`<script type="module" crossorigin src="/assets/${f}"></script>`), () => "");
      html = html.replace("</body>", () => `<script type="module">${code.replace(/<\/script/gi, "<\\/script")}</script>\n</body>`);
    } else if (f.endsWith(".css")) {
      html = html.replace(new RegExp(`<link rel="stylesheet" crossorigin href="/assets/${f}">`), () => `<style>${code}</style>`);
    }
  }
  html = html.replace(/<link rel="icon"[^>]*>/, "");
  writeFileSync(join(outRoot, `${page}.html`), html);
}
rmSync(join(root, ".preview-tmp"), { recursive: true, force: true });

// The hosted preview wraps the main page in its own document skeleton, so emit a body-only variant too.
const full = readFileSync(join(outRoot, "index.html"), "utf8");
const head = full.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>/g, "");
const body = full.match(/<body>([\s\S]*?)<\/body>/)[1];
const artifactHead = head.replace(/<title>[^<]*<\/title>/, '<title>Novus Core Holdings</title>\n<meta name="claude:viewport-fit-sides" content="cover">');
writeFileSync(join(outRoot, "artifact.html"), `${artifactHead}\n${body}`);
console.log("preview built:", readdirSync(outRoot));
