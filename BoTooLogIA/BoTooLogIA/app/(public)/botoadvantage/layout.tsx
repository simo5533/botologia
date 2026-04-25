import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Notre Méthode IA | Transformation Digitale ROI Garanti — BoTooLogIA",
  description:
    "Méthode BoTooLogIA en 4 phases : Audit stratégique, Feuille de route IA, Développement agile, Déploiement et ROI mesuré. Résultats garantis pour les dirigeants et CEOs. Audit gratuit sous 48h.",
  keywords: [
    "transformation digitale IA",
    "ROI intelligence artificielle",
    "stratégie IA entreprise",
    "audit IA gratuit",
    "automatisation processus",
    "agent IA sur mesure",
    "consultant IA B2B",
    "méthode agile IA",
    "déploiement IA rapide",
    "IA PME dirigeant CEO",
  ],
  openGraph: {
    title: "Notre Méthode IA | BoTooLogIA",
    description:
      "Transformez votre entreprise avec l'IA. Méthode éprouvée sur 150+ projets. ROI en 4 mois.",
    type: "website",
  },
};

export default function BoToAdvantageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
