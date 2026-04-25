import HeroBanner from "@/components/ui/HeroBanner";
import { WhyBoToHubSection, ScrollToBanner } from "@/components/botohub";
import AgentIA from "@/components/ai/AgentIA";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlitchText, HoloCard } from "@/components/effects";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/lib/data/services";
import { Bot, Settings, BarChart3, ClipboardList, Globe, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Settings,
  BarChart3,
  ClipboardList,
  Globe,
  Headphones,
};

export const metadata: Metadata = {
  title: "BoToHub — BoTooLogIA",
  description: "BoTooLogIA — Nous cherchons les PROBLÈMES. Nous avons les SOLUTIONS.",
};

/**
 * BoToHub — Page d'accueil : hero, WhyBoToHub (portail dimension), Code 37, 3D, services, valeurs
 */
export default function BoToHubPage() {
  return (
    <main>
      <ScrollToBanner />
      <HeroBanner />

      {/* ══════════════════════════════
          BLOC 1 — Titre (BoToHub + tagline PROBLÈMES/SOLUTIONS)
          BLOC 2 — Robot + texte (entre titre et carousel)
          BLOC 3 — Carousel cards (Expertise IA, Résultats ciblés, Déploiement agile)
          ══════════════════════════════ */}
      <WhyBoToHubSection />

      <section className="w-full px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              Intelligence Artificielle
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              Parlez à notre <GlitchText text="Agent IA" intensity="low" className="text-cyan-400" />
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              Vocal & écrit — Disponible 24h/24 pour répondre à vos questions
            </p>
          </div>
          <AgentIA />
        </div>
      </section>

      <SectionWrapper
        id="services"
        className="bg-[#0f172a]"
        title="Nos Services en Intelligence Artificielle"
        titleGradient
        subtitle="Découvrez nos solutions adaptées à vos besoins pour automatiser, optimiser et propulser votre entreprise grâce à nos robots créés par des experts IA."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Bot;
            return (
              <ServiceCard
                key={item.id}
                index={i}
                icon={<Icon className="h-6 w-6" aria-hidden />}
                title={item.title}
                description={item.description}
                href="/botolink"
                linkText="Entrer dans le futur →"
                delay={i * 80}
              />
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="values"
        title="Nos valeurs"
        titleGradient
        subtitle="Nos valeurs reposent sur l'innovation IA, l'automatisation intelligente et la création de solutions qui accélèrent la croissance des entreprises."
      >
        <div className="grid gap-8 md:grid-cols-3 text-center">
          <HoloCard className="rounded-2xl border border-reveal-cream/30 bg-reveal-cream/20 dark:bg-slate-800/50 dark:border-white/10 backdrop-blur-xl p-8 shadow-[0_0_20px_rgba(0,212,255,0.04)]">
            <h3 className="font-heading text-lg font-semibold text-holographic-cyan">
              Visionnaire
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Nous anticipons les usages de demain pour vous donner de
              l&apos;avance aujourd&apos;hui.
            </p>
          </HoloCard>
          <HoloCard className="rounded-2xl border border-reveal-cream/30 bg-reveal-cream/20 dark:bg-slate-800/50 dark:border-white/10 backdrop-blur-xl p-8 shadow-[0_0_20px_rgba(0,212,255,0.04)]">
            <h3 className="font-heading text-lg font-semibold text-holographic-cyan">
              Premium
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Qualité et rigueur dans chaque livrable et chaque interaction.
            </p>
          </HoloCard>
          <HoloCard className="rounded-2xl border border-reveal-cream/30 bg-reveal-cream/20 dark:bg-slate-800/50 dark:border-white/10 backdrop-blur-xl p-8 shadow-[0_0_20px_rgba(0,212,255,0.04)]">
            <h3 className="font-heading text-lg font-semibold text-holographic-cyan">
              Impact
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Des résultats mesurables et durables pour votre entreprise.
            </p>
          </HoloCard>
        </div>
      </SectionWrapper>
    </main>
  );
}
