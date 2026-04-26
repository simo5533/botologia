/**
 * Monorepo : Next écrit .next/ dans BoTooLogIA/BoTooLogIA, alors que Vercel
 * attend .next/ à la racine du dépôt quand "Root Directory" n'est pas réglé sur l'app.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "BoTooLogIA", "BoTooLogIA", ".next");
const dest = path.join(root, ".next");

if (!fs.existsSync(src)) {
  console.error("vercel-copy-next: dossier manquant", src);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log("vercel-copy-next: copié", src, "->", dest);
