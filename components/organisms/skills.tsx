"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";

export function Skills() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("know");

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    return (
        <section
            id="skills"
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
                    {t("skills.title")}
                </motion.h2>
                <motion.p
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t("skills.description")}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-grow"
            >
                <Tabs
                    defaultValue="know"
                    className="w-full"
                    onValueChange={handleTabChange}
                >
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="know">
                            {t("skills.tabs.know")}
                        </TabsTrigger>
                        <TabsTrigger value="studying">
                            {t("skills.tabs.studying")}
                        </TabsTrigger>
                        <TabsTrigger value="future">
                            {t("skills.tabs.future")}
                        </TabsTrigger>
                    </TabsList>

                    {["know", "studying", "future"].map((tabValue) => (
                        <TabsContent key={tabValue} value={tabValue}>
                            <Card>
                                <CardContent className="p-6 overflow-hidden">
                                    <div className="carousel-container">
                                        <div className="carousel">
                                            {/* First set of items */}
                                            {skillsData[
                                                tabValue as keyof typeof skillsData
                                            ].map((skill, index) => (
                                                <div
                                                    key={`${skill.name}-1`}
                                                    className="carousel-item flex flex-col items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                                                >
                                                    <div className="w-16 h-16 flex items-center justify-center text-primary">
                                                        <div className="w-10 h-10">
                                                            {skill.icon}
                                                        </div>
                                                    </div>
                                                    <span className="font-medium text-center">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            ))}

                                            {/* Duplicate set of items for seamless looping */}
                                            {skillsData[
                                                tabValue as keyof typeof skillsData
                                            ].map((skill, index) => (
                                                <div
                                                    key={`${skill.name}-2`}
                                                    className="carousel-item flex flex-col items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                                                >
                                                    <div className="w-16 h-16 flex items-center justify-center text-primary">
                                                        <div className="w-10 h-10">
                                                            {skill.icon}
                                                        </div>
                                                    </div>
                                                    <span className="font-medium text-center">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>
        </section>
    );
}
