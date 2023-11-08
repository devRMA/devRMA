"use client";

import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { FC } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
    const { theme, setTheme } = useTheme();
    const iconVariants: Variants = {
        enter: {
            transform: "rotateY(90deg)",
        },
        center: {
            transform: "rotateY(0deg)",
        },
        exit: {
            transform: "rotateY(90deg)",
        },
    };

    const onChange = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
        isSelected: theme === "light",
        "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
        onChange,
    });

    return (
        <Component
            {...getBaseProps({
                className: clsx(
                    "px-px transition-opacity hover:opacity-80 cursor-pointer",
                    className,
                    classNames?.base,
                ),
            })}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: clsx(
                        [
                            "h-auto w-auto",
                            "bg-transparent",
                            "rounded-lg",
                            "flex items-center justify-center",
                            "group-data-[selected=true]:bg-transparent",
                            "!text-default-500",
                            "pt-px",
                            "px-0",
                            "mx-0",
                        ],
                        classNames?.wrapper,
                    ),
                })}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {!isSelected ? (
                        <motion.span
                            key="sun"
                            className="relative"
                            variants={iconVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <SunIcon className="absolute" size={24} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="moon"
                            className="relative"
                            variants={iconVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <MoonIcon className="absolute" size={24} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </Component>
    );
};
