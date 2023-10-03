import { emptyDirSync, ensureDirSync, existsSync, readdirSync } from "fs-extra";
import { resolve } from "path";
import * as utils from "./typescript-utils";

describe("Typescript Utils - Compile TS", () => {
  let testFilesDir = resolve(__dirname, "../../test/typescript-utils");
  let testOutputDir = resolve(testFilesDir, "output");
  const inputFileNames = readdirSync(testFilesDir).filter((filename) => filename.endsWith(".ts"));
  beforeAll(() => {
    ensureDirSync(testOutputDir);
  });
  beforeEach(() => {
    emptyDirSync(testOutputDir);
  });
  inputFileNames.forEach((name) => {
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
});
