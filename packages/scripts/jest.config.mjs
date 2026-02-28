/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  // Global setup runs outside of test suite context
  globalSetup: "<rootDir>/test/globalSetup.ts",
  // File setup runs per test file
  setupFiles: ["<rootDir>/test/testSetup.ts"],
  // ts paths also need to be mapped for jest resolution
  moduleNameMapper: {
    "^shared/(.*)$": "<rootDir>/../../packages/shared/src/$1",
    "^actions$": "<rootDir>/../../packages/actions",
    "^data-models$": "<rootDir>/../../packages/data-models",
    "^workflows$": "<rootDir>/../../packages/workflows",
  },
};
export default config;
