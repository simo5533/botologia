/**
 * CSRF / origine : pour les mutations API depuis le navigateur, l’Origin doit
 * correspondre à NEXT_PUBLIC_APP_URL si cette variable est définie.
 * Requêtes sans Origin (curl, tests, certains proxies) : autorisées pour ne pas casser l’outillage.
 */

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function isUnsafeCrossOriginApiRequest(request: Request): boolean {
  const method = request.method.toUpperCase();
  if (!MUTATING.has(method)) return false;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!appUrl) return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const allowed = new URL(appUrl).origin;
    return origin !== allowed;
  } catch {
    return false;
  }
}
