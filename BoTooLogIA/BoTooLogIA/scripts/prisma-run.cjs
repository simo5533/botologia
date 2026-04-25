/**
 * CLI Prisma via npx --package (évite node_modules/prisma incomplet sur Vercel).
 * Mettre à jour Prisma dans package.json + cette version + package-lock.
 */
const { spawnSync } = require("node:child_process");

const PRISMA_PIN = "7.5.0";
const args = process.argv.slice(2);

const r = spawnSync(
  "npx",
  ["--yes", `--package=prisma@${PRISMA_PIN}`, "prisma", ...args],
  { stdio: "inherit", shell: true, cwd: process.cwd(), env: process.env }
);
process.exit(r.status == null ? 1 : r.status);
