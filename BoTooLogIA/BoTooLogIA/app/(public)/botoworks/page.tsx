"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ArrowUpRight } from "lucide-react";
import HoloCard from "@/components/effects/HoloCard";

const BANNER_VIDEO_SRC = "/videos/banniere-botoworks.mp4";

const projects = [
  {
    id: "1",
    title: "Assistant client intelligent",
    domain: "Services",
    description: "Chatbot NLP pour support client avec réduction de 40% du temps de traitement.",
  },
  {
    id: "2",
    title: "Prédiction de demande",
    domain: "Retail",
    description: "Modèles de forecast pour optimisation des stocks et des approvisionnements.",
  },
  {
    id: "3",
    title: "Détection d'anomalies",
    domain: "Industrie",
    description: "Vision par ordinateur pour contrôle qualité en temps réel sur chaîne.",
  },
  {
    id: "4",
    title: "Recommandation personnalisée",
    domain: "E-commerce",
    description: "Système de recommandation multi-canal augmentant le panier moyen.",
  },
  {
    id: "5",
    title: "Automatisation documentaire",
    domain: "Legal",
    description: "Extraction et classification de documents pour cabinets juridiques.",
  },
  {
    id: "6",
    title: "Pilotage énergétique",
    domain: "Energy",
    description: "IA pour optimisation de la consommation et intégration renouvelables.",
  },
];

/**
 * BoToWorks — Vidéo en fond de la section réalisations (pas en début de page)
 */
export default function BoToWorksPage() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Vidéo en fond de cette partie uniquement */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden
      >
        <source src={BANNER_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Fond type verre dépoli : la vidéo reste visible à travers */}
      <div className="relative z-10 py-12 px-6 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-slate-900/50 border border-white/20 shadow-2xl py-10 px-6 sm:px-8">
        <SectionWrapper
          title="BoToWorks"
          subtitle="Réalisations et projets emblématiques."
          headingLevel={1}
          titleGradient
          className="!bg-transparent !py-8"
        >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : i * 0.06 }}
          >
            <HoloCard className="group relative overflow-hidden rounded-2xl border border-white/20 bg-slate-800/60 backdrop-blur-xl p-6 md:p-8 holographic-border hover:shadow-glow transition-all duration-300">
              <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                {project.domain}
              </span>
              <h2 className="mt-2 font-heading text-xl font-semibold bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <p className="mt-2 text-white/75 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                <span>BoTosquad</span>
                <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden />
              </div>
            </HoloCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
