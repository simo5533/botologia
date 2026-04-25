import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoToLink — BoTooLogIA",
  description:
    "Contactez BoTooLogIA. Demande de devis, rendez-vous avec un expert. Réponse sous 24h.",
};

export default function BoToLinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
