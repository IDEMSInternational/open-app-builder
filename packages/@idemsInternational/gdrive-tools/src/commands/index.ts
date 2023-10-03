#!/usr/bin/env node

import { Command } from "commander";
import downloadCmd from "./download";
import authorizeCmd from "./authorize";
import watchCmd from "./watch";
import chalk from "chalk";

const program = new Command();
program.version("1.0.0").description("IDEMS Gdrive Tools");

/** add sub-commands from child folders */
program.addCommand(downloadCmd);
program.addCommand(authorizeCmd);
program.addCommand(watchCmd);

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}

export function logProgramHelp(program: Command) {
  console.log(chalk.yellow("No command specified. See help below:\n"));
  program.outputHelp();
  console.log("\n");
  process.exit(0);
}
