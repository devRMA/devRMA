"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import ptBR from "@/locales/pt-BR";
import en from "@/locales/en";

type Language = "pt-BR" | "en";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

// Pre-load translations to avoid dynamic imports
const translations = {
    "pt-BR": ptBR,
    en: en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("pt-BR");

    useEffect(() => {
        try {
            const savedLanguage = localStorage.getItem("language") as Language;
            if (
                savedLanguage &&
                (savedLanguage === "pt-BR" || savedLanguage === "en")
            ) {
                setLanguageState(savedLanguage);
            }
        } catch (error) {
            console.error("Failed to load language preference:", error);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        try {
            localStorage.setItem("language", lang);
        } catch (error) {
            console.error("Failed to save language preference:", error);
        }
    };

    const t = (key: string): string => {
        try {
            const keys = key.split(".");
            let result: any = translations[language];

            for (const k of keys) {
                if (result && typeof result === "object" && k in result) {
                    result = result[k];
                } else {
                    return key;
                }
            }

            return typeof result === "string" ? result : key;
        } catch (error) {
            console.error(`Translation error for key "${key}":`, error);
            return key;
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
