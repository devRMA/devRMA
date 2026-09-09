"use client";

import { Pause, Play } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

interface MarqueeProps {
  children: ReactNode;
}

export function Marquee({ children }: Readonly<MarqueeProps>) {
  const { t: translate } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute right-2 -top-2 z-10 opacity-60 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPaused((previousState) => !previousState)}
          aria-pressed={isPaused}
          aria-label={isPaused ? translate("a11y.playCarousel") : translate("a11y.pauseCarousel")}
          className="h-7 w-7 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm"
        >
          {isPaused ? (
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </Button>
      </div>

      <div className="carousel-container">
        <div className="carousel" data-paused={isPaused || undefined}>
          <div className="flex">{children}</div>
          <div className="flex" aria-hidden="true" data-testid="marquee-loop-clone">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
