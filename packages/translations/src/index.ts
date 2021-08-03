#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program.version("1.0.0").description("IDEMS Translations CLI");

/** Call sub-commands directly from child folders */
program.command("interactive", "Run with interactive prompts", {
  executableFile: "commands/interactive",
});
program.command("generate", "Generate files for translation", {
  executableFile: "commands/generate",
});
program.command("compile", "Compile translated files back into app", {
  executableFile: "commands/compile",
});

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
