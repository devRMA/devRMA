"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  const [isChanging, setIsChanging] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      const handleThemeChange = () => {
        setIsChanging(true);
        setTimeout(() => setIsChanging(false), 500);
      };

      window.addEventListener("theme-change", handleThemeChange);
      return () => window.removeEventListener("theme-change", handleThemeChange);
    }
  }, [mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider {...props}>
      <AnimatePresence>
        {isChanging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-background pointer-events-none"
          />
        )}
      </AnimatePresence>
      {children}
    </NextThemesProvider>
  );
}
