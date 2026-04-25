"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { BUDGET_RANGES } from "./BudgetSlider";
import { SERVICE_OPTIONS } from "./ServiceCard";
import { cn } from "@/lib/utils";

export type DevisFormData = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  services: string[];
  budget: string;
  timeline: string;
  frequency: string;
  projectDescription: string;
  usedAiTools: boolean;
  aiToolsList: string;
  mainObjective: string;
  howHeard: string;
  attachmentName?: string;
};

const timelineLabels: Record<string, string> = {
  urgent: "Urgent (< 2 semaines)",
  short: "Court terme (1 mois)",
  medium: "Moyen terme (3 mois)",
  long: "Long terme (6 mois+)",
  defined: "À définir ensemble",
};

const frequencyLabels: Record<string, string> = {
  unique: "Projet unique",
  monthly: "Mensuel",
  quarterly: "Trimestriel",
  annual: "Annuel / Partenariat long terme",
};

const objectiveLabels: Record<string, string> = {
  time: "Gagner du temps",
  costs: "Réduire les coûts",
  sales: "Augmenter les ventes",
  quality: "Améliorer la qualité",
  differentiate: "Se différencier de la concurrence",
  all: "Tout à la fois",
};

type StepSummaryProps = {
  data: DevisFormData;
  className?: string;
};

export function StepSummary({ data, className }: StepSummaryProps) {
  const budgetLabel = BUDGET_RANGES.find((r) => r.id === data.budget)?.label ?? data.budget;
  const selectedServices = data.services
    .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.title)
    .filter(Boolean);

  const sections: { title: string; items: { label: string; value: string }[] }[] = [
    {
      title: "Profil",
      items: [
        { label: "Nom", value: data.fullName },
        { label: "Société", value: data.company },
        { label: "Email", value: data.email },
        { label: "Téléphone", value: data.phone },
        { label: "Poste", value: data.jobTitle },
      ],
    },
    {
      title: "Services IA",
      items: selectedServices.length ? selectedServices.map((s) => ({ label: s ?? "—", value: "" })) : [{ label: "—", value: "" }],
    },
    {
      title: "Budget & délais",
      items: [
        { label: "Budget", value: budgetLabel },
        { label: "Délai", value: timelineLabels[data.timeline] ?? data.timeline },
        { label: "Fréquence", value: frequencyLabels[data.frequency] ?? data.frequency },
      ],
    },
    {
      title: "Projet",
      items: [
        { label: "Description", value: data.projectDescription || "—" },
        { label: "Déjà utilisé des outils IA", value: data.usedAiTools ? "Oui" : "Non" },
        ...(data.usedAiTools && data.aiToolsList ? [{ label: "Outils utilisés", value: data.aiToolsList }] : []),
        { label: "Objectif principal", value: objectiveLabels[data.mainObjective] ?? data.mainObjective },
        { label: "Comment nous avez-vous connus", value: data.howHeard },
        ...(data.attachmentName ? [{ label: "Pièce jointe", value: data.attachmentName }] : []),
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-6", className)}
    >
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="h-6 w-6 text-holographic-cyan" aria-hidden />
        <h3 className="font-heading text-lg font-semibold text-white">Récapitulatif de votre demande</h3>
      </div>
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-holographic-cyan mb-2">{section.title}</p>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {section.items.map((item, j) => (
                <li key={j}>
                  <span className="text-slate-500">{item.label}</span>
                  {item.value ? ` : ${item.value}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
