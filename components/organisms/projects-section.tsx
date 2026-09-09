"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/molecules/project-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectsData } from "@/data/projects";

const ISHIP_TECH = [
  "Flutter",
  "Firebase",
  "NestJS",
  "PostgreSQL",
  "Python (Lambda)",
  "Apache Kafka",
  "React MFE",
  "AWS Cloud",
];

const ISEND_TECH = [
  "PHP",
  "Laravel",
  "Python (Lambda)",
  "MySQL",
  "GitHub Actions CI",
  "SonarQube",
  "New Relic",
];

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

      <div className="mb-14 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="rounded-3xl border border-border/80 bg-card/30 p-2 shadow-2xl backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ease-out hover:border-primary/40 hover:shadow-primary/5">
            <Card className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/80 backdrop-blur-xl">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-primary to-emerald-500" />
              <CardHeader className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary">
                    <span
                      className="h-2 w-2 rounded-full bg-primary animate-pulse"
                      aria-hidden="true"
                    />
                    <span>{translate("projects.cases.iship.badge")}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {translate("projects.cases.iship.team")}
                  </span>
                </div>
                <CardTitle className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {translate("projects.cases.iship.title")}
                </CardTitle>
                <p className="text-base text-muted-foreground md:text-lg">
                  {translate("projects.cases.iship.subtitle")}
                </p>
              </CardHeader>
              <CardContent className="p-6 pt-0 md:p-8 md:pt-0 space-y-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/70 bg-zinc-950/80 shadow-md">
                  <Image
                    src="/app-iship.png"
                    alt={translate("projects.cases.iship.title") || "iShip Driver Platform"}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-contain object-center"
                    priority
                  />
                  <div className="absolute top-3 right-3 hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{translate("projects.cases.iship.productionBadge")}</span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-amber-400">
                      <Activity className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                        {translate("projects.cases.iship.challengeTitle")}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {translate("projects.cases.iship.challenge")}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-cyan-400">
                      <Cpu className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                        {translate("projects.cases.iship.architectureTitle")}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {translate("projects.cases.iship.architecture")}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                        {translate("projects.cases.iship.resultTitle")}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {translate("projects.cases.iship.result")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {ISHIP_TECH.map((technologyItem) => (
                      <Badge
                        key={technologyItem}
                        variant="outline"
                        className="border-primary/30 bg-primary/5 font-mono text-xs text-foreground"
                      >
                        {technologyItem}
                      </Badge>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 font-mono text-xs text-primary font-medium">
                    {translate("projects.cases.iship.tagline")}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="rounded-3xl border border-border/80 bg-card/30 p-2 shadow-2xl backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ease-out hover:border-amber-500/40 hover:shadow-amber-500/5">
            <Card className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/80 backdrop-blur-xl">
              <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
              <CardHeader className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-medium text-amber-400">
                    <span
                      className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"
                      aria-hidden="true"
                    />
                    <span>{translate("projects.cases.isend.badge")}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {translate("projects.cases.isend.team")}
                  </span>
                </div>
                <CardTitle className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {translate("projects.cases.isend.title")}
                </CardTitle>
                <p className="text-base text-muted-foreground md:text-lg">
                  {translate("projects.cases.isend.subtitle")}
                </p>
              </CardHeader>
              <CardContent className="p-6 pt-0 md:p-8 md:pt-0 space-y-6">
                <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 font-mono text-xs text-zinc-300 shadow-md">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-xs text-zinc-400 ml-2">
                        {translate("projects.cases.isend.telemetryUrl")}
                      </span>
                    </div>
                    <span className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                      {translate("projects.cases.isend.activeRoutesBadge")}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3">
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        {translate("projects.cases.isend.apmCategory")}
                      </span>
                      <span className="text-cyan-400 font-bold mt-1 block">
                        {translate("projects.cases.isend.apmTitle")}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {translate("projects.cases.isend.apmDesc")}
                      </span>
                    </div>
                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3">
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        {translate("projects.cases.isend.qualityCategory")}
                      </span>
                      <span className="text-emerald-400 font-bold mt-1 block">
                        {translate("projects.cases.isend.qualityTitle")}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {translate("projects.cases.isend.qualityDesc")}
                      </span>
                    </div>
                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3">
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        {translate("projects.cases.isend.asyncCategory")}
                      </span>
                      <span className="text-amber-400 font-bold mt-1 block">
                        {translate("projects.cases.isend.asyncTitle")}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {translate("projects.cases.isend.asyncDesc")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-amber-400">
                      <Activity className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                        {translate("projects.cases.isend.challengeTitle")}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {translate("projects.cases.isend.challenge")}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-cyan-400">
                      <Cpu className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                        {translate("projects.cases.isend.architectureTitle")}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {translate("projects.cases.isend.architecture")}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                        {translate("projects.cases.isend.resultTitle")}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {translate("projects.cases.isend.result")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {ISEND_TECH.map((technologyItem) => (
                      <Badge
                        key={technologyItem}
                        variant="outline"
                        className="border-amber-500/30 bg-amber-500/5 font-mono text-xs text-foreground"
                      >
                        {technologyItem}
                      </Badge>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 font-mono text-xs text-amber-400 font-medium">
                    {translate("projects.cases.isend.tagline")}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {translate("projects.openSourceTitle")}
        </h3>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-4">
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
    </section>
  );
}
