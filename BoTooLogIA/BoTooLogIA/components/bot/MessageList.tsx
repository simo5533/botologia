"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { StoredMessage } from "@/lib/bot/storage";

export interface MessageListProps {
  messages: StoredMessage[];
  isTyping?: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3 min-h-0"
      aria-live="polite"
      aria-label="Historique de la conversation"
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          role={msg.role}
          content={msg.content}
          timestamp={msg.timestamp}
          link={msg.link}
        />
      ))}
      {isTyping && (
        <div className="flex justify-start" role="status" aria-live="polite">
          <div className="rounded-2xl rounded-bl-md bg-slate-700 px-4 py-2.5">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
