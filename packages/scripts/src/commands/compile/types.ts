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
  _DEPRECATED_compileTypes();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * DEPRECATED - CC 2023-08-18
 * Previously frontend app would import from data-models compiled dist, so extra step
 * required to ensure this had been built before running
 * However this has been updated to import .ts directly and compile with angular compiler
 * so not required.
 * Method should be retained for short term in case pattern required
 * (recommend to remove post 2023-11-18)
 * ===
 *
 * Data models import types from scripts but scripts also import types from data models
 * Whilst the types are not in conflict themselves, they do lead to compilation issues
 * Remove any outstanding types before compiling noew
 */
function _DEPRECATED_compileTypes() {
  const dataModelsBuildPath = path.resolve(DATA_MODELS_WORKSPACE_PATH, "dist");
  console.log(chalk.yellow("Compiling type definitions"));
  if (fs.existsSync(dataModelsBuildPath)) {
    fs.removeSync(dataModelsBuildPath);
  }
  // compile data-models
  spawnSync(`yarn workspace data-models build`, { stdio: "inherit", shell: true });
}
