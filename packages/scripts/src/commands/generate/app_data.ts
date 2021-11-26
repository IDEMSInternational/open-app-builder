#!/usr/bin/env node
import fs from "fs";
import path from "path";
import cp from "child_process";

import { Command } from "commander";

const program = new Command("app-data");

const DEFAULT_OPTIONS = {};

/***************************************************************************************
 * CLI
 * @example yarn workspace test-visual start compare --clean
 *************************************************************************************/
export default program
  .description("Generate a new app data repo")
  // options for compare
  .option("-n, --name", "Ignore errors thrown when comparing images")
  .option("-gh, --github", "Ignore errors thrown when comparing images")
  // options copied from/passed to generate
  .action(async (opts) => {
    const options = { ...DEFAULT_OPTIONS, ...opts };
    console.log("generate app data", options);
  });

/***************************************************************************
 *  Main Methods
 **************************************************************************/

/***************************************************************************
 *  Logging and Error Handling
 **************************************************************************/
const cleanup = () => {
  console.log("Cleaning up.");
};
const handleExit = () => {
  cleanup();
  console.log("Exiting without error.");
  process.exit();
};
const handleError = (e) => {
  console.error("ERROR! An error was encountered while executing");
  console.error(e);
  cleanup();
  console.log("Exiting with error.");
  process.exit(1);
};
process.on("SIGINT", handleExit);
process.on("uncaughtException", handleError);

/***************************************************************************
 *  Main Methods
 **************************************************************************/

/***************************************************************************
 *  Cleanup
 **************************************************************************/
// handleExit();

function ensureCleanRepo() {
  const gitStatus = cp.execSync(`git status --porcelain`).toString();
  if (gitStatus.trim() !== "") {
    console.log("Please commit your changes before running this script!");
    console.log("Exiting because `git status` is not empty:");
    console.log();
    console.log(gitStatus);
    console.log();
    process.exit(1);
  }
}
