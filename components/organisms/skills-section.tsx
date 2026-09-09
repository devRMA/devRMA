"use client";

import { motion } from "framer-motion";
import { Clock, Cpu, Zap } from "lucide-react";
import { CuritibaClock } from "@/components/atoms/curitiba-clock";
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
  const { t: translate } = useLanguage();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-16 py-20 md:py-28">
      <SectionHeading
        id="skills-heading"
        title={translate("skills.title")}
        description={translate("skills.description")}
      />

      <div className="mb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-2xl border border-border/80 bg-card/50 p-5 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-lg cursor-default select-none">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-inner transition-transform duration-200 ease-out group-hover:scale-110">
                <Zap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-foreground">
                  {translate("skills.bento.yearsValue")}
                </span>
                <p className="font-mono text-xs text-muted-foreground">
                  {translate("skills.bento.yearsExp")}
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-border/80 bg-card/50 p-5 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-lg cursor-default select-none">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-inner transition-transform duration-200 ease-out group-hover:scale-110">
                <Cpu className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-foreground">
                  {translate("skills.bento.scaleValue")}
                </span>
                <p className="font-mono text-xs text-muted-foreground">
                  {translate("skills.bento.systemsScale")}
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-border/80 bg-card/50 p-5 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1 cursor-default select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-inner transition-transform duration-200 ease-out group-hover:scale-110">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-sm font-bold text-foreground">Curitiba, PR</span>
                  <CuritibaClock />
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {translate("skills.bento.liveBadge")}
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
          <TabsList className="mb-6 flex w-full flex-wrap rounded-2xl border border-border/70 bg-card/40 p-1.5 backdrop-blur-xl">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex-1 rounded-xl font-mono text-xs py-2.5 transition-all duration-150 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                {translate(`skills.tabs.${category}`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category}>
              <Card className="rounded-2xl md:rounded-3xl border-border/80 bg-card/50 backdrop-blur-xl shadow-lg">
                <CardContent className="p-6 md:p-8 overflow-hidden">
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
