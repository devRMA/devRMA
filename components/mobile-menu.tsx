"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export function MobileMenu({ navItems, activeSection, onNavClick }: Readonly<MobileMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const { isTouchDevice } = useMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (navigator.vibrate && isTouchDevice) {
      navigator.vibrate(5);
    }
  };

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
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
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavItemClick(e, item.href)}
                    className={cn(
                      "py-3 px-2 text-sm font-medium transition-colors flex items-center rounded-md relative overflow-hidden",
                      activeSection === item.id
                        ? "text-primary bg-primary/5"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className="ml-1">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
