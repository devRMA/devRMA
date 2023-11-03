import { Navbar as NextUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/navbar";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { LinkedInIcon } from "@/components/icons";

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
                    <LinkedInIcon size={22} />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
                <ThemeSwitch />
            </NavbarContent>
        </NextUINavbar>
    );
};
