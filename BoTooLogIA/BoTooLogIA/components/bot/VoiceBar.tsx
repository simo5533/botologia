"use client";

import { Mic, Square, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "./useSpeech";
import { useSpeechSynthesis } from "./useSpeech";

export interface VoiceBarProps {
  /** Langue STT */
  lang?: string;
  /** Callback quand une transcription finale est prête */
  onTranscript?: (text: string) => void;
  /** Dernière réponse du bot (pour TTS) */
  lastBotReply?: string | null;
  /** Préférence TTS activée */
  ttsEnabled?: boolean;
  /** Préférences TTS */
  voiceRate?: number;
  voiceVolume?: number;
}

export function VoiceBar({
  lang = "fr-FR",
  onTranscript,
  lastBotReply,
  ttsEnabled = true,
  voiceRate = 1,
  voiceVolume = 1,
}: VoiceBarProps) {
  const { isListening, isSupported: sttSupported, start: startMic, stop: stopMic } = useSpeechRecognition({
    lang,
    onResult(transcript, isFinal) {
      if (isFinal && transcript.trim()) onTranscript?.(transcript.trim());
    },
  });

  const { speak, stop: stopTts, isSpeaking, isPaused, isSupported: ttsSupported } = useSpeechSynthesis({
    lang,
    rate: voiceRate,
    volume: voiceVolume,
  });

  const handleMicClick = () => {
    if (isListening) stopMic();
    else startMic();
  };

  const handlePlayReply = () => {
    if (lastBotReply && ttsEnabled) speak(lastBotReply);
  };

  const handleStopTts = () => stopTts();

  const showTts = ttsEnabled && ttsSupported && lastBotReply;

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 border-t border-slate-700 bg-slate-800/50"
      role="group"
      aria-label="Contrôles vocaux"
    >
      {sttSupported && (
        <button
          type="button"
          onClick={handleMicClick}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
          )}
          aria-label={isListening ? "Arrêter l'écoute" : "Parler au micro"}
          title={isListening ? "Arrêter" : "Parler"}
        >
          <Mic className="h-4 w-4" aria-hidden />
        </button>
      )}
      {showTts && (
        <>
          {!isSpeaking && !isPaused ? (
            <button
              type="button"
              onClick={handlePlayReply}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-holographic-cyan/20 text-holographic-cyan hover:bg-holographic-cyan/30"
              aria-label="Écouter la dernière réponse"
              title="Écouter la réponse"
            >
              <Volume2 className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStopTts}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              aria-label="Arrêter la lecture"
              title="Stop"
            >
              <Square className="h-4 w-4" aria-hidden />
            </button>
          )}
        </>
      )}
    </div>
  );
}
