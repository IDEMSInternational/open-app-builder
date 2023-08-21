#!/usr/bin/env node
import { Command } from "commander";

import runCmd from "./run";
import { logProgramHelp } from "../../utils";

const program = new Command("workflow");

/** add sub-commands from child folders */
program.addCommand(runCmd);

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }

  program.parseAsync(process.argv);
}
export default program;
