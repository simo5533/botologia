"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Bot, Settings, BarChart3, ClipboardList, Globe, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/lib/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Settings,
  BarChart3,
  ClipboardList,
  Globe,
  Headphones,
};

/**
 * BoToLab — Nos services IA : cartes avec fond vidéo animé
 */
export default function BoToLabPage() {
  return (
    <>
      <SectionWrapper
        id="services"
        className="bg-[#0f172a]"
        title="Nos Services en Intelligence Artificielle"
        titleGradient
        subtitle="Découvrez nos solutions adaptées à vos besoins pour automatiser, optimiser et propulser votre entreprise grâce à nos robots créés par des experts IA."
        headingLevel={1}
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
    </>
  );
}
