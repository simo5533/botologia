"use client";

const BOUTON_CTA_LABEL = "Entrer dans le futur →";

export default function HeroBanner() {
  return (
    <section id="banner" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* VIDÉO DE FOND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden
      >
        <source src="/videos/banner_BOTOLOOGIA.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY GRADIENT */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      {/* CONTENU PAR-DESSUS */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4 opacity-0 animate-fadeInUp [animation-delay:0.2s]">
          Agence IA
        </p>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4 opacity-0 animate-fadeInUp [animation-delay:0.4s] font-heading">
          BoTooLogIA
        </h1>

        <p
          className="inline-flex items-center px-4 py-2 mb-6 rounded-full font-heading text-xs md:text-sm font-semibold tracking-[0.28em] uppercase border border-[#00d4ff]/40 bg-[#00d4ff]/10 title-gradient-animated"
          style={{
            boxShadow: "0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          aria-hidden
        >
          Bot TooL Log IA
        </p>

        <p className="text-lg md:text-2xl text-white/80 max-w-2xl mb-10 font-light opacity-0 animate-fadeInUp [animation-delay:0.6s]">
          Agence IA Spécialisée en Chatbots IA et Automatisation — L&apos;intelligence
          artificielle qui automatise vos processus et multiplie vos performances.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp [animation-delay:0.8s]">
          <a
            href="/botolink#creneau"
            className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,200,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {BOUTON_CTA_LABEL}
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-white/30 hover:border-cyan-400 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/5 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Découvrir nos services
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-xs tracking-widest uppercase">
          Défiler
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
