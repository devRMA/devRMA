"use client";

import { Button } from "@nextui-org/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { GlobeIcon } from "@/components/icons";

export const LocaleSwitcher = () => {
    const pathName = usePathname();
    const redirectedPathName = (locale: string) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };
    const items = [
        {
            label: "Português",
            href: redirectedPathName("pt"),
        },
        {
            label: "English",
            href: redirectedPathName("en"),
        },
    ];

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button isIconOnly variant="light" className="text-default-500" aria-label="Change Language">
                    <GlobeIcon size={24} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                {items.map((item) => (
                    <DropdownItem key={item.label} href={item.href}>
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
