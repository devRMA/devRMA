"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData, academicData } from "@/data/experience";
import {
    Building,
    Calendar,
    ChevronDown,
    ChevronUp,
    GraduationCap,
    Briefcase,
} from "lucide-react";

export function Experience() {
    const { t } = useLanguage();
    const [expandedCompanies, setExpandedCompanies] = useState<string[]>([]);

    const toggleCompany = (companyId: string) => {
        setExpandedCompanies((prev) =>
            prev.includes(companyId)
                ? prev.filter((id) => id !== companyId)
                : [...prev, companyId]
        );
    };

    const isExpanded = (companyId: string) =>
        expandedCompanies.includes(companyId);

    return (
        <section
            id="experience"
            className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
        >
            <div className="text-center mb-12">
                <motion.h2
                    className="text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {t("experience.title")}
                </motion.h2>
                <motion.p
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t("experience.description")}
                </motion.p>
            </div>

            <Tabs defaultValue="professional" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger
                        value="professional"
                        className="flex items-center gap-2"
                    >
                        <Briefcase className="h-4 w-4" />
                        {t("experience.tabs.professional")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="academic"
                        className="flex items-center gap-2"
                    >
                        <GraduationCap className="h-4 w-4" />
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
                                    <Building className="h-4 w-4 text-primary" />
                                </div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                                    <Card
                                        className="cursor-pointer hover:border-primary transition-colors"
                                        onClick={() =>
                                            toggleCompany(company.id)
                                        }
                                    >
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {company.name}
                                                    {isExpanded(company.id) ? (
                                                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </CardTitle>
                                            <CardDescription className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {company.period}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="mb-4">
                                                <h4 className="font-medium text-base">
                                                    {company.positions[0].title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {
                                                        company.positions[0]
                                                            .period
                                                    }
                                                </p>
                                                <p className="text-sm">
                                                    {
                                                        company.positions[0]
                                                            .description
                                                    }
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {company.positions[0].technologies.map(
                                                        (tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {isExpanded(company.id) &&
                                                    company.positions.length >
                                                        1 && (
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
                                                                    {t(
                                                                        "experience.previousPositions"
                                                                    )}
                                                                </h4>
                                                                <div className="space-y-6">
                                                                    {company.positions
                                                                        .slice(
                                                                            1
                                                                        )
                                                                        .map(
                                                                            (
                                                                                position,
                                                                                idx
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                    className="relative pl-4 border-l border-border"
                                                                                >
                                                                                    <h5 className="font-medium text-base">
                                                                                        {
                                                                                            position.title
                                                                                        }
                                                                                    </h5>
                                                                                    <p className="text-sm text-muted-foreground mb-2">
                                                                                        {
                                                                                            position.period
                                                                                        }
                                                                                    </p>
                                                                                    <p className="text-sm">
                                                                                        {
                                                                                            position.description
                                                                                        }
                                                                                    </p>
                                                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                                                        {position.technologies.map(
                                                                                            (
                                                                                                tech
                                                                                            ) => (
                                                                                                <Badge
                                                                                                    key={
                                                                                                        tech
                                                                                                    }
                                                                                                    variant="outline"
                                                                                                    className="text-xs"
                                                                                                >
                                                                                                    {
                                                                                                        tech
                                                                                                    }
                                                                                                </Badge>
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
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
                                    <GraduationCap className="h-4 w-4 text-primary" />
                                </div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle>
                                                    {education.degree}
                                                </CardTitle>
                                                {education.inProgress && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-2"
                                                    >
                                                        {t(
                                                            "experience.inProgress"
                                                        )}
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardDescription>
                                                {education.institution}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center mb-3">
                                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">
                                                    {education.period}
                                                </span>
                                            </div>
                                            <p className="text-sm">
                                                {education.description}
                                            </p>
                                            {education.achievements && (
                                                <div className="mt-4">
                                                    <h4 className="text-sm font-medium mb-2">
                                                        {t(
                                                            "experience.keyAchievements"
                                                        )}
                                                    </h4>
                                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                                        {education.achievements.map(
                                                            (
                                                                achievement,
                                                                idx
                                                            ) => (
                                                                <li key={idx}>
                                                                    {
                                                                        achievement
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
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
