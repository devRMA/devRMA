import "server-only";
import type { Locale } from "@/types";

const dictionaries = {
    en: () => import("@/lang/en.json").then((module) => module.default),
    pt: () => import("@/lang/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.pt();
