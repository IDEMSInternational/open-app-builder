import type { JestConfigWithTsJest } from "ts-jest";

import baseConfig from "./jest.config";

const config: JestConfigWithTsJest = {
  ...baseConfig,
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e.spec.ts$",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
  },
  // setupFiles: ["<rootDir>/test/e2e-setup.ts"],
};

export default config;
