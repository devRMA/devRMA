import { LanguageProvider } from "@/components/language-provider";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";

const JsonLd = ({ data }: { data: Record<string, unknown> }) => {
  const jsonString = JSON.stringify(data);
  return <script type="application/ld+json">{jsonString}</script>;
};

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
  metadataBase: new URL("https://devrma.com"),
  title: {
    default: "Rafael Martins Alves | Full Stack Developer",
    template: "%s | devRMA",
  },
  description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
  keywords: [
    "developer",
    "full stack",
    "portfolio",
    "next.js",
    "react",
    "typescript",
    "laravel",
    "php",
    "python",
  ],
  authors: [{ name: "Rafael Martins Alves", url: "https://github.com/devRMA" }],
  creator: "Rafael Martins Alves",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "https://devrma.com",
    siteName: "Rafael Martins Alves Portfolio",
    title: "Rafael Martins Alves | Full Stack Developer",
    description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Martins Alves | Full Stack Developer",
    description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
    creator: "@devRMA",
  },
  other: {
    "google-adsense-account": "ca-pub-8745764662929625",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rafael Martins Alves",
  url: "https://devrma.com",
  sameAs: ["https://github.com/devRMA", "https://linkedin.com/in/devRMA"],
  jobTitle: "Full Stack Developer",
  image: "https://devrma.com/photo.png",
  description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://devrma.com",
  name: "devRMA",
  description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
  publisher: {
    "@type": "Person",
    name: "Rafael Martins Alves",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8745764662929625"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <MotionProvider>{children}</MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
