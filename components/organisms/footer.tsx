"use client";

import { ArrowUp, Github, Linkedin } from "lucide-react";
import { Logo } from "@/components/atoms/logo";
import { SocialIcon } from "@/components/atoms/social-icon";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-8 border-t relative">
      <div className="container-page">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Logo className="mb-2" />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Rafael Martins Alves. {t("footer.rights")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SocialIcon
              href="https://github.com/devRMA"
              icon={Github}
              label={t("a11y.githubProfile")}
            />
            <SocialIcon
              href="https://linkedin.com/in/devRMA"
              icon={Linkedin}
              label={t("a11y.linkedinProfile")}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              aria-label={t("footer.backToTop")}
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
