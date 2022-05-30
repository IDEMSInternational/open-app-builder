#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { IDEMS_APP_CONFIG } from "../../paths";
import { logError, logOutput, promptInput, promptOptions } from "../../utils";
import { listDeployments, setActiveDeployment } from "./set";
import generateDefaultConfig from "./templates/config.default";
import generateExtendedConfig from "./templates/config.extended";

const program = new Command("create");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Create new deployment")
  // options copied from/passed to generate
  .action(async () => createDeployment());

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
  const isNewDeployment = await promptOptions(
    [
      { name: "New Deployment", value: true },
      { name: "Extend Existing", value: false },
    ],
    "Would you like to create a new deployment or extend an existing deployment?"
  );

  // Create deployment
  let createdDeployment: { targetConfigFile: string; name: string } = null;
  if (isNewDeployment) {
    createdDeployment = await generateNewDeployment();
  } else {
    createdDeployment = await generateExtendedDeployment();
  }
  logOutput({ msg1: "Deployment created", msg2: createdDeployment.targetConfigFile });

  // Set new config
  const shouldSetConfig = await promptOptions(
    ["Yes", "No"],
    "Would you like to set the deployment as active?"
  );
  if (shouldSetConfig === "Yes") {
    // Set newly created config as active
    await setActiveDeployment(createdDeployment.name);
  }
}

/** Create a new standalone deployment config */
async function generateNewDeployment() {
  const nameInput = await promptInput("Specify a name for the deployment");
  const name = nameInput.toLowerCase().replace(/ /, "_");
  const targetConfigFile = path.join(IDEMS_APP_CONFIG.deployments, name, `config.ts`);
  const configTs = generateDefaultConfig(name);
  writeConfig(targetConfigFile, configTs);
  return { name, targetConfigFile };
}

/** Create a deployment config that extends an existing config */
async function generateExtendedDeployment() {
  const parentDeployment = await selectParentConfigToExtend();
  const nameInput = await promptInput("Specify a name for the deployment");
  const name = nameInput.toLowerCase().replace(/ /, "_");
  const targetConfigFile = path.join(parentDeployment.folder, `${name}.config.ts`);
  const extendedName = `${parentDeployment.name}_${name}`;
  const configTs = generateExtendedConfig(extendedName, parentDeployment.filename);
  writeConfig(targetConfigFile, configTs);
  return { name: extendedName, targetConfigFile };
}

/** Prompt select of an existing config to extend */
async function selectParentConfigToExtend() {
  const allDeployments = await listDeployments();
  const options = Object.values(allDeployments).map((deployment) => ({
    name: deployment.name,
    value: {
      name: deployment.name,
      filename: path.basename(deployment.filename),
      folder: path.dirname(path.resolve(IDEMS_APP_CONFIG.deployments, deployment.filename)),
    },
  }));
  const parentDeployment = await promptOptions(
    options,
    "Which deployment would you like to extend?"
  );
  return parentDeployment as { name: string; filename: string; folder: string };
}

function writeConfig(targetConfigFile: string, configTs: string) {
  if (fs.existsSync(targetConfigFile)) {
    logError({ msg1: "Deployment already exists", msg2: targetConfigFile });
  }
  fs.ensureDirSync(path.dirname(targetConfigFile));
  fs.writeFileSync(targetConfigFile, configTs);
}
