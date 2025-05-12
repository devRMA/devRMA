"use client";

import type React from "react";

import { useActiveSection } from "@/hooks/use-active-section";
import { useLanguage } from "@/components/language-provider";
import { NavItem } from "@/components/molecules/nav-item";
import { useMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "@/components/organisms/mobile-menu";

interface NavigationProps {
    className?: string;
}

export function Navigation({ className }: NavigationProps) {
    const { t } = useLanguage();
    const { isMobile } = useMobile();

    const navSections = [
        "about",
        "skills",
        "projects",
        "experience",
        "certificates",
        "contact",
    ];
    const activeSection = useActiveSection(navSections);

    const navItems = [
        { href: "#about", label: t("nav.about"), id: "about" },
        { href: "#skills", label: t("nav.skills"), id: "skills" },
        { href: "#projects", label: t("nav.projects"), id: "projects" },
        { href: "#experience", label: t("nav.experience"), id: "experience" },
        {
            href: "#certificates",
            label: t("nav.certificates"),
            id: "certificates",
        },
        { href: "#contact", label: t("nav.contact"), id: "contact" },
    ];

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
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

    if (isMobile) {
        return (
            <MobileMenu
                navItems={navItems}
                activeSection={activeSection}
                onNavClick={handleNavClick}
            />
        );
    }

    return (
        <nav className={className}>
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
    );
}
