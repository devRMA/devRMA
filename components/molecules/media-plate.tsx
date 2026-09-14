"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MediaPlateProps {
  variant: "capture" | "diagram";
  kindLabel: string;
  year: string;
  alt: string;
  aspect: "16/10" | "9/16" | "11/16";
  src?: string;
  width?: number;
  height?: number;
  sizes?: string;
  note?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ASPECT_CLASS = {
  "16/10": "aspect-[16/10]",
  "9/16": "aspect-[9/16]",
  "11/16": "aspect-[11/16]",
} as const;

export function MediaPlate({
  variant,
  kindLabel,
  year,
  alt,
  aspect,
  src,
  width,
  height,
  sizes,
  note,
  priority = false,
  className,
  children,
}: MediaPlateProps) {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <figure
      className={cn(
        "group/plate rounded-xl border border-border/70 bg-muted p-2",
        variant === "diagram" && "border-dashed",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-lg bg-muted/60 ring-1 ring-border/60 transition-opacity duration-200 ease-out-expo dark:opacity-90 dark:group-hover/plate:opacity-100 dark:group-focus-within/plate:opacity-100 dark:group-hover:opacity-100 dark:group-focus-within:opacity-100",
          ASPECT_CLASS[aspect],
        )}
      >
        {hasFailed ? (
          <span className="px-4 text-center text-xs text-foreground/70">{alt}</span>
        ) : variant === "capture" && src && width && height && sizes ? (
          <Image
            className="h-full w-full object-cover object-top"
            alt={alt}
            src={src}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            onError={() => setHasFailed(true)}
          />
        ) : (
          children
        )}
      </div>
      <figcaption className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[11px] font-medium text-foreground/70">
        <span>{kindLabel}</span>
        <span>{year}</span>
      </figcaption>
      {note ? (
        <p className="mt-1.5 font-mono text-[11px] font-medium leading-snug text-foreground/70">
          {note}
        </p>
      ) : null}
    </figure>
  );
}
