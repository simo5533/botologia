// Aucun import depuis "prisma/config" : sur Vercel, scripts/prisma-run.cjs peut retirer
// node_modules/prisma ; npx résout alors mal ce module pour ce fichier.
// Le .env local est chargé dans scripts/prisma-run.cjs (hors VERCEL).

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl?.trim()) {
  throw new Error(
    "DATABASE_URL manquant. En production, configure-le dans Vercel. En local, place un .env à la racine de l’app et lance `npm run build` (le script charge le .env avant Prisma)."
  );
}

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
};
