import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "data/**",
        "locales/**",
        "**/*.config.{js,mjs,ts,mts}",
        "**/types/**",
        "**/tests/**",
        "**/node_modules/**",
        "**/.next/**",
        "**/public/**",
        "vitest.config.mts",
      ],
    },
  },
});
