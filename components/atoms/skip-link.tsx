"use client";

import { useLanguage } from "@/components/language-provider";

export function SkipLink() {
  const { t: translate } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
    >
      {translate("a11y.skipToContent")}
    </a>
  );
}
