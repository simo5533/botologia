/**
 * Base de connaissances BOTOOLOGIA — réponses instantanées sans appel API.
 * Recherche par patterns (insensible casse, accents). Réponses commerciales complètes.
 */

export interface KnowledgeEntry {
  patterns: string[];
  reply: string;
  category: string;
}

// ════════════════════════════════════════════
// BASE DE CONNAISSANCES BOTOOLOGIA
// ════════════════════════════════════════════
export const knowledgeBase: KnowledgeEntry[] = [
  {
    category: "salutation",
    patterns: [
      "bonjour",
      "bonsoir",
      "salut",
      "hello",
      "hi",
      "hey",
      "coucou",
      "bsr",
      "bjr",
      "slt",
      "good morning",
      "bonne journée",
    ],
    reply:
      "Bonjour ! Je suis BOTO, votre conseiller IA senior chez BoTooLogIA. 🤖\n\n" +
      "Je suis là pour vous aider à découvrir comment l'intelligence artificielle peut transformer votre entreprise.\n\n" +
      "Que puis-je faire pour vous ?",
  },
  {
    category: "services",
    patterns: [
      "services",
      "service",
      "proposez",
      "offre",
      "offrez",
      "faites",
      "spécialité",
      "solutions",
      "solution",
      "produits",
      "catalogue",
      "quoi",
      "que faites vous",
      "vous faites quoi",
    ],
    reply:
      "🚀 Voici nos 7 services IA sur mesure :\n\n" +
      "🤖 **Chatbot IA** — 2 000€ à 8 000€\n" +
      "Automatise 80% de vos demandes clients 24h/24\n\n" +
      "⚡ **Agent IA autonome** — 5 000€ à 30 000€\n" +
      "Automatise vos processus complets end-to-end\n\n" +
      "✍️ **Génération de contenu IA** — 500€/mois\n" +
      "Articles, posts, emails automatisés\n\n" +
      "📱 **Social Media IA** — 800€ à 2 500€/mois\n" +
      "Gestion complète de vos réseaux sociaux\n\n" +
      "🔍 **SEO IA** — 500€ à 2 000€/mois\n" +
      "Référencement optimisé par intelligence artificielle\n\n" +
      "📊 **Analyse prédictive** — Sur devis\n" +
      "Prévisions business basées sur vos données\n\n" +
      "🎯 **Conseil & Stratégie IA** — 500€/jour\n" +
      "Roadmap IA personnalisée pour votre entreprise\n\n" +
      "Quel service vous intéresse le plus ?",
  },
  {
    category: "chatbot",
    patterns: [
      "chatbot",
      "chat bot",
      "bot",
      "assistant virtuel",
      "assistant ia",
      "robot",
      "automatiser réponses",
      "réponses automatiques",
      "support automatique",
    ],
    reply:
      "🤖 Notre chatbot IA sur mesure peut :\n\n" +
      "✅ Gérer 80% des demandes sans intervention humaine\n" +
      "✅ Répondre 24h/24, 7j/7 sans fatigue\n" +
      "✅ Qualifier automatiquement vos prospects\n" +
      "✅ Prendre des rendez-vous en autonomie\n" +
      "✅ Intégration native à votre CRM/site\n\n" +
      "💰 Tarif : 2 000€ à 8 000€ (selon complexité)\n" +
      "⏱️ Livraison : 2 à 6 semaines\n" +
      "📈 ROI : positif en moins de 3 mois\n\n" +
      "Vous recevez combien de demandes par jour environ ?",
  },
  {
    category: "prix",
    patterns: [
      "prix",
      "tarif",
      "coût",
      "coute",
      "combien",
      "budget",
      "cher",
      "euro",
      "€",
      "invest",
      "combien ça coûte",
      "tarification",
      "devis",
      "gratuit",
      "free",
      "forfait",
    ],
    reply:
      "💰 Nos tarifs selon vos besoins :\n\n" +
      "🤖 Chatbot sur mesure\n" +
      "   → 2 000€ à 8 000€ (one-shot)\n" +
      "   → + 200 à 500€/mois (maintenance)\n\n" +
      "⚡ Agent IA autonome\n" +
      "   → 5 000€ à 30 000€\n\n" +
      "✍️ Contenu IA\n" +
      "   → 500€ à 3 000€/mois\n\n" +
      "📱 Social Media IA\n" +
      "   → 800€ à 2 500€/mois\n\n" +
      "🎯 Conseil/Audit\n" +
      "   → 500€/jour | 2 000€ audit complet\n\n" +
      "💡 **Audit initial GRATUIT** — 30 min\n" +
      "Sans engagement, recommandations concrètes\n\n" +
      "Pour un devis précis adapté à votre projet, rendez-vous sur notre page /botolink 🚀",
  },
  {
    category: "devis",
    patterns: [
      "devis",
      "demande",
      "proposition",
      "quote",
      "estimer",
      "estimation",
      "projet",
      "besoin",
      "personnalisé",
      "sur mesure",
      "comment obtenir",
    ],
    reply:
      "📋 Pour obtenir votre devis personnalisé :\n\n" +
      "**Option 1 — Formulaire en ligne** ⚡\n" +
      "Remplissez notre formulaire sur /botolink\n" +
      "→ Réponse sous 24h avec devis détaillé\n\n" +
      "**Option 2 — Appel découverte** 📞\n" +
      "30 minutes gratuites avec un expert IA\n" +
      "→ Réservez votre créneau sur /botolink\n\n" +
      "**Ce dont nous avons besoin :**\n" +
      "• Votre secteur d'activité\n" +
      "• Le service souhaité\n" +
      "• Votre budget approximatif\n" +
      "• Votre timeline\n\n" +
      "Quel est votre secteur d'activité ?",
  },
  {
    category: "delai",
    patterns: [
      "délai",
      "delai",
      "temps",
      "semaine",
      "mois",
      "rapide",
      "urgent",
      "vite",
      "quand",
      "livraison",
      "durée",
      "durée du projet",
      "combien de temps",
    ],
    reply:
      "⏱️ Nos délais de livraison :\n\n" +
      "🤖 Chatbot simple → **2 à 4 semaines**\n" +
      "⚡ Agent IA complet → **4 à 12 semaines**\n" +
      "✍️ Contenu IA → **Opérationnel en 1 semaine**\n" +
      "📱 Social Media → **Démarrage en 1 semaine**\n" +
      "🎯 Audit stratégique → **48h de rapport**\n\n" +
      "📌 Notre méthode :\n" +
      "1. Audit & cadrage (48h)\n" +
      "2. Stratégie & architecture (1 semaine)\n" +
      "3. Développement agile (sprints)\n" +
      "4. Lancement & optimisation\n\n" +
      "Vous avez une deadline particulière ?",
  },
  {
    category: "roi",
    patterns: [
      "roi",
      "retour sur investissement",
      "résultat",
      "résultats",
      "efficace",
      "efficacité",
      "économie",
      "économiser",
      "gain",
      "bénéfice",
      "avantage",
      "performance",
      "amélioration",
      "impact",
    ],
    reply:
      "📈 Résultats concrets de nos clients :\n\n" +
      "✅ 60% de réduction des coûts opérationnels\n" +
      "✅ 80% des demandes traitées sans humain\n" +
      "✅ ROI positif en moyenne dès le 4ème mois\n" +
      "✅ 3x plus de leads qualifiés\n" +
      "✅ 98% de satisfaction client\n\n" +
      "💡 Exemple concret :\n" +
      "Un chatbot à 5 000€ qui gère 300 demandes/mois\n" +
      "= 25h de travail humain économisées\n" +
      "= Rentabilisé en moins de 3 mois\n\n" +
      "Quel est votre principal défi opérationnel ?",
  },
  {
    category: "rendez-vous",
    patterns: [
      "rendez-vous",
      "rdv",
      "réserver",
      "réservation",
      "agenda",
      "créneau",
      "disponible",
      "appel",
      "appel découverte",
      "rencontrer",
      "parler",
      "contact",
      "contactez",
      "rencontrons",
      "génération de rendez-vous",
      "booking",
    ],
    reply:
      "📅 Réservez votre appel découverte gratuit !\n\n" +
      "**30 minutes** avec un expert IA senior\n" +
      "**Sans engagement** — Zéro pression\n" +
      "**Recommandations concrètes** pour votre business\n\n" +
      "🎯 Ce que vous obtenez :\n" +
      "• Analyse de votre situation actuelle\n" +
      "• Identification des opportunités IA\n" +
      "• Estimation ROI personnalisée\n" +
      "• Feuille de route IA sur mesure\n\n" +
      "➡️ Réservez maintenant sur **/botolink**\n\n" +
      "Vous êtes disponible cette semaine ou la semaine prochaine ?",
  },
  {
    category: "agent-ia",
    patterns: [
      "agent ia",
      "agent",
      "autonome",
      "automatisation",
      "automatiser",
      "workflow",
      "processus",
      "tâche",
      "répétitif",
      "rpa",
      "automate",
      "pipeline",
    ],
    reply:
      "⚡ L'Agent IA Autonome BoTooLogIA :\n\n" +
      "Un agent IA peut gérer des processus complets sans intervention humaine :\n\n" +
      "🔄 **Exemples d'automatisation :**\n" +
      "• Qualification et suivi des prospects\n" +
      "• Génération et envoi de devis automatiques\n" +
      "• Gestion des emails et relances\n" +
      "• Analyse de données et rapports\n" +
      "• Intégration CRM/ERP automatisée\n" +
      "• Recrutement et tri de CVs\n\n" +
      "💰 Tarif : 5 000€ à 30 000€\n" +
      "⏱️ Délai : 4 à 12 semaines\n" +
      "📈 Économie : 15 à 40h/semaine par équipe\n\n" +
      "Quelle tâche vous fait perdre le plus de temps ?",
  },
  {
    category: "contenu",
    patterns: [
      "contenu",
      "content",
      "article",
      "blog",
      "post",
      "rédaction",
      "texte",
      "copywriting",
      "email",
      "newsletter",
      "fiche produit",
      "description",
    ],
    reply:
      "✍️ Génération de Contenu IA BoTooLogIA :\n\n" +
      "📝 **Ce qu'on automatise pour vous :**\n" +
      "• Articles de blog SEO optimisés\n" +
      "• Posts réseaux sociaux (LinkedIn, Instagram)\n" +
      "• Newsletters et emails marketing\n" +
      "• Fiches produits e-commerce\n" +
      "• Descriptions et landing pages\n" +
      "• Scripts vidéo et podcasts\n\n" +
      "📊 **Volume possible :**\n" +
      "• 50 à 500 contenus/mois automatisés\n" +
      "• Personnalisés à votre ton et style\n\n" +
      "💰 Tarif : 500€ à 3 000€/mois\n" +
      "⚡ Opérationnel en 1 semaine\n\n" +
      "Quel type de contenu cherchez-vous à automatiser ?",
  },
  {
    category: "social-media",
    patterns: [
      "social",
      "réseaux sociaux",
      "instagram",
      "linkedin",
      "facebook",
      "twitter",
      "tiktok",
      "community",
      "community manager",
      "publication",
      "posts",
      "stories",
      "reels",
    ],
    reply:
      "📱 Social Media IA BoTooLogIA :\n\n" +
      "**Gestion complète automatisée de vos réseaux :**\n\n" +
      "🤖 Création de contenu IA adapté à chaque réseau\n" +
      "📅 Planification et publication automatiques\n" +
      "💬 Réponses automatiques aux commentaires\n" +
      "📊 Analyse de performance et rapports\n\n" +
      "💰 Tarif : 800€ à 2 500€/mois\n\n" +
      "Sur quels réseaux êtes-vous présent ?",
  },
  {
    category: "seo",
    patterns: [
      "seo",
      "référencement",
      "google",
      "search",
      "moteur de recherche",
      "classement",
      "position",
      "organique",
      "trafic",
      "visibilité",
    ],
    reply:
      "🔍 SEO IA BoTooLogIA :\n\n" +
      "**Référencement optimisé par IA :**\n\n" +
      "🎯 Analyse sémantique et mots-clés IA\n" +
      "📝 Génération de contenu SEO en masse\n" +
      "🔗 Stratégie de liens automatisée\n" +
      "📊 Suivi et rapports de performance\n\n" +
      "💰 Tarif : 500€ à 2 000€/mois\n\n" +
      "Quel est votre secteur d'activité ?",
  },
  {
    category: "realisations",
    patterns: [
      "réalisation",
      "réalisations",
      "portfolio",
      "exemple",
      "exemples",
      "référence",
      "client",
      "clients",
      "projet réalisé",
      "case study",
      "voir",
      "montrez",
      "travaux",
      "work",
    ],
    reply:
      "🏆 Nos réalisations BoTooLogIA :\n\n" +
      "✅ **150+ projets IA livrés**\n" +
      "✅ **98% de satisfaction client**\n" +
      "✅ **4x ROI moyen constaté**\n\n" +
      "🎯 **Secteurs couverts :**\n" +
      "• E-commerce et retail\n" +
      "• Immobilier et gestion locative\n" +
      "• Santé et bien-être\n" +
      "• Finance et assurance\n" +
      "• Formation et éducation\n" +
      "• Industrie et logistique\n\n" +
      "👉 Découvrez nos cas clients sur **/botoworks**\n\n" +
      "Dans quel secteur êtes-vous ?",
  },
  {
    category: "contact",
    patterns: [
      "contact",
      "email",
      "mail",
      "téléphone",
      "phone",
      "whatsapp",
      "écrire",
      "joindre",
      "atteindre",
      "coordonnées",
      "adresse",
      "localisation",
    ],
    reply:
      "📬 Contactez BoTooLogIA :\n\n" +
      "🌐 **Formulaire** : /botolink\n" +
      "   → Réponse garantie sous 24h\n\n" +
      "📅 **Appel découverte gratuit**\n" +
      "   → Réservez sur /botolink\n\n" +
      "📧 **Email** : contact@botoologia.com\n\n" +
      "⏰ Disponibles 9h-18h (hors week-end)\n" +
      "Le bot reste actif 24h/24 pour vous 🤖\n\n" +
      "Comment puis-je vous aider davantage ?",
  },
  {
    category: "about",
    patterns: [
      "qui",
      "vous êtes",
      "botoologia",
      "entreprise",
      "équipe",
      "fondateur",
      "histoire",
      "about",
      "présentation",
      "présenter",
      "expliquez",
    ],
    reply:
      "🤖 BoTooLogIA — Le Futur dès aujourd'hui\n\n" +
      "**Qui sommes-nous ?**\n" +
      "Agence IA spécialisée dans la transformation digitale des entreprises par l'intelligence artificielle sur mesure.\n\n" +
      "📊 **En chiffres :**\n" +
      "• 150+ projets IA livrés\n" +
      "• 98% de satisfaction client\n" +
      "• ROI positif dès le 4ème mois\n\n" +
      "🎯 **Notre mission :**\n" +
      "Rendre l'IA accessible et rentable pour toutes les entreprises.\n\n" +
      "💡 Découvrez-nous sur **/botohub**",
  },
  {
    category: "objection-prix",
    patterns: [
      "trop cher",
      "pas les moyens",
      "budget limité",
      "coûte trop",
      "pas le budget",
      "expensive",
      "abordable",
      "moins cher",
      "réduire",
    ],
    reply:
      "💡 Je comprends cette réaction — c'est naturel.\n\n" +
      "**Voici comment nos clients calculent leur ROI :**\n\n" +
      "📊 Chatbot à 5 000€\n" +
      "→ Gère 300 demandes/mois\n" +
      "→ Remplace 25h de travail/mois\n" +
      "→ **Rentabilisé en 6 mois**\n\n" +
      "🎯 Nos solutions flexibles :\n" +
      "• Paiement en 3x sans frais\n" +
      "• Formules mensuelles dès 500€/mois\n" +
      "• Audit gratuit pour évaluer le ROI\n\n" +
      "Quel est votre budget approximatif ?",
  },
  {
    category: "objection-temps",
    patterns: [
      "pas le temps",
      "trop occupé",
      "débordé",
      "pas disponible",
      "compliqué",
      "complexe",
      "difficile",
      "technique",
      "on sait pas",
    ],
    reply:
      "⏰ C'est précisément pour ça qu'on existe !\n\n" +
      "**Votre implication : minimum**\n\n" +
      "📋 Ce que vous faites :\n" +
      "• 2 réunions de 30 min (cadrage)\n" +
      "• Validation finale (1h)\n\n" +
      "⚙️ Ce qu'on fait pour vous :\n" +
      "• Développement complet\n" +
      "• Intégration à vos outils\n" +
      "• Tests et déploiement\n" +
      "• Support 3 mois inclus\n\n" +
      "🚀 **Vous gagnez du temps dès semaine 1**\n\n" +
      "Avez-vous 30 min cette semaine pour un appel découverte gratuit ?",
  },
  {
    category: "merci",
    patterns: [
      "merci",
      "super",
      "parfait",
      "génial",
      "top",
      "excellent",
      "nickel",
      "impeccable",
      "bravo",
      "bien",
      "ok",
      "okay",
      "d'accord",
      "compris",
    ],
    reply:
      "Avec plaisir ! 😊\n\n" +
      "Si vous souhaitez aller plus loin, je vous invite à :\n\n" +
      "📋 **Demander un devis** → /botolink\n" +
      "📅 **Réserver un appel gratuit** → /botolink\n" +
      "🏆 **Voir nos réalisations** → /botoworks\n\n" +
      "Autre question ?",
  },
  {
    category: "concurrence",
    patterns: [
      "concurrent",
      "concurrents",
      "comparaison",
      "mieux que",
      "différence",
      "autre agence",
      "pourquoi vous",
      "avantage",
      "unique",
    ],
    reply:
      "🎯 Pourquoi choisir BoTooLogIA ?\n\n" +
      "✅ **Sur mesure** — Zéro template générique\n" +
      "✅ **Experts seniors** — Équipe IA 5+ ans d'expérience\n" +
      "✅ **ROI garanti** — Objectifs chiffrés dès le départ\n" +
      "✅ **Accompagnement complet** — 3 mois de support inclus\n" +
      "✅ **Prix transparent** — Devis détaillé et fixe\n\n" +
      "Qu'est-ce qui est le plus important pour vous ?",
  },
  {
    category: "au-revoir",
    patterns: [
      "au revoir",
      "bye",
      "à bientôt",
      "ciao",
      "bonne journée",
      "bonne soirée",
      "goodbye",
      "à plus",
      "à tout à l'heure",
    ],
    reply:
      "Au revoir ! 👋\n\n" +
      "N'hésitez pas à revenir si vous avez des questions sur nos solutions IA.\n\n" +
      "📋 Formulaire devis : /botolink\n" +
      "🏆 Nos réalisations : /botoworks\n\n" +
      "✨ BoTooLogIA — Le Futur dès aujourd'hui",
  },
];

// ════════════════════════════════════════════
// MOTEUR DE RECHERCHE DE RÉPONSE
// ════════════════════════════════════════════

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findBestMatch(
  input: string,
  entries: KnowledgeEntry[] = knowledgeBase
): KnowledgeEntry | null {
  const normalized = normalize(input);
  const words = normalized.split(" ");

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    let score = 0;

    for (const pattern of entry.patterns) {
      const normalizedPattern = normalize(pattern);
      if (!normalizedPattern || normalizedPattern.length < 2) continue;

      if (normalized.includes(normalizedPattern)) {
        score += normalizedPattern.split(" ").length * 3;
      }

      const patternWords = normalizedPattern.split(" ").filter((w) => w.length > 1);
      for (const pw of patternWords) {
        if (pw.length > 2 && words.includes(pw)) {
          score += 1;
        }
      }

      for (const word of words) {
        if (word.length > 3 && normalizedPattern.includes(word)) {
          score += 0.5;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 1 ? bestMatch : null;
}

const DEFAULTS = [
  "Je suis là pour vous aider ! 🤖\n\n" +
    "Pour vous conseiller la meilleure solution IA, dites-moi : quel est votre principal défi opérationnel en ce moment ?\n\n" +
    "Ou choisissez un sujet :\n" +
    "• Nos services → tapez \"services\"\n" +
    "• Nos tarifs → tapez \"prix\"\n" +
    "• Un devis → tapez \"devis\"\n" +
    "• Prendre RDV → tapez \"rendez-vous\"",
  "Bonne question ! 💡\n\n" +
    "BoTooLogIA transforme les entreprises avec l'IA.\n\n" +
    "Comment puis-je vous aider ?\n" +
    "→ Découvrir nos services\n" +
    "→ Obtenir un devis personnalisé\n" +
    "→ Réserver un appel gratuit",
  "Pour vous proposer la solution IA idéale, j'ai besoin de mieux comprendre votre besoin.\n\n" +
    "Quelle tâche vous fait perdre le plus de temps dans votre activité ?",
];

/** Réponse instantanée (texte seul). Compatible API : retourne aussi { text, link } pour lien optionnel. */
export function getReply(input: string): string;
export function getReply(input: string, withLink: true): { text: string; link?: { href: string; label?: string } };
export function getReply(
  input: string,
  withLink?: boolean
): string | { text: string; link?: { href: string; label?: string } } {
  const match = findBestMatch(input);

  if (match) {
    const text = match.reply;
    if (withLink) {
      const link =
        match.category === "devis" || match.category === "rendez-vous" || match.category === "contact"
          ? { href: "/botolink", label: "BoToLink" }
          : match.category === "realisations"
            ? { href: "/botoworks", label: "BoToWorks" }
            : match.category === "about"
              ? { href: "/botohub", label: "BoToHub" }
              : undefined;
      return { text, link };
    }
    return text;
  }

  const text = DEFAULTS[Math.floor(Math.random() * DEFAULTS.length)];
  if (withLink) return { text, link: { href: "/botolink", label: "Demander un devis" } };
  return text;
}
