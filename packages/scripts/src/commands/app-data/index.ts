#!/usr/bin/env node
import { Command } from "commander";

import convertCmd from "./convert";
import postProcessCmd from "./postProcess";
import downloadCmd from "./download";
import { logProgramHelp } from "../../utils";

const program = new Command("app-data").description("Manage app data");

/** add sub-commands from child folders */
program.addCommand(convertCmd);
program.addCommand(postProcessCmd);
program.addCommand(downloadCmd);

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
