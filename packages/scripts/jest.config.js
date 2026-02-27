/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  // Global setup runs outside of test suite context
  globalSetup: "<rootDir>/test/globalSetup.ts",
  // File setup runs per test file
  setupFiles: ["<rootDir>/test/testSetup.ts"],
};
