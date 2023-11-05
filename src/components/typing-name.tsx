"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

import { title } from "@/components/primitives";

export const TypingName = () => {
    const element = useRef(null);

    useEffect(() => {
        const color = title({ color: "blue" });

        const typed = new Typed(element.current, {
            strings: [
                `<span class="${color}">DevRMA</<span>^1000`,
                `<span class="${color}">Dev</span>eloper<br><span class="${color}">R</span>afael<br><span class="${color}">M</span>artins<br><span class="${color}">A</span>lves^1000`,
            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <h1 className={clsx("h-[9rem] w-48", title())}>
            <span ref={element} />
        </h1>
    );
};
