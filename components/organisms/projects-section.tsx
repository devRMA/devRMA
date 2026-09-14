"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { CaseCard } from "@/components/molecules/case-card";
import { ProjectCard } from "@/components/molecules/project-card";
import { casesData } from "@/data/cases";
import { projectsData } from "@/data/projects";

export function ProjectsSection() {
  const { t: translate } = useLanguage();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 py-20 md:py-28"
    >
      <SectionHeading
        id="projects-heading"
        title={translate("projects.title")}
        description={translate("projects.description")}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {casesData.map((engineeringCase, index) => (
          <CaseCard key={engineeringCase.id} engineeringCase={engineeringCase} index={index} />
        ))}
      </div>

      <div className="mt-16 border-t border-border/60 pt-10">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {translate("projects.openSourceTitle")}
          </h3>
          <div className="h-px flex-1 bg-border/60" aria-hidden="true" />
        </div>
        <p className="mb-6 max-w-prose text-sm text-muted-foreground">
          {translate("projects.openSourceDescription")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projectsData.map((project, projectIndex) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: projectIndex * 0.05, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProjectCard
                id={project.id}
                title={translate(`projects.items.${project.id}.title`)}
                shortDescription={translate(`projects.items.${project.id}.shortDescription`)}
                longDescription={translate(`projects.items.${project.id}.longDescription`)}
                technologies={project.technologies}
                image={project.image}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                isArchived={project.isArchived}
                archivedLabel={translate("projects.archivedBadge")}
                previewSuccessLabel={translate("projects.previewSuccess")}
                previewArchivedStatusLabel={translate("projects.previewArchivedStatus")}
                previewProductionStatusLabel={translate("projects.previewProductionStatus")}
                previewVerifiedLabel={translate("projects.previewVerified")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
