#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

// Commands
import appDataCmd from "./app-data";
import configCmd from "./config";
import deploymentCmd from "./deployment";
import generateCmd from "./generate";

const program = new Command();

program.version("1.0.0").description("IDEMS App Scripts");

// Handle legacy command renames so can still run `command gdrive-download`
const legacyCommandMappings = {
  "gdrive-download": ["app-data", "download"],
  "decrypt-config": ["config", "decrypt"],
  "encrypt-config": ["config", "encrypt"],
};
const mapping = legacyCommandMappings[process.argv[2] || ""];
if (mapping) {
  process.argv.splice(2, 1, ...mapping);
}

/** add sub-commands from child folders */
program.addCommand(appDataCmd);
program.addCommand(configCmd);
program.addCommand(deploymentCmd);
program.addCommand(generateCmd);

if (!process.argv.slice(2).length) {
  console.log(chalk.yellow("No command specified. See help below:"));
  program.outputHelp();
  process.exit(0);
}

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

program.parse(process.argv);
