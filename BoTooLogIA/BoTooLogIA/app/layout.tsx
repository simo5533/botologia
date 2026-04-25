import type { Metadata } from "next";
import { Inter, Space_Grotesk, Manrope } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BoTooLogIA — Agence IA ChatBot & Automatisation",
    template: "%s | BoTooLogIA",
  },
  description:
    "Agence spécialisée en intelligence artificielle, chatbots sur mesure, automatisation et stratégie IA pour transformer votre entreprise.",
  keywords: [
    "agence IA",
    "chatbot",
    "automatisation",
    "intelligence artificielle",
    "agent IA",
    "stratégie IA",
    "BoTooLogIA",
  ],
  authors: [{ name: "BoTooLogIA" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "BoTooLogIA",
    title: "BoTooLogIA — Agence IA ChatBot & Automatisation",
    description:
      "Transformez votre entreprise avec l'IA. Chatbots, automatisation, agents IA.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoTooLogIA",
    description: "Agence IA — ChatBot & Automatisation",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} bg-theme-page`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans bg-theme-page">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
