"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";
import { devisFullSchema, type DevisFormValues } from "@/lib/validations/devis";
import { StepIndicator } from "./StepIndicator";
import { ServiceCard, SERVICE_OPTIONS } from "./ServiceCard";
import { BudgetSlider } from "./BudgetSlider";
import { StepSummary, type DevisFormData } from "./StepSummary";
import { FormBottomButtons } from "./FormBottomButtons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const JOB_TITLES = ["CEO", "CMO", "Directeur Marketing", "Chef de projet", "Autre"] as const;
const TIMELINES = [
  { value: "urgent", label: "Urgent (< 2 semaines)" },
  { value: "short", label: "Court terme (1 mois)" },
  { value: "medium", label: "Moyen terme (3 mois)" },
  { value: "long", label: "Long terme (6 mois+)" },
  { value: "defined", label: "À définir ensemble" },
] as const;
const FREQUENCIES = [
  { value: "unique", label: "Projet unique" },
  { value: "monthly", label: "Mensuel" },
  { value: "quarterly", label: "Trimestriel" },
  { value: "annual", label: "Annuel / Partenariat long terme" },
] as const;
const OBJECTIVES = [
  { value: "time", label: "Gagner du temps" },
  { value: "costs", label: "Réduire les coûts" },
  { value: "sales", label: "Augmenter les ventes" },
  { value: "quality", label: "Améliorer la qualité" },
  { value: "differentiate", label: "Se différencier de la concurrence" },
  { value: "all", label: "Tout à la fois" },
] as const;
const HOW_HEARD = [
  "Recherche Google",
  "Réseaux sociaux",
  "Recommandation",
  "Salon / Événement",
  "Newsletter",
  "Autre",
] as const;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function DevisForm() {
  const [step, setStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.35;

  const form = useForm<DevisFormValues>({
    resolver: zodResolver(devisFullSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      jobTitle: "Autre",
      services: [],
      budget: "5000-15000",
      timeline: "medium",
      frequency: "unique",
      projectDescription: "",
      usedAiTools: false,
      aiToolsList: "",
      mainObjective: "time",
      howHeard: "",
      attachmentName: undefined,
    },
    mode: "onChange",
  });

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = form;
  const watched = watch();

  const step1Valid = useCallback(async () => {
    return trigger(["fullName", "company", "email", "phone", "jobTitle"]);
  }, [trigger]);
  const step2Valid = () => (watched.services?.length ?? 0) >= 1;
  const step3Valid = useCallback(async () => {
    return trigger(["budget", "timeline", "frequency"]);
  }, [trigger]);
  const step4Valid = useCallback(async () => {
    return trigger(["projectDescription", "mainObjective", "howHeard"]);
  }, [trigger]);

  const goNext = async () => {
    if (step === 1) {
      const ok = await step1Valid();
      if (ok) setStep(2);
    } else if (step === 2) {
      if (step2Valid()) setStep(3);
    } else if (step === 3) {
      const ok = await step3Valid();
      if (ok) setStep(4);
    } else if (step === 4) {
      const ok = await step4Valid();
      if (ok) setStep(5);
    }
  };

  const goPrev = () => {
    if (step === 5) setStep(4);
    else if (step > 1) setStep(step - 1);
  };

  const stepCompletion = step === 1
    ? [watched.fullName, watched.company, watched.email, watched.phone, watched.jobTitle].filter(Boolean).length / 5
    : step === 2
      ? Math.min(1, (watched.services?.length ?? 0) / 1)
      : step === 3
        ? (watched.budget && watched.timeline && watched.frequency ? 1 : 0)
        : step === 4
          ? [watched.projectDescription, watched.mainObjective, watched.howHeard].filter(Boolean).length / 3
          : 1;

  const onFinalSubmit = async (data: DevisFormValues) => {
    setSubmitStatus("loading");
    setSubmitError(null);
    try {
      const message = JSON.stringify({
        type: "devis",
        ...data,
      }, null, 0);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setSubmitError(json.error || "Erreur lors de l'envoi.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Erreur réseau. Réessayez.");
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-white/20 bg-slate-800/60 backdrop-blur-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-holographic-cyan/20"
        >
          <CheckCircle2 className="h-10 w-10 text-holographic-cyan" aria-hidden />
        </motion.div>
        <h3 className="font-heading text-xl font-semibold text-white">Demande envoyée avec succès</h3>
        <p className="mt-2 text-slate-400">
          Merci {watched.fullName}. Nous étudions votre projet et vous recontactons sous 24h.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link href="/botolink#creneau">
            <Calendar className="mr-2 h-4 w-4" />
            Réserver un créneau
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/20 bg-slate-800/60 backdrop-blur-xl p-6 md:p-8">
      <StepIndicator currentStep={step > 4 ? 4 : step} className="mb-8" />

      <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration }}
              className="space-y-4"
            >
              <p className="text-sm text-slate-400">Complétion : {Math.round(stepCompletion * 100)}%</p>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-1">Nom complet</label>
                <input
                  id="fullName"
                  {...register("fullName")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.fullName ? "border-red-500/50" : "border-white/15"
                  )}
                  placeholder="Jean Dupont"
                  autoComplete="name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-400" role="alert">{errors.fullName.message}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1">Société / Organisation</label>
                <input
                  id="company"
                  {...register("company")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.company ? "border-red-500/50" : "border-white/15"
                  )}
                  placeholder="Acme Inc."
                />
                {errors.company && <p className="mt-1 text-sm text-red-400" role="alert">{errors.company.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email professionnel</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.email ? "border-red-500/50" : "border-white/15"
                  )}
                  placeholder="jean.dupont@entreprise.com"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400" role="alert">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Téléphone</label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.phone ? "border-red-500/50" : "border-white/15"
                  )}
                  placeholder="+33 6 12 34 56 78"
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-400" role="alert">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-300 mb-1">Poste occupé</label>
                <select
                  id="jobTitle"
                  {...register("jobTitle")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.jobTitle ? "border-red-500/50" : "border-white/15"
                  )}
                >
                  {JOB_TITLES.map((t) => (
                    <option key={t} value={t} className="bg-slate-800 text-white">{t}</option>
                  ))}
                </select>
                {errors.jobTitle && <p className="mt-1 text-sm text-red-400" role="alert">{errors.jobTitle.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration }}
              className="space-y-4"
            >
              <p className="text-sm text-slate-400">Sélection multiple. Complétion : {Math.min(100, (watched.services?.length ?? 0) * 12)}%</p>
              <div className="grid gap-3 sm:grid-cols-1">
                {SERVICE_OPTIONS.map((opt, i) => (
                  <ServiceCard
                    key={opt.id}
                    option={opt}
                    index={i}
                    selected={(watched.services ?? []).includes(opt.id)}
                    onToggle={() => {
                      const current = watched.services ?? [];
                      const next = current.includes(opt.id) ? current.filter((s) => s !== opt.id) : [...current, opt.id];
                      setValue("services", next, { shouldValidate: true });
                    }}
                  />
                ))}
              </div>
              {!step2Valid() && <p className="text-sm text-amber-400">Sélectionnez au moins un service.</p>}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration }}
              className="space-y-6"
            >
              <BudgetSlider value={watched.budget ?? ""} onChange={(v) => setValue("budget", v, { shouldValidate: true })} />
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-1">Délai souhaité</label>
                <select
                  id="timeline"
                  {...register("timeline")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.timeline ? "border-red-500/50" : "border-white/15"
                  )}
                >
                  {TIMELINES.map((t) => (
                    <option key={t.value} value={t.value} className="bg-slate-800">{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="block text-sm font-medium text-slate-300 mb-2">Fréquence de service</p>
                <div className="flex flex-wrap gap-3">
                  {FREQUENCIES.map((f) => (
                    <label key={f.value} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        {...register("frequency")}
                        value={f.value}
                        className="h-4 w-4 border-white/30 bg-white/5 text-holographic-cyan focus:ring-holographic-cyan"
                      />
                      <span className="text-sm text-slate-300">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration }}
              className="space-y-4"
            >
              <p className="text-sm text-slate-400">Complétion : {Math.round(stepCompletion * 100)}%</p>
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-300 mb-1">Description du projet</label>
                <textarea
                  id="projectDescription"
                  {...register("projectDescription")}
                  rows={5}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none resize-y",
                    errors.projectDescription ? "border-red-500/50" : "border-white/15"
                  )}
                  placeholder="Décrivez votre projet, vos objectifs et vos contraintes. Plus nous en savons, plus notre proposition sera pertinente."
                />
                {errors.projectDescription && <p className="mt-1 text-sm text-red-400" role="alert">{errors.projectDescription.message}</p>}
              </div>
              <div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" {...register("usedAiTools")} className="h-4 w-4 rounded border-white/30 bg-white/5 text-holographic-cyan focus:ring-holographic-cyan" />
                  <span className="text-sm text-slate-300">J&apos;ai déjà utilisé des outils IA</span>
                </label>
              </div>
              {(watched.usedAiTools === true || String(watched.usedAiTools) === "true") && (
                <div>
                  <label htmlFor="aiToolsList" className="block text-sm font-medium text-slate-300 mb-1">Lesquels ?</label>
                  <input
                    id="aiToolsList"
                    {...register("aiToolsList")}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none"
                    placeholder="ChatGPT, Midjourney, Copilot..."
                  />
                </div>
              )}
              <div>
                <label htmlFor="mainObjective" className="block text-sm font-medium text-slate-300 mb-1">Objectif principal</label>
                <select
                  id="mainObjective"
                  {...register("mainObjective")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.mainObjective ? "border-red-500/50" : "border-white/15"
                  )}
                >
                  {OBJECTIVES.map((o) => (
                    <option key={o.value} value={o.value} className="bg-slate-800">{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="howHeard" className="block text-sm font-medium text-slate-300 mb-1">Comment avez-vous entendu parler de nous ?</label>
                <select
                  id="howHeard"
                  {...register("howHeard")}
                  className={cn(
                    "w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white focus:border-holographic-cyan focus:ring-1 focus:ring-holographic-cyan focus:outline-none",
                    errors.howHeard ? "border-red-500/50" : "border-white/15"
                  )}
                >
                  <option value="" className="bg-slate-800">— Choisir —</option>
                  {HOW_HEARD.map((h) => (
                    <option key={h} value={h} className="bg-slate-800">{h}</option>
                  ))}
                </select>
                {errors.howHeard && <p className="mt-1 text-sm text-red-400" role="alert">{errors.howHeard.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Pièce jointe / brief (optionnel)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-holographic-cyan/20 file:px-4 file:py-2 file:text-holographic-cyan"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setValue("attachmentName", file?.name || undefined, { shouldDirty: true, shouldValidate: true });
                  }}
                />
                {watched.attachmentName ? (
                  <p className="mt-2 text-sm text-slate-400" aria-live="polite">
                    Fichier sélectionné : <span className="text-white">{watched.attachmentName}</span>
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">
                    Seul le nom du fichier est indiqué dans la demande ; le fichier lui-même n&apos;est pas encore envoyé au serveur.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
            >
              <StepSummary data={watched as DevisFormData} className="mb-6" />
              {submitStatus === "error" && submitError && (
                <p className="mb-4 text-sm text-red-400" role="alert">{submitError}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={goPrev}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Étape précédente
          </Button>
          {step < 5 ? (
            <Button type="button" onClick={goNext} disabled={step === 2 && !step2Valid()} className="gap-2 bg-holographic-cyan text-slate-900 hover:bg-cyan-400">
              Étape suivante
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        {step === 5 && (
          <FormBottomButtons submitting={submitStatus === "loading"} />
        )}
      </form>
    </div>
  );
}
