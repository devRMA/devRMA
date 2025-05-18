"use client";

import { LanguageToggle } from "@/components/atoms/language-toggle";
import { Logo } from "@/components/atoms/logo";
import { ModeToggle } from "@/components/atoms/mode-toggle";
import { SocialIcon } from "@/components/atoms/social-icon";
import { Navigation } from "@/components/organisms/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Logo />

        <Navigation className="hidden md:flex items-center gap-6 relative" />

        <div className="flex items-center gap-2">
          <SocialIcon href="https://github.com/devRMA" icon={Github} label="GitHub Profile" />
          <SocialIcon
            href="https://linkedin.com/in/devRMA"
            icon={Linkedin}
            label="LinkedIn Profile"
          />
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
