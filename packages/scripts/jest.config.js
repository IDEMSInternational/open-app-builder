/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  globalSetup: "<rootDir>/test/setup.ts",
  // Compiled output of `yarn workspace scripts build`
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/build/"],
};

