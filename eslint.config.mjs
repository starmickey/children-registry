import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import globals from "globals"; // Required to access Jest globals

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Custom global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
  ]),

  // Jest globals & custom rules
  {
    languageOptions: {
      globals: {
        ...globals.jest, // Enables describe, test, expect, jest, beforeEach, etc.
      },
    },
    rules: {
      "no-unused-vars": "warn",
      // Turned off for TypeScript because tsc handles undefined check natively
      "no-undef": "off",
    },
  },
]);

export default eslintConfig;
