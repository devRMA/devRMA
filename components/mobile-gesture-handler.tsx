"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion, useAnimation, type PanInfo } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/components/language-provider";

export function MobileGestureHandler({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isMobile, isTouchDevice } = useMobile();
    const controls = useAnimation();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [startY, setStartY] = useState(0);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [isSwipeGuideShown, setIsSwipeGuideShown] = useState(false);

    const sections = [
        "about",
        "skills",
        "projects",
        "experience",
        "certificates",
        "contact",
    ];

    useEffect(() => {
        if (isMobile && isTouchDevice && !isSwipeGuideShown) {
            const hasSeenGuide = localStorage.getItem("hasSeenSwipeGuide");

            if (!hasSeenGuide) {
                setTimeout(() => {
                    setIsSwipeGuideShown(true);
                    toast({
                        title:
                            t("mobile.swipeGuideTitle") || "Swipe to Navigate",
                        description:
                            t("mobile.swipeGuideDesc") ||
                            "Swipe up and down to navigate between sections",
                        duration: 5000,
                    });
                    localStorage.setItem("hasSeenSwipeGuide", "true");
                }, 2000);
            }
        }
    }, [isMobile, isTouchDevice, isSwipeGuideShown, toast, t]);

    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;

                const { top, bottom } = element.getBoundingClientRect();
                const elementTop = top + window.scrollY;
                const elementBottom = bottom + window.scrollY;

                if (
                    scrollPosition >= elementTop &&
                    scrollPosition <= elementBottom
                ) {
                    if (currentSection !== section) {
                        setCurrentSection(section);
                    }
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMobile, currentSection]);

    const handlePanStart = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        setStartY(info.point.y);
    };

    const handlePanEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        if (!isMobile || !currentSection) return;

        const endY = info.point.y;
        const diffY = startY - endY;
        const threshold = 50;

        if (Math.abs(diffY) < threshold) return;

        const currentIndex = sections.indexOf(currentSection);
        let targetIndex;

        if (diffY > 0) {
            targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
            targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex) {
            const targetSection = document.getElementById(
                sections[targetIndex]
            );
            if (targetSection) {
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                controls.start({
                    opacity: [0, 0.1, 0],
                    backgroundColor:
                        diffY > 0
                            ? "rgba(0, 100, 255, 0.1)"
                            : "rgba(0, 100, 255, 0.1)",
                    transition: { duration: 0.5 },
                });
            }
        }
    };

    if (!isMobile || !isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <motion.div
            onPanStart={handlePanStart}
            onPanEnd={handlePanEnd}
            style={{ touchAction: "pan-y" }}
        >
            <motion.div
                animate={controls}
                className="fixed inset-0 pointer-events-none z-50"
            />
            {children}
        </motion.div>
    );
}
