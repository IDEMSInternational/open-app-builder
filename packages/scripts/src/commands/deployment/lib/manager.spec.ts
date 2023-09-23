import fs from "fs-extra";
import mockFs from "mock-fs";
import path from "path";
import inquirer from "inquirer";
import { DeploymentManager } from "./manager";
import { DEPLOYMENTS_PATH } from "shared";

const deploymentsBase = path.resolve(DEPLOYMENTS_PATH);

const mockDirs = {
  [deploymentsBase]: {
    test_1: {
      "config.ts": `export default {}`,
    },
  },
};

class TestDeploymentManager extends DeploymentManager {
  protected async promptDeploymentSelect() {
    console.log("prompt deployment select");
    return "test_1";
  }
}

// TODO
describe("Deployment", () => {
  let manager: DeploymentManager;
  beforeEach(() => {
    manager = new TestDeploymentManager();
  });
  fit("mock setup", () => {
    mockFs(mockDirs);
    const deploymentDirs = fs.readdirSync(deploymentsBase);
    expect(deploymentDirs).toEqual(["test_1"]);
  });

  fit("Lists deployments", async () => {
    mockFs(mockDirs);
    manager.load();
    console.log("list deployments");

    // TODO - provide mock/spy for import method as mock-fs won't have path

    // TODO - refactor all activedeployment.get methods to be async and remove sync method

    // TODO - consider removing ts deployments in favor of JS (electron can't import at runtime)

    // TODO - separate load/get methods to ideally just return from memory and await load on script start
    // although could still use typescript dep to convert (???)
  });

  it("Writes compiled deployment to disk, stringifying functions", () => {});

  it("Loads deployment from disk, restoring stringified functions", () => {});

  it("Loads compiled config from disk", () => {});

  it("Recompiles updated config", () => {});

  it("Recompiles updated parent config", () => {});

  it("Recompiles on parent deployment change", () => {});

  it("Throws on missing deployment", () => {});
});
