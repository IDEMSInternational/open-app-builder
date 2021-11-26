#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import setCmd from "./set";
import getCmd from "./get";

const program = new Command("deployment");

/** add sub-commands from child folders */
program.addCommand(setCmd);
program.addCommand(getCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    console.log(chalk.yellow("No command specified. See help below:"));
    program.outputHelp();
    process.exit(0);
  }
  program.parse(process.argv);
}
