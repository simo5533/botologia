"use client";

import { QUICK_REPLIES } from "./constants";
import { cn } from "@/lib/utils";

export interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

export function QuickReplies({ onSelect, disabled, className }: QuickRepliesProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 p-3 pt-0", className)} role="group" aria-label="Suggestions rapides">
      {QUICK_REPLIES.map((label) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(label)}
          className={cn(
            "rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300",
            "hover:border-holographic-cyan hover:bg-cyan-50/50 dark:hover:bg-slate-700 transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-holographic-cyan focus-visible:ring-offset-2",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
