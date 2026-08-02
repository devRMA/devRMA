import { SkipLink } from "@/components/atoms/skip-link";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";
import type React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <Header />
      <main id="main-content" className="max-w-[1280px] mx-auto px-4 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
