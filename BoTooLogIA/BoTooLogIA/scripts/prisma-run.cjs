/**
 * Prisma CLI : sur Vercel, supprime d'abord le paquet local (souvent corrompu / incomplet)
 * pour que npx n'utilise pas le shim .bin/prisma -> build/index.js manquant.
 * Ensuite : npx --package=prisma@x (cache npm, hors de ce node_modules).
 */
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

/**
 * Fichier .env chargé ici (pas dans prisma.config.ts) : le loader Prisma résout
 * quand même require("dotenv") dans la config, ce qui casse Vercel sans le paquet.
 */
if (String(process.env.VERCEL) !== "1") {
  try {
    require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
    require("dotenv").config({ path: path.join(process.cwd(), ".env") });
  } catch {
    /* dotenv manquant : DATABASE_URL devra venir d’ailleurs */
  }
}

const PRISMA_PIN = "7.5.0";
const args = process.argv.slice(2);

/**
 * Vercel fournit VERCEL=1 ; sans ça, on ne touche pas à node_modules (dev local).
 */
function purgeVercelBrokenPrismaPackage() {
  if (String(process.env.VERCEL) !== "1") return;
  const nm = path.join(process.cwd(), "node_modules");
  const entries = [
    path.join(nm, "prisma"),
    path.join(nm, ".bin", "prisma"),
    path.join(nm, ".bin", "prisma.cmd"),
  ];
  for (const p of entries) {
    try {
      if (!fs.existsSync(p)) continue;
      const st = fs.lstatSync(p);
      if (st.isDirectory()) {
        fs.rmSync(p, { recursive: true, force: true });
      } else {
        fs.unlinkSync(p);
      }
    } catch {
      /* on continue */
    }
  }
}

purgeVercelBrokenPrismaPackage();

const r = spawnSync(
  "npx",
  ["--yes", `--package=prisma@${PRISMA_PIN}`, "prisma", ...args],
  { stdio: "inherit", shell: true, cwd: process.cwd(), env: process.env }
);
process.exit(r.status == null ? 1 : r.status);
