/**
 * Lance le CLI Prisma via require.resolve (hoisting npm / Vercel).
 * Usage : node scripts/prisma-run.cjs generate|migrate|...
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

let root;
try {
  const resolved = require.resolve("prisma/package.json", { paths: [process.cwd()] });
  root = path.dirname(resolved);
} catch {
  console.error('Paquet npm "prisma" introuvable. Exécutez: npm install');
  process.exit(1);
}
const cli = path.join(root, "build", "index.js");
if (!fs.existsSync(cli)) {
  console.error("CLI Prisma introuvable:", cli);
  process.exit(1);
}
const args = process.argv.slice(2);
const r = spawnSync(process.execPath, [cli, ...args], { stdio: "inherit" });
process.exit(r.status == null ? 1 : r.status);
