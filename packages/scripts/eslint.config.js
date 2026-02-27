const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");
const jestPlugin = require("eslint-plugin-jest");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    ...jestPlugin.configs["flat/recommended"],
  }
);
