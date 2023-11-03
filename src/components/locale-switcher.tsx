"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/config/i18n";

export const LocaleSwitcher = () => {
    const pathName = usePathname();
    const redirectedPathName = (locale: string) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <ul>
            {i18n.locales.map((locale) => {
                return (
                    <li key={locale}>
                        <Link href={redirectedPathName(locale)}>{locale}</Link>
                    </li>
                );
            })}
        </ul>
    );
};
