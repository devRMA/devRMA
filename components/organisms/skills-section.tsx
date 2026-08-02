"use client";

import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { SkillCard } from "@/components/molecules/skill-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillsData } from "@/data/skills";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { useState } from "react";

export function SkillsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("know");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tabContentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
    >
      <SectionHeading title={t("skills.title")} description={t("skills.description")} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow"
      >
        <Tabs defaultValue="know" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="know">{t("skills.tabs.know")}</TabsTrigger>
            <TabsTrigger value="studying">{t("skills.tabs.studying")}</TabsTrigger>
            <TabsTrigger value="future">{t("skills.tabs.future")}</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {["know", "studying", "future"].map(
              (tabValue) =>
                activeTab === tabValue && (
                  <motion.div
                    key={tabValue}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabContentVariants}
                  >
                    <TabsContent value={tabValue} forceMount>
                      <Card>
                        <CardContent className="p-6 overflow-hidden">
                          <div className="carousel-container">
                            <div className="carousel">
                              {[
                                ...skillsData[tabValue as keyof typeof skillsData],
                                ...skillsData[tabValue as keyof typeof skillsData],
                              ].map((skill, index) => (
                                <SkillCard
                                  key={`${skill.name}-${index}`}
                                  name={skill.name}
                                  icon={skill.icon}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </section>
  );
}
