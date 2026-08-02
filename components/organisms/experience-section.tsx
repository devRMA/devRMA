"use client";

import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { EducationCard } from "@/components/molecules/education-card";
import { ExperiencePosition } from "@/components/molecules/experience-position";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { academicData, experienceData } from "@/data/experience";
import { formatDurationRange } from "@/lib/duration";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Building, Calendar, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";

export function ExperienceSection() {
  const { t, language } = useLanguage();
  const [expandedCompanies, setExpandedCompanies] = useState<string[]>([]);
  const durationConfig = useMemo(() => ({ locale: language }), [language]);

  const resolveCompanyEndDate = (company: (typeof experienceData)[number]) => {
    if (company.endDate) {
      return company.endDate;
    }

    if (company.positions.some((position) => !position.endDate)) {
      return undefined;
    }

    return company.positions.reduce<string | undefined>((latest, position) => {
      if (!position.endDate) {
        return latest;
      }

      if (!latest) {
        return position.endDate;
      }

      return new Date(position.endDate) > new Date(latest) ? position.endDate : latest;
    }, undefined);
  };

  const toggleCompany = (companyId: string) => {
    setExpandedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    );
  };

  const isExpanded = (companyId: string) => expandedCompanies.includes(companyId);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
    >
      <SectionHeading
        id="experience-heading"
        title={t("experience.title")} description={t("experience.description")} />

      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="mb-8 flex w-full overflow-x-auto">
          <TabsTrigger value="professional" className="flex flex-1 items-center gap-2">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            {t("experience.tabs.professional")}
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex flex-1 items-center gap-2">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            {t("experience.tabs.academic")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professional">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experienceData.map((company, index) => {
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
                    delay: index * 0.1,
                  }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Building className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                    <Card className="hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => toggleCompany(company.id)}
                            aria-expanded={isExpanded(company.id)}
                            aria-controls={`positions-${company.id}`}
                            className="flex w-full items-center gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {t(`experience.companies.${company.id}.name`)}
                            {isExpanded(company.id) ? (
                              <ChevronUp
                                className="h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDown
                                className="h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                              />
                            )}
                            <span className="sr-only">
                              {isExpanded(company.id)
                                ? t("a11y.collapsePositions", { company: company.name })
                                : t("a11y.expandPositions", { company: company.name })}
                            </span>
                          </button>
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar
                              className="h-3 w-3 text-muted-foreground"
                              aria-hidden="true"
                            />
                            {t(`experience.companies.${company.id}.period`)}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {companyDuration}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <ExperiencePosition
                            title={
                              t(`experience.companies.${company.id}.positions.0.title`)
                            }
                            period={
                              t(`experience.companies.${company.id}.positions.0.period`)
                            }
                            duration={mainPositionDuration}
                            description={
                              t(`experience.companies.${company.id}.positions.0.description`)
                            }
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
                                duration: 0.3,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t pt-4 mt-4">
                                <h4 className="text-sm font-medium mb-3">
                                  {t("experience.previousPositions")}
                                </h4>
                                <div className="space-y-6">
                                  {company.positions.slice(1).map((position, idx) => (
                                    <ExperiencePosition
                                      key={`${company.id}-${position.startDate}`}
                                      title={t(
                                        `experience.companies.${company.id}.positions.${idx + 1}.title`,
                                      )}
                                      period={t(
                                        `experience.companies.${company.id}.positions.${idx + 1}.period`,
                                      )}
                                      duration={formatDurationRange(
                                        position.startDate,
                                        position.endDate,
                                        durationConfig,
                                      )}
                                      description={t(
                                        `experience.companies.${company.id}.positions.${idx + 1}.description`,
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
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {academicData.map((education, index) => {
              return (
                <motion.div
                  key={education.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>
                            {t(`experience.education.${education.id}.degree`)}
                          </CardTitle>
                        </div>
                        <CardDescription>
                          {t(`experience.education.${education.id}.institution`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <EducationCard
                          period={
                            t(`experience.education.${education.id}.period`)
                          }
                          description={
                            t(`experience.education.${education.id}.description`)
                          }
                          inProgress={education.inProgress}
                          achievements={education.achievements?.map(
                            (achievement, idx) =>
                              t(`experience.education.${education.id}.achievements.${idx}`),
                          )}
                          inProgressLabel={t("experience.inProgress")}
                          keyAchievementsLabel={t("experience.keyAchievements")}
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
