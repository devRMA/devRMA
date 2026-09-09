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
  previewSuccessLabel?: string;
  previewArchivedStatusLabel?: string;
  previewProductionStatusLabel?: string;
  previewVerifiedLabel?: string;
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
  previewSuccessLabel = "[SUCCESS] Modules:",
  previewArchivedStatusLabel = "Status: Archived Lab",
  previewProductionStatusLabel = "Memory: 24MB • Status: Production-Ready",
  previewVerifiedLabel = "Architecture verified",
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
      rotateX: -verticalRatio * 3,
      rotateY: horizontalRatio * 3,
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
        transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden rounded-2xl border-border/80 bg-card/60 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-primary/50 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden border-b border-border/70 bg-zinc-950/50">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1536px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out hover:scale-105 active:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col justify-between bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">{title.toLowerCase()}</span>
              </div>
              <div className="space-y-1.5 py-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>$ {title.toLowerCase().replace(/\s+/g, "-")} --status</span>
                </div>
                <p className="text-[11px] text-emerald-400">
                  {previewSuccessLabel} {technologies.slice(0, 2).join(", ")}
                </p>
                <p className="text-[11px] text-zinc-400">
                  {isArchived ? previewArchivedStatusLabel : previewProductionStatusLabel}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[10px] text-zinc-500">
                <span>{previewVerifiedLabel}</span>
                <span className="text-cyan-400 font-semibold">devrma</span>
              </div>
            </div>
          )}
        </div>
        <CardHeader className="p-5">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground">
              {title}
            </CardTitle>
            {isArchived && (
              <Badge
                variant="outline"
                className="border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-[10px] shrink-0"
              >
                {archivedLabel ?? "Archived"}
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-5 pt-0">
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">{longDescription}</p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {technologies.map((technologyItem) => (
              <Badge
                key={technologyItem}
                variant="secondary"
                className="border border-border/60 bg-muted/50 text-[11px] font-mono px-2 py-0.5 text-muted-foreground"
              >
                {technologyItem}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t border-border/50 p-4 pt-3">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-border/80 text-xs font-mono h-8 hover:border-primary/40 active:scale-[0.98]"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button
              size="sm"
              className="rounded-xl text-xs font-mono h-8 shadow-sm shadow-primary/20 active:scale-[0.98]"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
