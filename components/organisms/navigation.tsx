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
  const { t: translate } = useLanguage();

  const activeSection = useActiveSection(NAV_SECTIONS);

  const navItems = NAV_SECTIONS.map((sectionIdentifier) => ({
    href: `#${sectionIdentifier}`,
    label: translate(`nav.${sectionIdentifier}`),
    id: sectionIdentifier,
  }));

  const handleNavClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    clickEvent.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      <nav className={className} aria-label={translate("a11y.mobileNavigation")}>
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
