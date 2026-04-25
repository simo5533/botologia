/**
 * Sélection de la voix du bot : homme charismatique et professionnel (réponse en bot).
 * Utilisé par l'Agent IA (Botohub) et le widget chat (VoiceBar).
 */

const MALE_VOICE_HINTS = [
  "male",
  "homme",
  "paul",
  "david",
  "marc",
  "thomas",
  "nicolas",
  "mathieu",
  "hugo",
  "louis",
  "roger",  // Microsoft Roger (FR masculin)
];

/** Hints pour une voix synthétique / robotique (thème futuriste du site). */
const ROBOTIC_VOICE_HINTS = [
  "google",
  "microsoft",
  "online",
  "synthetic",
  "compact",
  "enhanced",
  "desktop",
  "mobile",
];

/**
 * Retourne une voix française masculine de préférence (charismatique / professionnelle).
 * Fallback : première voix française disponible.
 */
export function getPreferredMaleFrenchVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const french = voices.filter((v) => v.lang.startsWith("fr"));
  if (french.length === 0) return null;

  const nameLower = (v: SpeechSynthesisVoice) => v.name.toLowerCase();
  const male = french.find((v) =>
    MALE_VOICE_HINTS.some((hint) => nameLower(v).includes(hint))
  );
  return male ?? french[0] ?? null;
}

/**
 * Retourne une voix française à sonorité robotique/synthétique (thème IA du site).
 * Préfère les voix type Google/Microsoft/online. Sinon fallback sur première voix FR.
 */
export function getPreferredRoboticFrenchVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const french = voices.filter((v) => v.lang.startsWith("fr"));
  if (french.length === 0) return null;

  const nameLower = (v: SpeechSynthesisVoice) => v.name.toLowerCase();
  const robotic = french.find((v) =>
    ROBOTIC_VOICE_HINTS.some((hint) => nameLower(v).includes(hint))
  );
  return robotic ?? french[0] ?? null;
}

/**
 * Voix française masculine + robotique pour l'Agent IA (son robot masculin, thème du site).
 * Priorité : (1) FR + synthétique + masculin, (2) FR + synthétique, (3) FR + masculin, (4) première FR.
 */
export function getPreferredMaleRoboticFrenchVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const french = voices.filter((v) => v.lang.startsWith("fr"));
  if (french.length === 0) return null;

  const nameLower = (v: SpeechSynthesisVoice) => v.name.toLowerCase();
  const isRobotic = (v: SpeechSynthesisVoice) =>
    ROBOTIC_VOICE_HINTS.some((h) => nameLower(v).includes(h));
  const isMale = (v: SpeechSynthesisVoice) =>
    MALE_VOICE_HINTS.some((h) => nameLower(v).includes(h));

  const maleRobotic = french.find((v) => isRobotic(v) && isMale(v));
  if (maleRobotic) return maleRobotic;
  const robotic = french.find(isRobotic);
  if (robotic) return robotic;
  const male = french.find(isMale);
  if (male) return male;
  return french[0] ?? null;
}
