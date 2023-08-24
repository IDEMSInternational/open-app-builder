#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../paths";
import { Logger, logOutput, logWarning, promptInput, promptOptions } from "../../utils";
import type { IDeploymentConfigJson } from "./common";
import generateDefaultConfig from "./templates/config.default";
import generateExtendedConfig from "./templates/config.extended";
import { loadDeploymentJson } from "./utils";

const program = new Command("create");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Create new deployment")
  // options copied from/passed to generate
  .action(async () => {
    await createDeployment();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and return compiled json of previously set active
 * deployment.
 * @param options.skipRecompileCheck - Skipping checking if ts file updated requiring json update
 * @param options.ignoreMissing - If no config has been set a warning will be shown.
 * Supress this and instead return an empty config object `{}`
 */
export async function createDeployment() {
  const generators = [
    { name: "New Local Deployment", value: () => generateNewDeployment() },
    { name: "Extend Existing Local", value: () => generateExtendedDeployment() },
  ];
  const generatorExec: () => Promise<IGeneratedDeployment> = await promptOptions(
    generators,
    "Would you like to create a new deployment or extend an existing?"
  );
  const createdDeployment = await generatorExec();
  logOutput({ msg1: "Deployment created", msg2: createdDeployment.targetConfigFile });
  return createdDeployment.name;
}

/** Create a new standalone deployment config */
async function generateNewDeployment(): Promise<IGeneratedDeployment> {
  const nameInput = await promptInput("Specify a name for the deployment");
  const name = nameInput.replace(/ /g, "_").toLowerCase();
  const targetConfigFile = path.join(DEPLOYMENTS_PATH, name, `config.ts`);
  const configTs = generateDefaultConfig(name);
  writeConfig(targetConfigFile, configTs);
  const targetGitIgnoreFile = path.join(DEPLOYMENTS_PATH, name, `.gitignore`);
  writeGitIgnore(targetGitIgnoreFile);
  return { name, targetConfigFile };
}

/** Create a deployment config that extends an existing config */
async function generateExtendedDeployment(): Promise<IGeneratedDeployment> {
  const parentDeployment = await selectParentConfigToExtend();
  const nameInput = await promptInput(
    `Specify a name for the deployment: ${parentDeployment.name} - `
  );
  const name = nameInput.replace(/ /g, "_").toLowerCase();
  const extendedName = `${parentDeployment.name}_${name}`;
  const targetFolder = path.join(DEPLOYMENTS_PATH, extendedName);
  const targetConfigFile = path.join(targetFolder, `config.ts`);
  const configTs = generateExtendedConfig(extendedName, parentDeployment.name);
  writeConfig(targetConfigFile, configTs);
  const targetGitIgnoreFile = path.join(DEPLOYMENTS_PATH, extendedName, `.gitignore`);
  writeGitIgnore(targetGitIgnoreFile);
  return { name: extendedName, targetConfigFile };
}

/** Prompt select of an existing config to extend */
async function selectParentConfigToExtend() {
  const allDeployments = listValidDeployments();
  const options = Object.values(allDeployments).map((deployment) => ({
    name: deployment.name,
    value: {
      name: deployment.name,
      filename: path.basename(deployment._config_ts_path),
      folder: path.dirname(path.resolve(DEPLOYMENTS_PATH, deployment._workspace_path)),
    },
  }));
  const parentDeployment = await promptOptions(
    options,
    "Which deployment would you like to extend?"
  );
  return parentDeployment as { name: string; filename: string; folder: string };
}

/**
 * Iterate over deployment folder config.ts files, parse typescript to see which
 * can be successfully generated
 */
export function listValidDeployments() {
  const deploymentsHashmap: { [name: string]: IDeploymentConfigJson } = {};

  const deploymentTSPaths = fs
    .readdirSync(DEPLOYMENTS_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.resolve(DEPLOYMENTS_PATH, d.name, "config.ts"))
    .filter((d) => fs.existsSync(d));

  for (const tsPath of deploymentTSPaths) {
    try {
      const deploymentJson = loadDeploymentJson(path.dirname(tsPath));
      deploymentsHashmap[deploymentJson.name] = deploymentJson;
    } catch (error) {
      logWarning({
        msg1: `Could not load deployment: ${tsPath}`,
      });
    }
  }
  return deploymentsHashmap;
}

function writeConfig(targetConfigFile: string, configTs: string) {
  if (fs.existsSync(targetConfigFile)) {
    Logger.error({ msg1: "Deployment already exists", msg2: targetConfigFile });
  }
  fs.ensureDirSync(path.dirname(targetConfigFile));
  fs.writeFileSync(targetConfigFile, configTs);
}

function writeGitIgnore(targetFile: string) {
  const ignoredPaths = ["app_data", "cache", "tasks", "config.json"];
  const gitIgnoreTxt = ignoredPaths.join("\n");
  if (fs.existsSync(targetFile)) {
    Logger.error({ msg1: "Gitignore file already exists", msg2: targetFile });
  }
  fs.writeFileSync(targetFile, gitIgnoreTxt);
}

interface IGeneratedDeployment {
  name: string;
  targetConfigFile: string;
}
