import chalk from "chalk";
import { ensureDirSync, writeFileSync } from "fs-extra";
import * as inquirer from "inquirer";
import { dirname, resolve } from "path";

import type { IDeploymentConfigJson } from "data-models";

import { loadActionYml } from "./utils";
import { ACTION_TEMPLATES } from "../templates";
import { IActionConfig } from "../models";

/**
 * Select an action from available templates to configure and populate locally
 *
 * @param userInputValues list of default values to populate during setup
 * Used when triggering actions from external lib, such as passing deployment information
 */
export async function setupActions(deployment: IDeploymentConfigJson) {
  const { selected } = await inquirer.prompt<{ selected: IActionConfig }>([
    {
      type: "list",
      name: "selected",
      message: "What action would you like to configure?\n",
      choices: Object.values(ACTION_TEMPLATES).map((value) => {
        const name = `${chalk.blue(value.name)}\n  ${chalk.gray(value.description)}\n`;
        return { value, name };
      }),
      pageSize: 30,
    },
  ]);
  await handleActionRequires(selected);
  await handleActionSecrets(selected);
  const actionYml = await handleActionInputs(selected, deployment);
  await writeActionOutput(selected, actionYml, deployment);
}

/**
 * Check action requirements, prompt user to process any required actions in advance
 */
async function handleActionRequires(config: IActionConfig) {
  if (config.requires) {
    for (const action of config.requires) {
      // TODO - add automation to ensure setup has been completed for actions
      const message = `Action requires [${action.name}] action to be manually configured in advance.\n\nProceed?`;
      const { confirmed } = await inquirer.prompt([
        { type: "confirm", message, name: "confirmed" },
      ]);
      if (!confirmed) {
        process.exit(1);
      }
    }
  }
}

/**
 * Check action requirements, prompt user to confirm any required secrets in advance
 */
async function handleActionSecrets(config: IActionConfig) {
  if (config.secrets) {
    console.log("");
    const secretsList = config.secrets
      .map(
        ({ name, description, required }) =>
          `${chalk.blue(name)}${required ? chalk.red("*") : ""}\n${chalk.gray(description)}\n`
      )
      .join("\n");
    const message = `Action requires Github Secrets manually configured\n\n${secretsList}\nProceed?`;
    const { confirmed } = await inquirer.prompt([{ type: "confirm", message, name: "confirmed" }]);
    if (!confirmed) {
      process.exit(1);
    }
  }
}

/**
 * Process inputs defined in action config file, prompting user input as required and replacing
 * within action yml file
 */
async function handleActionInputs(config: IActionConfig, deployment: IDeploymentConfigJson) {
  const userInputs: Record<string, any> = {};
  console.log(chalk.blue("\nPlease provide the following inputs"));
  // Record user input values
  for (const { name, description, defaultValue, required } of config.inputs(deployment) || []) {
    console.log("");
    const message = `${chalk.yellow(name)}\n${chalk.gray(description)}\n`;
    const res = await inquirer.prompt([{ type: "input", name, message, default: defaultValue }]);
    const value = res[name];
    if ((value === undefined || value === "") && required) {
      throw new Error("Input required");
    }
    userInputs[name] = value;
  }
  // Replace action values
  const yaml = loadActionYml(config.templatePath);
  let replacedYaml = yaml;
  for (const [key, value] of Object.entries(userInputs)) {
    const exp = new RegExp(`%{${key}}`, "g");
    replacedYaml = replacedYaml.replace(exp, value);
  }
  return replacedYaml;
}

/** Write generated action yml to file */
async function writeActionOutput(
  config: IActionConfig,
  actionYml: string,
  deployment: IDeploymentConfigJson
) {
  console.log("");
  let defaultName = dirname(config.templatePath) + ".yml";
  const message = "Specify action output filename\n";
  const { filename } = await inquirer.prompt([
    { type: "input", message, default: defaultName, name: "filename" },
  ]);
  const filepath = resolve(deployment._workspace_path, ".github", "workflows", filename);
  const ymlMetadata = generateMetadataTag(config);
  const ymlContent = `${ymlMetadata}${actionYml}`;
  ensureDirSync(dirname(filepath));
  writeFileSync(filepath, ymlContent);
  console.log(chalk.blue("\nAction created successfully\n"), filepath);
}

/**
 * Generate a local yml tag used to store metadata
 * @returns tag representation of action config metadata, e.g.
 * ```yaml
 * # IDEMS Template Metadata
 * %TAG !idems_meta! id:app_build,version:20230629
 * ---
 * ```
 *
 * Ideally we would just add key-value pairs directly to top-section of yaml file,
 * however json-schema detection throws errors for properties not expected in github action yml
 */
function generateMetadataTag(config: IActionConfig) {
  const metadataString = Object.entries(config.metadata)
    .map(([key, value]) => `${key}:${value}`)
    .join(",");
  return `# IDEMS Template Metadata\n%TAG !idems_meta! ${metadataString}\n---\n`;
}
