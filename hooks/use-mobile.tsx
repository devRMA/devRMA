"use client";

import { useState, useEffect } from "react";

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const checkTouch = () => {
            setIsTouchDevice(
                "ontouchstart" in window ||
                    navigator.maxTouchPoints > 0 ||
                    (navigator as any).msMaxTouchPoints > 0
            );
        };

        checkMobile();
        checkTouch();

        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return { isMobile, isTouchDevice };
}
