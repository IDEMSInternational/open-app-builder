#!/usr/bin/env node
import chalk from "chalk";
import { spawnSync } from "child_process";
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { DATA_MODELS_WORKSPACE_PATH } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {}
const program = new Command("types");
export default program.description("Compile types").action(async (options: IProgramOptions) => {
  await compileTypes(options);
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and retrieve parsed ts for the named active deployment
 */
async function compileTypes(options: IProgramOptions) {
  // Data models import types from scripts but scripts also import types from data models
  // Whilst the types are not in conflict themselves, they do lead to compilation issues
  // Remove any outstanding types before compiling noew
  const dataModelsBuildPath = path.resolve(DATA_MODELS_WORKSPACE_PATH, "dist");
  console.log(chalk.yellow("Compiling type definitions"));
  if (fs.existsSync(dataModelsBuildPath)) {
    fs.removeSync(dataModelsBuildPath);
  }
  //   compile data-models and app-data files
  spawnSync(`yarn workspace data-models build`, { stdio: "inherit", shell: true });
  spawnSync(`yarn workspace app-data build`, { stdio: "inherit", shell: true });
}
