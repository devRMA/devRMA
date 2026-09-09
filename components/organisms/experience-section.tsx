"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { EducationCard } from "@/components/molecules/education-card";
import { ExperiencePosition } from "@/components/molecules/experience-position";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { academicData, experienceData } from "@/data/experience";
import { formatDurationRange } from "@/lib/duration";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const { t: translate, language } = useLanguage();
  const [expandedCompanies, setExpandedCompanies] = useState<string[]>([]);
  const durationConfig = useMemo(() => ({ locale: language }), [language]);

  const resolveCompanyEndDate = (company: (typeof experienceData)[number]) => {
    if (company.endDate) {
      return company.endDate;
    }

    if (company.positions.some((position) => !position.endDate)) {
      return undefined;
    }

    return company.positions.reduce<string | undefined>((latestDate, position) => {
      if (!position.endDate) {
        return latestDate;
      }

      if (!latestDate) {
        return position.endDate;
      }

      return new Date(position.endDate) > new Date(latestDate) ? position.endDate : latestDate;
    }, undefined);
  };

  const toggleCompany = (companyIdentifier: string) => {
    setExpandedCompanies((previousExpandedCompanies) =>
      previousExpandedCompanies.includes(companyIdentifier)
        ? previousExpandedCompanies.filter((identifier) => identifier !== companyIdentifier)
        : [...previousExpandedCompanies, companyIdentifier],
    );
  };

  const isExpanded = (companyIdentifier: string) => expandedCompanies.includes(companyIdentifier);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-16 py-20 md:py-28"
    >
      <SectionHeading
        id="experience-heading"
        title={translate("experience.title")}
        description={translate("experience.description")}
      />

      <div className="mb-10 flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-5 py-2 text-xs font-mono text-muted-foreground shadow-sm backdrop-blur-md">
          <TrendingUp className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
          <span className="text-zinc-400">{translate("experience.progression.label")}</span>
          <span className="font-semibold text-foreground">
            {translate("experience.progression.intern")}
          </span>
          <span className="text-cyan-500">➔</span>
          <span className="font-semibold text-foreground">
            {translate("experience.progression.fullstack")}
          </span>
          <span className="text-cyan-500">➔</span>
          <span className="font-bold text-cyan-400">
            {translate("experience.progression.techlead")}
          </span>
        </div>
      </div>

      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="mb-8 flex w-full flex-wrap rounded-2xl border border-border/70 bg-card/40 p-1.5 backdrop-blur-xl">
          <TabsTrigger
            value="professional"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-mono text-xs transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            {translate("experience.tabs.professional")}
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-mono text-xs transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            {translate("experience.tabs.academic")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professional">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-500/70 before:via-border/80 before:to-border/20">
            {experienceData.map((company, companyIndex) => {
              const companyDuration = formatDurationRange(
                company.startDate,
                resolveCompanyEndDate(company),
                durationConfig,
              );
              const mainPosition = company.positions[0];

              if (!mainPosition) {
                return null;
              }

              const mainPositionDuration = formatDurationRange(
                mainPosition.startDate,
                mainPosition.endDate,
                durationConfig,
              );

              return (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: companyIndex * 0.1,
                  }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/50 bg-card/90 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-200 ease-out group-hover:scale-110">
                    <Building className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                    <Card className="rounded-2xl border-border/80 bg-card/70 backdrop-blur-xl shadow-sm transition-all duration-200 ease-out hover:border-cyan-500/40 hover:shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => toggleCompany(company.id)}
                            aria-expanded={isExpanded(company.id)}
                            aria-controls={`positions-${company.id}`}
                            className="flex w-full items-center gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {translate(`experience.companies.${company.id}.name`)}
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-muted-foreground transition-transform duration-200 ease-out",
                                isExpanded(company.id) && "rotate-180",
                              )}
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              {isExpanded(company.id)
                                ? translate("a11y.collapsePositions", { company: company.name })
                                : translate("a11y.expandPositions", { company: company.name })}
                            </span>
                          </button>
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar
                              className="h-3 w-3 text-muted-foreground"
                              aria-hidden="true"
                            />
                            {translate(`experience.companies.${company.id}.period`)}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-mono font-medium text-cyan-400 border border-cyan-500/20">
                            {companyDuration}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <ExperiencePosition
                            title={translate(
                              `experience.companies.${company.id}.positions.0.title`,
                            )}
                            period={translate(
                              `experience.companies.${company.id}.positions.0.period`,
                            )}
                            duration={mainPositionDuration}
                            description={translate(
                              `experience.companies.${company.id}.positions.0.description`,
                            )}
                            technologies={mainPosition.technologies}
                          />
                        </div>

                        <AnimatePresence>
                          {isExpanded(company.id) && company.positions.length > 1 && (
                            <motion.div
                              id={`positions-${company.id}`}
                              initial={{
                                opacity: 0,
                                height: 0,
                              }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-border/60 pt-4 mt-4">
                                <h4 className="text-sm font-medium mb-3">
                                  {translate("experience.previousPositions")}
                                </h4>
                                <div className="space-y-6">
                                  {company.positions.slice(1).map((position, offsetIndex) => (
                                    <ExperiencePosition
                                      key={`${company.id}-${position.startDate}`}
                                      title={translate(
                                        `experience.companies.${company.id}.positions.${offsetIndex + 1}.title`,
                                      )}
                                      period={translate(
                                        `experience.companies.${company.id}.positions.${offsetIndex + 1}.period`,
                                      )}
                                      duration={formatDurationRange(
                                        position.startDate,
                                        position.endDate,
                                        durationConfig,
                                      )}
                                      description={translate(
                                        `experience.companies.${company.id}.positions.${offsetIndex + 1}.description`,
                                      )}
                                      technologies={position.technologies}
                                      isPrevious={true}
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-indigo-500/70 before:via-border/80 before:to-border/20">
            {academicData.map((education, educationIndex) => {
              return (
                <motion.div
                  key={education.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: educationIndex * 0.1,
                  }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-indigo-500/50 bg-card/90 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-200 ease-out group-hover:scale-110">
                    <GraduationCap className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                    <Card className="rounded-2xl border-border/80 bg-card/70 backdrop-blur-xl shadow-sm transition-all duration-200 ease-out hover:border-indigo-500/40 hover:shadow-xl">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>
                            {translate(`experience.education.${education.id}.degree`)}
                          </CardTitle>
                        </div>
                        <CardDescription>
                          {translate(`experience.education.${education.id}.institution`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <EducationCard
                          period={translate(`experience.education.${education.id}.period`)}
                          description={translate(
                            `experience.education.${education.id}.description`,
                          )}
                          inProgress={education.inProgress}
                          achievements={education.achievements?.map(
                            (_unassignedAchievement, achievementIndex) =>
                              translate(
                                `experience.education.${education.id}.achievements.${achievementIndex}`,
                              ),
                          )}
                          inProgressLabel={translate("experience.inProgress")}
                          keyAchievementsLabel={translate("experience.keyAchievements")}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
