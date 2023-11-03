import { Navbar as NextUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/react";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { LocaleSwitcher } from "@/components/locale-switcher";

export const Navbar = () => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky" isBordered>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="max-w-fit gap-3">
                    <NextLink className="flex items-center justify-start gap-1" href="/">
                        <p className="font-bold text-inherit">devRMA</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
                <NavbarItem className="hidden gap-2 sm:flex">
                    <ThemeSwitch />
                    <LocaleSwitcher />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
                <ThemeSwitch />
                <LocaleSwitcher />
            </NavbarContent>
        </NextUINavbar>
    );
};