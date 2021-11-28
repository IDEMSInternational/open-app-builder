#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import syncCmd from "./sync";
import downloadCmd from "./download";

const program = new Command("app-data");

/** add sub-commands from child folders */
program.addCommand(syncCmd);
program.addCommand(downloadCmd);

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
