#!/usr/bin/env node
import cp from "child_process";

import { Command } from "commander";
import { promptInput } from "../../utils";

const program = new Command("app-data");

const DEFAULT_OPTIONS = {};

/***************************************************************************************
 * CLI
 * @example
 *************************************************************************************/
export default program
  .description("Generate a new app data repo")
  // options for compare
  .option("-n, --name <string>", "Specify name for repo", "prompt")
  .option("-gh, --github_repo <url>", "Specify external github repo for data", "prompt")
  // options copied from/passed to generate
  .action(async (opts) => {
    const options = { ...DEFAULT_OPTIONS, ...opts };
    const allInputOptions = program["options"];
    for (const option of allInputOptions) {
      const { description, long } = option;
      const key = option.long.replace("--", "");
      if (options[key] === "prompt") {
        const value = await promptInput(description);
        options[key] = value;
      }
    }
    console.log("options", options);
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
