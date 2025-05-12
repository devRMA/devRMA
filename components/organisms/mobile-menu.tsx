"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNavItem } from "@/components/molecules/mobile-nav-item";

type NavItem = {
    href: string;
    label: string;
    id: string;
};

interface MobileMenuProps {
    navItems: NavItem[];
    activeSection: string | null;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({
    navItems,
    activeSection,
    onNavClick,
}: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { isTouchDevice } = useMobile();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (navigator.vibrate && isTouchDevice) {
            navigator.vibrate(5);
        }
    };

    const handleNavItemClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        onNavClick(e, href);
        setIsOpen(false);
        if (navigator.vibrate && isTouchDevice) {
            navigator.vibrate(5);
        }
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.05,
                staggerDirection: 1,
            },
        },
    };

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 },
    };

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                className="relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-16 left-0 right-0 bg-background border-b z-50"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        aria-label="Mobile navigation"
                    >
                        <nav className="flex flex-col p-4">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    variants={itemVariants}
                                >
                                    <MobileNavItem
                                        href={item.href}
                                        label={item.label}
                                        isActive={activeSection === item.id}
                                        onClick={handleNavItemClick}
                                    />
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
