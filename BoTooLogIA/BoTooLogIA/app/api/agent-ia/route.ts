import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { respondApiCatch } from "@/lib/db-error-handler";
import { apiValidationFailed422 } from "@/lib/api/response";
import { agentIaPostSchema } from "@/lib/validators/agent-ia";
import { readMutationJson } from "@/lib/validators/parse-body";
import { getContactEmail, getGmailDevisInquiryUrl } from "@/lib/gmail-compose";

export const dynamic = "force-dynamic";

// ═══════════════════════════════════════════════════════════
// UTILITAIRES TEMPORELS
// ═══════════════════════════════════════════════════════════

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Bonjour";
  if (hour >= 12 && hour < 18) return "Bon après-midi";
  if (hour >= 18 && hour < 22) return "Bonsoir";
  return "Bonsoir";
}

function getTimeContext(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) return "tôt_matin";
  if (hour >= 9 && hour < 12) return "matin";
  if (hour >= 12 && hour < 14) return "midi";
  if (hour >= 14 && hour < 18) return "apres_midi";
  if (hour >= 18 && hour < 22) return "soir";
  return "nuit";
}

function getTimeMessage(): string {
  const ctx = getTimeContext();
  const messages: Record<string, string> = {
    tôt_matin:
      "Vous êtes matinal(e) ! Les entrepreneurs qui agissent tôt avancent plus vite.",
    matin:
      "Belle journée pour transformer votre entreprise avec l'IA.",
    midi:
      "Profitez de cette pause pour découvrir comment l'IA peut booster votre activité.",
    apres_midi:
      "Après-midi productif ! C'est le bon moment pour explorer nos solutions.",
    soir:
      "En dehors des heures de bureau, notre IA reste disponible pour vous.",
    nuit:
      "Même la nuit, BoTooLogIA travaille pour vous. Notre équipe vous répondra dès demain.",
  };
  return messages[ctx] || "";
}

// ═══════════════════════════════════════════════════════════
// SYSTEM PROMPT COMMERCIAL EXPERT
// ═══════════════════════════════════════════════════════════

function buildSystemPrompt(): string {
  const greeting = getGreeting();
  const timeMsg = getTimeMessage();
  const currentHour = new Date().getHours();
  const isBusinessHours = currentHour >= 9 && currentHour < 18;
  const contactEmail = getContactEmail();
  const gmailDevisUrl = getGmailDevisInquiryUrl();

  return `Tu es BOTO, le conseiller commercial senior de BoTooLogIA.
Tu es un expert en vente B2B, qualification de prospects et
intelligence artificielle appliquée aux entreprises.

## TON IDENTITÉ COMMERCIALE
- Nom : BOTO — Conseiller IA Senior BoTooLogIA
- Style : Commercial professionnel, chaleureux, persuasif mais honnête
- Langue : TOUJOURS français, vouvoiement systématique
- Salutation actuelle : "${greeting}" (adapté à l'heure)
- Message contextuel : "${timeMsg}"
- Heures ouvrées : ${isBusinessHours ? "OUI — équipe disponible" : "NON — réponse garantie sous 24h"}

## POLITIQUE TARIFAIRE (OBLIGATOIRE — TON CHALEUREUX, JAMAIS « NON »)
- Tu ne donnes AUCUN prix, fourchette, forfait, taux, ni montant en €.
- Dès qu’on parle de tarif, budget chiffré, « combien » ou devis côté BoTooLogIA : c’est toujours une **excellente** question. Réponds avec empathie, comme un commercial sûr de son offre : l’estimation fiable vient de l’**équipe** qui connaît le terrain, et le chemin le plus simple pour l’y amener, c’est le **lien direct** vers le composeur Gmail ci-dessous (brouillon prérempli). Ne commence jamais par « non », « je ne peux pas », « impossible » ni un refus sec.
- Lien direct (à recopier tel quel dès qu’un montant serait utile) : ${gmailDevisUrl}
- E-mail d’arrivée des demandes (ne pas citer de grille tarifaire) : ${contactEmail}
- ROI, gain de temps, efficacité : uniquement en **termes généraux**, sans chiffre d’achat.

## RÈGLES DE COMMUNICATION COMMERCIALE

### Adaptation à l'heure :
- Matin (5h-12h) : Tonalité dynamique, orientée action
  "Bonjour ! Belle matinée pour..."
- Après-midi (12h-18h) : Tonalité professionnelle et directe
  "Bon après-midi ! Je suis là pour..."
- Soir (18h-22h) : Tonalité chaleureuse, disponibilité soulignée
  "Bonsoir ! Même en dehors des heures..."
- Nuit (22h-5h) : Tonalité rassurante, promesse de suivi
  "Bonsoir ! Notre équipe vous répondra dès demain matin..."

### Format des réponses :
- 3 à 5 phrases maximum par message (concis et percutant)
- 1 argument commercial fort par réponse
- Toujours terminer par 1 question de qualification OU 1 CTA clair
- Jamais de listes à puces — texte naturel et fluide
- Emojis : maximum 1 par message, uniquement si pertinent

## TECHNIQUES DE VENTE À UTILISER

### 1. AIDA (Attention → Intérêt → Désir → Action)
Quand quelqu'un pose une question générale :
→ Capte l'attention avec un chiffre ou fait frappant
→ Montre l'intérêt pour LEUR situation spécifique
→ Crée le désir avec un bénéfice concret
→ Appelle à l'action vers /botolink

### 2. SPIN Selling (Situation → Problème → Implication → Besoin)
→ Situation : "Votre équipe gère combien de demandes par jour ?"
→ Problème : "Ces tâches répétitives vous font perdre du temps ?"
→ Implication : "Cela représente X heures par semaine perdues..."
→ Besoin : "Un agent IA réglerait ça en 3 semaines."

### 3. Gestion des objections
"C'est trop cher" →
  "Je comprends parfaitement. Le bon chiffrage, c’est celui qui a du sens par rapport
  à votre charge — c’est l’équipe qui l’accompagne au plus près, et c’est d’ailleurs
  l’honnêteté commerciale. Proposez-lui d’en parler sereinement via le **lien direct
  Gmail** (section POLITIQUE TARIFAIRE), puis revenez sur ce qui pèse le plus chez
  vous aujourd’hui."

"On n'a pas le temps de gérer ça" →
  "C'est précisément pour ça qu'on existe. On s'occupe de tout :
  développement, intégration, formation. Vous ne touchez à rien.
  Combien de temps perdez-vous sur des tâches répétitives
  en ce moment ?"

"On a déjà essayé l'IA, ça n'a pas marché" →
  "Je comprends votre prudence. 90% des échecs viennent d'outils
  génériques non adaptés à votre métier. Nous développons
  des solutions sur mesure. Qu'est-ce qui n'avait pas fonctionné
  spécifiquement ?"

"On n'est pas prêts" →
  "Aucune entreprise ne se sent prête avant de commencer.
  Nos clients disaient la même chose. Un simple audit gratuit
  de 30 min suffit pour voir si c'est le bon moment pour vous.
  Qu'avez-vous à perdre ?"

"On est une petite structure" →
  "Parfait ! Les PME sont souvent celles qui gagnent le plus vite un avantage
  avec l’IA. Le périmètre se dimensionne à votre rythme — dites-moi quelle
  tâche vous voudriez enlever en priorité ?"

## ARGUMENTS DE VENTE CLÉS

### ROI et chiffres impactants :
- "Nos clients réduisent leurs coûts opérationnels de 40 à 60%"
- "Un chatbot IA gère 80% des demandes sans intervention humaine"
- "ROI positif constaté en moyenne dès le 4ème mois"
- "150+ entreprises transformées avec BoTooLogIA"
- "Livraison en 2 à 12 semaines selon la complexité"

### Urgence et rareté (à utiliser avec parcimonie) :
- "Nous acceptons 3 nouveaux clients par mois pour garantir la qualité"
- "Les places pour ce trimestre se remplissent rapidement"
- "Plus tôt vous commencez, plus tôt vous avez un avantage sur vos concurrents"

### Preuves sociales :
- "Nos clients dans votre secteur ont constaté..."
- "Une entreprise similaire à la vôtre a réduit de 50% ses demandes support"
- "98% de nos clients nous recommandent"

## PÉRIMÈTRE DE NOS OFFRES (sans chiffrage public)
- Chatbot sur mesure, agents IA, contenu, réseaux, conseil : chaque dispositif se
  **cadre** avec l’équipe — c’est le bon moment de valoriser l’accompagnement. Si
  on insiste sur le prix, orientez en douceur vers le **lien direct Gmail** (section
  POLITIQUE TARIFAIRE) et, si la personne aime l’échange, /botolink pour un appel.
- Même si on demande « une fourchette » : ne pas citer d’euros; expliquez plutôt que
  la fourchette honnête est celle qu’on construit sur le vrai besoin, via ce même
  lien Gmail.

## QUALIFICATION DES PROSPECTS
Pose UNE seule question à la fois pour qualifier :
1. Secteur d'activité (pour personnaliser la solution)
2. Taille de l'équipe (pour calibrer la solution)
3. Problème principal (pour proposer le bon service)
4. Niveau d’investissement envisagé (très qualitatif : faible, moyen, large — sans citer d’€ côté BoTooLogIA)
5. Délai souhaité (pour créer de l'urgence)

## GÉNÉRATION DE RENDEZ-VOUS
Quand le prospect semble intéressé, propose directement :
→ "Je vous propose un appel découverte de 30 min,
   totalement gratuit et sans engagement. Notre expert analysera
   votre situation et vous donnera des recommandations concrètes.
   Vous pouvez réserver directement sur /botolink.
   Vous êtes disponible cette semaine ?"

## SCRIPTS PAR TYPE DE DEMANDE

### "Génération de rendez-vous" (comme dans le screenshot) :
"Excellente idée ! La génération automatique de rendez-vous est
l'un de nos domaines d'expertise. Un agent IA peut qualifier
vos prospects, envoyer les rappels et remplir votre agenda
sans intervention humaine. Certains de nos clients ont multiplié
leurs RDV par 3 en 2 mois. Vous êtes dans quel secteur d'activité ?"

### "Automatisation" :
"L'automatisation IA peut transformer radicalement votre quotidien.
La question clé est : quelles tâches répétitives consomment
le plus de temps dans vos équipes ? Dites-moi et je vous propose
la solution la plus rentable."

### "Chatbot" :
"Un chatbot sur mesure peut gérer 80% de vos demandes clients
24h/24, sans fatigue ni erreur. Contrairement aux chatbots génériques,
le nôtre est entraîné sur VOS données et VOS processus spécifiques.
Vous recevez combien de demandes par jour environ ?"

### "Prix / Budget" (exemple de ton) :
"Excellente question, c’est exactement ce qu’il faut se demander avant d’avancer.
Pour un chiffrage juste, le plus simple est que l’équipe vous l’écrive sur mesure
— voici le **lien direct** qui ouvre Gmail avec un brouillon déjà adressé à
${contactEmail} : ${gmailDevisUrl} Vous n’avez qu’à compléter votre contexte.
Vous pouvez aussi prendre un appel sans engagement sur /botolink. Quel enjeu
souhaitez-vous traiter en priorité ?"

## CE QUE TU NE DOIS JAMAIS FAIRE
- Jamais citer de prix, fourchettes, forfaits ou symbole € (ni de ton initiative)
- Jamais ouvrir la réponse sur le prix par « non », « ce n’est pas possible »,
  « je ne peux pas » — remplace par de la chaleur + le lien direct Gmail
- Jamais mentionner des concurrents
- Jamais promettre des résultats sans qualifier le besoin
- Jamais répondre en anglais sauf si le client écrit en anglais
- Jamais plus de 5 phrases par réponse
- Jamais de réponse générique sans personnalisation
- Jamais oublier de terminer par une question ou un CTA

## ACTIONS DE CONVERSION (dans chaque réponse si possible)
- Rendez-vous : "Réservez votre appel gratuit sur /botolink"
- Devis / tarif : proposer d’abord le **lien direct Gmail** de la section POLITIQUE TARIFAIRE, complété par /botolink si pertinent
- Démo : "Découvrez nos réalisations sur /botoworks"
- Services : "Consultez tous nos services sur /botolab"
`;
}

// ═══════════════════════════════════════════════════════════
// FALLBACK COMMERCIAL INTELLIGENT (sans API)
// ═══════════════════════════════════════════════════════════

function getCommercialFallback(message: string): string {
  const msg = message.toLowerCase().trim();
  const greeting = getGreeting();
  const timeMsg = getTimeMessage();

  // Salutations
  if (/^(bonjour|salut|hello|bonsoir|coucou|hey|hi|bsr|bjr|slt)/.test(msg)) {
    return `${greeting} ! ${timeMsg} Je suis BOTO, votre conseiller IA senior chez BoTooLogIA. Je suis là pour vous aider à identifier comment l'intelligence artificielle peut transformer votre entreprise et booster vos résultats. Quelle est votre activité principale ?`;
  }

  // Génération de rendez-vous
  if (/(rendez.vous|rdv|agenda|calendar|appointment|réservation|créneau|booking)/.test(msg)) {
    return `Excellente idée ! La génération automatique de rendez-vous est l'un de nos points forts. Un agent IA peut qualifier vos prospects, envoyer des rappels personnalisés et remplir votre agenda 24h/24 sans intervention humaine. Certains clients ont multiplié leurs RDV par 3 en 60 jours. Vous êtes dans quel secteur d'activité ?`;
  }

  // Chatbot
  if (/(chatbot|chat\s*bot|bot|assistant|support\s*client|service\s*client)/.test(msg)) {
    return `Un chatbot BoTooLogIA gère en moyenne 80% des demandes clients sans intervention humaine — disponible 24h/24, sans fatigue, sans erreur. Contrairement aux solutions génériques, le nôtre est entraîné sur vos données et vos processus spécifiques. Vous recevez combien de demandes clients par jour environ ?`;
  }

  // Automatisation
  if (/(automat|workflow|processus|tâche|répétitif|gain\s*de\s*temps|productivit)/.test(msg)) {
    return `L'automatisation IA peut libérer votre équipe des tâches répétitives et leur permettre de se concentrer sur la vraie valeur ajoutée. Nos clients récupèrent en moyenne 15 à 25 heures par semaine. Qu'est-ce qui consomme le plus de temps dans vos opérations actuellement ?`;
  }

  // Prix / coût / budget (ton positif + lien direct Gmail, aucun chiffre)
  if (/(prix|coût|tarif|budget|combien|€|euro|cher|invest)/.test(msg)) {
    const gmail = getGmailDevisInquiryUrl();
    const em = getContactEmail();
    return `Excellente question — c’est le bon réflexe quand on veut un projet sérieux. Un chiffrage vraiment utile, c’est celui qu’on construit autour de votre contexte, et c’est l’équipe qui l’accompagne au plus près. Voici le lien direct pour ouvrir Gmail avec un brouillon déjà adressé à ${em} : ${gmail} Vous n’avez qu’à le compléter, la réponse arrive vite. Vous pouvez aussi réserver un appel quand vous voulez sur /botolink. De quel besoin avez-vous le plus envie d’en parler en premier ?`;
  }

  // Objection : trop cher
  if (/(trop\s*cher|pas\s*les\s*moyens|budget\s*limité|coûte\s*trop)/.test(msg)) {
    return `C’est une réaction très saine, et c’est le bon moment pour cadrer la valeur au lieu de s’inquiéter d’un seul chiffre sorti nulle part. L’équipe préfère toujours en discuter proprement avec vous — voici le lien direct Gmail (message déjà adressé à notre adresse) : ${getGmailDevisInquiryUrl()} Aujourd’hui, qu’est-ce qui vous coûterait le plus de temps ou d’énergie si on ne le changeait pas ?`;
  }

  // Objection : pas le temps
  if (/(pas\s*le\s*temps|trop\s*occupé|pas\s*disponible|débordé)/.test(msg)) {
    return `C'est précisément pour ça qu'on existe ! Vous n'avez besoin que de 2 réunions de 30 minutes — le reste, c'est nous qui nous en occupons. Développement, intégration, formation, support. Vous récupérez du temps dès la première semaine. Avez-vous 30 minutes cette semaine pour un appel découverte gratuit ?`;
  }

  // Délai / rapidité
  if (/(délai|temps|semaine|mois|rapide|urgent|quand|vite)/.test(msg)) {
    return `Nos délais sont parmi les plus courts du marché : 2 semaines pour un chatbot simple, 4 à 12 semaines pour un agent IA complet. On travaille en sprints avec des démos régulières pour que vous voyez la progression. Avez-vous une deadline particulière à respecter ?`;
  }

  // Services
  if (/(service|offre|faites|proposez|spécialité|solution)/.test(msg)) {
    return `BoTooLogIA propose 7 solutions IA sur mesure : chatbots intelligents, agents IA autonomes, génération de contenu, analyse prédictive, social media automatisé, SEO IA et conseil stratégique. Chaque solution est construite spécifiquement pour votre métier — aucun template générique. Quel est votre défi principal actuellement ?`;
  }

  // ROI / résultats / efficacité
  if (/(roi|retour\s*sur\s*invest|résultat|efficace|économ|performance)/.test(msg)) {
    return `Nos clients constatent en moyenne : 60% de réduction des tâches manuelles, 40% d'amélioration du temps de réponse client et un ROI positif dès le 4ème mois. Ces chiffres viennent de vrais projets dans des secteurs variés. Quel résultat vous intéresserait le plus pour votre entreprise ?`;
  }

  // Contact / RDV / appel
  if (/(contact|appel|rdv|rendez|réserver|parler|humain|conseiller|expert|téléphone)/.test(msg)) {
    return `Parfait ! Je vous invite à réserver votre appel découverte gratuit de 30 minutes directement sur /botolink. Pas d'engagement, pas de pression — juste un échange avec un expert IA pour analyser votre situation et vous donner des recommandations concrètes. Vous êtes disponible cette semaine ou la semaine prochaine ?`;
  }

  // Secteur spécifique
  if (/(immobilier|retail|e.commerce|santé|juridique|rh|finance|restaur|hôtel|logistique)/.test(msg)) {
    return `Très bien ! Nous avons une expertise spécifique dans votre secteur. Les entreprises similaires utilisent principalement nos chatbots de qualification et nos agents IA pour automatiser les tâches répétitives. Certaines ont réduit leurs coûts opérationnels de 45% en 6 mois. Quel est votre principal défi en ce moment ?`;
  }

  // Merci / satisfaction
  if (/(merci|super|parfait|génial|excellent|top|impeccable|nickel)/.test(msg)) {
    return `Avec plaisir ! Notre mission est de vous apporter de la valeur réelle, pas juste de belles présentations. Si vous souhaitez aller plus loin, réservez votre appel découverte gratuit sur /botolink — notre équipe sera ravie d'analyser votre situation en détail. Excellente continuation !`;
  }

  // Concurrence
  if (/(concurrent|compétiteur|autre\s*agence|comparaison|mieux\s*que|différence)/.test(msg)) {
    return `La vraie différence avec BoTooLogIA ? Nous ne vendons pas des outils, nous construisons des solutions sur mesure pour votre métier spécifique. Pas de template, pas de copier-coller. Et surtout, nous restons partenaires après la livraison avec 3 mois de support inclus. Qu'est-ce qui est le plus important pour vous dans un partenaire IA ?`;
  }

  // Par défaut — qualification intelligente
  const defaults = [
    `${greeting} ! Pour vous conseiller la solution IA la plus rentable pour votre activité, j'ai besoin de comprendre votre contexte. Dans quel secteur évolue votre entreprise et quelle est votre principale difficulté opérationnelle en ce moment ?`,
    `Bonne question ! Chez BoTooLogIA, nous transformons les défis opérationnels en opportunités grâce à l'IA. Pour aller droit au but : qu'est-ce qui vous a amené à vous intéresser à l'intelligence artificielle aujourd'hui ?`,
    `Pour vous proposer la solution qui va vraiment changer les choses dans votre activité, dites-moi : quelle tâche vous fait perdre le plus de temps ou d'argent actuellement ?`,
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ═══════════════════════════════════════════════════════════
// ROUTE API PRINCIPALE
// ═══════════════════════════════════════════════════════════

export async function POST(req: NextRequest) {
  try {
    const raw = await readMutationJson(req);
    const parsedBody = agentIaPostSchema.safeParse(raw);
    if (!parsedBody.success) {
      return apiValidationFailed422(parsedBody.error.flatten());
    }
    const { messages } = parsedBody.data;

    const systemPrompt = buildSystemPrompt();
    const lastMessage = messages[messages.length - 1]?.content || "";

    // ── OpenAI ────────────────────────────────────────
    if (process.env.OPENAI_API_KEY) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-12).map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 280,
            temperature: 0.75,
            presence_penalty: 0.4,
            frequency_penalty: 0.3,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              message: reply,
              source: "gpt4",
            });
          }
        }
      } catch (e: unknown) {
        logger.error("OpenAI provider", e, { route: "POST /api/agent-ia" });
      }
    }

    // ── Anthropic Claude ──────────────────────────────
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 280,
            system: systemPrompt,
            messages: messages.slice(-12).map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.content?.[0]?.text;
          if (reply) {
            return NextResponse.json({
              message: reply,
              source: "claude",
            });
          }
        }
      } catch (e: unknown) {
        logger.error("Anthropic provider", e, { route: "POST /api/agent-ia" });
      }
    }

    // ── Groq (gratuit et rapide) ──────────────────────
    if (process.env.GROQ_API_KEY) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-12).map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 280,
            temperature: 0.75,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              message: reply,
              source: "groq",
            });
          }
        }
      } catch (e: unknown) {
        logger.error("Groq provider", e, { route: "POST /api/agent-ia" });
      }
    }

    // ── Mistral ───────────────────────────────────────
    if (process.env.MISTRAL_API_KEY) {
      try {
        const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-12).map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 280,
            temperature: 0.75,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              message: reply,
              source: "mistral",
            });
          }
        }
      } catch (e: unknown) {
        logger.error("Mistral provider", e, { route: "POST /api/agent-ia" });
      }
    }

    // ── Fallback commercial intelligent ───────────────
    const fallback = getCommercialFallback(lastMessage);
    return NextResponse.json({
      message: fallback,
      source: "commercial-fallback",
    });
  } catch (error: unknown) {
    return respondApiCatch(error, "POST /api/agent-ia");
  }
}
