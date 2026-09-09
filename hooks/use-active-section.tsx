"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sections: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string | null>(sections[0] ?? null);

  useEffect(() => {
    const visibleTops = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleTops.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleTops.delete(entry.target.id);
          }
        }

        if (visibleTops.size === 0) {
          return;
        }

        const topMost = [...visibleTops.entries()].sort(
          ([, firstTop], [, secondTop]) => firstTop - secondTop,
        )[0];
        setActiveSection(topMost[0]);
      },
      { rootMargin: `-${offset}px 0px -45% 0px`, threshold: 0 },
    );

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [sections, offset]);

  return activeSection;
}
