"use client";

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Raccourci pour soumettre (ex: Ctrl+Enter) */
  submitLabel?: string;
}

export function InputArea({
  value,
  onChange,
  onSend,
  placeholder = "Écrivez votre message…",
  disabled,
  submitLabel = "Envoyer",
}: InputAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const t = value.trim();
    if (!t || disabled) return;
    onSend();
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  return (
    <div className="flex gap-2 items-end p-3 border-t border-slate-700 bg-slate-800">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 min-h-[40px] max-h-[120px] resize-none rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500",
          "focus:outline-none focus:ring-2 focus:ring-holographic-cyan focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Message"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-holographic-cyan text-slate-900",
          "hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-holographic-cyan focus:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none"
        )}
        aria-label={submitLabel}
      >
        <Send className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
