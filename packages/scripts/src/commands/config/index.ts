#!/usr/bin/env node
import { Command } from "commander";

import decryptCmd from "./decrypt";
import encryptCmd from "./encrypt";
import { logProgramHelp } from "../../utils";

const program = new Command("config").description("Encrypt and Decrypt sensitive configurations");

/** add sub-commands from child folders */
program.addCommand(decryptCmd);
program.addCommand(encryptCmd);

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
