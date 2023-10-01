import { IDeploymentConfig } from "data-models";
import { existsSync, readJsonSync, removeSync, readdirSync, writeFileSync } from "fs-extra";
import { join, resolve } from "path";
import { DEPLOYMENTS_PATH, Logger, logOutput, promptOptions, ROOT_DIR } from "shared";
import { compileDeployment } from "./utils";

export class DeploymentManager {
  /** List of all compiled deployments */
  public deployments: Record<string, IDeploymentConfig> = {};

  private activeDeploymentName: string;

  /** Get the curent loaded active deployment */
  public get(name?: string): IDeploymentConfig {
    if (!name) {
      if (!this.activeDeploymentName) {
        Logger.error({
          msg1: `No deployment has been loaded`,
          msg2: `Script should call load method before get`,
        });
      }
      name = this.activeDeploymentName;
    }
    if (!this.deployments[name]) {
      Logger.error({
        msg1: `${name} deployment has not been loaded`,
        msg2: `Script should call load method before get`,
      });
    }
    return this.deployments[name];
  }

  /** Load active deployment, prompting select if unset * */
  public async load(deploymentName?: string): Promise<IDeploymentConfig> {
    console.log("load deployment", deploymentName);
    if (!deploymentName) return this.loadDefaultDeployment();
    const configPath = resolve(DEPLOYMENTS_PATH, deploymentName, "config.ts");

    // If deployment ts removed prompt set
    if (!existsSync(configPath)) {
      Logger.error({
        msg1: `Deployment does not exist, select a different deployment`,
        msg2: configPath,
      });
      // return this.set();
    }
    // Compile and return
    const deploymentConfig = (await this.compile(configPath)) as IDeploymentConfig;
    if (!deploymentConfig._validated) {
      Logger.error({
        msg1: "Config file incorrectly defined",
        msg2: "Should use `generateDeploymentConfig` to create",
      });
    }
    const { name } = deploymentConfig;
    // TODO - add metadata fields

    this.deployments[name] = deploymentConfig;
    this.activeDeploymentName = name;
    return deploymentConfig;
  }

  protected async compile(configPath: string) {
    return compileDeployment(configPath);
  }

  /** Set active deployment */
  public async set(deploymentName?: string) {
    // Prompt selection from list when not passed
    if (!deploymentName) {
      const selected = await this.promptDeploymentSelect();
      return this.set(selected);
    }
    // Read config
    const configPath = resolve(DEPLOYMENTS_PATH, deploymentName, "config.ts");
    // delete .angular cache as it may not detect changes to json files otherwise
    const angularCacheDir = join(ROOT_DIR, ".angular");
    if (existsSync(angularCacheDir)) {
      removeSync(angularCacheDir);
    }
    // Load deployment and write active deployment json
    const deploymentConfig = await this.load(deploymentName);
    this.writeActiveDeploymentJson(deploymentConfig);
    this.activeDeploymentName = deploymentName;
    return deploymentConfig;
  }

  /** Load most recently active deployment */
  private loadDefaultDeployment() {
    const defaultJsonPath = resolve(DEPLOYMENTS_PATH, "activeDeployment.json");
    if (!existsSync(defaultJsonPath)) {
      return this.set();
    }
    const deploymentJson = readJsonSync(defaultJsonPath) as IDeploymentConfig;
    // TODO - convert string back to function

    return this.load(deploymentJson.name);
  }

  /** Store parsed deployment as json so can be directly accessed from frontend */
  private writeActiveDeploymentJson(deploymentConfig: IDeploymentConfig) {
    // Write JSON

    const deploymentJsonString = JSON.stringify(deploymentConfig, null, 2);
    const activeDeploymentPath = resolve(DEPLOYMENTS_PATH, "activeDeployment.json");
    writeFileSync(activeDeploymentPath, deploymentJsonString);
    logOutput({
      msg1: `Active Deployment - "${deploymentConfig.name}"`,
      msg2: activeDeploymentPath,
    });
  }

  /** Prompt user to select a deployment from list */
  protected async promptDeploymentSelect() {
    const deploymentNames = this.listDeploymentFolders();
    // move current deployment name to start of list if exists
    if (this.activeDeploymentName && deploymentNames.includes(this.activeDeploymentName)) {
      deploymentNames.splice(deploymentNames.indexOf(this.activeDeploymentName), 1);
      deploymentNames.unshift(this.activeDeploymentName);
    }
    const selectedName = await promptOptions(deploymentNames);
    return selectedName;
  }

  private listDeploymentFolders() {
    return readdirSync(DEPLOYMENTS_PATH, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((name) => existsSync(resolve(DEPLOYMENTS_PATH, name, "config.ts")));
  }
}
