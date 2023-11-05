import {
    Link,
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";
import { getDictionary } from "@/utils/get-dictionary";

export const Navbar = async ({ lang }: { lang: Locale }) => {
    const t = await getDictionary(lang);

    return (
        <NextUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="max-w-fit gap-3">
                    <Link className="flex items-center justify-start gap-1" color="foreground" href={`/${lang}`}>
                        <p className="font-bold text-inherit">DevRMA</p>
                    </Link>
                </NavbarBrand>

                <ul className="ml-2 hidden justify-start gap-4 lg:flex">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.key}>
                            <Link href={`/${lang}${item.href}`} color="foreground">
                                {t.navbar.items[item.key as keyof typeof t.navbar.items]}
                            </Link>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
                <NavbarItem className="hidden gap-2 sm:flex">
                    <LocaleSwitcher />
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
                <LocaleSwitcher />
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                {siteConfig.navItems.map((item) => (
                    <div key={item.key} className="mx-4 mt-2 flex flex-col gap-2">
                        <NavbarMenuItem>
                            <Link href={`/${lang}${item.href}`} size="lg" color="foreground">
                                {t.navbar.items[item.key as keyof typeof t.navbar.items]}
                            </Link>
                        </NavbarMenuItem>
                    </div>
                ))}
            </NavbarMenu>
        </NextUINavbar>
    );
};
