"use client";

import Image from "next/image";
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
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { TouchCard } from "@/components/atoms/touch-card";
import { useMobile } from "@/hooks/use-mobile";

interface ProjectCardProps {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  shortDescription,
  longDescription,
  technologies,
  image,
  githubUrl,
  liveUrl,
}: Readonly<ProjectCardProps>) {
  const { isMobile } = useMobile();

  return (
    <TouchCard>
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=192&width=384"}
            alt={title}
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
          <CardTitle>{title}</CardTitle>
          <CardDescription>{shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm mb-4">{longDescription}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </TouchCard>
  );
}
