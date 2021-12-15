#!/usr/bin/env node
import { Command } from "commander";

import appDataCmd from "./app_data";
import { logProgramHelp } from "../../utils";

const program = new Command("generate");

/** add sub-commands from child folders */
program.addCommand(appDataCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
