#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

// Commands
import appDataCmd from "./app-data";
import configCmd from "./config";
import deploymentCmd from "./deployment";
import generateCmd from "./generate";
import { logWarning } from "../utils/logging.utils";

const program = new Command();

program.version("1.0.0").description("IDEMS App Scripts");

// Handle legacy command renames so can still run `npm run scripts gdrive-download`
const legacyCommandMappings = {
  "gdrive-download": ["app-data", "download"],
  "decrypt-config": ["config", "decrypt"],
  "encrypt-config": ["config", "encrypt"],
  // TO convert
  "app-data-convert": ["ts-node src/app-data-convert/index.ts"],
  "app-data-copy": ["ts-node src/app-data-copy.ts"],
  "app-data-sync": ["npm run gdrive-download && npm run app-data-convert && npm run app-data-copy"],
  "sync-plh-content": ["app-data", "sync"],
  "sync-single": ["app-data", "sync-single"],
  version: ["version.ts"],
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
