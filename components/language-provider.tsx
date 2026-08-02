"use client";

import en from "@/locales/en";
import ptBR from "@/locales/pt-BR";
import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Language = "pt-BR" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
};

const translations = {
  "pt-BR": ptBR,
  en: en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function warnAndFallBackToKey(key: string, language: Language) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[i18n] missing translation for "${key}" in ${language}`);
  }
  return key;
}

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [languageState, setLanguageState] = useState<Language>("pt-BR");

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en")) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error("Failed to load language preference:", error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = languageState;
  }, [languageState]);

  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      try {
        const keys = key.split(".");
        let result: unknown = translations[languageState];

        for (const k of keys) {
          if (result && typeof result === "object" && k in result) {
            result = (result as Record<string, unknown>)[k];
          } else {
            return warnAndFallBackToKey(key, languageState);
          }
        }

        if (typeof result !== "string") {
          return warnAndFallBackToKey(key, languageState);
        }

        if (!params) {
          return result;
        }

        return result.replace(/\{(\w+)\}/g, (match: string, name: string) => params[name] ?? match);
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return key;
      }
    },
    [languageState],
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({ language: languageState, setLanguage, t }),
    [languageState, setLanguage, t],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
