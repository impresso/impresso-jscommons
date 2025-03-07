import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const projectSpecificRules = {
  "no-underscore-dangle": "off",
  "func-names": "off",
  "class-methods-use-this": "off",
  "no-console": "off",
  "prefer-destructuring": "off",
  "no-param-reassign": [
    "error",
    {
      props: false,
    },
  ],
};

export default tseslint.config(
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        name: "impresso-jscommons/recommended-rules",
        files: ["src/**/*.{js,ts}", "test/**/*.{js,ts}"],
        ignores: ["src/generated/**/*.{js,ts}", "dist/**", "rollup.config.ts"],
        rules: {
          ...projectSpecificRules,
        },
        languageOptions: {
          globals: {
            ...globals.mocha,
            ...globals.node,
          },
        },
    }
)
