"use client";

import type React from "react";

import { useLanguage } from "@/components/language-provider";
import { NavItem } from "@/components/molecules/nav-item";
import { MobileMenu } from "@/components/organisms/mobile-menu";
import { useActiveSection } from "@/hooks/use-active-section";

interface NavigationProps {
  className?: string;
}

const NAV_SECTIONS = ["about", "skills", "projects", "experience", "certificates", "contact"];

export function Navigation({ className }: Readonly<NavigationProps>) {
  const { t } = useLanguage();

  const activeSection = useActiveSection(NAV_SECTIONS);

  const navItems = NAV_SECTIONS.map((id) => ({
    href: `#${id}`,
    label: t(`nav.${id}`),
    id,
  }));

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      <nav className={className} aria-label={t("a11y.mobileNavigation")}>
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={handleNavClick}
          />
        ))}
      </nav>
      <MobileMenu navItems={navItems} activeSection={activeSection} onNavClick={handleNavClick} />
    </>
  );
}
