import chalk from "chalk";
import { IDeploymentConfig } from "data-models";
import { existsSync, readJsonSync, removeSync, readdirSync, writeFileSync } from "fs-extra";
import { join, resolve } from "path";
import { DEPLOYMENTS_PATH, Logger, logOutput, promptOptions, ROOT_DIR } from "shared";
import { ensureDeploymentTranspiled, loadDeploymentJS, deploymentToJSON } from "./utils";

export class DeploymentManager {
  public deploymentsFolder = DEPLOYMENTS_PATH;
  /** List of all compiled deployments */
  public deployments: Record<string, IDeploymentConfig> = {};

  private activeDeploymentName: string;

  public get activeDeploymentPath() {
    return resolve(this.deploymentsFolder, "activeDeployment.json");
  }

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

  // TODO - clarify different use cases for set vs load...
  // (set also clears angular caches and provides interactive CLI)

  /** Load active deployment, prompting select if unset * */
  public async load(deploymentName?: string, forceRecompile = false): Promise<IDeploymentConfig> {
    if (!deploymentName) return this.loadDefaultDeployment();

    // Return from memory if exists
    if (!forceRecompile && this.deployments[deploymentName]) {
      return this.deployments[deploymentName];
    }
    const configPath = resolve(this.deploymentsFolder, deploymentName, "config.ts");
    // If deployment ts removed prompt set
    if (!existsSync(configPath)) {
      console.log("missing deployment");
      Logger.error({
        msg1: `Deployment does not exist, select a different deployment`,
        msg2: configPath,
        logOnly: true,
      });
      return;
    }
    console.log("continuing with missing config...");
    // Compile and return
    const { configJSPath, transpileRequired } = ensureDeploymentTranspiled(configPath);
    if (transpileRequired) {
      console.log(chalk.gray("Config recompiled due to updates"));
    }
    const deploymentConfig = await loadDeploymentJS(configJSPath);

    if (!deploymentConfig._validated) {
      Logger.error({
        msg1: "Config file incorrectly defined",
        msg2: "Should use `generateDeploymentConfig` to create",
      });
    }
    const { name } = deploymentConfig;
    this.deployments[name] = deploymentConfig;
    this.activeDeploymentName = name;
    this.writeActiveDeploymentJson(deploymentConfig);
    return deploymentConfig;
  }

  /** Set active deployment */
  public async set(deploymentName?: string) {
    // Prompt selection from list when not passed
    if (!deploymentName) {
      const selected = await this.promptDeploymentSelect();
      return this.set(selected);
    }
    // delete .angular cache as it may not detect changes to json files otherwise
    const angularCacheDir = join(ROOT_DIR, ".angular");
    if (existsSync(angularCacheDir)) {
      removeSync(angularCacheDir);
    }
    // Load deployment and write active deployment json
    // TODO - will no longer be required if frontend can dynamically import js file...
    const deploymentConfig = await this.load(deploymentName);
    logOutput({
      msg1: `Active Deployment`,
      msg2: deploymentConfig.name,
    });
    console.log(chalk.blue(this.activeDeploymentPath));
    return deploymentConfig;
  }

  /** Load most recently active deployment */
  private loadDefaultDeployment() {
    if (!existsSync(this.activeDeploymentPath)) {
      return this.set();
    }
    const deploymentJson = readJsonSync(this.activeDeploymentPath) as IDeploymentConfig;
    return this.load(deploymentJson.name);
  }

  /** Store parsed deployment as json so can be directly accessed from frontend */
  private writeActiveDeploymentJson(deploymentConfig: IDeploymentConfig) {
    const writeableConfig = deploymentToJSON(deploymentConfig);
    const deploymentJsonString = JSON.stringify(writeableConfig, null, 2);
    writeFileSync(this.activeDeploymentPath, deploymentJsonString);
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
    return readdirSync(this.deploymentsFolder, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((name) => existsSync(resolve(this.deploymentsFolder, name, "config.ts")));
  }
}
