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

const program = new Command("types");
export default program.description("Compile types").action(() => {
  compileTypes();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 *
 * Data models import types from scripts but scripts also import types from data models
 * Whilst the types are not in conflict themselves, they do lead to compilation issues
 * Remove any outstanding types before compiling noew
 */
function compileTypes() {
  const dataModelsBuildPath = path.resolve(DATA_MODELS_WORKSPACE_PATH, "dist");
  console.log(chalk.yellow("Compiling type definitions"));
  if (fs.existsSync(dataModelsBuildPath)) {
    fs.removeSync(dataModelsBuildPath);
  }
  // compile data-models
  spawnSync(`yarn workspace data-models build`, { stdio: "inherit", shell: true });
}
