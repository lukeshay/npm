import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reporter: ["html", "lcov", "text", "text-summary"],
    },
    globals: true,
    passWithNoTests: true,
  },
});
