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
          <div className="group rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-cyan-500/40 hover:-translate-y-0.5 hover:shadow-md cursor-default select-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 transition-transform duration-200 ease-out group-hover:scale-110">
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

          <div className="group rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-amber-500/40 hover:-translate-y-0.5 hover:shadow-md cursor-default select-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 transition-transform duration-200 ease-out group-hover:scale-110">
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

          <div className="group rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 lg:col-span-1 cursor-default select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-transform duration-200 ease-out group-hover:scale-110">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-sm font-bold text-foreground">Curitiba, PR</span>
                  <CuritibaClock />
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t("skills.bento.liveBadge")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
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
