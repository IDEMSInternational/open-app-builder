#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import copyCmd from "./copy";
import downloadCmd from "./download";
import syncCmd from "./sync";

const program = new Command("app-data");

/** add sub-commands from child folders */
program.addCommand(copyCmd);
program.addCommand(downloadCmd);
program.addCommand(syncCmd);

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
