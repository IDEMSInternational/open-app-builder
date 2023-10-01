import fs from "fs-extra";
import mockFs from "mock-fs";
import path from "path";
import { DeploymentManager } from "./manager";
import { DEPLOYMENTS_PATH } from "shared";
import { IDeploymentConfig } from "data-models";
import { mockErrorLogger, useMockErrorLogger } from "../../../../test/helpers/utils";

const deploymentsBase = path.resolve(DEPLOYMENTS_PATH);

const mockConfigTS = `
  import { generateDeploymentConfig } from "scripts";
  const config = generateDeploymentConfig("test_1");
  export default config
`;

const mockDirs = {
  [deploymentsBase]: {
    test_1: {
      "config.ts": mockConfigTS,
    },
  },
};

class TestDeploymentManager extends DeploymentManager {
  // override interactive prompt method
  protected async promptDeploymentSelect() {
    return "test_1";
  }
  // override ts compile method
  protected async compile(configTsPath: string) {
    return { name: "test_1", _validated: true } as IDeploymentConfig;
  }
}

// TODO
describe("Deployment", () => {
  let manager: DeploymentManager;
  let errorLogger: jasmine.Spy;
  beforeEach(() => {
    mockFs(mockDirs);
    manager = new TestDeploymentManager();
    errorLogger = useMockErrorLogger();
  });
  it("mock setup", () => {
    const deploymentDirs = fs.readdirSync(deploymentsBase);
    expect(deploymentDirs).toEqual(["test_1"]);
  });

  it("Loads named deployment", async () => {
    const res = await manager.load("test_1");
    expect(res.name).toEqual("test_1");
  });

  it("Logs error if deployment not found", async () => {
    await manager.load("missing");
    expect(mockErrorLogger).toHaveBeenCalledTimes(1);
    expect(mockErrorLogger.calls.first().args[0].msg1).toEqual(
      "Deployment does not exist, select a different deployment"
    );
  });

  // TODO - provide mock/spy for import method as mock-fs won't have path

  // TODO - refactor all activedeployment.get methods to be async and remove sync method

  // TODO - consider removing ts deployments in favor of JS (electron can't import at runtime)

  // TODO - separate load/get methods to ideally just return from memory and await load on script start
  // although could still use typescript dep to convert (???)

  it("Writes compiled deployment to disk, stringifying functions", () => {});

  it("Loads deployment from disk, restoring stringified functions", () => {});

  it("Loads compiled config from disk", () => {});

  it("Recompiles updated config", () => {});

  it("Recompiles updated parent config", () => {});

  it("Recompiles on parent deployment change", () => {});

  it("Throws on missing deployment", () => {});
});
