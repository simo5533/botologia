"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Enveloppe Lenis pour le smooth scroll (chargement dynamique, pas de SSR).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
