"use client";

import { cn } from "@/lib/utils";

import { useLanguage } from "@/components/language-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { TouchCard } from "@/components/touch-card";
import { useMobile } from "@/hooks/use-mobile";

export function Projects() {
    const { t } = useLanguage();
    const { isMobile } = useMobile();

    return (
        <section
            id="projects"
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
                    {t("projects.title")}
                </motion.h2>
                <motion.p
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t("projects.description")}
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <TouchCard>
                            <Card className="h-full flex flex-col overflow-hidden">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={
                                            project.image ||
                                            "/placeholder.svg?height=192&width=384"
                                        }
                                        alt={project.title}
                                        fill
                                        className={cn(
                                            "object-cover",
                                            isMobile
                                                ? "transition-transform active:scale-105"
                                                : "transition-transform hover:scale-105"
                                        )}
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription>
                                        {project.shortDescription}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm mb-4">
                                        {project.longDescription}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-2">
                                    {project.githubUrl && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                GitHub
                                            </a>
                                        </Button>
                                    )}
                                    {project.liveUrl && (
                                        <Button size="sm" asChild>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Demo
                                            </a>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </TouchCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
