import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoToWorks — Projets & Réalisations | BoTooLogIA",
  description:
    "Portfolio et réalisations BoTooLogIA. Projets IA, cas clients et retours d'expérience.",
};

export default function BoToWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
