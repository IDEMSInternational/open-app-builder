#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

import compileCmd from "./commands/compile";

const program = new Command();

program.version("1.0.0").description("IDEMS Translations CLI");

/** add sub-commands from child folders */
program.addCommand(compileCmd);

// NOTE - executableFile format doesn't seem to work on linux
// program.command("compile", "Compile translated files back into app", {
//   executableFile: "compile",
// });

if (!process.argv.slice(2).length) {
  console.log(chalk.yellow("No translation options specified. See help below:"));
  program.outputHelp();
  process.exit(0);
  // program.parseAsync([...process.argv, "interactive"]);
}

async function main() {
  // use parseAsync to allow async actions if required
  await program.parseAsync(process.argv);
}

main();
