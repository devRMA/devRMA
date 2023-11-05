import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: "var(--font-poppins)",
            },
            minHeight: {
                screenHeightWithoutHeader: "calc(100vh - 64px)",
            },
            height: {
                screenHeightWithoutHeader: "calc(100vh - 64px)",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
    tailwindFunctions: ["tv"],
};
