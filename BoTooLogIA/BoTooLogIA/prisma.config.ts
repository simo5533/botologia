import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Charger .env (override: true pour que le fichier .env écrase les variables déjà définies)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath, override: true });
dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl?.trim()) {
  throw new Error(
    "DATABASE_URL manquant dans .env à la racine du projet. Elle doit reprendre POSTGRES_USER, POSTGRES_PASSWORD et POSTGRES_DB (même .env), hôte 127.0.0.1 et port 5433 si la BDD tourne dans Docker (voir commentaire datasource dans prisma/schema.prisma)."
  );
}

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
