"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { PageTransitionWrapper } from "./PageTransitionWrapper";

/**
 * Enveloppe le contenu du layout public pour appliquer les transitions de page (teleport).
 * Utilise le pathname comme clé pour déclencher exit/enter à chaque navigation.
 */
export function PublicLayoutTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransitionWrapper key={pathname}>
        {children}
      </PageTransitionWrapper>
    </AnimatePresence>
  );
}
