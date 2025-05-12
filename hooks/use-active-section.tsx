"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sections: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string | null>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const observedElements: Element[] = [];

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.top - rectB.top;
        });

        setActiveSection(visibleEntries[0].target.id);
      } else if (window.scrollY < 100) {
        setActiveSection("about");
      }
    };

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(handleObserver, {
          rootMargin: `-${offset}px 0px -${Math.floor(
            window.innerHeight / 2
          )}px 0px`,
          threshold: [0.1, 0.5],
        });

        observer.observe(element);
        observers.push(observer);
        observedElements.push(element);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((observer, index) => {
        if (observedElements[index]) {
          observer.unobserve(observedElements[index]);
        }
        observer.disconnect();
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, offset]);

  return activeSection;
}
