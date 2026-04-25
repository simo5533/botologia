"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { publicNavLinks } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Footer futuriste — vidéo background, liens, slogan, CTA, mentions
 */
export function Footer({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, []);

  return (
    <footer
      className={cn("overflow-hidden", className)}
      style={{
        position: "relative",
        background: "#04060f",
        boxShadow: "0 0 60px rgba(0,212,255,0.12), 0 0 120px rgba(0,212,255,0.06), inset 0 1px 0 rgba(0,212,255,0.08)",
      }}
      role="contentinfo"
    >
      {/* ══════════════════════════════════════
          VIDÉO BACKGROUND
          ══════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setReady(true)}
          onLoadedData={() => setReady(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: ready ? 1 : 0,
            transition: "opacity 1s ease",
            willChange: "opacity",
          }}
          aria-hidden
        >
          <source src="/videos/footer-bg.mp4" type="video/mp4" />
        </video>

        {/* Fallback fond sombre si vidéo absente */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #020b1a, #000d22)",
            opacity: ready ? 0 : 1,
            transition: "opacity 1s ease",
          }}
          aria-hidden
        />
      </div>

      {/* Overlay pour lisibilité — légèrement éclairé comme la bannière */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(4,6,15,0.72) 0%, rgba(4,6,15,0.82) 100%)",
        }}
        aria-hidden
      />

      {/* Ligne lumineuse haut — même esprit que la bannière */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 2,
          background:
            "linear-gradient(90deg, transparent 5%, rgba(0,212,255,0.6) 20%, rgba(0,212,255,0.9) 50%, rgba(0,212,255,0.6) 80%, transparent 95%)",
          boxShadow: "0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.2)",
        }}
        aria-hidden
      />

      {/* ══════════════════════════════════════
          CONTENU DU FOOTER
          ══════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* SECTION PRINCIPALE */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 28px 44px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          {/* Logo + tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minWidth: "200px",
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              BoToo<span style={{ color: "#00c8ff" }}>Log</span>IA
            </Link>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                fontWeight: 300,
              }}
            >
              Le Futur dès aujourd&apos;hui
            </p>

            {/* Dot animé */}
            <div
              className="footer-dot"
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "rgba(0,200,255,0.6)",
                border: "1px solid rgba(0,200,255,0.8)",
                marginTop: "12px",
                willChange: "transform, opacity",
              }}
              aria-hidden
            />
          </div>

          {/* Navigation — liens existants (publicNavLinks) */}
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 32px",
              alignItems: "center",
            }}
            aria-label="Navigation pied de page"
          >
            {publicNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00c8ff";
                  e.currentTarget.style.textShadow = "0 0 12px rgba(0,200,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <Link
              href="/botolink"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 26px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00c8ff, #0094cc)",
                color: "#000d1a",
                fontSize: "0.95rem",
                fontWeight: 800,
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(0,200,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>⊙</span>
              <span>Entrer dans le futur</span>
            </Link>

            <Link
              href="/botolab"
              style={{
                fontSize: "0.9rem",
                color: "rgba(0,200,255,0.7)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s ease",
                padding: "4px 0",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#00c8ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,200,255,0.7)")
              }
            >
              BoTo Lab →
            </Link>
          </div>
        </div>

        {/* SÉPARATEUR — ligne visible type bannière */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 28px",
          }}
        >
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)",
              boxShadow: "0 0 8px rgba(0,212,255,0.15)",
            }}
          />
        </div>

        {/* COPYRIGHT */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "28px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} BoTooLogIA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
