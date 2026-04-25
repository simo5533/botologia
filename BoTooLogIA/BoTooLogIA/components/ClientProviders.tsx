"use client";

import dynamic from "next/dynamic";
import { TeleportProvider } from "./TeleportProvider";
import { ClickSoundProvider } from "./ClickSoundProvider";
import { LenisProvider } from "./providers/LenisProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { SessionProvider } from "./providers/SessionProvider";
import GlobalEffects from "./effects/GlobalEffects";
import SplashScreen from "./effects/SplashScreen";
import PageTransition from "./effects/PageTransition";
import CookieBanner from "./rgpd/CookieBanner";

const ChatbotWidget = dynamic(() => import("./ChatbotWidget").then((m) => ({ default: m.ChatbotWidget })), {
  ssr: false,
  loading: () => null,
});

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <LenisProvider>
          <TeleportProvider>
            <ClickSoundProvider>
              <SplashScreen />
              <GlobalEffects />
              <PageTransition>
                {children}
              </PageTransition>
              <ChatbotWidget />
              <CookieBanner />
            </ClickSoundProvider>
          </TeleportProvider>
        </LenisProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
