import type React from "react";
import { SkipLink } from "@/components/atoms/skip-link";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <Header />
      <main id="main-content" className="container-page">
        {children}
      </main>
      <Footer />
    </div>
  );
}
