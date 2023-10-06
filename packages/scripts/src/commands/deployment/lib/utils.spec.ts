import { existsSync, rmSync } from "fs";
import { isAbsolute, resolve } from "path";
import { ensureDeploymentTranspiled, loadDeploymentJS } from "./utils";

describe("Deployment Utils", () => {
  const testDeploymentDir = resolve(__dirname, "../../../../test/deployments/basic");
  const inputTsPath = resolve(testDeploymentDir, "config.ts");

  it("Ensures deployment transpiled", () => {
    const outputPath = inputTsPath.replace(".ts", ".js");
    if (existsSync(outputPath)) {
      rmSync(outputPath);
    }
    ensureDeploymentTranspiled(inputTsPath);
    expect(existsSync(outputPath)).toEqual(true);
  });

  it("Loads deployment from JS", async () => {
    const configJSPath = ensureDeploymentTranspiled(inputTsPath);
    const config = await loadDeploymentJS(configJSPath);
    expect(config._validated).toBeTrue();
  });

  it("Replaces config relative paths", async () => {
    const configJSPath = ensureDeploymentTranspiled(inputTsPath);
    const config = await loadDeploymentJS(configJSPath);
    const { output_path } = config.app_data;
    expect(isAbsolute(output_path)).toBeTrue();
  });
});
