export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "DevRMA",
    description: "Rafael Martins Alves Portfolio",
    links: {
        github: "https://github.com/devRMA",
    },
    navItems: [
        {
            key: "home",
            href: "/#home",
        },
        {
            key: "about",
            href: "/#about",
        },
        {
            key: "projects",
            href: "/#projects",
        },
        {
            key: "experiences",
            href: "/#experiences",
        },
    ],
};
