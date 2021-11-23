#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import compareCmd from "./commands/compare";
import generateCmd from "./commands/generate";
import downloadCmd from "./commands/download";

const program = new Command();

program.version("1.0.0").description("IDEMS Visual Test CLI");

/** add sub-commands from child folders */
program.addCommand(compareCmd);
program.addCommand(generateCmd);
program.addCommand(downloadCmd);

if (!process.argv.slice(2).length) {
  console.log(chalk.yellow("No command specified. See help below:"));
  program.outputHelp();
  process.exit(0);
  // program.parseAsync([...process.argv, "interactive"]);
}

async function main() {
  // use parseAsync to allow async actions if required
  await program.parseAsync(process.argv);
}

main();
