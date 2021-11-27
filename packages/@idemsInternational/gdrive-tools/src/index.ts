#!/usr/bin/env node
import chalk from "chalk";

import { Command } from "commander";
import downloadCmd from "./commands/download";
import authorizeCmd from "./commands/authorize";

const program = new Command();
program.version("1.0.0").description("IDEMS Gdrive Tools");

/** add sub-commands from child folders */
program.addCommand(downloadCmd);
program.addCommand(authorizeCmd);

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    console.log(chalk.yellow("No command specified. See help below:"));
    program.outputHelp();
    process.exit(0);
  }
  program.parse(process.argv);
}
