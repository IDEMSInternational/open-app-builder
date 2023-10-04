import { resolve } from "path";
import { DeploymentManager } from "./manager";
import { useMockErrorLogger } from "../../../../test/helpers/utils";
import { existsSync, rmSync } from "fs";

class TestDeploymentManager extends DeploymentManager {}

// TODO
describe("Deployment", () => {
  let manager: DeploymentManager;
  let errorLogger: jasmine.Spy;
  beforeEach(() => {
    manager = new TestDeploymentManager();
    manager.deploymentsFolder = resolve(__dirname, "../../../../test/deployments");
    errorLogger = useMockErrorLogger();
  });

  it("Loads named deployment", async () => {
    const res = await manager.load("basic");
    expect(res.name).toEqual("basic");
  });

  it("Writes active deployment json on load", async () => {
    const { activeDeploymentPath } = manager;
    if (existsSync(activeDeploymentPath)) {
      rmSync(activeDeploymentPath);
    }
    await manager.load("basic");
    expect(existsSync(activeDeploymentPath)).toBeTrue();
  });

  fit("Logs error if deployment not found", async () => {
    await manager.load("missing");
    expect(errorLogger).toHaveBeenCalledTimes(1);
    expect(errorLogger.calls.first().args[0].msg1).toEqual(
      "Deployment does not exist, select a different deployment"
    );
  });

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
