"use client";

import { Pause, Play } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

interface MarqueeProps {
  children: ReactNode;
}

export function Marquee({ children }: Readonly<MarqueeProps>) {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-pressed={isPaused}
          aria-label={isPaused ? t("a11y.playCarousel") : t("a11y.pauseCarousel")}
        >
          {isPaused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
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
