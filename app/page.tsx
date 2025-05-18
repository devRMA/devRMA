import { CertificatesSection } from "@/components/organisms/certificates-section";
import { ContactSection } from "@/components/organisms/contact-section";
import { ExperienceSection } from "@/components/organisms/experience-section";
import { HeroSection } from "@/components/organisms/hero-section";
import { ProjectsSection } from "@/components/organisms/projects-section";
import { SkillsSection } from "@/components/organisms/skills-section";
import { MainLayout } from "@/components/templates/main-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rafael Martins Alves | Full Stack Developer",
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
    images: [
      {
        url: "/og-image.jpg", // TODO: create this image
        width: 1200,
        height: 630,
        alt: "Rafael Martins Alves - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Martins Alves | Full Stack Developer",
    description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
    creator: "@devRMA",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificatesSection />
      <ContactSection />
    </MainLayout>
  );
}
