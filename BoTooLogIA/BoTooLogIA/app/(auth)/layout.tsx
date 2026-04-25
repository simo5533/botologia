/**
 * Layout des pages d’authentification (login, etc.) — fond futuriste, pas de header/footer.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-theme min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="login-theme-bg" aria-hidden />
      {children}
    </div>
  );
}
