"use client";

import { clsx } from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

import { title } from "@/components/primitives";

export const TypingName = () => {
    const element = useRef<HTMLElement | null>(null);
    const typed = useRef<Typed | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const { scrollYProgress } = useScroll({
        target: element,
    });

    useEffect(() => {
        const color = title({ color: "blue" });
        typed.current = new Typed(element.current, {
            strings: [
                `<span class="${color}">DevRMA</<span>^1000`,
                `<span class="${color}">Dev</span>eloper<br><span class="${color}">R</span>afael<br><span class="${color}">M</span>artins<br><span class="${color}">A</span>lves^1000`,
            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
        });
        setIsTyping(true);

        return () => {
            typed.current?.destroy();
        };
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest <= 0.01) {
            if (isTyping) {
                typed.current?.stop();
                setIsTyping(false);
            }
        } else {
            if (!isTyping) {
                typed.current?.start();
                setIsTyping(true);
            }
        }
    });

    return (
        <h1 className={clsx("h-[9rem] w-48", title())}>
            <span ref={element} />
        </h1>
    );
};
