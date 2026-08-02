"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { Marquee } from "@/components/molecules/marquee";
import { SkillCard } from "@/components/molecules/skill-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillsData } from "@/data/skills";

type SkillCategory = keyof typeof skillsData;

const CATEGORIES: SkillCategory[] = ["know", "studying", "future"];

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-16 py-20 md:py-28">
      <SectionHeading
        id="skills-heading"
        title={t("skills.title")}
        description={t("skills.description")}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="know" className="w-full">
          <TabsList className="mb-8 flex w-full flex-wrap">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category} className="flex-1">
                {t(`skills.tabs.${category}`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardContent className="p-6 overflow-hidden">
                  <Marquee>
                    {skillsData[category].map((skill) => (
                      <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                    ))}
                  </Marquee>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
}
