import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoToLab — Services IA | BoTooLogIA",
  description:
    "Laboratoire de services IA : innovation, prototypage, ML Ops et déploiement. BoTooLogIA — Le Futur dès aujourd'hui.",
};

export default function BoToLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
