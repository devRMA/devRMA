"use client";

import { Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/atoms/language-toggle";
import { Logo } from "@/components/atoms/logo";
import { ModeToggle } from "@/components/atoms/mode-toggle";
import { SocialIcon } from "@/components/atoms/social-icon";
import { useLanguage } from "@/components/language-provider";
import { Navigation } from "@/components/organisms/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const { t: translate } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Logo />

        <Navigation className="hidden md:flex items-center gap-6 relative rounded-full border border-border/60 bg-card/60 px-5 py-1.5 backdrop-blur-md" />

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 sm:flex">
            <SocialIcon
              href="https://github.com/devRMA"
              icon={Github}
              label={translate("a11y.githubProfile")}
            />
            <SocialIcon
              href="https://linkedin.com/in/devRMA"
              icon={Linkedin}
              label={translate("a11y.linkedinProfile")}
            />
          </span>
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
