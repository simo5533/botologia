"use client";

const WHY_ITEMS = [
  {
    icon: "⚡",
    title: "Livraison rapide",
    desc:
      "De 2 à 12 semaines selon la complexité. " +
      "Démos régulières à chaque sprint.",
    color: "#fbbf24",
  },
  {
    icon: "🎯",
    title: "Sur mesure",
    desc:
      "Chaque solution est construite pour votre " + "métier spécifique. Zéro générique.",
    color: "#00c8ff",
  },
  {
    icon: "🔒",
    title: "Sécurisé",
    desc:
      "Vos données restent vôtres. Architecture " + "sécurisée et conforme RGPD.",
    color: "#00e5a0",
  },
  {
    icon: "📈",
    title: "ROI prouvé",
    desc:
      "Nos clients récupèrent leur investissement " + "en 3 à 6 mois en moyenne.",
    color: "#7b5cff",
  },
  {
    icon: "🤝",
    title: "Accompagnement",
    desc:
      "3 mois de support inclus après livraison. " + "Vous n'êtes jamais seul.",
    color: "#ff4d6d",
  },
  {
    icon: "🌍",
    title: "100% remote",
    desc:
      "Partout en France et à l'international. " + "On s'adapte à vous.",
    color: "#00c8ff",
  },
] as const;

export function BoToLinkWhyGrid() {
  return (
    <div className="bl-why-grid">
      {WHY_ITEMS.map((item, i) => (
        <div key={i} className="bl-why-card">
          <div className="bl-why-icon" style={{ color: item.color }}>
            {item.icon}
          </div>
          <h3 className="bl-why-title">{item.title}</h3>
          <p className="bl-why-desc">{item.desc}</p>
          <div
            className="bl-why-line"
            style={{
              background: `linear-gradient(90deg, ${item.color}60, transparent)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
