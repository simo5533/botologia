/**
 * Lien direct d’ouverture du composeur Gmail (ex. ?view=cm&fs=1&to=…&su&body)
 * — même e-mail public que le footer (NEXT_PUBLIC_CONTACT_EMAIL, défaut contact@botoologia.com).
 */

const DEFAULT_CONTACT_EMAIL = "contact@botoologia.com";

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
}

export function getGmailComposeUrl(options: {
  to?: string;
  subject: string;
  body: string;
}): string {
  const to = options.to ?? getContactEmail();
  const u = new URL("https://mail.google.com/mail/");
  u.searchParams.set("view", "cm");
  u.searchParams.set("fs", "1");
  u.searchParams.set("to", to);
  u.searchParams.set("su", options.subject);
  u.searchParams.set("body", options.body);
  return u.toString();
}

/** Lien « Demande de devis / tarif » transmis par l’agent IA (ne pas citer de montants). */
export function getGmailDevisInquiryUrl(): string {
  return getGmailComposeUrl({
    subject: "Demande de devis / tarif — BoTooLogIA",
    body: "Bonjour,\n\nJe souhaite obtenir une estimation personnalisée pour mon projet.\n\nCordialement,\n",
  });
}
