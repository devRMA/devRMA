"use client";

import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { EducationCard } from "@/components/molecules/education-card";
import { ExperiencePosition } from "@/components/molecules/experience-position";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { academicData, experienceData } from "@/data/experience";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Building, Calendar, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { useState } from "react";

export function ExperienceSection() {
  const { t } = useLanguage();
  const [expandedCompanies, setExpandedCompanies] = useState<string[]>([]);

  const toggleCompany = (companyId: string) => {
    setExpandedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    );
  };

  const isExpanded = (companyId: string) => expandedCompanies.includes(companyId);

  return (
    <section
      id="experience"
      className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
    >
      <SectionHeading title={t("experience.title")} description={t("experience.description")} />

      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            {t("experience.tabs.professional")}
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            {t("experience.tabs.academic")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professional">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experienceData.map((company, index) => (
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
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toggleCompany(company.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {t(`experience.companies.${company.id}.name`) ?? company.name}
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
                        </div>
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                        {t(`experience.companies.${company.id}.period`) ?? company.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <ExperiencePosition
                          title={
                            t(`experience.companies.${company.id}.positions.0.title`) ??
                            company.positions[0].title
                          }
                          period={
                            t(`experience.companies.${company.id}.positions.0.period`) ??
                            company.positions[0].period
                          }
                          description={
                            t(`experience.companies.${company.id}.positions.0.description`) ??
                            company.positions[0].description
                          }
                          technologies={company.positions[0].technologies}
                        />
                      </div>

                      <AnimatePresence>
                        {isExpanded(company.id) && company.positions.length > 1 && (
                          <motion.div
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
                                    key={`${company.id}-${idx}`}
                                    title={
                                      t(
                                        `experience.companies.${
                                          company.id
                                        }.positions.${idx + 1}.title`,
                                      ) ?? position.title
                                    }
                                    period={
                                      t(
                                        `experience.companies.${
                                          company.id
                                        }.positions.${idx + 1}.period`,
                                      ) ?? position.period
                                    }
                                    description={
                                      t(
                                        `experience.companies.${
                                          company.id
                                        }.positions.${idx + 1}.description`,
                                      ) ?? position.description
                                    }
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
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {academicData.map((education, index) => (
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
                          {t(`experience.education.${education.id}.degree`) ?? education.degree}
                        </CardTitle>
                      </div>
                      <CardDescription>
                        {t(`experience.education.${education.id}.institution`) ??
                          education.institution}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EducationCard
                        period={
                          t(`experience.education.${education.id}.period`) ?? education.period
                        }
                        description={
                          t(`experience.education.${education.id}.description`) ??
                          education.description
                        }
                        inProgress={education.inProgress}
                        achievements={education.achievements?.map(
                          (achievement, idx) =>
                            t(`experience.education.${education.id}.achievements.${idx}`) ??
                            achievement,
                        )}
                        inProgressLabel={t("experience.inProgress")}
                        keyAchievementsLabel={t("experience.keyAchievements")}
                      />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
