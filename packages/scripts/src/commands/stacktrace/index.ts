#!/usr/bin/env node
import { Command } from "commander";

import extractCmd from "./extract";
import { logProgramHelp } from "../../utils";

const program = new Command("stacktrace").description("Extract error stacktraces");

/** add sub-commands from child folders */
program.addCommand(extractCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
