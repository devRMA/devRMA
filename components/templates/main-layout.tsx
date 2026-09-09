import type React from "react";
import { CustomCursor } from "@/components/atoms/custom-cursor";
import { InteractiveBackground } from "@/components/atoms/interactive-background";
import { ScrollProgress } from "@/components/atoms/scroll-progress";
import { SkipLink } from "@/components/atoms/skip-link";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-cyan-500/20 selection:text-cyan-300">
      <InteractiveBackground />
      <CustomCursor />
      <ScrollProgress />
      <SkipLink />
      <Header />
      <main id="main-content" className="container-page relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
