#!/usr/bin/env node
import { Command } from "commander";

// Commands
import appDataCmd from "./app-data";
import compileCmd from "./compile";
import e2eDataCmd from "./e2e-data";
import configCmd from "./config";
import deploymentCmd from "./deployment";
import versionCmd from "./version";
import workflowCmd from "./workflow";
import { logWarning, logProgramHelp } from "../utils/logging.utils";

const program = new Command();

program.version("1.0.0").description("IDEMS App Scripts");

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

/** add sub-commands from child folders */
program.addCommand(appDataCmd);
program.addCommand(compileCmd);
program.addCommand(e2eDataCmd);
program.addCommand(configCmd);
program.addCommand(deploymentCmd);
program.addCommand(versionCmd);
program.addCommand(workflowCmd);

if (!process.argv.slice(2).length) {
  logProgramHelp(program);
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

(async function () {
  await program.parseAsync(process.argv);
})();

// Additional exports for direct consumption
import { extendDeploymentConfig, generateDeploymentConfig } from "./deployment/common";
export { extendDeploymentConfig, generateDeploymentConfig };
