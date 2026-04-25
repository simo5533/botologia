"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatWindow } from "./ChatWindow";

/** Même chemin que la vidéo Widget BOTO (RobotSection Botohub) */
const WIDGET_VIDEO_SRC = "/videos/Widget-BOTO.mp4";

const PANEL_HEIGHT = "min(80vh, 560px)";
const PANEL_WIDTH = "min(400px, calc(100vw - 2rem))";

export function BotWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-[9990] flex h-14 w-14 items-center justify-center rounded-full overflow-hidden",
          "shadow-glow hover:shadow-glow-lg border-2 border-white/80",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-holographic-cyan focus-visible:ring-offset-2"
        )}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant BotOlogia — BoTooLogIA"}
        aria-expanded={open}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <video
          src={WIDGET_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Assistant BotOlogia — conversation"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed bottom-24 right-6 z-[9989] flex flex-col rounded-2xl border border-slate-700 bg-slate-800 shadow-xl"
            style={{
              width: PANEL_WIDTH,
              height: PANEL_HEIGHT,
              maxHeight: PANEL_HEIGHT,
            }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <span className="flex items-center gap-2 font-heading font-semibold text-slate-900 dark:text-white">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-holographic-cyan/20 text-holographic-cyan"
                  aria-hidden
                >
                  <MessageCircle className="h-4 w-4" />
                </span>
                BotOlogia
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-holographic-cyan"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <ChatWindow />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
