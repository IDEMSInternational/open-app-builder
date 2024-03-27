import { resolve } from "path";
import { expect } from "expect";
import { envReplace, IEnvReplaceConfig } from "./index";
import { readFileSync, readdirSync, rmSync } from "fs";

const testDir = resolve(__dirname, "../test");

const TEST_ENV = {
  STRING_VAR: "example string",
  BOOL_VAR: true,
  INT_VAR: 8,
  CHILD_VAR: "example child",
};

// Clean any generated output files
function cleanTestDir(dir: string) {
  const testFiles = readdirSync(dir, { withFileTypes: true });
  for (const testFile of testFiles) {
    if (testFile.isDirectory()) {
      cleanTestDir(resolve(dir, testFile.name));
    }
    if (testFile.isFile() && !testFile.name.includes("template.")) {
      const fullPath = resolve(dir, testFile.name);
      rmSync(fullPath);
    }
  }
}

describe("Env Replace", () => {
  beforeEach(() => {
    cleanTestDir(testDir);
  });

  it("Replaces file env", async () => {
    // populate global process env to use alongside hardcoded env
    process.env.GLOBAL_VAR = "example global";
    const res = await envReplace.replaceFiles({
      cwd: testDir,
      envAdditional: TEST_ENV,
      excludeVariables: ["EXCLUDED_VAR"],
    });
    // list of replaced values
    expect(res).toEqual({
      "test_basic.json": {
        STRING_VAR: "example string",
        GLOBAL_VAR: "example global",
        BOOL_VAR: true,
        INT_VAR: 8,
      },
      "child/.env": { STRING_VAR: "example string" },
    });
    // raw file output (including non-replaced)
    const outputFile = readFileSync(resolve(testDir, "test_basic.json"), { encoding: "utf-8" });
    expect(JSON.parse(outputFile)).toEqual({
      test_string: "example string",
      test_global: "example global",
      test_excluded: "${EXCLUDED_VAR}",
      test_non_var: "example non var",
      test_boolean: true,
      test_int: 8,
    });
  });

  it("Supports file matching glob override", async () => {
    const res = await envReplace.replaceFiles({
      rawGlobInput: "child/*.*",
      envAdditional: TEST_ENV,
      cwd: testDir,
    });
    expect(res).toEqual({ "child/.env": { STRING_VAR: "example string" } });
  });
});
