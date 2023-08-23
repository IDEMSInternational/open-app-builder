#!/usr/bin/env node

import { Command } from "commander";
import downloadCmd from "./commands/download";
import authorizeCmd from "./commands/authorize";
import watchCmd from "./commands/watch";
import { logProgramHelp } from "./utils";

const program = new Command();
program.version("1.0.0").description("IDEMS Gdrive Tools");

/** add sub-commands from child folders */
program.addCommand(downloadCmd);
program.addCommand(authorizeCmd);
program.addCommand(watchCmd);

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}
