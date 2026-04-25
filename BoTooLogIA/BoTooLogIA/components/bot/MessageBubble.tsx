"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
  link?: { href: string; label?: string };
}

export function MessageBubble({ role, content, timestamp, link }: MessageBubbleProps) {
  const isUser = role === "user";
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : null;

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
      role="article"
      aria-label={isUser ? "Votre message" : "Réponse du bot"}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm",
          isUser
            ? "bg-holographic-cyan text-slate-900 rounded-br-md"
            : "bg-slate-700 text-slate-100 rounded-bl-md"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        {link && (
          <p className="mt-2">
            <Link
              href={link.href}
              className="text-xs font-medium text-holographic-cyan underline underline-offset-2 hover:no-underline"
            >
              {link.label ?? "En savoir plus"}
            </Link>
          </p>
        )}
        {timeStr && (
          <p className={cn("text-xs mt-1", isUser ? "text-slate-700" : "text-slate-400")}>
            {timeStr}
          </p>
        )}
      </div>
    </div>
  );
}
