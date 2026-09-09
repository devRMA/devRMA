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
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const } },
};

const fadeIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export function HeroSection() {
  const { t: translate } = useLanguage();
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

  const stats = [
    { value: `${yearsOfExperience}+`, label: translate("hero.stats.experience") },
    { value: "14", label: translate("hero.stats.certificates") },
    { value: "2", label: translate("hero.stats.companies") },
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
          <div className="relative group">
            <div
              className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-b from-primary/20 via-cyan-500/10 to-transparent blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="relative rounded-[2.5rem] border border-border/80 bg-card/40 p-2 shadow-2xl backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-primary/40">
              <div className="relative aspect-square w-56 overflow-hidden rounded-[2rem] border border-border/60 bg-zinc-950 sm:w-64 md:w-72 lg:w-80 2xl:w-96">
                <Image
                  src={profileImage}
                  alt="Rafael Martins Alves, desenvolvedor full stack"
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1536px) 320px, 384px"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[11px] text-zinc-300 font-medium">
                      Curitiba, BR
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-cyan-400 font-semibold tracking-wider uppercase">
                    Tech Lead
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeUp}
          className="flex flex-col gap-5"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>{translate("hero.badge")}</span>
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.1] tracking-tight text-foreground"
          >
            Rafael Martins Alves
            <span className="mt-2 block bg-gradient-to-r from-primary via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              {translate("hero.role")}
            </span>
          </h1>

          <p className="text-pretty text-lg font-medium text-foreground/90 md:text-xl">
            {translate("hero.headline")}
          </p>

          <p className="max-w-prose text-pretty text-base text-muted-foreground leading-relaxed md:text-lg">
            {translate("hero.description")}
          </p>

          <ul className="flex flex-wrap gap-2" aria-label={translate("hero.stackLabel")}>
            {STACK.map((techItem) => (
              <li
                key={techItem}
                className="rounded-lg border border-border/80 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground shadow-sm backdrop-blur-md transition-[border-color,color,transform] duration-150 ease-out hover:border-primary/50 hover:text-foreground hover:-translate-y-0.5 cursor-default select-none"
              >
                {techItem}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-xl shadow-sm">
            <dl className="grid grid-cols-3 gap-3 divide-x divide-border/60">
              {stats.map((statistic, statIndex) => (
                <div
                  key={statistic.label}
                  className={`group transition-transform duration-150 ease-out hover:-translate-y-0.5 cursor-default select-none ${
                    statIndex > 0 ? "pl-4" : ""
                  }`}
                >
                  <dt className="text-xs text-muted-foreground font-mono truncate">
                    {statistic.label}
                  </dt>
                  <dd className="mt-1 font-mono text-2xl font-bold tracking-tight text-foreground transition-colors duration-150 ease-out group-hover:text-primary md:text-3xl">
                    {statistic.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <ButtonLink
              href="#projects"
              className="rounded-xl font-medium shadow-md shadow-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
            >
              {translate("hero.projects")}
            </ButtonLink>
            <ButtonLink
              href="#contact"
              variant="outline"
              className="rounded-xl border-border/80 bg-card/40 backdrop-blur-md transition-all duration-200 hover:bg-muted hover:border-primary/40 active:scale-[0.98]"
            >
              {translate("hero.contact")}
            </ButtonLink>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCopyEmail}
              className="rounded-xl border border-border/70 bg-card/30 text-xs font-mono backdrop-blur-md transition-all duration-150 ease-out hover:bg-muted hover:border-primary/40 active:scale-[0.98]"
            >
              <span className="inline-flex items-center transition-[opacity,transform] duration-150 ease-out">
                {hasCopiedEmail ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                    <span className="text-emerald-400 font-semibold">
                      {translate("hero.emailCopied")}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                    <span>{translate("hero.copyEmail")}</span>
                  </>
                )}
              </span>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center">
        <ScrollIndicator targetId="skills" label={translate("a11y.scrollToSkills")} />
      </div>
    </section>
  );
}
