"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ButtonLink } from "@/components/atoms/button-link";
import { ScrollIndicator } from "@/components/atoms/scroll-indicator";
import { useLanguage } from "@/components/language-provider";
import profileImage from "@/public/rafael-martins-alves.jpg";

const CAREER_START_YEAR = 2021;
const STACK = ["Laravel", "PHP", "TypeScript", "Next.js", "Python", "AWS"];

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
  const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

  const stats = [
    { value: `${yearsOfExperience}+`, label: t("hero.stats.experience") },
    { value: "14", label: t("hero.stats.certificates") },
    { value: "2", label: t("hero.stats.companies") },
  ];

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
          <div className="relative aspect-square w-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl sm:w-64 md:w-72 lg:w-80 2xl:w-96">
            <Image
              src={profileImage}
              alt="Rafael Martins Alves, desenvolvedor full stack"
              fill
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1536px) 320px, 384px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeUp}
          className="flex flex-col gap-5"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            {t("hero.badge")}
          </p>

          <h1
            id="hero-heading"
            className="text-balance text-[clamp(1.75rem,5vw,3.75rem)] font-bold leading-tight tracking-tight"
          >
            Rafael Martins Alves
            <span className="mt-2 block text-primary">{t("hero.role")}</span>
          </h1>

          <p className="max-w-prose text-pretty text-lg text-muted-foreground md:text-xl">
            {t("hero.description")}
          </p>

          <ul className="flex flex-wrap gap-2" aria-label={t("hero.stackLabel")}>
            {STACK.map((tech) => (
              <li
                key={tech}
                className="rounded-md border bg-muted/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t pt-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="text-2xl font-bold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-1 flex flex-wrap gap-3">
            <ButtonLink href="#projects" className="rounded-2xl">
              {t("hero.projects")}
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" className="rounded-2xl">
              {t("hero.contact")}
            </ButtonLink>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center">
        <ScrollIndicator targetId="skills" label={t("a11y.scrollToSkills")} />
      </div>
    </section>
  );
}
