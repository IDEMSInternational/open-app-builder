#!/usr/bin/env node
import { Command } from "commander";

import setCmd from "./set";
import getCmd from "./get";
import { logProgramHelp } from "../../utils";

const program = new Command("deployment").description("Manage active deployment workspace");

/** add sub-commands from child folders */
program.addCommand(setCmd);
program.addCommand(getCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
