#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import path from "path";
import { generateTranslations } from "./generate";
const program = new Command();

program.version("1.0.0").description("IDEMS Translations CLI");

program
  .command("generate")
  .description("Generate files for translation")
  .requiredOption(
    "-i, --input <input>",
    "Source folder for input files, relative to translations folder. Default ./input",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./input")
  )
  .requiredOption(
    "-o, --output [output]",
    "Target folder for output files, relative to translations folder. Default ./output",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./output")
  )
  .action((opts) => {
    generateTranslations(opts.input, opts.output);
  });

if (!process.argv.slice(2).length) {
  console.log(chalk.yellow("No translation options specified. See help below:"));
  program.outputHelp();
}

async function main() {
  // use parseAsync to allow async actions if required
  await program.parseAsync(process.argv);
}

main();
