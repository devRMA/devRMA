"use client";

import { useRef, useEffect } from "react";
import { title } from "@/components/primitives";
import Typed from "typed.js";

export const TypingName = () => {
    const element = useRef(null);

    useEffect(() => {
        const color = title({ color: "blue" });

        const typed = new Typed(element.current, {
            strings: [
                `<span class="${color}">DevRMA</<span>^10000`,
                `<span class="${color}">Dev</span>eloper<br><span class="${color}">R</span>afael<br><span class="${color}">M</span>artins<br><span class="${color}">A</span>lves^10000`,
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
        <h1 className={title()}>
            <span ref={element} />
        </h1>
    );
};
