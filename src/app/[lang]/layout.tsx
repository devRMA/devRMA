import "@/styles/globals.css";

import { Link } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Metadata } from "next";

import { Providers } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import { fontPoppins } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";
import { getDictionary } from "@/utils/get-dictionary";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function RootLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const t = await getDictionary(lang);

    return (
        <html
            lang={lang}
            suppressHydrationWarning
            className="scroll-smooth scrollbar-thin scrollbar-thumb-zinc-800 dark:scrollbar-thumb-zinc-400"
        >
            <head />
            <body className={clsx("min-h-screen bg-background font-sans", fontPoppins.variable)}>
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <div className="relative flex h-screen flex-col">
                        <Navbar lang={lang} />
                        <main className="container mx-auto max-w-7xl flex-grow px-6">{children}</main>
                        <footer className="flex w-full items-center justify-center py-10">
                            <Link
                                isExternal
                                className="flex items-center gap-1 text-current"
                                href="https://github.com/devRMA/devRMA/tree/portfolio"
                                title="Source"
                            >
                                <span className="text-default-600">{t.footer.source}</span>
                                <p className="text-primary">GitHub</p>
                            </Link>
                        </footer>
                    </div>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
