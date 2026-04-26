/**
 * CSRF / origine : pour les mutations API depuis le navigateur, on refuse les
 * requêtes dont l'Origin ne correspond ni au site actuel, ni à NEXT_PUBLIC_APP_URL.
 * Requêtes sans Origin (curl, certains outils) : autorisées.
 *
 * Même hôte (Origin === host de la requête) : toujours autorisé, pour que
 * Vercel / domaine custom fonctionnent même si NEXT_PUBLIC_APP_URL est mal
 * calibré (cause fréquente de 403 sur /api/... en prod).
 */

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function isUnsafeCrossOriginApiRequest(request: Request): boolean {
  const method = request.method.toUpperCase();
  if (!MUTATING.has(method)) return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host");
  if (host) {
    try {
      if (new URL(origin).host === host) {
        return false;
      }
    } catch {
      // ignore
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!appUrl) return false;
  try {
    const allowed = new URL(appUrl).origin;
    return origin !== allowed;
  } catch {
    return false;
  }
}
