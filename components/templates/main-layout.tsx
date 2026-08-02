import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";
import type React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] dark:bg-[#0e1117] text-[#1f1f1f] dark:text-[#eaeaea] transition-colors duration-300">
      <Header />
      <main className="max-w-[1280px] mx-auto px-4 md:px-6">{children}</main>
      <Footer />
    </div>
  );
}
