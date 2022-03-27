#!/usr/bin/env node
import { Command } from "commander";

import parseCmd from "./parse";
import { logProgramHelp } from "../../utils";

const program = new Command("e2e-data").description("Parse E2E data");

/** add sub-commands from child folders */
program.addCommand(parseCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
