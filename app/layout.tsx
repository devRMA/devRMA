import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type React from "react";
import { LanguageProvider } from "@/components/language-provider";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
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

const SITE_URL = "https://devrma.com";
const TITLE = "Rafael Martins Alves | Desenvolvedor Full Stack";
const DESCRIPTION =
  "Desenvolvedor Full Stack com foco em Laravel, PHP, TypeScript e AWS. Construo sistemas escaláveis, observáveis e bem testados — hoje na MadeiraMadeira.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | devRMA",
  },
  description: DESCRIPTION,
  applicationName: "devRMA",
  category: "technology",
  keywords: [
    "Rafael Martins Alves",
    "devRMA",
    "desenvolvedor full stack",
    "full stack developer",
    "Laravel",
    "PHP",
    "TypeScript",
    "Next.js",
    "React",
    "Python",
    "AWS",
    "Curitiba",
  ],
  authors: [{ name: "Rafael Martins Alves", url: "https://github.com/devRMA" }],
  creator: "Rafael Martins Alves",
  publisher: "Rafael Martins Alves",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Rafael Martins Alves | devRMA",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@devRMA",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#12141a" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Rafael Martins Alves",
  alternateName: "devRMA",
  url: SITE_URL,
  sameAs: ["https://github.com/devRMA", "https://linkedin.com/in/devRMA"],
  jobTitle: "Desenvolvedor Full Stack",
  email: "mailto:contact@devrma.com",
  image: `${SITE_URL}/rafael-martins-alves.jpg`,
  description: DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    name: "MadeiraMadeira",
    url: "https://www.madeiramadeira.com.br",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidade Positivo" },
    { "@type": "EducationalOrganization", name: "SENAI Dr. Celso Charuri" },
  ],
  knowsAbout: [
    "Laravel",
    "PHP",
    "TypeScript",
    "Next.js",
    "React",
    "Python",
    "Docker",
    "AWS",
    "PostgreSQL",
    "CI/CD",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "devRMA",
  inLanguage: "pt-BR",
  description: DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#person` },
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
        <noscript>
          <style>
            {
              '[style*="opacity:0"]{opacity:1!important;transform:none!important;height:auto!important}'
            }
          </style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
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
