"use client";

import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse";

export const Avatar = () => {
    return (
        <MouseParallaxContainer
            resetOnLeave
            className="grid h-52 w-52 auto-rows-auto rounded-full md:h-[25rem] md:w-[25rem]"
        >
            <MouseParallaxChild factorX={0.03} factorY={0.03} className="absolute overflow-hidden blur-[1px]">
                <Image as={NextImage} width={500} height={500} src="/background.png" alt="Background" priority />
            </MouseParallaxChild>
            <MouseParallaxChild factorX={0.01} factorY={0.01} className="z-0">
                <Image as={NextImage} width={500} height={500} src="/avatar.png" alt="Avatar" priority />
            </MouseParallaxChild>
        </MouseParallaxContainer>
    );
};
