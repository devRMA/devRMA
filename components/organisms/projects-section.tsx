"use client";

import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/molecules/project-card";
import { projectsData } from "@/data/projects";
import { motion } from "framer-motion";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
    >
      <SectionHeading
        id="projects-heading"
        title={t("projects.title")} description={t("projects.description")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard
              id={project.id}
              title={t(`projects.items.${project.id}.title`)}
              shortDescription={
                t(`projects.items.${project.id}.shortDescription`)
              }
              longDescription={
                t(`projects.items.${project.id}.longDescription`)
              }
              technologies={project.technologies}
              image={project.image}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
