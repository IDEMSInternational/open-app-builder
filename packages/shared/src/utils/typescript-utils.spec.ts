import { emptyDirSync, ensureDirSync, existsSync, readdirSync } from "fs-extra";
import { resolve } from "path";
import * as utils from "./typescript-utils";

describe("Typescript Utils - Compile TS", () => {
  let testFilesDir = resolve(__dirname, "../../test/typescript-utils");
  let testOutputDir = resolve(testFilesDir, "output");
  beforeAll(() => {
    ensureDirSync(testOutputDir);
    emptyDirSync(testOutputDir);
  });

  // Compilation tests
  ["test-basic.ts", "test-import.ts"].forEach((name) => {
    describe(name.replace(".ts", ""), () => {
      it("compiles", () => {
        const inputPath = resolve(testFilesDir, name);
        utils.compileTsToJS({
          fileNames: [inputPath],
          compilerOptions: {
            outDir: testOutputDir,
          },
        });
        const compiledJSPath = resolve(testOutputDir, name.replace(".ts", ".js"));
        expect(existsSync(compiledJSPath)).toBeTrue();
      });
    });
  });
  // Error Handling
  it("handles file missing", () => {
    const name = "test-missing.ts";
    const inputPath = resolve(testFilesDir, name);
    expect(() =>
      utils.compileTsToJS({
        fileNames: [inputPath],
        compilerOptions: {
          outDir: testOutputDir,
        },
      })
    ).toThrow();
  });
  it("handles invalid ts", () => {
    const name = "test-error.ts";
    const inputPath = resolve(testFilesDir, name);
    expect(() =>
      utils.compileTsToJS({
        fileNames: [inputPath],
        compilerOptions: {
          outDir: testOutputDir,
        },
      })
    ).toThrow();
  });
});
