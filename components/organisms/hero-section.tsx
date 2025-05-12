"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMobile } from "@/hooks/use-mobile";
import { ScrollIndicator } from "@/components/atoms/scroll-indicator";
import { ButtonLink } from "@/components/atoms/button-link";

export function HeroSection() {
    const { t } = useLanguage();
    const { isMobile } = useMobile();

    const mobileImageAnimation = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
            },
        },
    };

    const mobileTextAnimation = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    };

    const desktopImageAnimation = {
        initial: { opacity: 0, scale: 0.9 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.2,
            },
        },
    };

    const desktopTextAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section
            id="about"
            className="min-h-screen py-16 md:py-24 relative flex flex-col justify-center"
        >
            <div className="grid md:grid-cols-2 gap-8 items-center flex-grow">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={
                        isMobile ? mobileTextAnimation : desktopTextAnimation
                    }
                    className="flex flex-col gap-4"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        Rafael Martins Alves
                        <span className="text-primary block mt-2">
                            Full Stack Developer
                        </span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                        {t("hero.description")}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                        <Button className="rounded-2xl">
                            <Download
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                            />
                            {t("hero.downloadCV")}
                        </Button>
                        <ButtonLink
                            href="#contact"
                            variant="outline"
                            className="rounded-2xl"
                        >
                            {t("hero.contact")}
                        </ButtonLink>
                    </div>
                </motion.div>

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={
                        isMobile ? mobileImageAnimation : desktopImageAnimation
                    }
                    className="flex justify-center"
                    whileTap={isMobile ? { scale: 0.95 } : {}}
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                        <Image
                            src="/placeholder.svg?height=320&width=320"
                            alt="Rafael Martins Alves"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-center mt-8">
                <ScrollIndicator
                    targetId="skills"
                    label="Scroll to Skills section"
                />
            </div>
        </section>
    );
}
