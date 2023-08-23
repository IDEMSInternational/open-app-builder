#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { spawnSync } from "child_process";
import { SCRIPTS_WORKSPACE_PATH } from "shared";

// Commands
import appDataCmd from "./app-data";
import e2eDataCmd from "./e2e-data";
import configCmd from "./config";
import deploymentCmd from "./deployment";
import versionCmd from "./version";
import workflowCmd from "./workflow";
import { callProgramWithHelp, isTsNode, logWarning } from "../utils";

// Additional exports for direct consumption
import { extendDeploymentConfig, generateDeploymentConfig } from "./deployment/common";
export { extendDeploymentConfig, generateDeploymentConfig };

const { version } = require("../../package.json");

const program = new Command();

program.version(version).description(`IDEMS App Scripts ${version}`);

/** add sub-commands from child folders */
program.addCommand(appDataCmd);
program.addCommand(e2eDataCmd);
program.addCommand(configCmd);
program.addCommand(deploymentCmd);
program.addCommand(versionCmd);
program.addCommand(workflowCmd);

const handleExit = () => {
  console.log("Exiting without error.");
  process.exit();
};
const handleError = (e) => {
  console.error("ERROR! An error was encountered while executing");
  console.error(e);
  console.log("Exiting with error.");
  process.exit(1);
};
process.on("SIGINT", handleExit);
process.on("uncaughtException", handleError);

checkLegacyCommandMappings();

// export program to be called via bin
export { program };

/** Allow programmatic call of command parser */
export const parseCommand = async (cmd: string) => {
  const args = [...process.argv.slice(0, 2), ...cmd.split(" ")];
  return program.parseAsync(args);
};

/**
 * Hack utility method to allow processing an async command synchronously
 * by using child process spawn. This is preferred to calling spawnsync direct to
 * ensure that only scripts bin is accessed (other workspaces may not be compiled with build)
 *
 * @param useTsNode - if script requires access to typescript environment (e.g. deployment compile)
 * then set as true to
 * */
export const parseAsyncCommandSync = (cmd: string, useTsNode = false) => {
  // If command requires
  let exec = "";
  if (useTsNode) {
    // TODO - should make fully programattic to work from compiled version
    // TODO - also as only used for deployments
    exec = `ts-node src/commands/index.ts`;
  } else {
    exec = `yarn app-scripts`;
  }
  console.log(chalk.gray(`${exec} ${cmd}`));
  spawnSync(`${exec} ${cmd}`, { stdio: "inherit", shell: true, cwd: SCRIPTS_WORKSPACE_PATH });
};

// Run the program directly when called via ts-node (e.g. start script)
if (isTsNode) {
  callProgramWithHelp(program);
}

function checkLegacyCommandMappings() {
  // Handle legacy command renames so can still run `yarn scripts gdrive-download`
  const legacyCommandMappings = {
    "legacy-command": ["new-command", "arg"],
  };
  const cmdName = process.argv[2] || "";
  const mapping = legacyCommandMappings[cmdName];
  if (mapping) {
    logWarning({
      msg1: "NOTE - Script has been renamed and will be deprecated",
      msg2: `"${cmdName}" -> "${mapping.join(" ")}"`,
    });
    process.argv.splice(2, 1, ...mapping);
  }
}
