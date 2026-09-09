"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMobile } from "@/hooks/use-mobile";

interface ProjectCardProps {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  image?: string | null;
  githubUrl?: string;
  liveUrl?: string | null;
  isArchived?: boolean;
  archivedLabel?: string;
}

export function ProjectCard({
  title,
  shortDescription,
  longDescription,
  technologies,
  image,
  githubUrl,
  liveUrl,
  isArchived,
  archivedLabel,
}: Readonly<ProjectCardProps>) {
  const { isMobile } = useMobile();
  const [tiltRotation, setTiltRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (mouseEvent: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      return;
    }

    const cardBoundingRectangle = mouseEvent.currentTarget.getBoundingClientRect();
    const relativeCoordinateX = mouseEvent.clientX - cardBoundingRectangle.left;
    const relativeCoordinateY = mouseEvent.clientY - cardBoundingRectangle.top;
    const horizontalRatio = relativeCoordinateX / cardBoundingRectangle.width - 0.5;
    const verticalRatio = relativeCoordinateY / cardBoundingRectangle.height - 0.5;

    setTiltRotation({
      rotateX: -verticalRatio * 8,
      rotateY: horizontalRatio * 8,
    });
  };

  const handleMouseLeave = () => {
    setTiltRotation({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tiltRotation.rotateX}deg) rotateY(${tiltRotation.rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden border-b border-border/70 bg-muted/30">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1536px) 50vw, 25vw"
              className="object-cover transition-transform hover:scale-105 active:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col justify-between bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-zinc-500">{title.toLowerCase()}</span>
              </div>
              <div className="space-y-1 py-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>$ {title.toLowerCase().replace(/\s+/g, "-")} --status</span>
                </div>
                <p className="text-[11px] text-emerald-400">
                  [SUCCESS] Modules loaded: {technologies.slice(0, 2).join(", ")}
                </p>
                <p className="text-[11px] text-zinc-400">
                  {isArchived ? "Status: Archived" : "Memory: 24MB • Status: Production-Ready"}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[10px] text-zinc-500">
                <span>Architecture verified</span>
                <span className="text-cyan-500">devrma</span>
              </div>
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{title}</CardTitle>
            {isArchived && (
              <Badge
                variant="outline"
                className="border-amber-500/40 bg-amber-500/10 text-amber-500 font-mono text-[11px] shrink-0"
              >
                {archivedLabel ?? "Archived"}
              </Badge>
            )}
          </div>
          <CardDescription>{shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{longDescription}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {technologies.map((technologyItem) => (
              <Badge
                key={technologyItem}
                variant="secondary"
                className="border border-border/60 bg-muted/60 text-xs font-mono"
              >
                {technologyItem}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t border-border/40 pt-4">
          {githubUrl && (
            <Button variant="outline" size="sm" className="rounded-lg" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" className="rounded-lg" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
