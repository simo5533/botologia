/**
 * Lance le CLI Prisma : binaire local si présent, sinon npx (Vercel / install incomplète).
 * Version npx : aligner sur package-lock (prisma) lors des montées de version.
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const FALLBACK_PRISMA_VERSION = "7.5.0";
const args = process.argv.slice(2);

let useLocal = false;
let cli;
try {
  const resolved = require.resolve("prisma/package.json", { paths: [process.cwd()] });
  const root = path.dirname(resolved);
  cli = path.join(root, "build", "index.js");
  useLocal = fs.existsSync(cli);
} catch {
  useLocal = false;
}

if (useLocal) {
  const r = spawnSync(process.execPath, [cli, ...args], { stdio: "inherit" });
  process.exit(r.status == null ? 1 : r.status);
}

// Repli (souvent Vercel) : npx installe exécute une version complète depuis le registry
const r = spawnSync(
  "npx",
  ["--yes", `prisma@${FALLBACK_PRISMA_VERSION}`, ...args],
  { stdio: "inherit", shell: true, cwd: process.cwd(), env: process.env }
);
process.exit(r.status == null ? 1 : r.status);
