"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Target, Zap } from "lucide-react";
import { RobotSection } from "@/components/botohub/RobotSection";
import { PortalBackground } from "@/components/effects/PortalBackground";
import { useTilt } from "@/components/effects/useTilt";
import { SectionHeader } from "./SectionHeader";
import { CardVideoBackground } from "@/components/ui/CardVideoBackground";
import { cn } from "@/lib/utils";

/** Même vidéo que toutes les cartes — fond carte service */
const CARD_VIDEO_SRC = "/videos/fond-carte-service.mp4";

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const cards = [
  {
    icon: Cpu,
    title: "Expertise IA",
    description:
      "Des solutions d'intelligence artificielle conçues par des experts pour automatiser et optimiser vos processus.",
  },
  {
    icon: Target,
    title: "Résultats ciblés",
    description:
      "Objectifs clairs, indicateurs mesurables et accompagnement personnalisé pour atteindre vos ambitions.",
  },
  {
    icon: Zap,
    title: "Déploiement agile",
    description:
      "Mise en production rapide et itérations continues pour s'adapter à l'évolution de votre métier.",
  },
] as const;

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { onMouseMove, onMouseLeave, style, isTiltEnabled } = useTilt();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={item}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl transition-shadow duration-300 overflow-hidden",
        "hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
        className
      )}
      style={{ position: "relative" }}
    >
      <CardVideoBackground
        videoSrc={CARD_VIDEO_SRC}
        overlayOpacity={0.82}
        className="relative w-full h-full rounded-2xl border border-cyan-500/20 shadow-xl"
      >
        <div
          onMouseMove={isTiltEnabled ? onMouseMove : undefined}
          onMouseLeave={isTiltEnabled ? onMouseLeave : undefined}
          style={isTiltEnabled ? style : undefined}
          className="relative p-8 h-full min-h-[200px]"
        >
          {children}
        </div>
      </CardVideoBackground>
    </motion.div>
  );
}

export function WhyBoToHubSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-14 md:py-16 bg-[#0b1220] border-t border-white/10 overflow-hidden"
      aria-labelledby="why-botohub-heading"
    >
      <PortalBackground />
      <div className="relative max-w-6xl mx-auto px-6">
        {/* BLOC 1 — Titre + tagline */}
        <SectionHeader />

        {/* BLOC 2 — Robot + texte */}
        <RobotSection />

        {/* Séparateur entre robot et carrousel */}
        <div
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "1px",
            margin: "0 auto 24px",
            background:
              "linear-gradient(90deg, transparent, rgba(0,200,255,0.2), transparent)",
          }}
          aria-hidden
        />

        {/* BLOC 3 — Cartes (Expertise, Résultats, Déploiement) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={
            reduceMotion
              ? undefined
              : {
                  show: { transition: { staggerChildren: 0.15 } },
                }
          }
          className="grid md:grid-cols-3 gap-10"
        >
          {cards.map(({ icon: Icon, title, description }) => (
            <TiltCard key={title}>
              <div className="flex flex-col items-start text-left">
                <p
                  className="text-gray-400 leading-relaxed text-sm mb-4 w-full"
                  style={{
                    textShadow: "0 0 8px rgba(148,163,184,0.15)",
                  }}
                >
                  {description}
                </p>
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400 mb-4">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white tracking-tight">
                  {title}
                </h3>
              </div>
            </TiltCard>
          ))}
        </motion.div>
        <div className="mt-16 text-center">
          <Link
            href="/botolink"
            className="inline-flex items-center justify-center px-8 py-3 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0b1220]"
          >
            Planifier une consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
