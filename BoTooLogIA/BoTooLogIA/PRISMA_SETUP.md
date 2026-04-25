# Configuration Prisma 7 - BOTOOLOGIA

## Versions
- Prisma CLI : 7.4.0
- @prisma/client : 7.4.0

## Important
En Prisma 7, l'URL de connexion est définie dans `prisma.config.ts`, PAS dans `schema.prisma`.

Si l'IDE affiche "url is missing" dans schema.prisma, c'est un **FAUX POSITIF**.

## Validation
La référence de validité est toujours :
```bash
npx prisma validate
```

Si cette commande réussit, le schéma est correct.

## Warnings IDE
Les warnings de l'extension Prisma peuvent être ignorés si :
1. `npx prisma validate` réussit
2. `npx prisma generate` réussit
3. L'application se connecte correctement à la DB

## Configuration IDE
Le fichier `.vscode/settings.json` force l'extension à utiliser Prisma 7 :
- `prisma.pinToPrisma6: false`
- `prisma.trace.server: "verbose"` (debug si besoin)

## Nouveau dev
1. `npm install`
2. Vérifier `.vscode/settings.json` existe
3. Redémarrer l'éditeur
4. Exécuter **"Prisma: Unpin the current workspace from Prisma 6"** si une popup apparaît
5. `npx prisma generate`

## Fichiers critiques
| Fichier | Rôle | Statut |
|---------|------|--------|
| `.vscode/settings.json` | `prisma.pinToPrisma6: false` | OK |
| `prisma.config.ts` | `datasource.url` = `env("DATABASE_URL")` | OK |
| `prisma/schema.prisma` | `datasource db` **sans** `url` | OK |
| `.env` | `DATABASE_URL="postgresql://..."` | OK (présent) |

## Commandes de référence
```bash
npx prisma --version   # Vérifier version
npx prisma validate    # Référence de vérité
npx prisma generate    # Générer le client
npx prisma migrate dev # Migrations
npx prisma studio      # UI admin DB
```

**Forcer l’extension Prisma 7 :** `Ctrl+Shift+P` → *Prisma: Unpin the current workspace from Prisma 6*
