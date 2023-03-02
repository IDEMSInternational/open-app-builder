#!/usr/bin/env node
import { Command } from "commander";

import compileCmd from "./compile";
import createCmd from "./create";
import getCmd from "./get";
import importCmd from "./import";
import setCmd from "./set";
import { logProgramHelp } from "../../utils";

const program = new Command("deployment").description("Manage active deployment workspace");

/** add sub-commands from child folders */
program.addCommand(compileCmd);
program.addCommand(createCmd);
program.addCommand(getCmd);
program.addCommand(importCmd);
program.addCommand(setCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parseAsync(process.argv);
}
