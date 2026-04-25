"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Instagram, Linkedin, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UfoCtaButton } from "@/components/sections/UfoCtaButton";
import { publicNavLinks } from "@/lib/data/navigation";
import { AuthNav } from "@/components/layout/AuthNav";
import { socialLinks } from "@/lib/data/social";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo-botologia.jpg";
const LOGO_ALT = "BoTooLogIA Logo";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const SOCIAL_ICON_MAP = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
  Email: Mail,
} as const;

function SocialIconLinks() {
  const reduceMotion = useReducedMotion();
  return (
    <ul className="flex items-center gap-1 sm:gap-2" role="list" aria-label="Réseaux sociaux">
      {socialLinks.map((item) => {
        const Icon = SOCIAL_ICON_MAP[item.label as keyof typeof SOCIAL_ICON_MAP];
        if (!Icon) return null;
        const isMailto = item.href.startsWith("mailto:");
        const linkProps = item.isExternal && !isMailto
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {};
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "inline-flex items-center justify-center rounded-lg p-2 text-slate-400",
                "transition-colors duration-200 ease-out",
                "hover:text-[#00d4ff] hover:shadow-[0_0_12px_rgba(0,212,255,0.4)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              )}
              aria-label={item.label}
              {...linkProps}
            >
              <Icon
                className={cn(
                  "transition-transform duration-200",
                  !reduceMotion && "hover:scale-110"
                )}
                size={21}
                strokeWidth={1.5}
                aria-hidden
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Header premium dark — Logo (next/image), nav, réseaux sociaux, CTA.
 * Design system : #0A0A0A, bordure cyan, glass, hover glow. Production-ready.
 */
export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [mobileOpen, closeMobileMenu]);

  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const el = menuRef.current;
    const focusables = el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusables[0];
    if (first) {
      const id = requestAnimationFrame(() => first.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const el = menuRef.current;
    const focusables = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const current = document.activeElement as HTMLElement | null;
      if (!current || !el.contains(current)) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (current === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-[#0A0A0A]",
        "border-b border-[#00d4ff]/20",
        "backdrop-blur-md bg-[#0A0A0A]/95",
        "shadow-[0_1px_0_rgba(0,212,255,0.08)]"
      )}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo + nom BoTooLogIA (écriture luxe, structurée) */}
        <Link
          href="/botohub#banner"
          className={cn(
            "relative flex shrink-0 items-center gap-3 transition-all duration-200",
            "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          )}
          aria-label="BoTooLogIA — Accueil"
        >
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14",
              "ring-2 ring-[#00d4ff]/40 ring-offset-2 ring-offset-[#0A0A0A]",
              "shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
              "hover:shadow-[0_0_16px_rgba(0,212,255,0.25)]"
            )}
          >
            <Image
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width={56}
              height={56}
              priority
              sizes="56px"
              className="h-full w-full object-contain scale-125"
            />
          </span>
          <span
            className={cn(
              "font-heading text-lg font-bold tracking-wide sm:text-xl",
              "bg-gradient-to-r from-white via-white to-[#00d4ff]/90 bg-clip-text text-transparent",
              "shadow-[0_0_20px_rgba(0,212,255,0.15)]",
              "select-none"
            )}
          >
            BoTooLogIA
          </span>
        </Link>

        {/* Desktop: nav + social + CTA */}
        <nav
          className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-8"
          aria-label="Navigation principale"
        >
          <ul className="flex items-center gap-6" role="list">
            {publicNavLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      "hover:text-[#00d4ff] hover:shadow-[0_0_8px_rgba(0,212,255,0.2)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]",
                      isActive ? "text-[#00d4ff]" : "text-slate-300"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4">
            <AuthNav variant="desktop" />
            <SocialIconLinks />
            <span className="h-5 w-px bg-white/10" aria-hidden />
            <UfoCtaButton asLink href="/botolink" size="sm" />
          </div>
        </nav>

        {/* Mobile: social + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <SocialIconLinks />
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            className={cn(
              "text-slate-300 hover:bg-white/5 hover:text-[#00d4ff]",
              "focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-menu"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-haspopup="true"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="header-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeInOut" }}
            className={cn(
              "md:hidden overflow-hidden",
              "border-t border-[#00d4ff]/20",
              "bg-[#0A0A0A]/98 backdrop-blur-md"
            )}
          >
            <div ref={menuRef} className="flex flex-col gap-1 px-4 py-4">
              {publicNavLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200",
                      "hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-inset",
                      isActive
                        ? "bg-[#00d4ff]/15 text-[#00d4ff]"
                        : "text-slate-300"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-2">
                <AuthNav variant="mobile" />
                <UfoCtaButton asLink href="/botolink" className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
