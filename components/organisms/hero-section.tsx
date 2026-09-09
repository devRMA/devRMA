"use client";

import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/atoms/button-link";
import { ScrollIndicator } from "@/components/atoms/scroll-indicator";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import profileImage from "@/public/rafael-martins-alves.jpg";

const CAREER_START_YEAR = 2021;
const STACK = ["NestJS", "Kafka", "AWS", "TypeScript", "Docker", "Laravel"];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.15 } },
};

export function HeroSection() {
  const { t } = useLanguage();
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

  const stats = [
    { value: `${yearsOfExperience}+`, label: t("hero.stats.experience") },
    { value: "14", label: t("hero.stats.certificates") },
    { value: "2", label: t("hero.stats.companies") },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@devrma.com");
      setHasCopiedEmail(true);
      setTimeout(() => {
        setHasCopiedEmail(false);
      }, 2500);
    } catch {
      window.location.href = "mailto:contact@devrma.com";
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center py-12 md:py-20"
    >
      <div className="grid flex-grow items-center gap-10 md:grid-cols-2 md:gap-12 2xl:gap-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="flex justify-center md:order-last"
        >
          <div className="relative flex items-center justify-center">
            <div
              className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-primary/20 blur-xl animate-pulse"
              aria-hidden="true"
            />
            <div className="relative aspect-square w-52 overflow-hidden rounded-full border-4 border-primary/30 shadow-2xl sm:w-64 md:w-72 lg:w-80 2xl:w-96">
              <Image
                src={profileImage}
                alt="Rafael Martins Alves, desenvolvedor full stack"
                fill
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1536px) 320px, 384px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeUp}
          className="flex flex-col gap-5"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-sm font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-tight tracking-tight"
          >
            Rafael Martins Alves
            <span className="mt-2 block text-primary">{t("hero.role")}</span>
          </h1>

          <p className="text-pretty text-lg font-medium text-foreground/90 md:text-xl">
            {t("hero.headline")}
          </p>

          <p className="max-w-prose text-pretty text-base text-muted-foreground md:text-lg">
            {t("hero.description")}
          </p>

          <ul className="flex flex-wrap gap-2" aria-label={t("hero.stackLabel")}>
            {STACK.map((techItem) => (
              <li
                key={techItem}
                className="rounded-md border border-border/80 bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {techItem}
              </li>
            ))}
          </ul>

          <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t pt-5">
            {stats.map((statistic) => (
              <div key={statistic.label}>
                <dt className="text-sm text-muted-foreground">{statistic.label}</dt>
                <dd className="text-2xl font-bold text-foreground">{statistic.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <ButtonLink
              href="#projects"
              className="rounded-xl font-medium shadow-md shadow-primary/20"
            >
              {t("hero.projects")}
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" className="rounded-xl">
              {t("hero.contact")}
            </ButtonLink>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCopyEmail}
              className="rounded-xl border border-border/70 text-xs font-mono transition-all hover:bg-muted"
            >
              {hasCopiedEmail ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                  <span className="text-emerald-500 font-semibold">{t("hero.emailCopied")}</span>
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <span>{t("hero.copyEmail")}</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center">
        <ScrollIndicator targetId="skills" label={t("a11y.scrollToSkills")} />
      </div>
    </section>
  );
}
