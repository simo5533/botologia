import { z } from "zod";

const jobTitles = ["CEO", "CMO", "Directeur Marketing", "Chef de projet", "Autre"] as const;
const timelines = ["urgent", "short", "medium", "long", "defined"] as const;
const frequencies = ["unique", "monthly", "quarterly", "annual"] as const;
const objectives = ["time", "costs", "sales", "quality", "differentiate", "all"] as const;

export const devisStep1Schema = z.object({
  fullName: z.string().min(2, "Nom requis (2 caractères min)").max(120),
  company: z.string().min(1, "Société requise").max(200),
  email: z.string().email("Email professionnel invalide"),
  phone: z.string().min(8, "Téléphone requis").max(30),
  jobTitle: z.enum(jobTitles, { required_error: "Sélectionnez un poste" }),
});

export const devisStep2Schema = z.object({
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service"),
});

export const devisStep3Schema = z.object({
  budget: z.string().min(1, "Sélectionnez une fourchette de budget"),
  timeline: z.enum(timelines, { required_error: "Sélectionnez un délai" }),
  frequency: z.enum(frequencies, { required_error: "Sélectionnez une fréquence" }),
});

export const devisStep4Schema = z.object({
  projectDescription: z.string().min(10, "Décrivez votre projet (10 caractères min)").max(5000),
  usedAiTools: z.boolean(),
  aiToolsList: z.string().max(500).optional(),
  mainObjective: z.enum(objectives, { required_error: "Sélectionnez un objectif" }),
  howHeard: z.string().min(1, "Ce champ est requis").max(200),
  attachmentName: z.string().optional(),
});

export const devisFullSchema = devisStep1Schema
  .merge(devisStep2Schema)
  .merge(devisStep3Schema)
  .merge(devisStep4Schema);

export type DevisFormValues = z.infer<typeof devisFullSchema>;

export const JOB_TITLE_OPTIONS = jobTitles;
export const TIMELINE_OPTIONS = timelines;
export const FREQUENCY_OPTIONS = frequencies;
export const OBJECTIVE_OPTIONS = objectives;
