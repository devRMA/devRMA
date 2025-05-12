import type React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { Providers } from "./providers";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jetbrains-mono",
});

export const metadata = {
    metadataBase: new URL("https://devrma.vercel.app"),
    title: {
        default: "Rafael Martins Alves | Full Stack Developer",
        template: "%s | Rafael Martins Alves",
    },
    description:
        "Portfolio of Rafael Martins Alves - Full Stack Developer specializing in modern web technologies",
    keywords: [
        "developer",
        "full stack",
        "portfolio",
        "next.js",
        "react",
        "typescript",
    ],
    authors: [
        { name: "Rafael Martins Alves", url: "https://github.com/devRMA" },
    ],
    creator: "Rafael Martins Alves",
    openGraph: {
        type: "website",
        locale: "pt_BR",
        alternateLocale: "en_US",
        url: "https://devrma.vercel.app",
        siteName: "Rafael Martins Alves Portfolio",
        title: "Rafael Martins Alves | Full Stack Developer",
        description:
            "Portfolio of Rafael Martins Alves - Full Stack Developer specializing in modern web technologies",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Rafael Martins Alves - Full Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Rafael Martins Alves | Full Stack Developer",
        description:
            "Portfolio of Rafael Martins Alves - Full Stack Developer specializing in modern web technologies",
        creator: "@devRMA",
        images: ["/og-image.jpg"],
    },
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LanguageProvider>
                        <Providers>
                            {children}
                            <Toaster />
                        </Providers>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
