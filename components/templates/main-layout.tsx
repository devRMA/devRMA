import type React from "react";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { MobileGestureHandler } from "@/components/mobile-gesture-handler";
import { SplashScreen } from "@/components/splash-screen";

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <MobileGestureHandler>
            <div className="min-h-screen bg-[#f7f9fc] dark:bg-[#0e1117] text-[#1f1f1f] dark:text-[#eaeaea] transition-colors duration-300">
                <SplashScreen />
                <Header />
                <main className="max-w-[1280px] mx-auto px-4 md:px-6">
                    {children}
                </main>
                <Footer />
            </div>
        </MobileGestureHandler>
    );
}
