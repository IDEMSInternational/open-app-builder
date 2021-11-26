#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import generateCmd from "./generate";
import deploymentCmd from "./deployment";

const program = new Command();

program.version("1.0.0").description("IDEMS App Scripts");

/** add sub-commands from child folders */
program.addCommand(generateCmd);
program.addCommand(deploymentCmd);

if (!process.argv.slice(2).length) {
  console.log(chalk.yellow("No command specified. See help below:"));
  program.outputHelp();
  process.exit(0);
}
program.parse(process.argv);
