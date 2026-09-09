import { CertificatesSection } from "@/components/organisms/certificates-section";
import { ContactSection } from "@/components/organisms/contact-section";
import { ExperienceSection } from "@/components/organisms/experience-section";
import { HeroSection } from "@/components/organisms/hero-section";
import { ProjectsSection } from "@/components/organisms/projects-section";
import { SkillsSection } from "@/components/organisms/skills-section";
import { MainLayout } from "@/components/templates/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificatesSection />
      <ContactSection />
    </MainLayout>
  );
}
