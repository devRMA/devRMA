"use client";

import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/atoms/brand-icons";
import { Logo } from "@/components/atoms/logo";
import { SocialIcon } from "@/components/atoms/social-icon";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t: translate } = useLanguage();
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
              &copy; {currentYear} Rafael Martins Alves. {translate("footer.rights")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SocialIcon
              href="https://github.com/devRMA"
              icon={GithubIcon}
              label={translate("a11y.githubProfile")}
            />
            <SocialIcon
              href="https://linkedin.com/in/devRMA"
              icon={LinkedinIcon}
              label={translate("a11y.linkedinProfile")}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              aria-label={translate("footer.backToTop")}
              className="group"
            >
              <ArrowUp
                className="h-5 w-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
