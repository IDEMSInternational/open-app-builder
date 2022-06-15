#!/usr/bin/env node
import { Command } from "commander";
import { logProgramHelp } from "../../utils";

import typesCmd from "./types";

const program = new Command("compile").description("Handle compilation");

/** add sub-commands from child folders */
program.addCommand(typesCmd);

export default program;

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  (async function () {
    await program.parseAsync(process.argv);
  })();
}
