"use client";

import { motion } from "framer-motion";
import { Clock, Cpu, Zap } from "lucide-react";
import { CuritibaClock } from "@/components/atoms/curitiba-clock";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { ArchitectureBeam } from "@/components/molecules/architecture-beam";
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

      <div className="mb-10 space-y-6">
        <ArchitectureBeam />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <Zap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-foreground">
                  {t("skills.bento.yearsValue")}
                </span>
                <p className="text-xs text-muted-foreground">{t("skills.bento.yearsExp")}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <Cpu className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-foreground">
                  {t("skills.bento.scaleValue")}
                </span>
                <p className="text-xs text-muted-foreground">{t("skills.bento.systemsScale")}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-md sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-sm font-bold text-foreground">Curitiba, PR</span>
                  <CuritibaClock />
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("skills.bento.liveBadge")}
              </span>
            </div>
          </div>
        </div>
      </div>

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
                    {skillsData[category].map((skillItem) => (
                      <SkillCard key={skillItem.name} name={skillItem.name} icon={skillItem.icon} />
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
