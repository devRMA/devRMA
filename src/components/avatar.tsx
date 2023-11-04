"use client";

import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export const Avatar = () => {
    return (
        <MouseParallaxContainer resetOnLeave className="grid h-[25rem] w-[25rem] auto-rows-auto rounded-full">
            <MouseParallaxChild factorX={0.03} factorY={0.03} className="absolute overflow-hidden blur-[1px]">
                <Image as={NextImage} width={500} height={500} src="/background.png" alt="Background" />
            </MouseParallaxChild>
            <MouseParallaxChild factorX={0.01} factorY={0.01} className="z-0">
                <Image as={NextImage} width={500} height={500} src="/avatar.png" alt="Avatar" />
            </MouseParallaxChild>
        </MouseParallaxContainer>
    );
};
