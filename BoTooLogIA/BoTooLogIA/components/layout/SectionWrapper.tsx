import { cn } from "@/lib/utils";
import GlitchText from "@/components/effects/GlitchText";

export interface SectionWrapperProps {
  id?: string;
  title?: string;
  /** Petit libellé affiché entre le titre et le sous-titre (ex. BoToAdvantage) */
  titleTag?: string;
  subtitle?: string;
  /** Niveau de titre pour la hiérarchie SEO (h1 par page, puis h2) */
  headingLevel?: 1 | 2;
  /** Affiche le titre avec effet Glitch futuriste */
  titleGlitch?: boolean;
  /** Affiche le titre avec dégradé de couleur animé (cyan → violet) */
  titleGradient?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const headingBase = "font-heading text-3xl font-bold tracking-tight md:text-4xl";

/** Titre type landing SaaS / agence IA : cyan → violet → bleu + lueur (réutilisable hors SectionWrapper) */
export const sectionTitleGradientClass = cn(
  "inline-block max-w-full bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500",
  "bg-clip-text text-transparent",
  "drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]",
  "drop-shadow-[0_0_36px_rgba(167,139,250,0.35)]",
  "drop-shadow-[0_0_48px_rgba(59,130,246,0.2)]"
);

/**
 * Wrapper de section avec titre optionnel — espacement aéré, typo cohérente, hiérarchie h1/h2
 */
export function SectionWrapper({
  id,
  title,
  titleTag,
  subtitle,
  headingLevel = 2,
  titleGlitch = false,
  titleGradient = false,
  children,
  className,
  contentClassName,
}: SectionWrapperProps) {
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";
  const titleId = title ? "section-title" : undefined;
  const titleContent =
    titleGradient ? (
      <span className={sectionTitleGradientClass}>{title}</span>
    ) : titleGlitch ? (
      <GlitchText text={title!} intensity="low" />
    ) : (
      title
    );

  const headingClassName = cn(
    headingBase,
    titleGradient && "text-transparent",
    titleGlitch && "text-white",
    !titleGradient && !titleGlitch && "text-slate-100"
  );

  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative bg-theme-section", className)}
      aria-labelledby={titleId}
    >
      <div className={cn("mx-auto max-w-7xl", contentClassName)}>
        {title && (
          <header className="mb-12 md:mb-16 text-center">
            <HeadingTag id={titleId} className={headingClassName}>
              {titleContent}
            </HeadingTag>
            {titleTag && (
              <p className="mt-1 mb-0 text-sm font-medium tracking-widest uppercase text-holographic-cyan/90">
                {titleTag}
              </p>
            )}
            {subtitle && (
              <p className="mt-2 max-w-3xl mx-auto text-base leading-relaxed text-[#e2e8f0]">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
